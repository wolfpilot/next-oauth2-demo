import type { Metadata } from "next"
import localFont from "next/font/local"

// Lib
import { auth } from "@lib/auth.lib"

// Utils
import { AuthProvider } from "@utils/providers"

// Styles
import "@styles/index.css"

// Components
import { PageWrapper } from "@components/layout/Page"

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Next SSO OAuth2 App Demo",
  description: "Demo implementation of SSO and OAuth2 using Next.JS",
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()
  const sessionKey = new Date().getTime()

  return (
    <AuthProvider session={session} sessionKey={sessionKey}>
      <html lang="en">
        <body className={`${geistSans.variable}`}>
          <PageWrapper>{children}</PageWrapper>
        </body>
      </html>
    </AuthProvider>
  )
}

export default RootLayout
