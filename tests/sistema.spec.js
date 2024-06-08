import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('franzuel@hotmail.com');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Jugar' }).click();
  await page.getByRole('button', { name: 'Nueva partida' }).click();
  await page.locator('.cell').first().click();
  await page.locator('#board > div:nth-child(2)').click();
  await page.locator('#board > div:nth-child(3)').click();
  await page.locator('#board > div:nth-child(4)').click();
  await page.locator('div:nth-child(5)').first().click();
  await page.locator('div:nth-child(6)').click();
  await page.locator('div:nth-child(7)').click();
  await page.locator('div:nth-child(16)').click();
  await page.locator('div:nth-child(12)').click();
  await page.locator('div:nth-child(23)').click();
  await page.getByRole('button', { name: 'Nueva partida' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Jugar contra otro jugador' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Jugar contra la computadora' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Jugar contra otro jugador' }).click();
  await page.locator('#board > div:nth-child(3)').click();
  await page.locator('div:nth-child(5)').first().click();
  await page.locator('#board > div:nth-child(4)').click();
  await page.locator('div:nth-child(6)').click();
  await page.locator('div:nth-child(33)').click();
  await page.locator('div:nth-child(34)').click();
  await page.locator('div:nth-child(27)').click();
  await page.locator('div:nth-child(35)').click();
  await page.locator('div:nth-child(35)').click();
  await page.locator('div:nth-child(28)').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div:nth-child(21)').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Jugar contra otro jugador' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Jugar contra la computadora' }).click();
  await page.locator('div:nth-child(11)').click();
  await page.locator('div:nth-child(11)').click();
  await page.locator('div:nth-child(11)').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div:nth-child(11)').click();
  await page.getByRole('link', { name: 'Salir' }).click();
  await page.getByRole('link', { name: 'Registrarse' }).click();
  await page.getByLabel('Apellidos:').click();
  await page.getByLabel('Apellidos:').fill('del Sol');
  await page.getByLabel('Nombre:').click();
  await page.getByLabel('Nombre:').fill('Francisco');
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('fco.sol@alu.uclm.es');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('1234');
  await page.getByRole('button', { name: 'Registrar' }).click();
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('fco.sol@alu.uclm.es');
  await page.getByLabel('Password:').click();
  await page.getByLabel('Password:').fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
});