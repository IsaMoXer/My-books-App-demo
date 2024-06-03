import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

// collection reference
const colRef = collection(db, "books");

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
  });
  return json(booksDB);
}

export const POST = async ({ request, locals }) => {
  const body = await request.json();
  if (!body.name || !body.author) {
    return json({ error: "Missing required fields" }, { status: 400 });
  }

  let coverUrl = "";
  try {
    // Attempt to load the provided cover image
    await fetch(body.cover_url);
    coverUrl = body.cover_url;
  } catch (error) {
    // If the image fails to load, use a default image URL
    coverUrl = "images/missing_cover.png";
  }

  const book = {
    name: body.name,
    author: body.author,
    pages: body.pages || null,
    isbn: body.isbn || "",
    cover_url: coverUrl,
    description: body.description || "",
    user_id: locals.user?.id,
    isFavourite: body.isFavourite || false,
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
