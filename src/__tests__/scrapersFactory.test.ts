import ScrapersFactory from '../ScrapersFactory';
import Https from '../ScrapersFactory/products/Https';
import https from 'https';
import Puppetter from '../ScrapersFactory/products/Puppetter';
import { ScraperType } from '../configs/types';

jest.mock('../db/MongoDBConnection', () => ({
  getInstance: jest.fn().mockResolvedValue({
    getDb: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        insertOne: jest.fn().mockResolvedValue({}),
      }),
    }),
  }),
}));

jest.mock('../db/MongoCRUD', () => {
  return jest.fn().mockImplementation(() => ({
    create: jest.fn().mockResolvedValue({}),
  }));
});

describe('ScrapersFactory', () => {
  it('should create an instance of Https scraper', () => {
    const scraper = ScrapersFactory.createScraper(ScraperType.HTTPS);
    expect(scraper).toBeInstanceOf(Https);
  });

  it('should create an instance of Puppetter scraper', () => {
    const scraper = ScrapersFactory.createScraper(ScraperType.PUPPETTER);
    expect(scraper).toBeInstanceOf(Puppetter);
  });

  it('should throw an error for unsupported scraper types', () => {
    expect(() => ScrapersFactory.createScraper('UNSUPPORTED_TYPE' as ScraperType))
      .toThrow('Unsupported scrape type: UNSUPPORTED_TYPE');
  });
});

describe('Https Scraper', () => {
  let httpsScraper: Https;

  beforeAll(() => {
    httpsScraper = new Https();
  });

  afterAll(() => {
    // Clean up any open handles, especially https requests
    https.globalAgent.destroy();
  });

  it('should get HTML content from a given URL', async () => {
    const mockHost = 'example.com';
    const mockPath = '/';
    const htmlContent = await httpsScraper.get(mockHost, mockPath);
    expect(htmlContent).toContain('<html>');
  });

  it('should parse HTML content correctly', () => {
    const mockHtml = '<html><body><h1>Test</h1></body></html>';
    const rootElement = httpsScraper.parse(mockHtml);
    expect(rootElement.querySelector('h1')?.textContent).toBe('Test');
  });

  it('should save data correctly in MongoDB', async () => {
    const mockData = { key: 'value' };
    const spySave = jest.spyOn(httpsScraper, 'save').mockImplementation(async () => {});

    await httpsScraper.save(mockData);
    expect(spySave).toHaveBeenCalledWith(mockData);
  });
});

describe('Puppetter Scraper', () => {
  let puppetterScraper: Puppetter;

  beforeAll(() => {
    puppetterScraper = new Puppetter();
  });

  it('should get HTML content from a given URL using Puppeteer', async () => {
    const mockHost = 'https://example.com';
    const mockPath = '/';
    const htmlContent = await puppetterScraper.get(mockHost, mockPath);
    expect(htmlContent).toContain('<html>');
  });

  it('should parse HTML content correctly', () => {
    const mockHtml = '<html><body><h1>Test</h1></body></html>';
    const rootElement = puppetterScraper.parse(mockHtml);
    expect(rootElement.querySelector('h1')?.textContent).toBe('Test');
  });

  it('should save data correctly in MongoDB', async () => {
    const mockData = { key: 'value' };
    const spySave = jest.spyOn(puppetterScraper, 'save').mockImplementation(async () => {});

    await puppetterScraper.save(mockData);
    expect(spySave).toHaveBeenCalledWith(mockData);
  });
});