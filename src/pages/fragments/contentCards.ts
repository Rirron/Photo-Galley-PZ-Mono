import { Page } from '@playwright/test';

export class ContentCards {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async getFirstContentCard() {
        await this.page.locator(`//div[contains(@class,'display')]`).first().waitFor();
        return this.page.locator(`//div[contains(@class,'display')]`).first();
    }
    async getNameOfFirstContentCard() {
        await this.page.locator(`//div[contains(@class,'display')]`).first().waitFor();
        return this.page.locator(`//div[contains(@class,'display')]//strong`).first().innerText();
    }
    async getContentCardByName(contentName: string) {
        return await this.getContentCardByNameOrImageId(contentName);
    }
    async hoverContentCardByName(contentName: string) {
        (await this.getContentCardByName(contentName)).hover();
    }
    async clickContentCardDeleteButton(contentName: string) {
        const contentCard = await this.getContentCardByName(contentName);
        await contentCard.locator("//button[text()='Delete']").waitFor();
        await contentCard.locator("//button[text()='Delete']").click();
    }
    async deleteContentCardByName(contentName: string) {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle');
        await this.hoverContentCardByName(contentName);
        await this.clickContentCardDeleteButton(contentName);
    }
    async getContentCardByNameOrImageId(identifier: string) {
        const albumLocator = this.page.locator(`//div[contains(@class,'display')][contains(., '${identifier}')]`);
        const imageLocator = this.page.locator(`//div[contains(@class,'thumbnail__img')][contains(@style,'${identifier}')]`);

        let locator;

        if (await imageLocator.first().isVisible()) {
            let temp = await this.page.locator(`//div[contains(@class,'thumbnail__img')][contains(@style,'${identifier}')]/../..`);
            locator = temp.first();
        } else if (await albumLocator.first().isVisible()) {
            locator = albumLocator.first();
        } else {
            throw new Error(`No album or image found for identifier: ${identifier}`);
        }
        return locator;
    }
}
