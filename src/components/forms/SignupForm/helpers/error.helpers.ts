// Types
import type {
  ValidationResultErrors,
  ValidationError,
} from "@ts/validation.types"
import type { SignupSchema, SignupSchemaErrors } from "@schemas/signup.schemas"

// Mappers
export const getFormErrorMessage = (error: ValidationError) => {
  switch (error.code) {
    case "Conflict":
      return "Email address is already registered."
    default:
      return "Oops, something went wrong! Please try again later."
  }
}

// Parsers
export const parseFormErrors = (
  errors: SignupSchemaErrors["formErrors"]
): string[] => {
  if (!errors.length) return []

  return errors.map(getFormErrorMessage)
}

export const parseFieldErrors = (errors: SignupSchemaErrors["fieldErrors"]) => {
  const entries = Object.entries(errors)

  if (!entries.length) return {}

  return entries.reduce(
    (acc, curr) => {
      const [key, value] = curr
      acc[key as keyof SignupSchema] = value.map((issue) => issue.message)

      return acc
    },
    {} as Partial<Record<keyof SignupSchema, string[]>>
  )
}

export const parseErrors = (
  errors: ValidationResultErrors<SignupSchema> | undefined
) => {
  if (!errors)
    return {
      fieldErrors: {},
      formErrors: [],
    }

  const formErrors = parseFormErrors(errors.formErrors)
  const fieldErrors = parseFieldErrors(errors.fieldErrors)

  return {
    formErrors,
    fieldErrors,
  }
}
