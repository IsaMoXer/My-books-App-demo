import { auth } from "$lib/firebase/firebase.server.js";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  //const protectRoutes = ["/dashboard", "/api/books", "/logout", "/token"];
  const protectRoutes = ["/dashboard", "/api/books"];
  const guessRoutes = ["/"];

  try {
    event.locals.user = await getFirebaseUser(event.cookies.get("jwt"));
    console.log("getting Firebase user...");
  } catch (error) {
    console.log("No user found yet, returning null...");
    event.locals.user = null;
  }

  const user = event.locals.user;
  const url = event.url;
  console.log("User from Firebase: ", user);

  //Possible solution to the infite loop after logging in production
  // skip auth logic on build to prevent infinite redirection in production mode
  //if (process?.env?.BUILD) return resolve(event);

  // If user somwhere else than in the login/registering page:
  if (url.pathname !== "/") {
    // And there is no user logged in trying to access protected routes, redirect to login page
    if (!user && protectRoutes.find(u => url.pathname.indexOf(u) > -1)) {
      console.log("User not logged in trying to access protected routes!");
      return redirect(302, "/");
    }
  }

  /*  if (url.pathname !== "/") {
    if (!user && protectRoutes.some(u => url.pathname.startsWith(u))) {
      console.log("User not logged in trying to access protected routes!");
      return redirect(302, "/");
    }
    if (user && guessRoutes.some(u => url.pathname.startsWith(u))) {
      console.log("Server side, user logged in trying to accees login page");
      //return redirect(302, "/dashboard");
    }
  } */

  const response = await resolve(event);

  return response;
}

async function getFirebaseUser(token) {
  if (!token) {
    console.log("No token received!");
    return null;
  }
  console.log("Token received!");
  const decodedToken = await auth.verifyIdToken(token, true);
  const user = await auth.getUser(decodedToken.uid);

  return {
    id: user.uid,
    email: user.email,
  };
}
