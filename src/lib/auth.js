import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI, {
  useNewUrlParser: true, // This option is no longer necessary in the latest versions of the MongoDB Node.js driver, but it's included here for compatibility.
  useUnifiedTopology: true,
});

await client.connect();
const db = client.db(process.env.AUTH_DB_NAME || "defaultAuthDB");

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
});