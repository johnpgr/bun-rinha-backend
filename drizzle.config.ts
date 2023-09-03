import { Config } from "drizzle-kit"

export default {
  dbCredentials: {
    connectionString: process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/rinhadb",
  },
  driver: "pg",
  schema: "src/database/schema.ts",
  out: "src/database/migrations",
} satisfies Config
