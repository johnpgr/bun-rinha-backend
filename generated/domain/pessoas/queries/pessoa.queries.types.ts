/** Types generated for queries found in "src/domain/pessoas/queries/pessoa.queries.ts" */
/** 'CreatePessoa' parameters type */
export interface ICreatePessoaParams {
    apelido?: string | null | void;
    id?: string | null | void;
    nascimento?: string | null | void;
    nome?: string | null | void;
    stack?: string | null | void;
}
/** 'CreatePessoa' return type */
export interface ICreatePessoaResult {
    id: string;
}
/** 'CreatePessoa' query type */
export interface ICreatePessoaQuery {
    params: ICreatePessoaParams;
    result: ICreatePessoaResult;
}
/** 'FindPessoaById' parameters type */
export interface IFindPessoaByIdParams {
    id?: string | null | void;
}
/** 'FindPessoaById' return type */
export interface IFindPessoaByIdResult {
    apelido: string;
    id: string;
    nascimento: string;
    nome: string;
    stack: string | null;
}
/** 'FindPessoaById' query type */
export interface IFindPessoaByIdQuery {
    params: IFindPessoaByIdParams;
    result: IFindPessoaByIdResult;
}
/** 'FindPessoaByTermo' parameters type */
export interface IFindPessoaByTermoParams {
    termo?: string | null | void;
}
/** 'FindPessoaByTermo' return type */
export interface IFindPessoaByTermoResult {
    apelido: string;
    id: string;
    nascimento: string;
    nome: string;
    stack: string | null;
}
/** 'FindPessoaByTermo' query type */
export interface IFindPessoaByTermoQuery {
    params: IFindPessoaByTermoParams;
    result: IFindPessoaByTermoResult;
}
/** 'ContagemPessoas' parameters type */
export type IContagemPessoasParams = void;
/** 'ContagemPessoas' return type */
export interface IContagemPessoasResult {
    count: string | null;
}
/** 'ContagemPessoas' query type */
export interface IContagemPessoasQuery {
    params: IContagemPessoasParams;
    result: IContagemPessoasResult;
}
