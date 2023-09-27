// // BASE INTERPOL SCRAPING
// (async () => {
//   // const keywords = ['financing of terrorism', 'Money Laundering', "Securities Fraud"];
//   const response = await fetch(
//     `https://ws-public.interpol.int/notices/v1/red?freeText=fraud&resultPerPage=100`,
//   );
//   // https://ws-public.interpol.int/notices/v1/red?freeText=fraud&resultPerPage=20&page=8

//   const responseData = await response.json();
//   // console.log(responseData);
//   // console.log(responseData._embedded.notices.length);
//   console.log(JSON.stringify(responseData._embedded.notices, null, 2));
// })();

class InterpolScrap {
  constructor() {
    this.baseUrl = 'https://ws-public.interpol.int/notices/v1/red?';
    this.resultPerPage = 160;
  }

  async searchTerrorist(filter){
    const response = await fetch(
      this.baseUrl + new URLSearchParams({
        freeText: filter,
        resultPerPage: this.resultPerPage,
      }) 
      );

    const responseData = await response.json();
      
    const noticies = responseData._embedded.notices;

    return noticies;
  }

  async getFinanceTerrorism() {
    const response = await this.searchTerrorist("financing of terrorism");
    
    return response;
  }

  async getMoneyLaundering() {
    const reponse = await this.searchTerrorist("Money Laundering");

    return reponse;
  }

  async getSecuritiesFraud() {
    const response = await this.searchTerrorist("Securities Fraud");

    return response;
  }
  
}

class InterpolDetailScrap{
  constructor(){
    this.baseUrl = 'https://ws-public.interpol.int/notices/v1/red/';
  }

  async getDetail(entity_id){
    const response = await fetch(
      this.baseUrl + entity_id
    );

    const responseData = await response.json();
    return responseData;
  }
}

class Terrorist{
  constructor(
    name, 
    dateOfBirth, 
    nationalities, 
    entityId, 
    gender,
    arrestWarrants,
  ){
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.nationalities = nationalities;
    this.entityId = entityId;
    this.gender = gender;
    this.arrestWarrants = arrestWarrants
  }

  async fromFbiDetailJson(fbiJson){
    //TODO
  }

  async fromInterpolDetailJson(terroristDetail){
    let name = terroristDetail.name + " " + terroristDetail.forename;
    let dateOfBirth = terroristDetail.date_of_birth;
    let nationalities = terroristDetail.nationalities;
    let entityId = terroristDetail.entity_id;
    let gender = terroristDetail.sex_id;
    let charge = terroristDetail.arrest_warrants[0].charge;

    let terroristModel = new Terrorist(
      name,
      dateOfBirth,
      nationalities,
      entityId,
      gender,
      charge,
    );

    return terroristModel;
  }
  
}

const interpolScrapper = new InterpolScrap();
const interpolDetailScrap = new InterpolDetailScrap();
const terroristModel = new Terrorist();

async function _getTerroristDetail(financeTerrorism){
  let terrorists = [];
  
  for (const terrorist of financeTerrorism) {
    try {
      let entityIdFormatted = terrorist.entity_id.replace("/", "-");

      const terroristDetail = await interpolDetailScrap.getDetail(entityIdFormatted)
      
      const terroristModelImpl = await terroristModel.fromInterpolDetailJson(terroristDetail);

      terrorists.push(terroristModelImpl);

    } catch (error) {
      console.error('Erro ao buscar detalhe do terrorista:', error);
    }
  }

  return terrorists;
}

async function getFinanceTerrorism(){
  let financeTerrorism = [];

  try {
    const financeTerroristList = await interpolScrapper.getFinanceTerrorism();

    financeTerrorism = financeTerroristList
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  const terrorists = await _getTerroristDetail(financeTerrorism);

  return terrorists;
}

async function getMoneyLaundering(){
  let moneyLaudering = [];

  try {
    const moneyLauderingList = await interpolScrapper.getMoneyLaundering();

    moneyLaudering = moneyLauderingList;

  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  const terrorists = await _getTerroristDetail(moneyLaudering);

  return terrorists;
}

async function getSecuritiesFraud(){
  let securitiesFraud = [];

  try {
    const securitiesFraudList = await interpolScrapper.getSecuritiesFraud();

    securitiesFraud = securitiesFraudList;

  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  const terrorists = await _getTerroristDetail(securitiesFraud);

  return terrorists;
}


async function teste () {
 let financeTerrorism = await getFinanceTerrorism();
 console.log("Finance Terrorism = " + financeTerrorism)
 let moneyLauderingTerrosim = await getMoneyLaundering();
 console.log("Money Laudering terrorism = " + moneyLauderingTerrosim );
 let securitiesFraudTerrorism = await getSecuritiesFraud();
 console.log("Securities Fraud terrorism = " + securitiesFraudTerrorism);
} 

teste()