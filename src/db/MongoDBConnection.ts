import { MongoClient, Db } from 'mongodb';
import { DB_NAME, DB_URL } from '../configs/constants';

class MongoDBConnection {
  private static instance: MongoDBConnection;
  private client: MongoClient;
  private db: Db;

  private constructor() {
    this.client = new MongoClient(DB_URL);
  }

  public static async getInstance(): Promise<MongoDBConnection> {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection();
      await MongoDBConnection.instance.connect();
    }
    return MongoDBConnection.instance;
  }

  private async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DB_NAME);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  public getDb(): Db {
    if (!this.db) {
      throw new Error('Database not connected');
    }
    return this.db;
  }

  public async close() {
    await this.client.close();
  }
};

export default MongoDBConnection;
