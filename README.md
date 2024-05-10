# SvelteKit Firebase App

This is a SvelteKit app that uses Firebase and Firebase Admin for backend functionality.

## Prerequisites

- Node.js (version 14 or higher)
- Git

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
```

### Navigate to the Project Directory

```bash
cd your-repo
```

### Install Dependencies

```bash
npm install
```

### Install Firebase and Firebase Admin

```bash
npm install firebase
npm install firebase-admin
```

### Configure Firebase

- Add your Firebase SDK configuration details to your SvelteKit app.

### Configure Firebase Admin

- Initialize Firebase Admin with the necessary credentials and settings.

### Start the Development Server

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

You can also find a deployed version of the app in this address (not the final version!):

> [My Book App](https://book-svelte-firebase-vercel.vercel.app/)
