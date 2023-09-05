import type { AppContext } from "@/context"
import { tryCatch } from "@/utils"
import pg from "postgres"
import { parsePessoaBody } from "../validation/create-pessoa"
import {
  createPessoa,
  findPessoaById,
  findPessoaByTermo,
} from "../queries/pessoa.queries"

/**
 * Why all the ts-expect-error ?
 * Because we are mutating the objects in place to optimize for less object creation.
 * Meaning less GC calls and increased performance
 * Why no error responses ?
 * It's not needed for this app. The status code is enough.
 */
export const pessoasController = (app: AppContext) => {
  return app.group("/pessoas", (group) =>
    group
      .get("/", async (ctx) => {
        if (typeof ctx.query["t"] !== "string") {
          ctx.set.status = 400
          return
        }

        const termo = ctx.query["t"].toLowerCase()

        const pessoas = await findPessoaByTermo.run(
          {
            termo: `%${termo}%`,
          },
          ctx.db
        )

        for (const pessoa of pessoas) {
          //@ts-expect-error ok
          pessoa.stack = pessoa.stack?.split(",") ?? []
        }

        return pessoas
      })
      .get("/:id", async (ctx) => {
        const [pessoa] = await findPessoaById.run(
          {
            id: ctx.params.id,
          },
          ctx.db
        )

        if (!pessoa) {
          ctx.set.status = 404
          return
        }

        //@ts-expect-error ok
        pessoa.stack = pessoa?.stack?.split(",") ?? []

        return pessoa
      })
      .post("/", async (ctx) => {
        const pessoa = parsePessoaBody(ctx.body)

        if (!pessoa.success) {
          ctx.set.status = 400
          return
        }

        //@ts-expect-error ok
        pessoa.data.stack = pessoa.data.stack.join(",")
        //@ts-expect-error ok
        pessoa.data.id = crypto.randomUUID()

        const result = await tryCatch(() =>
          //@ts-expect-error ok
          createPessoa.run(pessoa.data, ctx.db)
        )

        if (!result.success) {
          if (result.error instanceof pg.PostgresError) {
            ctx.set.status = 422
            return
          }
          ctx.set.status = 500
          return
        }

        const insertedId = result.data[0]?.id

        ctx.set.headers["Location"] = `/pessoas/${insertedId}`
        ctx.set.status = 201

        return insertedId
      })
      .onError((e) => console.error(e))
  )
}
