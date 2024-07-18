import { v4 as uuid } from 'uuid';
import { ScrapeResourceType, ScrapeType } from "../configs/types";
import ScrapebleFactory from "../ScrapableFactory";
import { ListAmCategory, ListAmGeolocation, ListAmSellerType } from "../configs/types";
import ListAmPathBuilder from "../PathBuilderFactory/products/ListAm";

test ('scrapes list.am successfully', async () => {
  const scrapeId = uuid();
  const factory = ScrapebleFactory;
  const scrapable = factory.createScrapable(ScrapeResourceType.LISTAM);
  const pathBuilder = new ListAmPathBuilder('', ListAmCategory.ROOM_FOR_A_RENT);

  pathBuilder.addGeolocation(ListAmGeolocation.QANAQER_ZEYTUN);
  pathBuilder.addSellerType(ListAmSellerType.INDIVIDUAL);

  const finalPath = pathBuilder.build();

  await scrapable.scrape(scrapeId, finalPath, ScrapeType.LIST);

  // await scrapable.scrape('/item/20823198', ScrapeType.ITEM);
});
