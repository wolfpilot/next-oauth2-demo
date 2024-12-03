"use client"

import { signOut } from "next-auth/react"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"

// Components
import { Button } from "@components/buttons"

const LogoutButton = () => (
  <Button
    onClick={() =>
      signOut({
        redirectTo: clientRoutes.home.url,
      })
    }
  >
    Sign out
  </Button>
)

export default LogoutButton
