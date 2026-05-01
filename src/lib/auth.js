import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const authBaseUrl = process.env.BETTER_AUTH_URL || "http://localhost:3000";
const mongoUri = process.env.MONGODB_URI;
const mongoDatabase = process.env.MONGODB_DB || "online-book-borrowing-platform";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

// Only initialize MongoDB if URI is available
let mongoClient;
let mongoClientPromise;

if (mongoUri) {
  mongoClient = new MongoClient(mongoUri);
  mongoClientPromise = mongoClient.connect();
}

const socialProviders = {};

if (googleClientId && googleClientSecret) {
  socialProviders.google = {
    clientId: googleClientId,
    clientSecret: googleClientSecret,
  };
}

const authConfig = {
  baseURL: authBaseUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders,
};

if (mongoClient) {
  authConfig.database = mongodbAdapter(
    mongoClient.db(mongoDatabase),
    {
      client: mongoClient,
      transaction: false,
    }
  );
}

export const auth = betterAuth(authConfig);

export async function getAuthMongoClient() {
  if (!mongoClientPromise) {
    throw new Error("MongoDB client not initialized. Set MONGODB_URI environment variable.");
  }
  return mongoClientPromise;
}
