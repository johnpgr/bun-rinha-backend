import { Elysia } from "elysia"
import { appContext } from "./context"
import { pessoasController } from "./pessoas/controller/pessoa.controller"

export const appUrl = {
  hostname: "0.0.0.0",
  port: "8080",
  get full() {
    return `http://${this.hostname}:${this.port}`
  },
} as const

const appFactory = (_appContext: typeof appContext) =>
  new Elysia()
    .get("/", () => "Hello World!")
    .get("/health", () => ({ status: "ok", uptime: process.uptime() }))
    .use(_appContext)
    .use(pessoasController)

if (process.env.NODE_ENV !== "test") {
  const app = appFactory(appContext)

  app.listen(appUrl, (server) =>
    console.log(`index.ts:${process.pid}: Server is running on ${server.hostname}:${server.port}`)
  )
}

export { appFactory }
