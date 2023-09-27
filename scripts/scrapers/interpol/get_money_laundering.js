import { _getTerroristDetail } from '../../utils/get_interpol_terrorist_detail.js';
import InterpolScrap from './scrapers/interpol/interpol_scraper.js'

const interpolScrapper = new InterpolScrap();

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


async function teste () {
 let moneyLauderingTerrosim = await getMoneyLaundering();
 console.log("Money Laudering terrorism = " + moneyLauderingTerrosim );
} 

teste()