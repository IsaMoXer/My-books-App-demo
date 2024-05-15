import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebaseConfig.js";
import { readable, writable } from "svelte/store";
import { browser } from "$app/environment";
import { useBookStore, initBooks } from "./books.svelte";

export const authStore = writable({
  user: null,
  isLoading: true,
  data: {},
});

export const authHandlers = {
  signup: async (email, pass) => {
    await createUserWithEmailAndPassword(auth, email, pass);
  },
  login: async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
  },
  logout: async () => {
    await signOut(auth);
    await fetch("/logout");
    clearBooksStore();
    // Clear the books store after logout
  },
};

const clearBooksStore = () => {
  const { books } = useBookStore();
  books.set([]);
  console.log("Cleared the books store after logout");
};

////////////////////////////////////////////////
export const sendJWTToken = async function () {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("Current user in sendJWTToken: ", user);

  if (!user) {
    console.log("No user found from currentUser property!");
    return;
  }

  console.log("currentUser found from sendJWTToken");
  const token = await user.getIdToken(true);
  console.log("Token from client side: ", token);
  await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ token, email: user.email }),
  });
};

export const authStoreRead = readable(
  {
    isActive: false,
    isLoggedIn: false,
    userId: "",
  },
  set => {
    if (browser) {
      onAuthStateChanged(getAuth(), user => {
        if (user) {
          set({ isActive: true, isLoggedIn: true, userId: user.uid });
        } else {
          set({ isActive: false, isLoggedIn: false, userId: "" });
        }
      });
    }
  }
);
