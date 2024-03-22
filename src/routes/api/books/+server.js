import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { authStore } from "../../../stores/authStore.js";

// collection reference
const colRef = collection(db, "books");
const colRefUsers = collection(db, "users");
//const docRef = doc(db, "users", authStore.user.uid);

let booksDB = [];

// real time collection data
onSnapshot(colRef, snapshot => {
  // Clear the booksDB array before appending new documents
  booksDB = [];
  snapshot.docs.forEach(doc => {
    booksDB.push({ ...doc.data(), id: doc.id });
  });
  console.log("Books fetched from Database!");
});

export const GET = async () => {
  return json(booksDB);
};

export const POST = async ({ request }) => {
  const body = await request.json();
  if (!body.name || !body.author) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const book = {
    name: body.name,
    author: body.author,
    pages: body.pages,
    isbn: body.isbn,
    cover_url: body.cover_url,
    description: body.description,
  };

  // Add the book to Firestore
  const docRef = await addDoc(colRef, book);

  // Retrieve the auto-generated ID from the document reference
  const id = docRef.id;

  // Include the auto-generated ID in the book object
  const bookWithId = { ...book, id };

  console.log("Book added with ID:", id);

  // Return the book object with the auto-generated ID
  return json(bookWithId, { status: 200 });
};

/* 
import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
import { authStore } from "../../../stores/authStore.js";

// Collection reference for users
const colRefUsers = collection(db, "users");

let booksDB = [];

// Real-time collection data for books
const fetchBooks = async () => {
  // Clear the booksDB array before appending new documents
  booksDB = [];
  const user = authStore.user;
  console.log("User: ", user);

  if (user) {
    // Create a query to fetch books of the current user
    const userDocRef = doc(colRefUsers, user.uid);
    const booksCollectionRef = collection(userDocRef, "books");
    const booksQuery = query(booksCollectionRef);

    // Subscribe to changes in the "books" subcollection of the current user
    const unsubscribe = onSnapshot(booksQuery, snapshot => {
      snapshot.docs.forEach(doc => {
        booksDB.push({ ...doc.data(), id: doc.id });
      });
      console.log("Books fetched from Database!");
    });

    // Return the unsubscribe function
    return unsubscribe;
  }
};

// Initial fetch of books
fetchBooks();

export const GET = async () => {
  return json(booksDB);
};

export const POST = async ({ request }) => {
  const body = await request.json();
  if (!body.name || !body.author) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  const book = {
    name: body.name,
    author: body.author,
    pages: body.pages,
    isbn: body.isbn,
    cover_url: body.cover_url,
    description: body.description,
  };

  // Ensure there is a logged-in user
  const user = authStore.user;
  if (!user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  // Add the book to Firestore under the "books" subcollection of the current user
  const userDocRef = doc(colRefUsers, user.uid);
  const booksCollectionRef = collection(userDocRef, "books");
  const docRef = await addDoc(booksCollectionRef, book);

  // Retrieve the auto-generated ID from the document reference
  const id = docRef.id;

  // Include the auto-generated ID in the book object
  const bookWithId = { ...book, id };

  console.log("Book added with ID:", id);

  // Return the book object with the auto-generated ID
  return json(bookWithId, { status: 200 });
}; */
