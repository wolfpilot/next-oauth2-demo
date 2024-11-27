import type { ZodError } from "zod"

// Types
import type { ValidationResultErrors } from "@ts/validation.types"

export const parseZodErrors = <T>(error: ZodError): ValidationResultErrors<T> =>
  error.flatten((issue) => ({
    message: issue.message,
    code: issue.code,
  }))
