import { IScraper, IScrapeValidator, Scrapable, ScrapeType } from "../../configs/types";
import { ListAmBaseURL as baseUrl } from '../../configs/constants';

class ListAm implements Scrapable {
  private scraper: IScraper;
  private validator: IScrapeValidator;

  constructor(scraper: IScraper, validator: IScrapeValidator) {
    this.scraper = scraper;
    this.validator = validator;
  }

  scrape = async (scrapeId: string, path: string, scrapeType: ScrapeType) => {
    const html = await this.scraper.get(baseUrl, path);

    const data = this.scraper.parse(html);

    const isHtmlValid = this.validator.validate(data, scrapeType);

    if (isHtmlValid) {
      await this.scraper.save({ scrapeId, baseUrl, path, scrapeType, html });
    } else {
      console.error('scraped html is not valid');
    }

    const nextLinkExists = data.querySelectorAll('a').some(a => a.text.trim() === 'Հաջորդը >');

    if (!nextLinkExists) {
      throw new Error('...it was the last page');
    }

    // if (scrapeType === ScrapeType.ITEM) {
      // const price = data.querySelector('.xprice')?.rawText;
      // const description = data.querySelector('.body')?.rawText;

      // const otherDetails = data.querySelectorAll('.c')
      //   .map(item => {
      //     return {
      //       key: item.querySelector('.t')?.rawText,
      //       data: item.querySelector('.i')?.rawText,
      //     };
      //   })
      //   .filter(item => item.key !== undefined && item.data !== undefined) as { key: string; data: string }[];

      // await this.scraper.save({ scrapeId, baseUrl, path, scrapeType, html, price, description, otherDetails });

    // } else if (scrapeType === ScrapeType.LIST) {
    //   const parentDivs = data.querySelectorAll('.gl');

    //   if (!parentDivs.length) {
    //     throw new Error('Parent div not found');
    //   }

    //   const hrefs = parentDivs.map(item => item.querySelectorAll('a').map(link => link.getAttribute('href')));

    //   await this.scraper.save({ scrapeId, baseUrl, path, scrapeType, html, hrefs });
    // }
  };
};

export default ListAm;
