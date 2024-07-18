import puppeteer from 'puppeteer';
import { parse, HTMLElement } from "node-html-parser";
import MongoCRUD from "../../db/MongoCRUD";
import MongoDBConnection from "../../db/MongoDBConnection";
import { IScraper } from "../../configs/types";
import { DB_COLLECTION_NAME } from "../../configs/constants";
import getDateTime from "../../utils/getDateTime";

class Puppetter implements IScraper {
  private mongoConnection: MongoDBConnection;

  constructor() {
    this.initializeMongoConnection();
  }

  private async initializeMongoConnection() {
    try {
      this.mongoConnection = await MongoDBConnection.getInstance();
    } catch (error) {
      console.error('Error initializing MongoDB connection:', error);
    }
  }

  get = async (host: string, path: string): Promise<string> => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(`${host}${path}`, { waitUntil: 'networkidle2' });
    // await page.waitForSelector('.right');
    // await page.click('.right');
  
    const dataBuffer = await page.content();

    await browser.close();
    return dataBuffer;
  };

  parse = (dataBuffer: string): HTMLElement => {
    return parse(dataBuffer);
  };

  save = async (data: any) => {
    try {
      const crud = new MongoCRUD<any>(this.mongoConnection.getDb(), DB_COLLECTION_NAME);
      const created_at = getDateTime();
  
      await crud.create({ data, created_at });
    } catch (error) {
      console.error('Error during save operation:', error);
    }
  };
}

export default Puppetter;