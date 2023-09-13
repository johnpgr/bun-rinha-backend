import { Err, Ok, Result } from "@/utils"
import { tags, createValidate } from "typia"

export interface IPessoaDto {
    id?: string
    nome: string & tags.MaxLength<100>
    apelido: string & tags.MaxLength<32>
    nascimento: string & tags.Format<"date"> & tags.MinLength<10> & tags.MaxLength<10>
    stack: string[]
}

export class PessoaDto implements IPessoaDto {
    id?: string
    nome: string
    apelido: string
    nascimento: string
    stack: string[]

    constructor(data: IPessoaDto) {
        Object.assign(this, data)
    }

    private static validateParse = createValidate<IPessoaDto>()

    static fromBody(input: unknown): Result<PessoaDto, Error> {
        const res = PessoaDto.validateParse(input)

        if (!res.success) {
            return Err(new Error("Invalid pessoa"))
        }

        return Ok(new PessoaDto(res.data))
    }

    toPessoa(): Pessoa {
        return new Pessoa({
            id: crypto.randomUUID(),
            apelido: this.apelido,
            nascimento: this.nascimento,
            nome: this.nome,
            stack: this.stack.join(","),
        })
    }
}

export interface IPessoa {
    id: string
    nome: string
    apelido: string
    nascimento: string
    stack: string | null
}

export class Pessoa implements IPessoa {
    id: string
    nome: string
    apelido: string
    nascimento: string
    stack: string | null

    constructor(data: { id: string; nome: string; apelido: string; nascimento: string; stack: string | null }) {
        Object.assign(this, data)
    }

    static fromJson(input: string): Result<Pessoa, Error> {
        const dto = PessoaDto.fromBody(input)

        if (!dto.success) {
            return Err(dto.error)
        }

        return Ok(dto.data.toPessoa())
    }

    toDto(): PessoaDto {
        return new PessoaDto({
            id: this.id,
            apelido: this.apelido,
            nascimento: this.nascimento,
            nome: this.nome,
            stack: this.stack?.split(",") ?? [],
        })
    }
}
