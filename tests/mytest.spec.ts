import { test, expect } from '@playwright/test';

test.describe('SauceDemo Нэвтрэх болон Бараа сагслах функционал тест', () => {

  // Алхам бүрийн өмнө нүүр хуудас руу шижиж ажиллана (Test Isolation)
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  // 1. Амжилттай нэвтрэх тест
  test('Амжилттай нэвтрэх', async ({ page }) => {
    // getByPlaceholder болон getByRole орчин үеийн locator-уудыг ашигласан
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Амжилттай нэвтэрснийг шалгах assertions
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    // Системээс гарах (Logout)
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });

  // 2. Сөрөг тест: Буруу нууц үгээр нэвтрэх
  test('Амжилтгүй нэвтрэх (Сөрөг тест)', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');
    await page.getByRole('button', { name: 'Login' }).click();

    // [ЗАССАН ХЭСЭГ]: Saucedemo-гийн data-test="error" атрибутаар олох
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Username and password do not match');
  });

  // 3. Нэвтэрсний дараах үйлдэл: Бараа сагсанд нэмэх
  test('Бараа сагсанд нэмэх', async ({ page }) => {
    // Нэвтрэх
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // Эхний барааг сагсанд нэмэх
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // Сагсан доторх барааны тоо 1 болсныг шалгах
    const shoppingCartBadge = page.locator('.shopping_cart_badge');
    await expect(shoppingCartBadge).toHaveText('1');

    // Гарах
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
  });

});