"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Image from "next/image"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"

// Styles
import styles from "./page.module.css"

// Components
import Container from "@components/layout/Container/Container"
import { ContentBlock } from "@components/layout/Content"
import { LogoutButton } from "@components/buttons"

const DashboardPage = () => {
  const session = useSession()

  if (!session.data?.user) {
    redirect(clientRoutes.signIn.url)
  }

  const { name, email, image, color_hex } = session.data.user

  return (
    <Container>
      <ContentBlock>
        <header>
          <h1>Welcome back!</h1>
        </header>

        <div className={styles.user}>
          <div className={styles.avatar}>
            {image && (
              <Image
                className={styles.avatarImage}
                src={image}
                alt={`${name}'s profile photo.`}
                width={128}
                height={128}
                data-testid="avatar"
              />
            )}

            {name && color_hex && (
              <div
                className={styles.avatarText}
                style={{ backgroundColor: color_hex }}
              >
                {name[0]}
              </div>
            )}
          </div>

          {name && <h2 data-testid="name">{name}</h2>}
          <p data-testid="email">{email}</p>
        </div>

        <LogoutButton />
      </ContentBlock>
    </Container>
  )
}

export default DashboardPage
