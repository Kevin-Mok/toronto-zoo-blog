import { expect, test } from '@playwright/test';

test('home to blog to toronto zoo post flow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /conservation storytelling/i })).toBeVisible();

  await page.getByRole('link', { name: /explore blog/i }).click();
  await expect(page).toHaveURL(/\/blog$/);

  await page
    .getByLabel('Blog posts')
    .getByRole('link', { name: /Toronto Zoo Field Notes \(February 28, 2026\)/i })
    .click();
  await expect(page).toHaveURL(/\/blog\/2026\/2\/28\/toronto-zoo-field-notes$/);

  await expect(page.getByRole('heading', { name: /Snow Leopard Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Polar Bear Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Gibbon Talk/i })).toBeVisible();

  await page.goto('/blog');
  await page
    .getByLabel('Blog posts')
    .getByRole('link', { name: /Toronto Zoo Field Notes \(March 1, 2026\)/i })
    .click();
  await expect(page).toHaveURL(/\/blog\/2026\/3\/1\/toronto-zoo-field-notes-march-1-2026$/);
  await expect(page.getByRole('heading', { name: /Pygmy Hippopotamus Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /African Penguin Talk/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Western Lowland Gorilla Talk/i })).toBeVisible();

  await page.getByRole('link', { name: /Toronto Zoo Report/i }).first().click();
  await expect(page).toHaveURL(/\/$/);
});
