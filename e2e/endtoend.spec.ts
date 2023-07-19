import { test, expect } from '@playwright/test';

test('initial background colour is rgb(100, 150, 200)', async ({ page }) => {
  await page.goto('/');
  const bgColour = await page.$eval('main', (el) => {
    const { background } = getComputedStyle(el);
    return background;
  });
  expect(bgColour).toContain('rgb(100, 150, 200)');
});

test('changing users name to "HI!" changes the background colour to rgb(14, 21, 13)', async ({
  page,
}) => {
  await page.goto('/');
  await page.fill('input', 'HI!');
  await page.waitForTimeout(500);

  const bgColour = await page.$eval('main', (el) => {
    const { background } = getComputedStyle(el);
    return background;
  });
  expect(bgColour).toContain('rgb(14, 21, 13)');
});

test('footer is visible and contains link to github', async ({ page }) => {
  await page.goto('/');
  const footer = await page.$('footer');
  expect(footer).toBeTruthy();
  const link = await footer!.$('a');
  expect(link).toBeTruthy();
  const href = await link!.getAttribute('href');
  expect(href).toBe('https://github.com/luke-mcmahon');
});
