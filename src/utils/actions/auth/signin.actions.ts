"use server"

import { isRedirectError } from "next/dist/client/components/redirect"
import { AuthError } from "next-auth"
import type { OAuthProviderType } from "next-auth/providers"

// Schemas
import {
  type SigninSchema,
  type SigninSchemaErrors,
  signinSchema,
} from "@schemas/signin.schemas"

// Constants
import { serviceErrors } from "@constants/errors.constants"
import { clientRoutes } from "@constants/clientRoutes.constants"

// Lib
import { signIn } from "@lib/auth.lib"

// Utils
import { parseZodErrors } from "@utils/helpers/form.helpers"

export interface FormState {
  data?: SigninSchema
  errors?: SigninSchemaErrors
}

export const signinWithProvider = async (provider: OAuthProviderType) => {
  try {
    await signIn(provider, {
      redirect: true,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (isRedirectError(error)) {
      throw error
    } else if (error instanceof Error) {
      console.error(error.message)
    }
  }
}

export const signinWithCredentials = async (
  _formState: FormState,
  formData: FormData
) => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validated = signinSchema.safeParse(data)

  if (!validated.success) {
    return {
      data,
      errors: parseZodErrors<SigninSchema>(validated.error),
    }
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: clientRoutes.dashboard.url,
    })

    return {
      data,
    }
  } catch (error) {
    /**
     * Check if it's a redirect error.
     *
     * Yes, because this insanity is how Next.js can tell if it's a legit error
     * or indeed a redirect.
     *
     * @see https://github.com/nextauthjs/next-auth/discussions/9389
     */
    if (isRedirectError(error)) {
      throw error
    } else if (error instanceof AuthError) {
      if (error.name === "CredentialsSignin") {
        return {
          data,
          errors: {
            formErrors: [serviceErrors.Unauthorized],
            fieldErrors: {},
          },
        }
      }
    } else if (error instanceof Error) {
      console.error(error.message)
    }

    return {
      data,
      errors: {
        formErrors: [serviceErrors.Unhandled],
        fieldErrors: {},
      },
    }
  }
}
