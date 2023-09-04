import type { sql as _sql } from "@pgtyped/runtime"
import postgres from "postgres"

type IDatabaseConnection = Parameters<ReturnType<typeof _sql>["run"]>[1]

export const sql = postgres(
  process.env.DB_URL || "postgres://postgres:postgres@localhost:5432/rinhadb",
  {
    max: 100,
    idle_timeout: 0,
    connect_timeout: 10,
  }
)

export const db: IDatabaseConnection = {
  query: async (query, bindings) => {
    const rows = await sql.unsafe(query, bindings)
    return { rows }
  },
}
