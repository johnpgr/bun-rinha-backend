import { t } from "elysia"

/**
 * @example "2021-01-01"
 */
const Nascimento = t.String({
  format: "date",
  minLength: 10,
  maxLength: 10,
  error: "Nascimento must be a string in the format 'YYYY-MM-DD'",
})

export const CreatePessoaBody = t.Object({
  nome: t.String({ maxLength: 100 }),
  apelido: t.String({ maxLength: 32 }),
  nascimento: Nascimento,
  stack: t.Array(t.String({ maxLength: 32 }), { maxItems: 32 }),
})
