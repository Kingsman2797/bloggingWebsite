import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "lowkeykaushiki";

let cachedClient: MongoClient | null = null;
let cachedConnect: Promise<MongoClient> | null = null;

export function hasMongoConfig() {
  return Boolean(uri);
}

export async function getDb() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI");
  }

  if (!cachedClient || !cachedConnect) {
    cachedClient = new MongoClient(uri, {
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnect = cachedClient.connect().catch((error) => {
      cachedClient = null;
      cachedConnect = null;
      throw error;
    });
  }

  await cachedConnect;
  return cachedClient.db(dbName);
}
