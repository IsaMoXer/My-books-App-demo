import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebaseConfig.js";

export const authStore = writable({
  user: null,
  loading: true,
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
  },
};

////////////////////////////////////////////////
export const sendJWTToken = async function () {
  const auth = getAuth();
  const user = auth.currentUser;
  //console.log("Current user: ", user);

  if (!user) {
    return;
  }

  const token = await user.getIdToken(true);
  //console.log("Token from client side: ", token);
  await fetch("/token", {
    method: "POST",
    body: JSON.stringify({ token, email: user.email }),
  });
};
