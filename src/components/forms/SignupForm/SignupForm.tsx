"use client"

import { useActionState } from "react"

// Constants
import {
  FORM_STATUS_PENDING,
  FORM_STATUS_READY,
} from "@constants/form.constants"

// Utils
import { signup as signupAction } from "@utils/actions/auth"
import { parseErrors } from "./helpers/error.helpers"

// Styles
import styles from "./SignupForm.module.css"

// Components
import { InputField, ErrorMessages } from "@components/forms"
import { Button } from "@components/buttons"

// Setup
const INITIAL_STATE = {
  data: {
    name: "",
    email: "",
    password: "",
  },
  errors: {
    formErrors: [],
    fieldErrors: {},
  },
}

const SignupForm = () => {
  const [formState, formAction, pending] = useActionState(
    signupAction,
    INITIAL_STATE
  )

  const { name, email, password } = formState?.data || {}
  const err = parseErrors(formState.errors)

  return (
    <form className={styles.wrapper} action={formAction}>
      <InputField
        id="name"
        name="name"
        label="Name"
        placeholder="John Smith"
        defaultValue={name}
        required
        errors={err.fieldErrors?.name}
      />

      <InputField
        id="email"
        name="email"
        label="E-mail"
        placeholder="jsmith@example.com"
        defaultValue={email}
        required
        errors={err.fieldErrors?.email}
      />

      <InputField
        id="password"
        name="password"
        label="Password"
        placeholder="********"
        defaultValue={password}
        required
        autoComplete="off"
        errors={err.fieldErrors?.password}
      />

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? FORM_STATUS_PENDING : FORM_STATUS_READY}
      </Button>

      <ErrorMessages errors={err.formErrors} />
    </form>
  )
}

export default SignupForm
