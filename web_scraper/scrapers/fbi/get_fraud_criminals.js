import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

const fbiScraper = new FbiScraper();
const terroristModel = new Terrorist();

export default async function getFraudCriminals() {
  try {
    const fraudCriminals = await fbiScraper.getFraudCriminals();

    return fraudCriminals.map((x) => terroristModel.fromFbiDetailJson(x));
  } catch (error) {
    console.error('Erro ao buscar Criminosos por fraudes:', error);
  }
}

