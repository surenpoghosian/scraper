import { ScraperType } from "../configs/types";
import Https from "./products/Https";
import Puppetter from "./products/Puppetter";

class ScrapersFactory {
  static createScraper(type: ScraperType) {
    switch (type) {
      case ScraperType.HTTPS:
        return new Https();
      case ScraperType.PUPPETTER:
        return new Puppetter();
      default:
        throw new Error(`Unsupported scrape type: ${type}`);
    }
  }
};

export default ScrapersFactory;
