import InterpolScrap from './scrapers/interpol/interpol_scraper.js'
import { _getTerroristDetail } from '../../utils/get_interpol_terrorist_detail.js';

const interpolScrapper = new InterpolScrap();

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


async function teste () {
 let financeTerrorism = await getFinanceTerrorism();
 console.log("Finance Terrorism = " + financeTerrorism)
} 

teste()