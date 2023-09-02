import { Pool } from "pg";

export const db = new Pool({
  connectionString: process.env.DB_URL,
  min: 2,
  max: 4,
});

db.on("error", connect);
db.on("connect", () => console.log("Connected to database"));

export async function connect() {
  try {
    console.log("Connecting to database...");
    await db.connect();
  } catch (error) {
    setTimeout(() => {
      connect();
      console.error(
        `Error connecting to database: ${
          (error as Error).message
        }\n Retrying in 2 seconds...`
      );
    }, 2000);
  }
}
connect();
