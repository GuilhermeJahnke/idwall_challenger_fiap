// import InterpolScrap from "../../entities/interpol_scraper";
import InterpolScrap from '../../entities/interpol_scraper.js';
import getTerroristDetail from '../../utils/get_interpol_terrorist_detail.js';

async function getMoneyLaundering() {
  const interpolScrapper = new InterpolScrap();

  try {
    const moneyLauderingList = await interpolScrapper.searchTerrorist(
      'Money Laundering',
    );

    const terroristDetail = await getTerroristDetail(moneyLauderingList);

    return terroristDetail;
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }
}

async function teste() {
  let moneyLauderingTerrosim = await getMoneyLaundering();

  moneyLauderingTerrosim.forEach((item) => {
    console.log(item);
  });
}

teste();
