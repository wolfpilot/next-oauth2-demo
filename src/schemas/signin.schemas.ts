import * as z from "zod"

// Types
import type { ValidationError } from "@ts/validation.types"

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({ message: "Invalid email address." }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
})

export type SigninSchema = z.infer<typeof signinSchema>
export type SigninSchemaErrors = z.inferFlattenedErrors<
  typeof signinSchema,
  ValidationError
>
