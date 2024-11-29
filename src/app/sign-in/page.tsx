import { redirect } from "next/navigation"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"

// Lib
import { auth } from "@lib/auth.lib"

// Styles
import styles from "./page.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { ContentBlock } from "@components/layout/Content"
import Divider from "@components/layout/Divider/Divider"
import SsoLoginButton from "@components/buttons/SsoLoginButton/SsoLoginButton"
import { SigninForm } from "@components/forms"

const SignInPage = async () => {
  const session = await auth()

  if (session) {
    redirect(clientRoutes.dashboard.url)
  }

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>{clientRoutes.signIn.label}</h1>
        </header>

        <div className={styles.ssoLoginWrapper}>
          <SsoLoginButton provider="github" />
          <SsoLoginButton provider="google" />
        </div>

        <Divider text="or continue with credentials" />

        <SigninForm />

        <footer>
          <p className={styles.footerNotes}>
            Don&#39;t have an account? Register{" "}
            <a href={`${clientRoutes.signUp.url}`}>here</a> first.
          </p>
        </footer>
      </ContentBlock>
    </Container>
  )
}

export default SignInPage
