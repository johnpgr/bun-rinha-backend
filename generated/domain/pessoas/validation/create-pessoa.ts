import typia from "typia";

import { tags, createValidate } from "typia";
interface CreatePessoaBody {
    nome: string & tags.MaxLength<100>;
    apelido: string & tags.MaxLength<32>;
    nascimento: string & tags.Format<"date"> & tags.MinLength<10> & tags.MaxLength<10>;
    stack: Array<string & tags.MaxLength<32>> & tags.MaxItems<32>;
}
export const parsePessoaBody = (input: any): typia.IValidation<CreatePessoaBody> => {
    const errors = [] as any[];
    const __is = (input: any): input is CreatePessoaBody => {
        const $io0 = (input: any): boolean => "string" === typeof input.nome && input.nome.length <= 100 && ("string" === typeof input.apelido && input.apelido.length <= 32) && ("string" === typeof input.nascimento && (/^(\d{4})-(\d{2})-(\d{2})$/.test(input.nascimento) && 10 <= input.nascimento.length && input.nascimento.length <= 10)) && (Array.isArray(input.stack) && (input.stack.length <= 32 && input.stack.every((elem: any) => "string" === typeof elem && elem.length <= 32)));
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is CreatePessoaBody => {
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.nome && (input.nome.length <= 100 || $report(_exceptionable, {
                    path: _path + ".nome",
                    expected: "string & MaxLength<100>",
                    value: input.nome
                })) || $report(_exceptionable, {
                    path: _path + ".nome",
                    expected: "(string & MaxLength<100>)",
                    value: input.nome
                }), "string" === typeof input.apelido && (input.apelido.length <= 32 || $report(_exceptionable, {
                    path: _path + ".apelido",
                    expected: "string & MaxLength<32>",
                    value: input.apelido
                })) || $report(_exceptionable, {
                    path: _path + ".apelido",
                    expected: "(string & MaxLength<32>)",
                    value: input.apelido
                }), "string" === typeof input.nascimento && (/^(\d{4})-(\d{2})-(\d{2})$/.test(input.nascimento) || $report(_exceptionable, {
                    path: _path + ".nascimento",
                    expected: "string & Format<\"date\">",
                    value: input.nascimento
                })) && (10 <= input.nascimento.length || $report(_exceptionable, {
                    path: _path + ".nascimento",
                    expected: "string & MinLength<10>",
                    value: input.nascimento
                })) && (input.nascimento.length <= 10 || $report(_exceptionable, {
                    path: _path + ".nascimento",
                    expected: "string & MaxLength<10>",
                    value: input.nascimento
                })) || $report(_exceptionable, {
                    path: _path + ".nascimento",
                    expected: "(string & Format<\"date\"> & MinLength<10> & MaxLength<10>)",
                    value: input.nascimento
                }), (Array.isArray(input.stack) || $report(_exceptionable, {
                    path: _path + ".stack",
                    expected: "(Array<string & MaxLength<32>> & MaxItems<32>)",
                    value: input.stack
                })) && ((input.stack.length <= 32 || $report(_exceptionable, {
                    path: _path + ".stack",
                    expected: "Array<> & MaxItems<32>",
                    value: input.stack
                })) && input.stack.map((elem: any, _index1: number) => "string" === typeof elem && (elem.length <= 32 || $report(_exceptionable, {
                    path: _path + ".stack[" + _index1 + "]",
                    expected: "string & MaxLength<32>",
                    value: elem
                })) || $report(_exceptionable, {
                    path: _path + ".stack[" + _index1 + "]",
                    expected: "(string & MaxLength<32>)",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".stack",
                    expected: "(Array<string & MaxLength<32>> & MaxItems<32>)",
                    value: input.stack
                })].every((flag: boolean) => flag);
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "CreatePessoaBody",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "CreatePessoaBody",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
