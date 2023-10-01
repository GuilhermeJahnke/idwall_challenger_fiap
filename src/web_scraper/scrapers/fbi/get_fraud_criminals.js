import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

export default async function getFraudCriminals(pageSize) {
  try {
    const fbiScraper = new FbiScraper({ pageSize });
    const terroristModel = new Terrorist();
    const fraudCriminals = await fbiScraper.getFraudCriminals();

    return fraudCriminals.map((x) => {
      x.sentence = ['Bank Fraud'];

      return terroristModel.fromFbiDetailJson(x);
    });
  } catch (error) {
    console.error('Erro ao buscar Criminosos por fraudes:', error);
  }
}
