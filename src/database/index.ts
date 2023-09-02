import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
// import * as schema from "./schema";

const DB_URL =
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/postgres";

const connection = postgres(DB_URL, { max: 4 });

// const db = drizzle(connection, { schema, logger: true });

// export { db, schema };
