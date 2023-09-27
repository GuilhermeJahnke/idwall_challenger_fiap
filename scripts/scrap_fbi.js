const { error } = require('console');
const { URLSearchParams } = require('url');

// BASE FBI SCRAPING
// (async () => {
//   // const keywords = ['terrorist', 'Money Laundering'];
//   // Terrorist
//   // const response = await fetch(
//   //   `https://api.fbi.gov/wanted/list?` +
//   //     new URLSearchParams({
//   //       pageSize: 400,
//   //       person_classification: 'main',
//   //       poster_classification: 'terrorist',
//   //     }),
//   // );

//   // Bank Froud
//   const response = await fetch(
//     `https://api.fbi.gov/wanted/list?` +
//       new URLSearchParams({
//         pageSize: 1000,
//         person_classification: 'main',
//         poster_classification: 'default',
//       }),
//   );
//   // https://ws-public.interpol.int/notices/v1/red?freeText=fraud&resultPerPage=20&page=8

//   const responseData = await response.json();
//   // console.log(responseData);
//   const fraudCriminals = responseData.items.filter((item) =>
//     item?.description?.match(/Bank Fraud/gi),
//   );

//   console.log(JSON.stringify(responseData.items, null, 2));
//   console.log(fraudCriminals, `quantity ${fraudCriminals.length}`);

//   // console.log(responseData._embedded.notices.length);
//   // console.log(JSON.stringify(responseData._embedded.notices[0], null, 2));
// })();

class FbiScraper {
  constructor() {
    this.baseUrl = 'https://api.fbi.gov/wanted/list?';
    this.pageSize = 160;
    this.person_classification = 'main';
  }

  async getFbiTerrorists() {
    const response = await fetch(
      this.baseUrl +
        new URLSearchParams({
          pageSize: this.pageSize,
          person_classification: this.person_classification,
          poster_classification: "terrorist",
        }),
    );
    const responseData = await response.json();
    return responseData.items;
  }


   async getFraudCriminals() {
     const response = await fetch(
       this.baseUrl +
         new URLSearchParams({
           pageSize: this.pageSize,
           person_classification: this.person_classification,
           poster_classification: "default",
         }),
     );
     const responseData = await response.json();
     return responseData.items;
     ;
  }

}

class TerroristFbi{
  constructor(
    title,
    dates_of_birth_used,
    nationality,
    sex,
    caution
  ){
    this.title = title;
    this.dates_of_birth_used = dates_of_birth_used;
    this.nationality = nationality;
    this.sex = sex;
    this.caution = caution
  }

  async fromFbiDetailJson(terroristDetail){
    let title = terroristDetail.title;
    let dates_of_birth_used = terroristDetail.dates_of_birth_used;
    let nationality = terroristDetail.nationality;
    let sex = terroristDetail.sex;
    let caution = terroristDetail.caution;

    let terroristModel = new TerroristFbi(
      title,
      dates_of_birth_used,
      nationality,
      sex,
      caution
    );

    return terroristModel;
  }
}



const fbiScraper = new FbiScraper();
const terroristModel = new TerroristFbi();

async function getFbiTerrorists(){
  let fbiTerrorists = [];
  let terrorists = [];

  try {
    const terrorists = await fbiScraper.getFbiTerrorists();

    fbiTerrorists = terrorists

  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  for(const terrorist of fbiTerrorists) {
    
    try {

      const terroristModelImpl = await terroristModel.fromFbiDetailJson(terrorist);

      terrorists.push(terroristModelImpl)

    } catch (error) {
      console.error('Erro ao buscar detalhe do terrorista:', error);
    }
  }

  return terrorists;
}

async function getFraudCriminals(){
  let fbidefault = [];
  let defaults = [];

  try {
    const fraudCriminals = await fbiScraper.getFraudCriminals();

    fbidefault = fraudCriminals
  } catch (error) {
    console.error('Erro ao buscar Criminosos por fraudes:', error);
  }

  for (const criminal of fbidefault) {
    try {
      const terroristModelImpl = await terroristModel.fromFbiDetailJson(criminal);

      defaults.push(terroristModelImpl)
    } catch (error) {
      console.error('Erro ao buscar detalhe do criminoso por fraude:', error);
    }
  }
  return defaults;
}

getFraudCriminals().then((terrorists) => {
  console.log('Terrorists:', terrorists);
}).catch((error) => {
  console.error('Erro ao buscar terroristas:', error);
});
