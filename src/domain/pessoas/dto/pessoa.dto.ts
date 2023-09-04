export interface IPessoaDto {
  id: string
  nome: string
  apelido: string
  stack: Array<string>
  nascimento: string
}

export class PessoaDto implements IPessoaDto {
  id: string
  nome: string
  apelido: string
  stack: Array<string>
  nascimento: string

  constructor(data: Omit<IPessoaDto, "stack"> & { stack: string | null }) {
    //@ts-expect-error this is correct
    data.stack = data.stack?.split(",") ?? []
    Object.assign(this, data)
  }
}
