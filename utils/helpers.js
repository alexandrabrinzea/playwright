import { expect } from "@playwright/test";

export async function acceptCookies(page) {
    const acceptButton = await page.locator("#onetrust-accept-btn-handler");
    await expect(acceptButton).toBeVisible();
    await acceptButton.click();
    await expect(acceptButton).not.toBeVisible({timeout:5000}); 
}
