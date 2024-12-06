import { NextResponse } from "next/server"

// Lib
import { db } from "@lib/database.lib"

// Utils
import { ServiceError } from "@utils/helpers/error.helpers"

export async function DELETE() {
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
