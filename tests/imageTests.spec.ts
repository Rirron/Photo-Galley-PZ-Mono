// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/loginPage';
import { testData } from './data/testData';
import { ProfilePage } from '../src/pages/profilePage';
import { AlbumCreationPage } from '../src/pages/albumCreationPage';
import { AlbumDetailsPage } from '../src/pages/albumDetailsPage';



test.describe.serial('Image tests', () => {
    let authStatePath = 'tests/data/user.json';
    let albumId: string;

    test.beforeAll(async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        const login = new LoginPage(page);

        await login.navigateTo();
        await login.enterUsername(testData.credentials.valid.username);
        await login.enterPassword(testData.credentials.valid.password);
        await login.clickLoginButton();

        await page.waitForLoadState('networkidle');
        await page.waitForLoadState('domcontentloaded');

        await context.storageState({ path: authStatePath });
        await context.close();

    });

    test.use({ storageState: authStatePath });

    test('Album creation test', async ({ page }) => {
        const profile = new ProfilePage(page);
        const album = new AlbumCreationPage(page);
        let albumCount: number;

        await test.step('Navigate to profile', async () => {
            await profile.navigateTo();
        });

        await test.step('Check album count before creation', async () => {
            albumCount = await profile.getAlbumCount();
        });

        await test.step('Create new album', async () => {
            await profile.clickCreateAlbumButton();
            await album.enterAlbumName(testData.album.name);
            await album.enterAlbumDescription(testData.album.description);
            await album.clickSaveAlbumButton();
            await album.clickPhotoUploadSection();

            const url = page.url();
            albumId = url.split('/upload/')[1].split('/')[0];

            await album.uploadImage(testData.images.albumCover.path);

            await album.enterAlbumCoverName(testData.images.albumCover.name);
            await album.enterAlbumCoverDescription(testData.images.albumCover.description);
            await album.clickUploadButton();
        });

        await test.step('Verify album count after creation', async () => {
            let albumCountAfterDeletion = await profile.getAlbumCount();
            expect(albumCountAfterDeletion).toBe(albumCount + 1);
        });
    });

    test('Image upload test', async ({ page }) => {
        const profile = new ProfilePage(page);
        const albumDetails = new AlbumDetailsPage(page);
        let albumPhotoCount: number;

        await test.step('Navigate to profile', async () => {
            await profile.navigateTo();
        });

        await test.step('Open album', async () => {
            await albumDetails.navigateTo(albumId);
        });
        await test.step('Check photo count', async () => {
            albumPhotoCount = await albumDetails.getPhotoCount();
        });
        await test.step('Upload image', async () => {
            await albumDetails.clickUploadPhotoButton();
            await albumDetails.uploadImage(
                testData.images.albumImage.name,
                testData.images.albumImage.description,
                testData.images.albumImage.path
            );
        });
        await test.step('Check photo count after photo upload', async () => {
            let albumPhotoCountAfterUpload = await albumDetails.getPhotoCount();
            expect(albumPhotoCountAfterUpload).toBe(albumPhotoCount + 1);
        });
    });

    test('Image deletion test', async ({ page }) => {
        const profile = new ProfilePage(page);
        const albumDetails = new AlbumDetailsPage(page);
        let albumPhotoCount: number;

        await test.step('Navigate to profile', async () => {
            await profile.navigateTo();
        });
        await test.step('Open album', async () => {
            await albumDetails.navigateTo(albumId);
        });
        await test.step('Check photo count', async () => {
            albumPhotoCount = await albumDetails.getPhotoCount();
        });
        await test.step('Delete photo', async () => {
            await albumDetails.deleteImageByName(testData.timestamp.toString());
            await albumDetails.confirmDeletionInDialog();
        });
        await test.step('Check photo count after deletion', async () => {
            let albumPhotoCountAfterDeletion = await albumDetails.getPhotoCount();
            expect(albumPhotoCountAfterDeletion).toBe(albumPhotoCount - 1);
        });
    });

    test('Album deletion test', async ({ page }) => {
        const profile = new ProfilePage(page);
        let albumCount: number;

        await test.step('Navigate to profile', async () => {
            await profile.navigateTo();
        });

        await test.step('Check album count', async () => {
            albumCount = await profile.getAlbumCount();
        });

        await test.step('Delete album', async () => {
            await profile.deleteAlbum(await profile.getLastAlbum());;
        });

        await test.step('Verify album count after deletion', async () => {
            let albumCountAfterDeletion = await profile.getAlbumCount();
            expect(albumCountAfterDeletion).toBe(albumCount - 1);
        });

    });

});
