import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

export default async function getFbiTerrorists(pageSize) {
  try {
    const fbiScraper = new FbiScraper({ pageSize });
    const terroristModel = new Terrorist();

    const terrorists = await fbiScraper.getFbiTerrorists();

    return terrorists.map((x) => {
      x.sentence = ['Terrorist'];

      return terroristModel.fromFbiDetailJson(x);
    });
  } catch (error) {
    console.error('Erro ao buscar detalhe do terrorista:', error);
  }
}
