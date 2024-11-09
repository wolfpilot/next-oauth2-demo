import { Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"

// Database
import { DB } from "@db/schema"

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
})
