import InterpolScrap from '../../entities/interpol_scraper.js';
import getTerroristDetail from '../../utils/get_interpol_terrorist_detail.js';

export default async function getSecuritiesFraud(pageSize) {
  const interpolScrapper = new InterpolScrap({ pageSize });

  try {
    const securitiesFraudList = await interpolScrapper.searchTerrorist('Fraud');

    const terroristDetail = await getTerroristDetail(
      securitiesFraudList,
      'Securities Fraud',
    );

    return terroristDetail;
  } catch (error) {
    console.error('Erro ao buscar terroristas:', error);
  }
}
