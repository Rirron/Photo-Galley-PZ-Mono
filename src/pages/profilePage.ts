import { Locator, Page } from '@playwright/test';
import { testData } from '../../tests/data/testData';
import { ContentCards } from './fragments/contentCards';
import { WarningDialog } from './fragments/warningDialog';

export class ProfilePage {
    readonly page: Page;
    readonly contentCards: ContentCards;
    readonly warningDialog: WarningDialog;
    readonly createAlbumButton: Locator;
    readonly loggedInUsername: Locator;
    readonly numberOfAlbums: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentCards = new ContentCards(page);
        this.warningDialog = new WarningDialog(page);
        this.createAlbumButton = this.page.locator(`//button[text()='Create Album']`);
        this.loggedInUsername = this.page.locator(`//h2[text()='${testData.automationUser.username}']`);
        this.numberOfAlbums = this.page.locator(`//span[contains(.,'album')]`);
    }
    async navigateTo() {
        await this.page.goto(`profile/${testData.automationUser.userId}`);
        await this.loggedInUsername.waitFor();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async clickCreateAlbumButton() {
        await this.createAlbumButton.waitFor();
        await this.createAlbumButton.click();
    }
    async getLoggedInUsernameText() {
        await this.loggedInUsername.waitFor();
        return this.loggedInUsername.textContent() || '';
    }
    async getAlbumCount() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        try {
            (await this.contentCards.getFirstContentCard()).waitFor();
        } catch (e) {
        }
        await this.numberOfAlbums.waitFor();
        const text = await this.numberOfAlbums.innerText();
        return parseInt(text.split(' ')[0]);
    }
    async selectAlbumByName(albumName: string) {
        (await this.contentCards.getContentCardByName(albumName)).click();
    }
    async hoverOnAlbum(albumName: string) {
        await this.loggedInUsername.waitFor();
        await this.loggedInUsername.click();
        await this.contentCards.hoverContentCardByName(albumName);
    }
    async deleteAlbum(albumName: string) {
        await this.contentCards.deleteContentCardByName(albumName);
    }
    async confirmAlbumDeletion() {
        await this.warningDialog.confirmDeletion();
    }
    async cancelAlbumDeletion() {
        await this.warningDialog.cancelDeletion();
    }
    async getLastAlbum() {
        return await this.contentCards.getNameOfFirstContentCard();
    }
}
