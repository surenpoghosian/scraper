import { Db, Collection, Filter, OptionalId, OptionalUnlessRequiredId, WithId } from 'mongodb';

class MongoCRUD<T> {
  private db: Db;
  private collection: Collection<T>;

  constructor(db: Db, collectionName: string) {
    this.db = db;
    this.collection = this.db.collection<T>(collectionName);
  }

  async create(document: OptionalId<T>): Promise<void> {
    await this.collection.insertOne(document as OptionalUnlessRequiredId<T>);
  }

  async read(query: Filter<T>): Promise<T[]> {
    const result = await this.collection.find(query).toArray();
    return result.map(doc => this.stripId(doc));
  }

  async update(query: Filter<T>, update: Partial<T>): Promise<void> {
    await this.collection.updateOne(query, { $set: update });
  }

  async delete(query: Filter<T>): Promise<void> {
    await this.collection.deleteOne(query);
  }

  private stripId(doc: WithId<T>): T {
    const { _id, ...rest } = doc;
    return rest as T;
  }
};

export default MongoCRUD;
