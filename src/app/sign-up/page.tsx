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
import { SignupForm } from "@components/forms"

const SignUpPage = async () => {
  const session = await auth()

  if (session) {
    redirect(clientRoutes.dashboard.url)
  }

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>{clientRoutes.signUp.label}</h1>
        </header>

        <SignupForm />

        <footer>
          <p className={styles.footerNotes}>
            Already have an account? Log in{" "}
            <a href={clientRoutes.signIn.url}>here</a> instead.
          </p>
        </footer>
      </ContentBlock>
    </Container>
  )
}

export default SignUpPage
