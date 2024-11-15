import Link from "next/link"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"

// Libs
import { auth } from "@lib/auth.lib"

// Components
import Container from "@components/layout/Container/Container"
import { ContentBlock } from "@components/layout/Content"

const HomePage = async () => {
  const session = await auth()

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>Homepage</h1>
        </header>

        {session?.user ? (
          <button>Sign out</button>
        ) : (
          <Link href={clientRoutes.signIn.url}>Sign in</Link>
        )}
      </ContentBlock>
    </Container>
  )
}

export default HomePage
