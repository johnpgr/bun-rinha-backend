/** Types generated for queries found in "src/database/pessoas/pessoas.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAllPessoas' parameters type */
export type IGetAllPessoasParams = void;

/** 'GetAllPessoas' return type */
export interface IGetAllPessoasResult {
  apelido: string;
  busca_trgm: string | null;
  id: string | null;
  nascimento: string | null;
  nome: string | null;
  stack: string | null;
}

/** 'GetAllPessoas' query type */
export interface IGetAllPessoasQuery {
  params: IGetAllPessoasParams;
  result: IGetAllPessoasResult;
}

const getAllPessoasIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM pessoas"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM pessoas
 * ```
 */
export const getAllPessoas = new PreparedQuery<IGetAllPessoasParams,IGetAllPessoasResult>(getAllPessoasIR);


