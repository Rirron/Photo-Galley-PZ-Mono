# Foto-galerija-prakticni-zadatak---Mono

To run the tests locally:
1. Clone the repository
2. Run the following commands:
npm ci
npx playwright install chromium
3. To execute tests, run:
npx playwright test --headed

Tests included are:
1. Checking error messages in case of empty input fields
2. Checking login with invalid credentials
3. Checking login with valid credentials
4. Creating new album
5. Uploading photo to newly created album
6. Deleting newly created photo from album
7. Deleting the newly created album

Before executing tests, some test data configuration is needed.
Inside /tests/data/testData.ts
Change the following:

1. Add username, password, userId in: 

```json
{
  "automationUser": {
    "username": "",
    "password": "",
    "userId": ""
  },
  "credentials": {
    "valid": { "username": "", "password": "" },
    "invalid": { "username": "bad-user", "password": "bad-pass" }
  }
}
```
UserId can be found in the url bar, after logging in, on the profile page:
https://demo.baasic.com/angular/starterkit-photo-gallery/profile/userID

