import { Elysia } from "elysia"
import { appContext } from "./context"
import { pessoasController } from "./domain/pessoas/controller/pessoa.controller"
import { contagemPessoas } from "./domain/pessoas/queries/pessoa.queries"

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
      const [res] = await contagemPessoas.run(undefined, db)
      return Number(res?.count)
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
