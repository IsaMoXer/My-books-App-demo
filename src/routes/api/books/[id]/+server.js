import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const DELETE = async ({ params }) => {
  const id = params.id;

  const docRef = doc(db, "books", id);

  await deleteDoc(docRef);
  return json({ message: "Book deleted successfully" }, { status: 200 });
};

export const PATCH = async ({ request, params }) => {
  const body = await request.json();
  //const { id } = params;
  const id = params.id;

  // Update the book in Firestore
  await updateDoc(doc(db, "books", id), body);

  return json({ message: "Book updated successfully" }, { status: 200 });
};
