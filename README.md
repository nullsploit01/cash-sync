# CashSync

## An expense tracker app. (Clone of [Cashbook](https://cashbook.in/))

### About The Project

CashSync is a comprehensive expense tracker app designed to help you manage your expenses across multiple clients. Inspired by Cashbook, CashSync offers robust features and seamless synchronization, ensuring your financial records are always up-to-date and accessible.

#### Features

- **User Authentication**: Secure and easy authentication with [Clerk](https://clerk.com/)
- **Expense Books**: Create and manage multiple expense books.
- **Entries Management**: Add and organize entries within each expense book
- **Cross-Platform Sync**: Keep your expenses synchronized across multiple devices.

#### Technology Stack

- **Backend**: Golang
- **Database**: Google Firestore
- **Client**: React Native, Expo (for Android App)

#### Getting Started

- **Requirements**

  - Go
  - NodeJs >= v20.x
  - Clerk Private and public keys
  - Google cloud service account keys

- **Installation**

  - Clone repository
    ```sh
    git clone https://github.com/nullsploit01/cash-sync.git
    cd cash-sync
    ```
  - **_Server setup_**

    - `cd server`
    - Update following parameters of `conf/config.yaml`

    ```
    firestoreServiceAccountKeysLocation: 'YOUR_GOOGLE_SERVICE_ACCOUNT_CREDENTIALS'
    clerkApiKey: 'YOUR_CLERK_PRIVATE_KEY'
    ```

    - Run the following command to start the application

    ```sh
    go run .
    ```

    - For hot reloading, update `.air.toml` as required and running the following command

    ```sh
    air
    ```

  - **_App setup_**
    - cd app
    - Install packages
    ```sh
    npm install
    ```
    - Add an `.env.local` with the following parameters
    ```sh
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_EXPO_PUBLIC_KEY
    EXPO_PUBLIC_API_URL=YOUR_LOCAL_SERVER_URL
    ```
    - Start the application
    ```sh
    npm start
    ```
