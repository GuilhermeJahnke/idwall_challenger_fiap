import getFinanceTerrorism from '../scrapers/interpol/get_finance_terrorism.js';
import getMoneyLaundering from '../scrapers/interpol/get_money_laundering.js';
import getSecuritiesFraud from '../scrapers/interpol/get_securities_fraud.js';
import getFbiTerrorists from '../scrapers/fbi/get_fbi_terrorist.js';
import getFraudCriminals from '../scrapers/fbi/get_fraud_criminals.js';

class WebScraper {
  constructor() {
    this.pageSize = 10;
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
    console.log('Collecting Interpol Data...');
    let financeTerrorism = await getFinanceTerrorism(this.pageSize);
    console.log(
      'Data sucessfully collected from Finance Terrorism, number of registers: ' +
        financeTerrorism.length,
    );
    let moneyLaundering = await getMoneyLaundering(this.pageSize);
    console.log(
      'Data sucessfully collected from Money Laundering, number of registers: ' +
        moneyLaundering.length,
    );
    let securitiesFraud = await getSecuritiesFraud(this.pageSize);
    console.log(
      'Data sucessfully collected from Securities Fraud, number of registers: ' +
        securitiesFraud.length,
    );

    return this.removeDuplicates([
      ...financeTerrorism,
      ...moneyLaundering,
      ...securitiesFraud,
    ]);
  }

  async getFBIdata() {
    console.log('Collecting FBI Data...');
    let fbiTerrorist = await getFbiTerrorists(this.pageSize);
    console.log(
      'Data sucessfully collected from terroris, number of registers: ' +
        fbiTerrorist.length,
    );
    let fraudCriminal = await getFraudCriminals(this.pageSize);
    console.log(
      'Data sucessfully collected from fraud criminals, number of registers: ' +
        fraudCriminal.length,
    );
    return this.removeDuplicates([...fbiTerrorist, ...fraudCriminal]);
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

  removeDuplicates(list) {
    return list.reduce((acc, cur) => {
      let indexFound = acc.findIndex((item) => cur.entityId === item.entityId);

      if (indexFound !== -1) {
        acc[indexFound].crimes.push(cur.crimes[0]);
        return acc;
      }
      acc.push(cur);
      return acc;
    }, []);
  }
}

export default WebScraper;
