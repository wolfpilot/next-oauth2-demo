"use client"

import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import Image from "next/image"

// Constants
import { apiRoutes } from "@constants/apiRoutes.constants"

// Styles
import styles from "./page.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { ContentBlock } from "@components/layout/Content"
import { LogoutButton } from "@components/buttons"

const DashboardPage = () => {
  const session = useSession()

  if (!session?.data?.user) {
    redirect(apiRoutes.signIn.url)
  }

  const { name, email, image } = session.data.user

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>Welcome back!</h1>
        </header>

        <div className={styles.user}>
          {image && (
            <Image
              className={styles.avatar}
              src={image}
              alt={`${name}'s profile photo.`}
              width={128}
              height={128}
              data-testid="avatar"
            />
          )}

          {name && <h2 data-testid="name">{name}</h2>}
          <p data-testid="email">{email}</p>
        </div>

        <LogoutButton />
      </ContentBlock>
    </Container>
  )
}

export default DashboardPage
