import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export const DELETE = async ({ params }) => {
  //const { id } = params;
  const id = params.id;

  const docRef = doc(db, "books", id);

  await deleteDoc(docRef);

  console.log("Book deleted successfully!");

  return json({ message: "Book deleted successfully" }, { status: 200 });
};

/* import { json } from "@sveltejs/kit";
import { db } from "$lib/firebase/firebaseConfig.js";
import { deleteDoc, doc } from "firebase/firestore";
import { authStore } from "../../../../stores/authStore.js";

export const DELETE = async ({ params }) => {
  const { id } = params;
  const user = authStore.user;

  if (!user) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const userDocRef = doc(db, "users", user.uid);
  const booksCollectionRef = collection(userDocRef, "books");
  const bookDocRef = doc(booksCollectionRef, id);

  await deleteDoc(bookDocRef);

  console.log("Book deleted successfully!");

  return json({ message: "Book deleted successfully" }, { status: 200 });
};
 */
