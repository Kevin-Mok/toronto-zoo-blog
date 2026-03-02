import { expect, test } from '@playwright/test';

test('crawl entire web structure round trip', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);

  await page.locator('header').getByRole('link', { name: /^About$/ }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1, name: /reporter \+ gentle watchdog coverage/i })).toBeVisible();

  await page.locator('header').getByRole('link', { name: /^Blog$/ }).click();
  await expect(page).toHaveURL(/\/blog$/);

  const firstYearHref =
    (await page.locator('.archive-tree > li > a').first().getAttribute('href')) ?? '';
  expect(firstYearHref).toMatch(/^\/blog\/\d{4}$/);

  await page.goto(firstYearHref);
  await expect(page).toHaveURL(new RegExp(`${firstYearHref}$`));

  const firstMonthHref =
    (await page.locator('.archive-tree--nested > li > a').first().getAttribute('href')) ?? '';
  expect(firstMonthHref).toMatch(/^\/blog\/\d{4}\/\d{1,2}$/);

  await page.goto(firstMonthHref);
  await expect(page).toHaveURL(new RegExp(`${firstMonthHref}$`));

  const firstDayHref =
    (await page.locator('.archive-tree--nested .archive-tree--nested > li > a').first().getAttribute('href')) ?? '';
  expect(firstDayHref).toMatch(/^\/blog\/\d{4}\/\d{1,2}\/\d{1,2}$/);

  await page.goto(firstDayHref);
  await expect(page).toHaveURL(new RegExp(`${firstDayHref}$`));

  const firstPostHref =
    (await page.locator('section[aria-label="Blog posts"] a[href^="/blog/"]').first().getAttribute('href')) ?? '';
  expect(firstPostHref).toMatch(/^\/blog\/\d{4}\/\d{1,2}\/\d{1,2}\/[a-z0-9-]+$/);

  await page.goto(firstPostHref);
  await expect(page).toHaveURL(new RegExp(`${firstPostHref}$`));
  await expect(page.locator('main.blog-post h1')).toBeVisible();

  await page.getByRole('link', { name: /back to all posts/i }).first().click();
  await expect(page).toHaveURL(/\/blog$/);

  await page.locator('header').getByRole('link', { name: /Toronto Zoo Report homepage/i }).click();
  await expect(page).toHaveURL(/\/$/);
});
