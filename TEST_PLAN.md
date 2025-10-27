# Test Plan (Photo Gallery)

---

## 1. Functionality Overview

The key functionalities of the **Photo Gallery** application are as follows:

- **User registration / login** – Enables users to sign up and log into their accounts.  
- **Password recovery** – Allows users to recover their accounts.  
- **Photo album / photo management** – Enables users to manage their albums (Create, Delete, Upload, View) or photos (View, Delete).  
- **Photo upload** – Core feature of the application, allowing users to upload, rename, and describe their photos.  
- **Search** – Enables users to find photos either through **infinite scroll** or **keyword-based search**.

---

## 2. Automation Priority

The following scenarios are prioritized for automation, based on their importance and complexity:

| Test Scenario | Priority | Notes |
|----------------|-----------|-------|
| **User registration (Positive flow)** | Low | Critical feature with potentially high usage, but should remain manual due to importance of UI/UX evaluation, which automation cannot assess effectively. |
| **User registration (Negative flow)** | High | Critical feature with many combinations; strong candidate for automation after manual verification of stability. |
| **User login (Positive and Negative flow)** | High | Critical and frequently used; once stable, can be fully automated to save time and support E2E testing. |
| **Password recovery (Positive and Negative flow)** | Low | Critical but infrequently used; involves 3rd-party/external services (e.g., Gmail, Outlook) with anti-bot systems that cause flakiness. |
| **Album creation / Deletion** | High | Core feature, simple actions, frequently used; should be automated for use in complex E2E tests. |
| **Photo upload (Positive and Negative flow)** | High | Core and frequently used feature; after manual validation, can be fully automated to free time for exploratory testing. |
| **Photo deletion** | High | Core feature, frequently used; suitable for automation after initial manual verification. |
| **Search** | Medium / Low | Core and frequently used; can be automated later once search behavior is clearly defined. Manual testing currently sufficient for coverage. |

---

## 3. Test Strategy

### 3.1 Approach to Testing

Testing will be performed in multiple stages using a combination of **manual** and **automated** testing.

The **primary focus** will be on **web testing**, with **mobile testing** being a secondary focus to be performed if time constraints allow.  
The **primary browser** used for testing will be **Google Chrome**, while other browsers will be tested on **secondarily**, depending on time availability.


#### Types of Testing

- **Functional Testing:**  
  - End-to-End (E2E) Testing  
  - Exploratory Testing  
  - Ad-hoc Testing  

- **Non-Functional Testing:**  
  - UI/UX Testing  
  - Security Testing *(limited scope)*  
  - Performance Testing *(limited scope)*

---

### 3.2 Tools

| Category | Tools |
|-----------|--------|
| **Automation** | Playwright(TypeScript) |
| **Manual Testing** | Google Chrome (including DevTools)|
| **Bug Tracking** | GitIssues |

---

### 3.3 Test Environment

Testing will be conducted on the **live application** (presumed).  
Test data will consist of both **mock data** and **real data** (with user consent).

---

## 4. Conclusion

The purpose of this **short test plan** is to provide a fast and effective overview of the main functionalities, testing types, and automation priorities for the Photo Gallery application.

> *The short version of the Test Plan is in use until the detailed Test Plan is drafted.*




