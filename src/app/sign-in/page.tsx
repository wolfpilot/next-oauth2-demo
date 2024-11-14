import { redirect } from "next/navigation"

// Lib
import { auth } from "@lib/auth.lib"

// Styles
import styles from "./page.module.css"

// Components
import Container from "@components/layout/Container/Container"
import SsoLoginButton from "@components/buttons/SsoLoginButton/SsoLoginButton"

const SignInPage = async () => {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <header>
          <h1 className={styles.heading}>Sign in</h1>
        </header>

        <div className={styles.ssoLoginWrapper}>
          <SsoLoginButton provider="github" />
          <SsoLoginButton provider="google" />
        </div>
      </div>
    </Container>
  )
}

export default SignInPage
