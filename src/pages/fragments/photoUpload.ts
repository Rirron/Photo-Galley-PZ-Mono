import { Locator, Page } from '@playwright/test';

export class PhotoUpload {
    readonly page: Page;
    //Album creation
    readonly albumNameInputField: Locator;
    readonly albumDescriptionInputField: Locator;
    readonly saveAlbumButton: Locator;
    //Album cover upload
    readonly photoUploadSection: Locator;
    readonly albumCoverNameInputField: Locator;
    readonly albumCoverDescription: Locator;
    readonly uploadImageButton: Locator;
    readonly uploadButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.albumNameInputField = this.page.locator(`//div[./label[text()='Album Name']]/input`);
        this.albumDescriptionInputField = this.page.locator(`//div[./label[text()='Description']]/textarea`);
        this.saveAlbumButton = this.page.locator(`//button[text()='Save album']`);
        this.photoUploadSection = this.page.locator(`//div[text()='Click to upload cover image']`);
        this.albumCoverNameInputField = this.page.locator(`//div[./label[text()='Photo Name']]/input`);
        this.albumCoverDescription = this.page.locator(`//div[./label[text()='Description']]/textarea`);
        this.uploadImageButton = this.page.locator(`//label[text()='Upload image']`);
        this.uploadButton = this.page.locator(`//button[text()='Upload']`);
    }
    async uploadImage(imagePath: string) {
        await this.uploadImageButton.waitFor();
        await this.uploadImageButton.setInputFiles(imagePath)
    }
    async enterImageName(photoName: string) {
        await this.albumCoverNameInputField.waitFor();
        await this.albumCoverNameInputField.fill(photoName);
    }
    async enterImageDescription(photoDescription: string) {
        await this.albumCoverDescription.waitFor();
        await this.albumCoverDescription.fill(photoDescription);
    }
    async clickUploadButton() {
        await this.uploadButton.waitFor();
        await this.uploadButton.click();
    }
    async uploadPhoto(photoName: string, photoDescription: string, imagePath: string) {
        await this.uploadImage(imagePath);
        await this.enterImageName(photoName);
        await this.enterImageDescription(photoDescription);
        await this.clickUploadButton();
    }
}
