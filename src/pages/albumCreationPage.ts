import { Locator, Page } from '@playwright/test';
import { PhotoUpload } from './fragments/photoUpload';

export class AlbumCreationPage {
    readonly page: Page;
    readonly photoUpload: PhotoUpload;
    //Album creation
    readonly albumNameInputField: Locator;
    readonly albumDescriptionInputField: Locator;
    readonly saveAlbumButton: Locator;
    //Album cover upload
    readonly photoUploadSection: Locator;

    constructor(page: Page) {
        this.page = page;
        this.photoUpload = new PhotoUpload(page);
        this.albumNameInputField = this.page.locator(`//div[./label[text()='Album Name']]/input`);
        this.albumDescriptionInputField = this.page.locator(`//div[./label[text()='Description']]/textarea`);
        this.saveAlbumButton = this.page.locator(`//button[text()='Save album']`);
        this.photoUploadSection = this.page.locator(`//div[text()='Click to upload cover image']`);
    }
    async navigateTo() {
        await this.page.goto(`album/create`);
    }
    async enterAlbumName(albumName: string) {
        await this.albumNameInputField.waitFor();
        await this.albumNameInputField.fill(albumName);
    }
    async enterAlbumDescription(description: string) {
        await this.albumDescriptionInputField.waitFor();
        await this.albumDescriptionInputField.fill(description);
    }
    async clickSaveAlbumButton() {
        await this.saveAlbumButton.waitFor();
        await this.saveAlbumButton.click();
    }
    async clickPhotoUploadSection() {
        await this.photoUploadSection.waitFor();
        await this.photoUploadSection.click();
    }
    async uploadImage(imagePath: string) {
        await this.photoUpload.uploadImage(imagePath);
    }
    async enterAlbumCoverName(photoName: string) {
        await this.photoUpload.enterImageName(photoName);
    }
    async enterAlbumCoverDescription(photoDescription: string) {
        await this.photoUpload.enterImageDescription(photoDescription);
    }
    async clickUploadButton() {
        await this.photoUpload.clickUploadButton();
    }
}
