"use server"

import bcrypt from "bcryptjs"

// Schemas
import {
  type SignupSchema,
  type SignupSchemaError,
  signupSchema,
} from "@schemas/signup.schemas"

// Lib
import { db } from "@lib/database.lib"

// Utils
import { parseZodErrors } from "@utils/helpers/form.helpers"

export interface FormState {
  data?: SignupSchema
  errors?: string | SignupSchemaError
}

export const signup = async (_formState: FormState, formData: FormData) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validated = signupSchema.safeParse(data)

  if (!validated.success) {
    return {
      errors: parseZodErrors<SignupSchemaError>(validated.error),
    }
  }

  try {
    const userRecords = await db
      .selectFrom("User")
      .select("name")
      .where("email", "=", data.email)
      .execute()

    if (userRecords.length) {
      return {
        errors: "Email address is already registered.",
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const insertUserQuery = await db
      .insertInto("User")
      .values({
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
      })
      .returning("id")
      .executeTakeFirstOrThrow()

    return {
      data: {
        ...data,
        id: insertUserQuery.id,
      },
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }

    return {
      errors: "Oops, something went wrong!",
    }
  }
}
