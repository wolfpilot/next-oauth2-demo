import type { Metadata } from "next"
import localFont from "next/font/local"

// Styles
import "@styles/globals.css"

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Next SSO OAuth2 App Demo | Homepage",
  description: "Demo implementation of SSO and OAuth2 using Next.JS",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <body className={`${geistSans.variable}`}>{children}</body>
  </html>
)

export default RootLayout
