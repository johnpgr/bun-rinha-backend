import {
  ICreatePessoaParams,
  IFindPessoaByIdResult,
} from "../queries/pessoa.queries.types"
import { ICreatePessoaBody } from "../validation/create-pessoa"

export class PessoaModel implements IFindPessoaByIdResult {
  id = crypto.randomUUID()
  apelido: string
  nascimento: string
  nome: string
  stack: string | null

  constructor(pessoa: ICreatePessoaBody) {
    //@ts-expect-error ok
    pessoa.stack = pessoa.stack.join(",")
    Object.assign(this, pessoa)
  }
}
