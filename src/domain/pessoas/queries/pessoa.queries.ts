import { sql } from "@pgtyped/runtime"
import {
  IContagemPessoasQuery,
  ICreatePessoaQuery,
  IFindPessoaByIdQuery,
  IFindPessoaByTermoQuery,
} from "./pessoa.queries.types"

export const createPessoa = sql<ICreatePessoaQuery>`INSERT INTO pessoas (id,nome,apelido,nascimento,stack) VALUES ($id, $nome, $apelido, $nascimento, $stack) RETURNING id`
export const findPessoaById = sql<IFindPessoaByIdQuery>`SELECT id, nome, apelido, nascimento, stack FROM pessoas WHERE id = $id`
export const findPessoaByTermo = sql<IFindPessoaByTermoQuery>`SELECT id, nome, apelido, nascimento, stack FROM pessoas WHERE busca_trgm LIKE $termo LIMIT 50`
export const contagemPessoas = sql<IContagemPessoasQuery>`SELECT COUNT(*) FROM pessoas`
