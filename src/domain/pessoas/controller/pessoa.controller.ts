import {
  FailedInsertError,
  ResourceNotFoundError,
  ValidationError,
  UnknownError,
} from "@/shared/error-responses"
import type { AppContext } from "@/context"
import { PessoaDto } from "@/domain/pessoas/dto/pessoa.dto"
import { tryCatch } from "@/utils"
import pg from "postgres"
import { t } from "elysia"
import { CreatePessoaBody } from "../validation/create-pessoa"
import {
  createPessoa,
  findPessoaById,
  findPessoaByTermo,
} from "../queries/pessoa.queries"
import { PessoaModel } from "../model/pessoa.model"

export const pessoasController = (app: AppContext) => {
  return app.group("/pessoas", (group) =>
    group
      .get(
        "/",
        async ({ db, query }) => {
          const termo = query.t.toLowerCase()

          const pessoas = await findPessoaByTermo.run(
            {
              termo: `%${termo}%`,
            },
            db
          )

          return pessoas.map((pessoa) => new PessoaDto(pessoa))
        },
        {
          query: t.Object({
            t: t.String(),
          }),
          error: (e) => {
            if (e.code === "VALIDATION") {
              return new ValidationError(
                "Missing query parameter (termo de busca)"
              )
            }
            return e
          },
        }
      )
      .get("/:id", async ({ db, params, set }) => {
        const [pessoa] = await findPessoaById.run(
          {
            id: params.id,
          },
          db
        )

        if (!pessoa) {
          set.status = 404
          return new ResourceNotFoundError(
            `Pessoa with id '${params.id}' not found`
          )
        }
        return new PessoaDto(pessoa)
      })
      .post(
        "/",
        async ({ db, set, body }) => {
          const pessoa = new PessoaModel(body)

          const result = await tryCatch(() => createPessoa.run(pessoa, db))

          if (!result.success) {
            if (result.error instanceof pg.PostgresError) {
              set.status = 422
              return new FailedInsertError(result.error.message)
            }
            set.status = 500
            return new UnknownError(result.error.message)
          }

          set.headers["Location"] = `/pessoas/${result.data[0]!.id}`
          set.status = 201

          const inserted = result.data[0]
          return inserted
        },
        {
          body: CreatePessoaBody,
          error: (e) => {
            if (e.code === "VALIDATION") {
              return new ValidationError(e.error.message)
            }
            return new UnknownError(e.error.message)
          },
        }
      )
  )
}
