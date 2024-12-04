"use client"

import { redirect } from "next/navigation"
import { useActionState } from "react"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"
import {
  FORM_STATUS_PENDING,
  FORM_STATUS_READY,
} from "@constants/form.constants"

// Utils
import { signupWithCredentials } from "@utils/actions/auth"
import { parseErrors } from "./helpers/error.helpers"

// Styles
import styles from "./SignupForm.module.css"

// Components
import {
  InputField,
  PasswordInputField,
  ErrorMessages,
} from "@components/forms"
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
    signupWithCredentials,
    INITIAL_STATE
  )

  // Check if the a new user ID has been created
  if (formState.data.hasOwnProperty("id")) {
    redirect(clientRoutes.signIn.url)
  }

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
        type="email"
        id="email"
        name="email"
        label="E-mail"
        placeholder="jsmith@example.com"
        defaultValue={email}
        required
        errors={err.fieldErrors?.email}
      />

      <PasswordInputField
        type="password"
        id="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        defaultValue={password}
        required
        autoComplete="off"
        errors={err.fieldErrors?.password}
      />

      <Button
        className={styles.submitBtn}
        type="submit"
        variant="primary"
        disabled={pending}
      >
        {pending ? FORM_STATUS_PENDING : FORM_STATUS_READY}
      </Button>

      <ErrorMessages errors={err.formErrors} />
    </form>
  )
}

export default SignupForm
