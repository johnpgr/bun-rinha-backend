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
  nome: t.String({
    maxLength: 100,
    error: "Nome must be a string with a maximum of 100 characters",
  }),
  apelido: t.String({
    maxLength: 32,
    error: "Apelido must be a string with a maximum of 32 characters",
  }),
  nascimento: Nascimento,
  stack: t.Array(
    t.String({
      maxLength: 32,
      error:
        "Stack must be an array of strings with a maximum of 32 characters",
    }),
    {
      maxItems: 32,
      error: "Stack must be an array of strings with a maximum of 32 items",
    }
  ),
})

export type ICreatePessoaBody = typeof CreatePessoaBody.static
