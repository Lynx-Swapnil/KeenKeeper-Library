import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "online-book-borrowing-platform";

let cachedClientPromise;

function getClientPromise() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable. Set it in Vercel project settings or .env.local");
  }
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
  }

  return cachedClientPromise;
}

export async function getCollection(collectionName) {
  const client = await getClientPromise();
  return client.db(databaseName).collection(collectionName);
}
