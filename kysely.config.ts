import { Kysely } from "kysely"
import { defineConfig } from "kysely-ctl"

// Types
import { DB } from "@db/schema"

// Lib
import { db } from "./src/lib/database.lib"

export default defineConfig({
  kysely: db as unknown as Kysely<DB>,
  migrations: {
    migrationFolder: "./database/migrations",
  },
})
