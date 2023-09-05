import { tags, createValidate } from "typia"

interface CreatePessoaBody {
  nome: string & tags.MaxLength<100>
  apelido: string & tags.MaxLength<32>
  nascimento: string &
    tags.Format<"date"> &
    tags.MinLength<10> &
    tags.MaxLength<10>
  stack: Array<string & tags.MaxLength<32>> & tags.MaxItems<32>
}

export const parsePessoaBody = createValidate<CreatePessoaBody>()
