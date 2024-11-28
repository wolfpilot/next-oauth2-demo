import type { typeToFlattenedError } from "zod"

// Types
import type { GenericError } from "./errors.types"

export type ValidationError = GenericError<string>
export type ValidationResultErrors<T> = typeToFlattenedError<T, ValidationError>
