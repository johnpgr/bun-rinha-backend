import { Elysia } from "elysia"
import { appContext } from "./context"
import { pessoasController } from "./pessoas/pessoa.controller"
import { selectPessoaCount } from "./pessoas/pessoas.queries"

export const appUrl = {
    hostname: "0.0.0.0",
    port: process.env.PORT || 9999,
    get full() {
        return `http://${this.hostname}:${this.port}`
    },
} as const

const appFactory = (_appContext: typeof appContext) =>
    new Elysia()
        .use(_appContext)
        .use(pessoasController)
        .get("/contagem-pessoas", async ({ db }) => {
            const [res] = await selectPessoaCount.run(undefined, db)
            return res?.count
        })

if (process.env.NODE_ENV !== "test") {
    const app = appFactory(appContext)

    app.listen(appUrl, (server) => console.log(`index.ts:${process.pid}: Server is running on ${appUrl.full}`))
}

export { appFactory }
