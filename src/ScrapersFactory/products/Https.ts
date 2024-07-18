import { parse, HTMLElement } from "node-html-parser";
import https from "https";
import MongoCRUD from "../../db/MongoCRUD";
import MongoDBConnection from "../../db/MongoDBConnection";
import { IScraper } from "../../configs/types";
import { DB_COLLECTION_NAME } from "../../configs/constants";
import getDateTime from "../../utils/getDateTime";

class Https implements IScraper {
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
    let dataBuffer = '';

    const options = {
      hostname: host,
      path: path,
      headers: { 'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" },
    };

    return new Promise((resolve, reject) => {
      const req = https.get(options, (res) => {
  
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          dataBuffer += chunk;
        });
  
        res.on('end', () => {
          resolve(dataBuffer);
        });
  
        res.on('error', (err) => {
          reject(err);
        });
      });
  
      req.on('error', (err) => {
        reject(err);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timed out'));
      });

      req.setTimeout(5000);

      req.end();
    });
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

export default Https;
