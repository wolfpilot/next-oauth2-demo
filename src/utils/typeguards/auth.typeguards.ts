// Types
import { ValidOAuthProviders } from "@ts/auth.types"

// Config
import { SSO_PROVIDERS } from "@config/auth.config"

export const isValidProvider = (val: string): val is ValidOAuthProviders =>
  SSO_PROVIDERS.includes(val)
