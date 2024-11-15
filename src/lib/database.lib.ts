import { PostgresDialect } from "kysely"
import { KyselyAuth, type Codegen } from "@auth/kysely-adapter"
import { Pool } from "pg"

// Database
import { DB } from "@db/schema"

export const db = new KyselyAuth<DB, Codegen>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
