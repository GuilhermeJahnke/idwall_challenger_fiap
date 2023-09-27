
import FbiScraper from './entities/fbi_scraper';
import Terrorist from './entities/terrorist';

const fbiScraper = new FbiScraper();
const terroristModel = new Terrorist();

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

async function teste () {
  let fbiTerrorist = await getFbiTerrorists();
  console.log("FBI Terrorism = " + fbiTerrorist)
 } 
 
teste()