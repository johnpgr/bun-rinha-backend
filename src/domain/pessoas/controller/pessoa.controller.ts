import type { AppContext } from "@/context"
import { tryCatch } from "@/utils"
import { CreatePessoaBody } from "../types/create-pessoa"
import {
  insertPessoa,
  selectPessoaById,
  selectPessoaByTermo,
} from "../queries/pessoas.queries"

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
        const termo = ctx.query["t"]
        if (!termo) {
          ctx.set.status = 400
          return
        }

        const pessoas = await selectPessoaByTermo.run(
          {
            termo: `%${(termo as string).toLowerCase()}%`,
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
        const [pessoa] = await selectPessoaById.run(
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
        pessoa.stack = pessoa.stack?.split(",") ?? []

        return pessoa
      })
      .post("/", async (ctx) => {
        const pessoa = ctx.body as CreatePessoaBody

        // @ts-expect-error ok
        pessoa.stack = Array.isArray(pessoa.stack)
          ? pessoa.stack.join(",")
          : null

        const result = await tryCatch(() =>
          //@ts-expect-error ok
          insertPessoa.run(pessoa, ctx.db)
        )

        if (!result.success) {
          ctx.set.status = 400
          return
        }

        const [insert] = result.data

        if (!insert) {
          ctx.set.status = 422
          return
        }

        ctx.set.headers["Location"] = `/pessoas/${insert.id}`
        ctx.set.status = 201

        return insert.id
      })
  )
}
