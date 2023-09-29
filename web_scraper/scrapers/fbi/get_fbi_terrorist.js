import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

const fbiScraper = new FbiScraper();
const terroristModel = new Terrorist();

async function getFbiTerrorists() {
  try {
    const terrorists = await fbiScraper.getFbiTerrorists();

    return terrorists.map((x) => terroristModel.fromFbiDetailJson(x));
  } catch (error) {
    console.error('Erro ao buscar detalhe do terrorista:', error);
  }
}

async function teste() {
  let fbiTerrorist = await getFbiTerrorists();

  fbiTerrorist.forEach((x) => console.log(x));
}

teste();
