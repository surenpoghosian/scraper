import { HTMLElement } from "node-html-parser";
import { ScrapeType, IScrapeValidator } from "../../configs/types";

class MobileCentre implements IScrapeValidator {

  validate(html: HTMLElement, scrapeType: ScrapeType): boolean {
    throw new Error('function not implemented')
  };
}

export default MobileCentre;
