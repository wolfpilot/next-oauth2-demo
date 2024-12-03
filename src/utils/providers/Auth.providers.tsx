"use client"

import { useMemo } from "react"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

export interface Props {
  session: Session | null
  sessionKey: number
  children: React.ReactNode
}

/**
 * Custom session provider as a work-around for Auth.js bug requiring the user to
 * refresh their page after logging in to create a new server session.
 *
 * @see https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-2326123445
 */
const AuthProvider = ({ children, session, sessionKey }: Props) => {
  const memoizedSessionKey = useMemo(() => sessionKey, [sessionKey])

  return (
    <SessionProvider key={memoizedSessionKey} session={session}>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider
