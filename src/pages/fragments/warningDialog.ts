import { Locator, Page } from '@playwright/test';
import { testData } from '../../../tests/data/testData';

export class WarningDialog {
    readonly page: Page;
    readonly warningDialogRoot: Locator;
    readonly warningDialogDeleteButton: Locator;
    readonly warningDialogCancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.warningDialogRoot = this.page.locator(`//div[@class='modal__dialog']`);
        this.warningDialogDeleteButton = this.warningDialogRoot.locator(`//button[text()='Delete']`);
        this.warningDialogCancelButton = this.warningDialogRoot.locator(`//button[text()='Cancel']`);
    }
    async confirmDeletion() {
        await this.warningDialogDeleteButton.waitFor();
        await this.warningDialogDeleteButton.click();
    }
    async cancelDeletion() {
        await this.warningDialogCancelButton.waitFor();
        await this.warningDialogCancelButton.click();
    }
}
