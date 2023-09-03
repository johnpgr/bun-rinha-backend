import { FailedInsertError, ResourceNotFoundError, ValidationError, ValueConflictError } from "../../shared/responses"
import type { AppContext } from "../../context"
import { schema } from "../../database"
import { parsePessoaDto } from "../dto/pessoa.dto"
import { asyncTryInto } from "../../utils"
import pg from "postgres"

export const pessoasController = (app: AppContext) =>
  app.group("/pessoas", (group) =>
    group
      .get("/:id", async ({ db, params, set }) => {
        const pessoas = await db.query.pessoas.findFirst({
          columns: {
            id: true,
            nome: true,
            apelido: true,
            nascimento: true,
            stack: true,
          },
          where: (pessoa, { eq }) => eq(pessoa.id, params.id),
        })

        if (!pessoas) {
          set.status = 404
          return new ResourceNotFoundError(`Pessoa with id '${params.id}' not found`)
        }

        return {
          ...pessoas,
          stack: pessoas.stack?.split(",") ?? [],
        }
      })
      .post("/", async ({ db, body, set, request }) => {
        const pessoa = parsePessoaDto(body)
        if (!pessoa.success) {
          set.status = 400
          return new ValidationError("Failed to parse pessoa", pessoa.errors)
        }

        const result = await asyncTryInto(
          db
            .insert(schema.pessoas)
            .values({ ...pessoa.data, stack: pessoa.data.stack?.join(",") })
            .returning({ id: schema.pessoas.id }).execute
        )

        if (!result.success) {
          if (result.error instanceof pg.PostgresError) {
            if (result.error.message.startsWith("duplicate key")) {
              set.status = 409
              return new ValueConflictError(`Pessoa with apelido '${pessoa.data.apelido}' already exists`)
            }
          }
          set.status = 500
          return new FailedInsertError("Failed to insert pessoa")
        }

        const [inserted] = result.data
        set.headers["Location"] = `/pessoas/${inserted?.id}`
        set.status = 201

        return inserted
      })
  )
