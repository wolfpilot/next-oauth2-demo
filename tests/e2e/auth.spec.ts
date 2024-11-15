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

const totp = new OTPAuth.TOTP({
  issuer: "Github",
  label: `Github:${TEST_GITHUB_USER}`,
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: TEST_GITHUB_2FA_SECRET,
})

test.describe("auth", () => {
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
      await page.getByRole("button", { name: /Sign in/i }).click()

      // Check and fill 2FA info if enabled
      if (await page.getByText("Two-factor authentication").isVisible()) {
        const input2fa = page.getByPlaceholder(/XXXXXX/i)
        await input2fa.click()
        await input2fa.fill(totp.generate())
      }

      if (await page.getByText("Reauthorization required").isVisible()) {
        await page.getByRole("button", { name: /authorize/i }).click()
      }

      // Check if all profile data is displayed
      await page.waitForURL(`${CLIENT_URL}${clientRoutes.dashboard.url}`)

      expect(page.getByTestId("avatar")).toBeVisible()
      expect(page.getByTestId("name")).toBeVisible()
      expect(page.getByTestId("email")).toBeVisible()
    })

    await test.step("should log out", async () => {
      await page.getByText("Sign out").click()
      await page.waitForURL(CLIENT_URL)
    })
  })
})
