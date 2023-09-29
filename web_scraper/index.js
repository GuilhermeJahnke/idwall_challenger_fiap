class WebScrapper {
  constructor(criminalsFBI, criminalsInterpol) {
    this.criminalsFBI = criminalsFBI;
    this.criminalsInterpol = criminalsInterpol;
    this.fbiScraper = new FbiScraper();
    this.interpolScraper = new InterpolScrap();
  }

  execute() {
    // RODAR FBI
    this.getData();
    this.filter();

    // RODAR Interpol
    this.getData();
    this.filter();
  }

  getData() {}

  filter(criminals) {
    // reomve duplicates
  }
}
