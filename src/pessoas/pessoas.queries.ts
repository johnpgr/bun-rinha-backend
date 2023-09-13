import { sql } from "@pgtyped/runtime"
import {
    IInsertPessoaQuery,
    ISelectPessoaByIdQuery,
    ISelectPessoaByTermoQuery,
    ISelectPessoaCountQuery,
} from "./pessoas.queries.types"

export const insertPessoa = sql<IInsertPessoaQuery>`
  INSERT INTO pessoas (id,nome,apelido,nascimento,stack)
  VALUES ($id, $nome, $apelido, $nascimento, $stack)
  RETURNING id`

export const selectPessoaById = sql<ISelectPessoaByIdQuery>`
  SELECT id, nome, apelido, nascimento, stack
  FROM pessoas WHERE id = $id`

export const selectPessoaByTermo = sql<ISelectPessoaByTermoQuery>`
  SELECT id, nome, apelido, nascimento, stack
  FROM pessoas
  WHERE busca_trgm
  LIKE $termo
  LIMIT 50`

export const selectPessoaCount = sql<ISelectPessoaCountQuery>`
  SELECT COUNT(*)
  FROM pessoas`
