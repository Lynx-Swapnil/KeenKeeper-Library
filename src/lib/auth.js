import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const authBaseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const mongoUri = process.env.MONGODB_URI;
const mongoDatabase = process.env.MONGODB_DB || "online-book-borrowing-platform";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!mongoUri) {
  throw new Error("Missing MONGODB_URI environment variable.");
}

const mongoClient = new MongoClient(mongoUri);
const mongoClientPromise = mongoClient.connect();

const socialProviders = {};

if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

export const auth = betterAuth({
  baseURL: authBaseUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(
    mongoClient.db(mongoDatabase),
    {
      client: mongoClient,
      transaction: false,
    }
  ),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
});

export async function getAuthMongoClient() {
  return mongoClientPromise;
}
