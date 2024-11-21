import type { ZodError } from "zod"

export const parseZodErrors = <T>(error: ZodError): T =>
  error.flatten((issue) => ({
    message: issue.message,
    code: issue.code,
  })) as T
