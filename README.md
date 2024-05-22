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

## Documentation for Book Tracking App

### App Name: My Books App

#### Overview:

My Books App is a book tracking application built with Tailwind CSS, Svelte, SvelteKit, and Firebase Backend as a Service (BaaS). It allows users to keep track of the books they have read, maintain a favorites list, and add descriptions for each book. The app follows the CRUD (Create, Read, Update, Delete) operations for managing book data and utilizes its own API to interact with the Firebase database.

#### Features:

1. **Add New Book:**

   - Users can add new books to their collection through a form that includes fields for title, author, number of pages, isbn, image of the cover using a url, description, and the option to mark it as a favorite.

2. **View Book Details:**

   - Each book added can be viewed individually, displaying all the book's information such as title, author, number of pages, isbn, image url, and description.

3. **Update and Delete Books:**

   - Users have the ability to update existing book details or delete books from their collection.

4. **User Authentication:**

   - My Books App provides user registration and login functionality using Firebase Authentication, ensuring secure access to user-specific data.
   - During registration and login, the app validates the email and password inputs to ensure they meet certain criteria (e.g., valid email format, minimum password length).

5. **Folder Structure Navigation:**

   - The app's menu allows users to navigate to different pages like Home, About, and Contact, organized using the folder structure Svelte uses as a router.

6. **Responsive Design with Tailwind CSS:**
   - My Books App features a responsive design that adapts to various screen sizes, providing an optimal viewing experience on desktops, tablets, and mobile devices.
   - Tailwind CSS is used for styling the app, offering a utility-first approach to design and ensuring consistency and flexibility in the app's appearance.

#### API Integration:

- My Books App interacts with Firebase BaaS through its own API to store and retrieve book data, ensuring seamless data management and synchronization.

#### Technologies Used:

- Svelte: Frontend framework for building reactive web applications.
- SvelteKit: Framework for building Svelte applications with server-side rendering and routing capabilities.
- Firebase BaaS: Backend service for managing user authentication and database operations.
- Tailwind CSS: Utility-first CSS framework for building responsive and customizable designs.

## Book API Endpoints

### Create Book

- **Endpoint**: `/api/books`
- **Method**: POST
- **Description**: Adds a new book to the user's collection
- **Request Body**:
  - title (string, required)
  - author (string, required)
  - number of pages (number, optional)
  - isbn (string, optional)
  - cover_url (string, optional)
  - description (string, optional)
  - isFavorite (boolean, false as default)

### Read Books

- **Endpoint**: `/api/books`
- **Method**: GET
- **Description**: Retrieves all books for the authenticated user

### Update Book

- **Endpoint**: `/api/books/{id}`
- **Method**: PATCH
- **Description**: Updates an existing book
- **Path Parameter**:
  - id (string) - ID of the book to update
- **Request Body**:
  - title (string, optional)
  - author (string, optional)
  - number of pages (number, optional)
  - isbn (string, optional)
  - cover_url (string, optional)
  - description (string, optional)

### Delete Book

- **Endpoint**: `/api/books/{id}`
- **Method**: DELETE
- **Description**: Deletes a book from the user's collection
- **Path Parameter**:
  - id (string) - ID of the book to delete

These API endpoints should be implemented in the `routes/api/books/+server.js` file and/or in the `routes/api/books/[id]/+server.js` file of the app's folder structure, as mentioned in the provided documentation. The API will handle the CRUD operations and interact with the Firebase database to store and retrieve book data for each authenticated user.

#### User Authentication Validation

- **Email Validation**: The app checks if the provided email is in a valid format (e.g., contains "@" and ".") and is not already registered.
- **Password Validation**: The app ensures that the password meets certain requirements, such as a minimum length of 8 characters, at least one uppercase letter, one lowercase letter, and one number.

#### Conclusion:

My Books App is a user-friendly book tracking app that offers essential features for managing a personal library, integrating Firebase for data storage and user authentication. With its intuitive interface and robust functionality, this app provides a seamless experience for book enthusiasts to organize and track their reading journey.
