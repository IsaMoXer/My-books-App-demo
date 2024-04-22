import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
//import { db } from "$lib/firebase/firebase.server.js";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

// collection reference
const colRef = collection(db, "books");
//const colRef = db.collection("books");

let booksDB = [];

export async function GET({ locals }) {
  let userId = locals.user?.id;

  onSnapshot(colRef, snapshot => {
    // Clear the booksDB array before appending new documents
    booksDB = [];
    snapshot.docs.forEach(doc => {
      const bookData = doc.data();
      if (bookData.user_id && bookData.user_id === userId) {
        booksDB.push({ ...bookData, id: doc.id });
      }
    });
    console.log(
      "Books fetched when change on database detected (server side)!"
    );
  });
  return json(booksDB);
}

export const POST = async ({ request, locals }) => {
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
    user_id: locals.user?.id,
    isFavourite: body.isFavourite,
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
