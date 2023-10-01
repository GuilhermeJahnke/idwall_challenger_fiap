// import InterpolScrap from "../../entities/interpol_scraper";
import InterpolScrap from '../../entities/interpol_scraper.js';
import getTerroristDetail from '../../utils/get_interpol_terrorist_detail.js';

export default async function getMoneyLaundering(pageSize) {
  const interpolScrapper = new InterpolScrap({ pageSize });

  try {
    const moneyLauderingList = await interpolScrapper.searchTerrorist(
      'Money Laundering',
    );

    const terroristDetail = await getTerroristDetail(
      moneyLauderingList,
      'Money Laudering',
    );

    return terroristDetail;
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }
}
