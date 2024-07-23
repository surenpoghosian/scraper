import { v4 as uuid } from 'uuid';
import ScrapersFactory from './ScrapersFactory';
import ScrapableFactory from './ScrapableFactory';
import PathBuilderFactory from './PathBuilderFactory';
import { ListAmCategory, ListAmGeolocation, PathBuilderVariant, ScrapeValidatorVariant } from "./configs/types";
import { ScrapeableVariant, ScraperType, ScrapeType } from "./configs/types";
import { ListAmBaseURL } from './configs/constants';
import { sleep } from "./utils/sleep";
import ScrapeValidatorFactory from './ScrapeValidatorFactory';
import getRandomInterval from './utils/getRandomInterval';

class Main {
  run = async () => {
    const scraperFactory = ScrapersFactory;
    const scrapableFactory = ScrapableFactory;
    const pathBuilderFactory = PathBuilderFactory;
    const scrapeValidatorFactory = ScrapeValidatorFactory;

    const scraper = scraperFactory.createScraper(ScraperType.PUPPETTER);
    const validator = scrapeValidatorFactory.createScrapeValidator(ScrapeValidatorVariant.LISTAM);
    const scrapable = scrapableFactory.createScrapable(ScrapeableVariant.LISTAM, scraper, validator);
    const pathBuilder = pathBuilderFactory.createPathBuilder(PathBuilderVariant.LISTAM);

    pathBuilder.init('', ListAmCategory.ROOM_FOR_A_RENT);

    const scrapeId = uuid();

    for (let i = 1; true; i++) {
      pathBuilder.reset();
      pathBuilder.addPageNumber(i);
      pathBuilder.addGeolocation(ListAmGeolocation.YEREVAN);

      const finalPath = pathBuilder.build();
      console.log(`${ListAmBaseURL}${finalPath}`);

      await scrapable.scrape(scrapeId, finalPath, ScrapeType.LIST);

      const sleepInterval = getRandomInterval(4000, 10000);
      await sleep(sleepInterval);
    }
  }
};

// const main = new Main();
// main.run();

export default Main;
