import { Kysely } from "kysely"

// Types
import type { DB } from "@db/schema"

export async function up(db: Kysely<DB>): Promise<void> {
  await db.schema
    .alterTable("User")
    .addColumn("color_hex", "varchar(7)")
    .execute()
  }
