import { test, expect } from "@playwright/test"

// Setup
const { CLIENT_URL = "" } = process.env

test.describe("homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto(CLIENT_URL)
    await expect(page.getByRole("heading", { name: "Homepage" })).toBeVisible()
  })
})
