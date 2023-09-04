import {
  FailedInsertError,
  ResourceNotFoundError,
  ValidationError,
  ValueConflictError,
} from "@/shared/error-responses"
import type { AppContext } from "@/context"
import { schema } from "@/database"
import { PessoaDto } from "@/domain/pessoas/dto/pessoa.dto"
import { asyncTryInto } from "@/utils"
import pg from "postgres"
import { eq, like } from "drizzle-orm"
import { t } from "elysia"
import { CreatePessoaBody } from "../validation/create-pessoa"
import { PessoaInsertModel } from "@/database/schema"

export const pessoasController = (app: AppContext) => {
  return app.group("/pessoas", (group) =>
    group
      .get(
        "/",
        async ({ db, query }) => {
          const termo = query.t.toLowerCase()

          const pessoas = await db
            .select({
              id: schema.pessoas.id,
              nome: schema.pessoas.nome,
              apelido: schema.pessoas.apelido,
              nascimento: schema.pessoas.nascimento,
              stack: schema.pessoas.stack,
            })
            .from(schema.pessoas)
            .where(like(schema.pessoas.buscaTrgm, `%${termo}%`))
            .limit(50)

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
      .get("/:id", async ({ db, params }) => {
        const [pessoa] = await db
          .select({
            id: schema.pessoas.id,
            nome: schema.pessoas.nome,
            apelido: schema.pessoas.apelido,
            nascimento: schema.pessoas.nascimento,
            stack: schema.pessoas.stack,
          })
          .from(schema.pessoas)
          .where(eq(schema.pessoas.id, params.id))

        if (!pessoa) {
          return new ResourceNotFoundError(
            `Pessoa with id '${params.id}' not found`
          )
        }
        return new PessoaDto(pessoa)
      })
      .post(
        "/",
        async ({ db, set, body }) => {
          const pessoa = body as unknown as PessoaInsertModel
          pessoa.stack = body.stack.join(",")

          const result = await asyncTryInto(
            db
              .insert(schema.pessoas)
              .values(pessoa)
              .returning({ id: schema.pessoas.id }).execute
          )

          if (!result.success) {
            if (result.error instanceof pg.PostgresError) {
              if (result.error.message.startsWith("duplicate key")) {
                return new ValueConflictError(
                  `Pessoa with apelido '${pessoa.apelido}' already exists`
                )
              }
            }
            return new FailedInsertError(result.error.message)
          }

          set.headers["Location"] = `/pessoas/${result.data[0]!.id}`
          const inserted = result.data[0]! as { id: string }

          return inserted
        },
        {
          body: CreatePessoaBody,
        }
      )
  )
}
