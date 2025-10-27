import { Locator, Page } from '@playwright/test';
import { PhotoUpload } from './fragments/photoUpload';
import { ContentCards } from './fragments/contentCards';
import { WarningDialog } from './fragments/warningDialog';

export class AlbumDetailsPage {
    readonly page: Page;
    readonly contentCards: ContentCards;
    readonly photoUpload: PhotoUpload;
    readonly warningDialog: WarningDialog;
    readonly uploadPhotoButton: Locator;
    readonly numberOfPhotos: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentCards = new ContentCards(page);
        this.photoUpload = new PhotoUpload(page);
        this.warningDialog = new WarningDialog(page);
        this.uploadPhotoButton = this.page.locator(`//button[text()='Upload Photo']`);
        this.numberOfPhotos = this.page.locator(`//h3[contains(.,'photos')]`);
    }
    async navigateTo(albumId: string) {
        await this.page.goto(`album/detail/${albumId}`);
    }
    async clickUploadPhotoButton() {
        await this.uploadPhotoButton.waitFor();
        await this.uploadPhotoButton.click();
    }
    async uploadImage(photoName: string, photoDescription: string, imagePath: string) {
        await this.photoUpload.uploadPhoto(photoName, photoDescription, imagePath);
    }
    async getPhotoCount() {
        const text = await this.page.locator("//h3[contains(.,'photos')]").innerText();
        const parts = text.split('-');
        const photoPart = parts[parts.length - 1].trim();
        const number = photoPart.split(' ')[0];
        return parseInt(number, 10);
    }
    async deleteImageByName(photoName: string) {
        await this.numberOfPhotos.waitFor();
        await this.numberOfPhotos.click();
        await this.contentCards.deleteContentCardByName(photoName);
    }
    async confirmDeletionInDialog() {
        await this.warningDialog.confirmDeletion();
    }
}
