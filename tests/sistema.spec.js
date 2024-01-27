import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('franzuel1@gmail.com');
  await page.getByLabel('Email address:').press('Tab');
  await page.getByLabel('Password:').fill('fransuel1');
  await page.getByLabel('Password:').press('Enter');

  await expect(page).toHaveTitle(/ProyectProcesosFran/);
});