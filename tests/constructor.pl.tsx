import path from 'node:path';

import { expect, test, type Page } from '@playwright/test';

const API_HAR = path.join(process.cwd(), 'tests', 'hars', 'api.har');
const BUN_NAME = 'Краторная булка N-200i';
const FILLING_NAME = 'Биокотлета из марсианской Магнолии';
const ORDER_NUMBER = '424242';

const addIngredient = async (page: Page, ingredientName: string): Promise<void> => {
  const ingredient = page.locator('li').filter({ hasText: ingredientName });
  await ingredient.getByRole('button', { name: 'Добавить' }).click();
};

test.describe('burger constructor', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(API_HAR, {
      url: '**/api/**',
      notFound: 'abort',
    });
    await page.goto('/');
  });

  test('adds a bun and a filling from the ingredient list', async ({ page }) => {
    await addIngredient(page, BUN_NAME);
    await addIngredient(page, FILLING_NAME);

    await expect(page.getByTestId('constructor-bun-1')).toContainText(BUN_NAME);
    await expect(page.getByTestId('constructor-bun-2')).toContainText(BUN_NAME);
    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      FILLING_NAME
    );
  });
});

test.describe('ingredient modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(API_HAR, {
      url: '**/api/**',
      notFound: 'abort',
    });
    await page.goto('/');
  });

  test('opens the selected ingredient and closes by the close button', async ({
    page,
  }) => {
    const ingredient = page.locator('li').filter({ hasText: FILLING_NAME });
    await ingredient.getByText(FILLING_NAME, { exact: true }).click();

    const modalTitle = page.getByRole('heading', { name: 'Детали ингредиента' });
    const modal = modalTitle.locator('../..');

    await expect(modalTitle).toBeVisible();
    await expect(modal.getByRole('heading', { name: FILLING_NAME })).toBeVisible();
    await expect(modal.getByText('424', { exact: true })).toBeVisible();
    await expect(modal.getByText('420', { exact: true })).toBeVisible();
    await expect(modal.getByText('142', { exact: true })).toBeVisible();
    await expect(modal.getByText('242', { exact: true })).toBeVisible();

    await modal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(page.getByRole('heading', { name: FILLING_NAME })).toHaveCount(0);
    await expect(page).toHaveURL('http://localhost:4000/');
  });

  test('closes the ingredient modal by clicking the overlay', async ({ page }) => {
    const ingredient = page.locator('li').filter({ hasText: BUN_NAME });
    await ingredient.getByText(BUN_NAME, { exact: true }).click();

    await expect(page.getByRole('heading', { name: BUN_NAME })).toBeVisible();
    await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });

    await expect(page.getByRole('heading', { name: BUN_NAME })).toHaveCount(0);
    await expect(page).toHaveURL('http://localhost:4000/');
  });
});

test.describe('order creation', () => {
  test.beforeEach(async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer%20mock-access-token',
        url: 'http://localhost:4000',
      },
    ]);
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'mock-refresh-token');
    });
    await page.routeFromHAR(API_HAR, {
      url: '**/api/**',
      notFound: 'abort',
    });
    const userResponse = page.waitForResponse('**/api/auth/user');
    await page.goto('/');
    await userResponse;
  });

  test('creates an order, clears the constructor and closes the order modal', async ({
    page,
  }) => {
    await addIngredient(page, BUN_NAME);
    await addIngredient(page, FILLING_NAME);
    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(page.getByTestId('order-number')).toHaveText(ORDER_NUMBER);
    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);
    await expect(page.getByTestId('constructor-ingredients')).toContainText(
      'Выберите начинку'
    );

    await page.getByRole('button', { name: 'Закрыть' }).click();
    await expect(page.getByTestId('order-number')).toHaveCount(0);
  });
});
