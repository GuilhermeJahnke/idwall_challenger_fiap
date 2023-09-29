import FbiScraper from '../../entities/fbi_scraper.js';
import Terrorist from '../../entities/terrorist.js';

const fbiScraper = new FbiScraper();
const terroristModel = new Terrorist();

async function getFraudCriminals() {
  try {
    const fraudCriminals = await fbiScraper.getFraudCriminals();

    return fraudCriminals.map((x) => terroristModel.fromFbiDetailJson(x));
  } catch (error) {
    console.error('Erro ao buscar Criminosos por fraudes:', error);
  }
}

async function teste() {
  let fbiTerrorist = await getFraudCriminals();

  fbiTerrorist.forEach((x) => console.log(x));
}

teste();
