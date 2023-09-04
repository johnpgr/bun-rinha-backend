import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import {
  pgTable,
  index,
  unique,
  varchar,
  char,
  text,
} from "drizzle-orm/pg-core"

export const pessoas = pgTable(
  "pessoas",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    apelido: varchar("apelido", { length: 32 }).notNull(),
    nome: varchar("nome", { length: 100 }).notNull(),
    nascimento: char("nascimento", { length: 10 }).notNull(),
    stack: varchar("stack", { length: 1024 }),
    buscaTrgm: text("busca_trgm"),
  },
  (table) => {
    return {
      idxPessoasBuscaTrgm: index("idx_pessoas_busca_trgm").on(table.buscaTrgm),
      pessoasApelidoKey: unique("pessoas_apelido_key").on(table.apelido),
    }
  },
)

export type PessoaModel = InferSelectModel<typeof pessoas>
export type PessoaInsertModel = InferInsertModel<typeof pessoas>
