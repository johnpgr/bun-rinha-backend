import typia, { tags } from "typia"

/**
 * @example "2021-01-01"
 */
type Nascimento = string & tags.Pattern<"^[0-9]{4}-[0-9]{2}-[0-9]{2}$"> & tags.MaxLength<10>

export interface PessoaDto {
  id: string
  nome: string
  apelido: string
  stack: Array<string>
  nascimento: string
}

export interface PessoaInsertDto {
  nome: string & tags.MaxLength<100>
  apelido: string & tags.MaxLength<32>
  nascimento: Nascimento
  stack: Array<string & tags.MaxLength<32>> & tags.MaxItems<32>
}

export const parsePessoaDto = typia.createValidate<PessoaInsertDto>()
