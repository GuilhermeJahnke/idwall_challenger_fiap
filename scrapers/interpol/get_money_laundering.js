// import InterpolScrap from "../../entities/interpol_scraper";
import InterpolScrap from "../../entities/interpol_scraper.js";
import getTerroristDetail from "../../utils/get_interpol_terrorist_detail.js";

const interpolScrapper = new InterpolScrap();

async function getMoneyLaundering(){
  let moneyLaudering = [];

  try {
    const moneyLauderingList = await interpolScrapper.getMoneyLaundering();

    moneyLaudering = moneyLauderingList;

  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }

  const terrorists = await getTerroristDetail(moneyLaudering);

  return terrorists;
}


async function teste () {
 let moneyLauderingTerrosim = await getMoneyLaundering();
 console.log("Money Laudering terrorism = " + moneyLauderingTerrosim );
} 

teste()