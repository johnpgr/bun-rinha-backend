import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const DB_URL = process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/rinhadb"

const connection = postgres(DB_URL, { max: 4 })

const db = drizzle(connection, { schema, logger: process.env.NODE_ENV === "development" })

export { db, schema }
