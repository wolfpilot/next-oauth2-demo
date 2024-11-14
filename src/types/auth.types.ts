import type { OAuthProviderType } from "next-auth/providers"

export enum ProviderNames {
  github = "Github",
  google = "Google",
}

export type ValidOAuthProviders = Extract<
  OAuthProviderType,
  "github" | "google"
>
