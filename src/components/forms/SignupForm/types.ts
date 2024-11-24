import { FieldError, UseFormRegister } from "react-hook-form"

// Types
import type { SignupSchema, SignupSchemaError } from "@schemas/signup.schemas"

export type FormData = SignupSchema

export type FormFieldProps = {
  type: string
  placeholder: string
  name: ValidFieldNames
  register: UseFormRegister<FormData>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

export type ValidFieldNames = "name" | "email" | "password"

export interface FormState {
  errors: SignupSchemaError
}
