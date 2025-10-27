// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { testData } from './data/testData';

test.describe('Login Page', () => {
    test('valid credential login', async ({ page }) => {
        const login = new LoginPage(page);

        await test.step('User can navigate to the login page', async () => {
            await login.navigateTo();
        });

        await test.step('User can log in with valid credentials', async () => {
            await login.enterUsername(testData.credentials.valid.username);
            await login.enterPassword(testData.credentials.valid.password);
            await login.clickLoginButton();
        });

        await test.step('Dashboard loads after successful login', async () => {
            await page.waitForLoadState('networkidle');
            await page.waitForLoadState('domcontentloaded');
            expect(page.url()).toContain('profile');
        });
    });

    test('invalid credential login', async ({ page }) => {
        const login = new LoginPage(page);

        await test.step('User can navigate to the login page', async () => {
            await login.navigateTo();
        });

        await test.step('User gets error message when using invalid credentials', async () => {
            await login.enterUsername(testData.credentials.invalid.username);
            await login.enterPassword(testData.credentials.invalid.password);
            await login.clickLoginButton();
            expect(await login.getLoginPageErrorMessageText()).toContain(testData.messages.loginError);
        });
    });

    test('Login with empty credentials', async ({ page }) => {
        const login = new LoginPage(page);

        await test.step('User can navigate to the login page', async () => {
            await login.navigateTo();
        });

        await test.step('User gets a login page error when submitting empty fields', async () => {
            await login.clickLoginButton();
            expect(await login.getLoginPageErrorMessageText()).toContain(testData.messages.emptyCredentialsError);
        });

        await test.step('Username field shows an error when cleared', async () => {
            await login.enterUsername('temp');
            await login.clearUsernameInputField();
            expect(await login.getUsernameInputFieldErrorMessageText()).toContain(testData.messages.usernameRequired);
        });

        await test.step('Password field shows an error when cleared', async () => {
            await login.enterPassword('temp');
            await login.clearPasswordInputField();
            expect(await login.getPasswordInputFieldErrorMessageText()).toContain(testData.messages.passwordRequired);
        });
    });
});
