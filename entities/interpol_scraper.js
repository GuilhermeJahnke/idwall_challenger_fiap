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
}

export default InterpolScrap;
