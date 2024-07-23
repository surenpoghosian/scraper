import ListAm from "./products/ListAm";
import MobileCentre from "./products/MobileCentre";
import { ScrapeValidatorVariant } from "../configs/types";

class ScrapeValidatorFactory {
  static createScrapeValidator(type: ScrapeValidatorVariant) {
    switch (type) {
      case ScrapeValidatorVariant.LISTAM:
        return new ListAm();
      case ScrapeValidatorVariant.MOBILECENTRE:
        return new MobileCentre();
      default:
        throw new Error(`Unsupported scrape type: ${type}`);
    }
  }
};

export default ScrapeValidatorFactory;
