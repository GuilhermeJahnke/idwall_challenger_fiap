import { _getTerroristDetail } from '../../utils/get_interpol_terrorist_detail.js';
import InterpolScrap from './scrapers/interpol/interpol_scraper.js'

const interpolScrapper = new InterpolScrap();

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
 let securitiesFraudTerrorism = await getSecuritiesFraud();
 console.log("Securities Fraud terrorism = " + securitiesFraudTerrorism);
} 

teste()