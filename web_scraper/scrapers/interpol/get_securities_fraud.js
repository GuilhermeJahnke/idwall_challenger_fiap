import InterpolScrap from '../../entities/interpol_scraper.js';
import getTerroristDetail from '../../utils/get_interpol_terrorist_detail.js';

export default async function getSecuritiesFraud() {
  const interpolScrapper = new InterpolScrap();

  try {
    const securitiesFraudList = await interpolScrapper.searchTerrorist(
      'Securities Fraud',
    );

    const terroristDetail = await getTerroristDetail(securitiesFraudList);

    return terroristDetail;
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }
}

