import WebScraper from './entities/web_scraper.js';

async function get() {
  // this is a mock data, substitute it with the data from the database
  let webScrapper = new WebScraper();

  // This function is used to retrieve a list of all terrorists from the FBI and Interpol
  // It already filters the IDs of terrorists that exist in the database and updates if there is a repeat
  let terrorists = await webScrapper.execute();

  terrorists.forEach((x) => console.log(x));
}

get();
