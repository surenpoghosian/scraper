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

    const nextLinkExists = data.querySelectorAll('a').some(a => {
      const text = a.text.trim();
      return text === 'Հաջորդը >' || text === 'Next >' || text === 'Следующая >';
  });

    if (!nextLinkExists) {
      throw new Error('...it was the last page');
    }
  };
};

export default ListAm;
