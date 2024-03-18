import { json } from "@sveltejs/kit";
import { db } from "../../../lib/firebase/firebaseConfig.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// collection reference
const colRef = collection(db, "books");

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
