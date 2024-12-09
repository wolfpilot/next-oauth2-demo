import type { Routes } from "@ts/routes.types"

// Setup
export const apiRoutes: Routes = {
  auth: {
    label: "Authentication",
    url: "/api/auth",
  },
  authSignIn: {
    label: "Sign In",
    url: "/api/auth/signin",
  },
  sessions: {
    label: "Sessions",
    url: "/api/sessions",
  },
  sessionsClear: {
    label: "Sessions",
    url: "/api/sessions/clear",
  },
}
