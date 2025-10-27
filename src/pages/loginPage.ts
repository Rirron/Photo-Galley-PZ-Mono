import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInputField: Locator;
    readonly passwordInputField: Locator;
    readonly usernameInputFieldErrorMessage: Locator;
    readonly passwordInputFieldErrorMessage: Locator;
    readonly loginButton: Locator;
    readonly loginPageErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInputField = page.locator(`//div[./label[text()='Username']]/input`);
        this.passwordInputField = page.locator(`//div[./label[text()='Password']]/input`);
        this.usernameInputFieldErrorMessage = page.locator(`//div[./label[text()='Username']]/div`);
        this.passwordInputFieldErrorMessage = page.locator(`//div[./label[text()='Password']]/div`);
        this.loginButton = page.locator(`//button[text()='Login']`);
        this.loginPageErrorMessage = page.locator(`//span[contains(@class,'alert')]`);
    }
    async navigateTo() {
        await this.page.goto('login');
    }
    async enterUsername(username: string) {
        await this.usernameInputField.waitFor();
        await this.usernameInputField.fill(username);
    }
    async enterPassword(password: string) {
        await this.passwordInputField.waitFor();
        await this.passwordInputField.fill(password);
    }
    async clearUsernameInputField() {
        await this.usernameInputField.waitFor();
        await this.usernameInputField.clear();
    }
    async clearPasswordInputField() {
        await this.passwordInputField.waitFor();
        await this.passwordInputField.clear();
    }
    async clickLoginButton() {
        await this.loginButton.waitFor();
        await this.loginButton.click();
    }
    async getUsernameInputFieldErrorMessageText() {
        await this.usernameInputFieldErrorMessage.waitFor();
        return this.usernameInputFieldErrorMessage.textContent() || '';
    }
    async getPasswordInputFieldErrorMessageText() {
        await this.passwordInputFieldErrorMessage.waitFor();
        return this.passwordInputFieldErrorMessage.textContent() || '';
    }
    async getLoginPageErrorMessageText() {
        await this.loginPageErrorMessage.waitFor();
        return this.loginPageErrorMessage.textContent() || '';
    }
}
