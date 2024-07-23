import ListAm from "./products/ListAm";
import MobileCentre from "./products/MobileCentre";
import { IScraper, IScrapeValidator, ScrapeableVariant } from "../configs/types";

class ScrapableFactory {
  static createScrapable(type: ScrapeableVariant, scraper: IScraper, validator: IScrapeValidator) {
    switch (type) {
      case ScrapeableVariant.LISTAM:
        return new ListAm(scraper, validator);
      case ScrapeableVariant.MOBILECENTRE:
        return new MobileCentre(scraper);
      default:
        throw new Error(`Unsupported scrape type: ${type}`);
    }
  }
};

export default ScrapableFactory;
