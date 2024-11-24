import type { typeToFlattenedError } from "zod"

export interface ZodErrorFields {
  message: string
  code: string
}

export type ValidationError = typeToFlattenedError<unknown, ZodErrorFields>
