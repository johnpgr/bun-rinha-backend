import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const DB_URL =
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/rinhadb"

const connection = postgres(DB_URL)

const db = drizzle(connection, { schema })

export { db, schema }
