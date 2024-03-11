import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { deleteDoc, doc } from "firebase/firestore";

export const DELETE = async ({ params }) => {
  //const { id } = params;
  const id = params.id;

  const docRef = doc(db, "books", id);

  await deleteDoc(docRef);

  console.log("Book deleted successfully!");

  return json({ message: "Book deleted successfully" }, { status: 200 });
};
