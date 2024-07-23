import { HTMLElement } from "node-html-parser";
import { ScrapeType, IScrapeValidator } from "../../configs/types";

class ListAm implements IScrapeValidator {

  validate(html: HTMLElement, scrapeType: ScrapeType): boolean {
    console.log(`Validating scrape...`);

    switch (scrapeType) {
      case ScrapeType.ITEM:
        throw new Error('ScrapeType.ITEM validator logic is not implemented!');
      case ScrapeType.LIST:
        const parentDivs = html.querySelectorAll('.gl');
        if (!parentDivs.length) {
          return false;
        }    
        break;
      default:
        break;
    }

    console.log('HTML is valid');
    return true;
  };
}

export default ListAm;
