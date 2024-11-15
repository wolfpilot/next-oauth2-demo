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
import SsoLoginButton from "@components/buttons/SsoLoginButton/SsoLoginButton"

const SignInPage = async () => {
  const session = await auth()

  if (session) {
    redirect(clientRoutes.dashboard.url)
  }

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>Sign in</h1>
        </header>

        <div className={styles.ssoLoginWrapper}>
          <SsoLoginButton provider="github" />
          <SsoLoginButton provider="google" />
        </div>
      </ContentBlock>
    </Container>
  )
}

export default SignInPage
