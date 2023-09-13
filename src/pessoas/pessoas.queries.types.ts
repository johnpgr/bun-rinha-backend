/** Types generated for queries found in "src/domain/pessoas/queries/pessoas.queries.ts" */

/** 'InsertPessoa' parameters type */
export interface IInsertPessoaParams {
    id?: string | null | void
    apelido?: string | null | void
    nascimento?: string | null | void
    nome?: string | null | void
    stack?: string | null | void
}

/** 'InsertPessoa' return type */
export interface IInsertPessoaResult {
    id: string
}

/** 'InsertPessoa' query type */
export interface IInsertPessoaQuery {
    params: IInsertPessoaParams
    result: IInsertPessoaResult
}

/** 'SelectPessoaById' parameters type */
export interface ISelectPessoaByIdParams {
    id?: string | null | void
}

/** 'SelectPessoaById' return type */
export interface ISelectPessoaByIdResult {
    apelido: string
    id: string
    nascimento: string
    nome: string
    stack: string | null
}

/** 'SelectPessoaById' query type */
export interface ISelectPessoaByIdQuery {
    params: ISelectPessoaByIdParams
    result: ISelectPessoaByIdResult
}

/** 'SelectPessoaByTermo' parameters type */
export interface ISelectPessoaByTermoParams {
    termo?: string | null | void
}

/** 'SelectPessoaByTermo' return type */
export interface ISelectPessoaByTermoResult {
    apelido: string
    id: string
    nascimento: string
    nome: string
    stack: string | null
}

/** 'SelectPessoaByTermo' query type */
export interface ISelectPessoaByTermoQuery {
    params: ISelectPessoaByTermoParams
    result: ISelectPessoaByTermoResult
}

/** 'SelectPessoaCount' parameters type */
export type ISelectPessoaCountParams = void

/** 'SelectPessoaCount' return type */
export interface ISelectPessoaCountResult {
    count: string | null
}

/** 'SelectPessoaCount' query type */
export interface ISelectPessoaCountQuery {
    params: ISelectPessoaCountParams
    result: ISelectPessoaCountResult
}
