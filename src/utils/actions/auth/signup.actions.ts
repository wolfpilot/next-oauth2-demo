"use server"

import bcrypt from "bcryptjs"

// Schemas
import {
  type SignupSchema,
  type SignupSchemaErrors,
  signupSchema,
} from "@schemas/signup.schemas"

// Constants
import { serviceErrors } from "@constants/errors.constants"
import { colors } from "@constants/colors.constants"

// Lib
import { db } from "@lib/database.lib"

// Utils
import { parseZodErrors } from "@utils/helpers/form.helpers"
import { generateRandomNumberInRange } from "@utils/helpers/math.helpers"

export interface FormState {
  data?: SignupSchema & { id?: string }
  errors?: SignupSchemaErrors
}

export const signupWithCredentials = async (
  _formState: FormState,
  formData: FormData
) => {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  /**
   * Can't return custom Error instances because the React Server DOM,
   * an experimental part of Next.JS, strips out all details from the instance
   * aside from the .message property.
   *
   * And that's pretty useless because normally server messages may be too detailed
   * to display directly to the customers. You would ideally have a code/cause based
   * on which the FE then returns a more user-friendly message.
   *
   * So instead we'll just return an array of regular objects, flatten Zod errors to do
   * the same and call it a day.
   */
  const validated = signupSchema.safeParse(data)

  if (!validated.success) {
    return {
      data,
      errors: parseZodErrors<SignupSchema>(validated.error),
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
        data,
        errors: {
          formErrors: [serviceErrors.Conflict],
          fieldErrors: {},
        },
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const colorIndex = Math.floor(
      generateRandomNumberInRange(0, colors.avatar.length)
    )

    const insertUserQuery = await db
      .insertInto("User")
      .values({
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        color_hex: colors.avatar[colorIndex],
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
      data,
      errors: {
        formErrors: [serviceErrors.Unhandled],
        fieldErrors: {},
      },
    }
  }
}
