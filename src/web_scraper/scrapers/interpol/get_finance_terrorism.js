import InterpolScrap from '../../entities/interpol_scraper.js';
import getTerroristDetail from '../../utils/get_interpol_terrorist_detail.js';

export default async function getFinanceTerrorism(pageSize) {
  const interpolScrapper = new InterpolScrap({ pageSize });

  try {
    const financeTerroristList = await interpolScrapper.searchTerrorist(
      'financing of terrorism',
    );

    const terroristDetail = await getTerroristDetail(
      financeTerroristList,
      'Finance Terrorism',
    );

    return terroristDetail;
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }
}
