import InterpolScrap from "../../entities/interpol_scraper";
import { getTerroristDetail } from "../../utils/get_interpol_terrorist_detail";


const interpolScrapper = new InterpolScrap();

async function getSecuritiesFraud(){
  let securitiesFraud = [];

  try {
    const securitiesFraudList = await interpolScrapper.getSecuritiesFraud();

    securitiesFraud = securitiesFraudList;

  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  const terrorists = await getTerroristDetail(securitiesFraud);

  return terrorists;
}


async function teste () {
 let securitiesFraudTerrorism = await getSecuritiesFraud();
 console.log("Securities Fraud terrorism = " + securitiesFraudTerrorism);
} 

teste()