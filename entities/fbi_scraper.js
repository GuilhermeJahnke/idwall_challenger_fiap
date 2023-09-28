class FbiScraper {
    constructor() {
      this.baseUrl = 'https://api.fbi.gov/wanted/list?';
      this.pageSize = 160;
      this.person_classification = 'main';
    }
  
    async getFbiTerrorists() {
      const response = await fetch(
        this.baseUrl +
          new URLSearchParams({
            pageSize: this.pageSize,
            person_classification: this.person_classification,
            poster_classification: "terrorist",
          }),
      );
      const responseData = await response.json();
      return responseData.items;
    }
  
    async getFraudCriminals() {
      const response = await fetch(
        this.baseUrl +
          new URLSearchParams({
            pageSize: this.pageSize,
            person_classification: this.person_classification,
            poster_classification: "default",
          }),
      );
      const responseData = await response.json();
      const fraudCriminals = responseData.items.filter((item) =>
        item?.description?.match(/Bank Fraud/gi),
      );
      return fraudCriminals;
    }
}

export default FbiScraper;