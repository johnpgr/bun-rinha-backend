import { Elysia } from "elysia"
import { appContext } from "./context"
import { pessoasController } from "./domain/pessoas/controller/pessoa.controller"
import { sql } from "drizzle-orm"
import { schema } from "./database"

export const appUrl = {
  hostname: "0.0.0.0",
  port: "8080",
  get full() {
    return `http://${this.hostname}:${this.port}`
  },
} as const

const appFactory = (_appContext: typeof appContext) =>
  new Elysia()
    .use(_appContext)
    .use(pessoasController)
    .get("/health", () => ({ status: "ok", uptime: process.uptime() }))
    .get("/contagem-pessoas", async ({ db }) => {
      const [res] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(schema.pessoas)
      if (!res) {
        throw new Error("Não foi possível contar as pessoas")
      }
      return res.count
    })

if (process.env.NODE_ENV !== "test") {
  const app = appFactory(appContext)

  app.listen(appUrl, (server) =>
    console.log(
      `index.ts:${process.pid}: Server is running on ${server.hostname}:${server.port}`
    )
  )
}

export { appFactory }
