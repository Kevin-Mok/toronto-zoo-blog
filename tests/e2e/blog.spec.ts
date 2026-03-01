import { expect, test } from '@playwright/test';

test('home to blog to toronto zoo post flow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /conservation storytelling/i })).toBeVisible();

  await page.getByRole('link', { name: /explore blog/i }).click();
  await expect(page).toHaveURL(/\/blog$/);

  await page.getByRole('link', { name: /Toronto Zoo Field Notes/i }).first().click();
  await expect(page).toHaveURL(/\/blog\/2026\/3\/1\/toronto-zoo-field-notes$/);

  await expect(page.getByRole('heading', { name: /Snow Leopard Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Polar Bear Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Gibbon Talk/i })).toBeVisible();

  await page.getByRole('link', { name: /Toronto Zoo Blog/i }).first().click();
  await expect(page).toHaveURL(/\/$/);
});
