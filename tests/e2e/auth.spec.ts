import { test, expect } from "@playwright/test"
import * as OTPAuth from "otpauth"

// Constants
import { clientRoutes } from "@constants/clientRoutes.constants"

// Setup
const {
  CLIENT_URL = "",
  TEST_GITHUB_USER = "",
  TEST_GITHUB_PASSWORD = "",
  TEST_GITHUB_2FA_SECRET = "",
} = process.env

const GITHUB_2FA_URL = "https://github.com/sessions/two-factor/app"
const GITHUB_REAUTH_URL = "https://github.com/login/oauth/authorize"

const totp = new OTPAuth.TOTP({
  issuer: "Github",
  label: `Github:${TEST_GITHUB_USER}`,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: TEST_GITHUB_2FA_SECRET,
})

test("Github flow", async ({ page }) => {
  await test.step("should log in", async () => {
    // Begin Github authentication
    await page.goto(CLIENT_URL)
    await page.getByRole("link", { name: "Sign in" }).click()
    await page.getByRole("button", { name: "Continue with Github" }).click()

    // Fill in credentials
    await page.getByText("Username or email").waitFor()
    await page.getByLabel("Username or email address").fill(TEST_GITHUB_USER)
    await page.getByLabel("Password").fill(TEST_GITHUB_PASSWORD)
    await page.getByRole("button", { name: "Sign in", exact: true }).click()

    // Check and fill 2FA info if enabled
    await page.waitForURL(
      (url) =>
        url.href.includes(GITHUB_2FA_URL) ||
        url.href.includes(`${CLIENT_URL}${clientRoutes.dashboard.url}`)
    )

    if (page.url().includes(GITHUB_2FA_URL)) {
      const input2fa = page.getByPlaceholder(/XXXXXX/i)

      if (await input2fa.isHidden()) {
        return
      }

      await input2fa.click()
      await input2fa.fill(totp.generate())
    }

    // Check and re-authorize app if needed
    await page.waitForURL(
      (url) =>
        url.href.includes(GITHUB_REAUTH_URL) ||
        url.href.includes(`${CLIENT_URL}${clientRoutes.dashboard.url}`)
    )

    if (page.url().includes(GITHUB_REAUTH_URL)) {
      const reauthorizeBtn = page.getByRole("button", { name: /Authorize/i })

      if (await reauthorizeBtn.isHidden()) {
        return
      }

      await reauthorizeBtn.click()
    }

    // Check if all profile data is displayed
    await page.waitForURL(`${CLIENT_URL}${clientRoutes.dashboard.url}`)

    expect(page.getByTestId("avatar")).toBeVisible()
    expect(page.getByTestId("name")).toBeVisible()
    expect(page.getByTestId("email")).toBeVisible()
  })

  await test.step("should log out", async () => {
    // Go to Dashboard and sign out
    await page.goto(`${CLIENT_URL}${clientRoutes.dashboard.url}`)
    await page.getByText("Sign out").click()
    await page.waitForURL(CLIENT_URL)

    await expect(page.getByText("Homepage")).toBeVisible()
  })
})
