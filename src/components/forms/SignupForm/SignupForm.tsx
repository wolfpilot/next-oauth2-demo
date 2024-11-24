"use client"

import { useActionState } from "react"

// Utils
import { signup as signupAction } from "@utils/actions/auth"

// Styles
import styles from "./SignupForm.module.css"

// Components
import { Button } from "@components/buttons"
import { InputField } from "@components/forms/Fields"

// Setup
const INITIAL_STATE = {
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

  return (
    <form className={styles.wrapper} action={formAction}>
      <InputField
        id="name"
        name="name"
        label="Name"
        placeholder="John Smith"
        defaultValue={name}
      />

      <InputField
        id="email"
        name="email"
        label="E-mail"
        placeholder="jsmith@example.com"
        defaultValue={email}
      />

      <InputField
        id="password"
        name="password"
        label="Password"
        placeholder="********"
        defaultValue={password}
      />

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? "Processing..." : "Continue"}
      </Button>
    </form>
  )
}

export default SignupForm
