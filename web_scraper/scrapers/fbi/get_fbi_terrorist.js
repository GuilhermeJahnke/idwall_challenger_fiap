import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

const fbiScraper = new FbiScraper();
const terroristModel = new Terrorist();

export default async function getFbiTerrorists() {
  try {
    const terrorists = await fbiScraper.getFbiTerrorists();

    return terrorists.map((x) => terroristModel.fromFbiDetailJson(x));
  } catch (error) {
    console.error('Erro ao buscar detalhe do terrorista:', error);
  }
}

