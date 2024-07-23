import { Scrapable } from "../../configs/types";
import { IScraper } from "../../configs/types";

export default class MobileCentre implements Scrapable {
  public scraper: IScraper;

  constructor(scraper: IScraper) {
    this.scraper = scraper;
  }

  scrape = async (path: string) => {
    throw new Error('Mobilecentre scrape is not implemented');
  };
};
