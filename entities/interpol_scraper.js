class InterpolScrap {
  constructor() {
    this.baseUrl = "https://ws-public.interpol.int/notices/v1/red?";
    this.resultPerPage = 160;
  }

  async searchTerrorist(filter) {
    const response = await fetch(
      this.baseUrl +
        new URLSearchParams({
          freeText: filter,
          resultPerPage: this.resultPerPage,
        })
    );

    const responseData = await response.json();
    const noticies = responseData._embedded.notices;

    return noticies;
  }

  async getMoneyLaundering() {
    const reponse = await this.searchTerrorist("Money Laundering");

    return reponse;
  }

  async getSecuritiesFraud() {
    const response = await this.searchTerrorist("Securities Fraud");

    return response;
  }
}

export default InterpolScrap;
