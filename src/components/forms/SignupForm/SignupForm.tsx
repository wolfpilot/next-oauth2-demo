"use client"

import { useActionState } from "react"

// Utils
import { signup as signupAction } from "@utils/actions/auth"

// Styles
import styles from "./SignupForm.module.css"

// Components
import { Button } from "@components/buttons"

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
      <div>
        <label htmlFor="name">
          <span>Name</span>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Smith"
            defaultValue={name}
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="jsmith@example.com"
            defaultValue={email}
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          <span>Password</span>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="********"
            defaultValue={password}
            required
            autoComplete="off"
          />
        </label>
      </div>

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? "Processing..." : "Continue"}
      </Button>
    </form>
  )
}

export default SignupForm
