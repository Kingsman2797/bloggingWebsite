import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "lowkeykaushiki";

let cachedClient: MongoClient | null = null;

export function hasMongoConfig() {
  return Boolean(uri);
}

export async function getDb() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }

  if (!cachedClient) {
    cachedClient = new MongoClient(uri);
    await cachedClient.connect();
  }

  return cachedClient.db(dbName);
}
