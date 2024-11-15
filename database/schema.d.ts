import { AdapterAccountType } from "next-auth/adapters";

export type Account = {
  access_token: string | null;
  expires_at: number;
  id: string;
  id_token: string | null;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  scope: string | null;
  session_state: string | null;
  token_type: string | null;
  type: AdapterAccountType;
  userId: string;
}

export type Session = {
  expires: Date;
  id: string;
  sessionToken: string;
  userId: string;
}

export type User = {
  emailVerified: Date | null;
  email: string;
  id: string;
  image: string | null;
  name: string | null;
}

export type VerificationToken = {
  expires: Date;
  identifier: string;
  token: string;
}

export type DB = {
  Account: Account;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
}
