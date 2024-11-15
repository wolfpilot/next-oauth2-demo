"use client"

import { signOut } from "next-auth/react"

// Components
import { Button } from "@components/buttons"

const LogoutButton = () => (
  <Button
    onClick={() =>
      signOut({
        redirectTo: "/",
      })
    }
  >
    Sign out
  </Button>
)

export default LogoutButton
