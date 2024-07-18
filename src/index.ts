import { v4 as uuid } from 'uuid';
import ScrapersFactory from './ScrapersFactory';
import ScrapableFactory from './ScrapableFactory';
import PathBuilderFactory from './PathBuilderFactory';
import { ListAmCategory, ListAmGeolocation, PathBuilderVariant } from "./configs/types";
import { ScrapeableVariant, ScraperType, ScrapeType } from "./configs/types";
import { ListAmBaseURL } from './configs/constants';
import { sleep } from "./utils/sleep";

class Main {
  run = async () => {
    const scraperFactory = ScrapersFactory;
    const scrapableFactory = ScrapableFactory;
    const pathBuilderFactory = PathBuilderFactory;

    const scraper = scraperFactory.createScraper(ScraperType.PUPPETTER);
    const scrapable = scrapableFactory.createScrapable(ScrapeableVariant.LISTAM, scraper);
    const pathBuilder = pathBuilderFactory.createPathBuilder(PathBuilderVariant.LISTAM);

    pathBuilder.init('', ListAmCategory.ROOM_FOR_A_RENT);
  
    const scrapeId = uuid();
  
    for (let i = 1; i < 10; i++) {
      pathBuilder.reset();
      pathBuilder.addPageNumber(i);
      pathBuilder.addGeolocation(ListAmGeolocation.YEREVAN);
  
      const finalPath = pathBuilder.build();
      console.log(`${ListAmBaseURL}${finalPath}`)

      await scrapable.scrape(scrapeId, finalPath, ScrapeType.LIST);
      await sleep(4000);
    }
  }
};

const main = new Main();
main.run();