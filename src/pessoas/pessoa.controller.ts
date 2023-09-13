import type { AppContext } from "@/context"
import { tryCatch } from "@/utils"
import { insertPessoa, selectPessoaById, selectPessoaByTermo } from "./pessoas.queries"
import { Pessoa, PessoaDto } from "./pessoa.entities"

export const pessoasController = (app: AppContext) => {
    return app.group("/pessoas", (group) =>
        group
            .get("/", async (ctx) => {
                const termo = ctx.query["t"] as string | undefined
                if (!termo) {
                    ctx.set.status = 400
                    return
                }

                const pessoas = await selectPessoaByTermo.run(
                    {
                        termo: `%${termo.toLowerCase()}%`,
                    },
                    ctx.db
                )

                return pessoas.map((pessoa) => new Pessoa(pessoa).toDto())
            })
            .get("/:id", async (ctx) => {
                const [pessoa] = await selectPessoaById.run(
                    {
                        id: ctx.params.id,
                    },
                    ctx.db
                )

                if (!pessoa) {
                    ctx.set.status = 404
                    return
                }

                return new Pessoa(pessoa).toDto()
            })
            .post("/", async (ctx) => {
                console.log(ctx.body)
                const pessoaDto = PessoaDto.fromBody(ctx.body)
                if (!pessoaDto.success) {
                    ctx.set.status = 400
                    return
                }

                const result = await tryCatch(() => insertPessoa.run(pessoaDto.data.toPessoa(), ctx.db))
                if (!result.success) {
                    ctx.set.status = 422
                    return
                }

                const [insert] = result.data

                if (!insert) {
                    ctx.set.status = 422
                    return
                }

                ctx.set.headers["Location"] = `/pessoas/${insert.id}`
                ctx.set.status = 201

                return insert.id
            })
    )
}
