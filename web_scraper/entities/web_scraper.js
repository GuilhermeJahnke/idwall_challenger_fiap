import getFinanceTerrorism from '../scrapers/interpol/get_finance_terrorism.js';
import getMoneyLaundering from '../scrapers/interpol/get_money_laundering.js';
import getSecuritiesFraud from '../scrapers/interpol/get_securities_fraud.js';
import getFbiTerrorists from '../scrapers/fbi/get_fbi_terrorist.js';
import getFraudCriminals from '../scrapers/fbi/get_fraud_criminals.js'

class WebScraper {
    constructor(criminalsList) {
      this.criminalsList = criminalsList;
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
  
      return [...fbiTerrorist, ...fraudCriminal];
    }
  
    filter(terroristList) {
      if(this.criminalsList == undefined || this.criminalsList == null) {
        this.criminalsList = [];
      }
  
      terroristList.forEach((newTerrorist) => {
        const index = this.criminalsList.findIndex(
          (oldTerrorist) => oldTerrorist.entityId === newTerrorist.entityId
        );
      
        if (index !== -1) {
          this.criminalsList[index] = newTerrorist;
        } else {
          this.criminalsList.push(newTerrorist);
        }
      }
      );
    }
}

export default WebScraper;