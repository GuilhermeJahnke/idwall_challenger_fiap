import getFinanceTerrorism from '../scrapers/interpol/get_finance_terrorism.js';
import getMoneyLaundering from '../scrapers/interpol/get_money_laundering.js';
import getSecuritiesFraud from '../scrapers/interpol/get_securities_fraud.js';
import getFbiTerrorists from '../scrapers/fbi/get_fbi_terrorist.js';
import getFraudCriminals from '../scrapers/fbi/get_fraud_criminals.js';

class WebScraper {
  constructor() {
    this.criminalsList = [];
  }

  async execute() {
    let fbiTerrorists = await this.getFBIdata();
    this.filter(fbiTerrorists);

    let interpolTerrorists = await this.getInterpolData();
    this.filter(interpolTerrorists);

    return this.criminalsList;
  }

  async getInterpolData() {
    let financeTerrorism = await getFinanceTerrorism();
    let moneyLaundering = await getMoneyLaundering();
    let securitiesFraud = await getSecuritiesFraud();

    return [...financeTerrorism, ...moneyLaundering, ...securitiesFraud];
  }

  async getFBIdata() {
    let fbiTerrorist = await getFbiTerrorists();
    let fraudCriminal = await getFraudCriminals();

    return [...fbiTerrorist, ...fraudCriminal].reduce((acc, cur) => {
      let indexFound = acc.findIndex((item) => cur.entityId === item.entityId);

      if (indexFound !== -1) {
        acc[indexFound].crimes.push(cur.crimes[0]);
        return acc;
      }
      acc.push(cur);
      return acc;
    }, []);
  }

  filter(terroristList) {
    terroristList.forEach((newTerrorist) => {
      const index = this.criminalsList.findIndex(
        (oldTerrorist) => oldTerrorist.entityId === newTerrorist.entityId,
      );

      if (index === -1) {
        this.criminalsList.push(newTerrorist);
        return;
      }

      this.criminalsList[index] = newTerrorist;
    });
  }
}

export default WebScraper;
