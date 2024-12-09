import { NextRequest, NextResponse } from "next/server"

// Lib
import { db } from "@lib/database.lib"

// Utils
import { ServiceError } from "@utils/helpers/error.helpers"

// Setup
const { CRON_SECRET = "" } = process.env

/**
 * Normally this should be a DELETE method.
 *
 * However, we mostly trigger it as a cron job via Vercel
 * where the only supported verb is GET.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(new ServiceError("Unauthorized"), {
      status: 401,
    })
  }

  try {
    await db.deleteFrom("Session").where("expires", "<", new Date()).execute()

    /**
     * Work-around for empty 204 response.
     *
     * @see https://github.com/vercel/next.js/discussions/51475#discussioncomment-6216369
     */
    return new NextResponse(null, {
      status: 204,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }

    return NextResponse.json(new ServiceError("Unhandled"), {
      status: 500,
    })
  }
}
