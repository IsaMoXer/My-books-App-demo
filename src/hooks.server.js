import { auth } from "$lib/firebase/firebase.server.js";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  const protectRoutes = ["/dashboard", "/api/books"];
  //const guessRoutes = ["/"];

  try {
    event.locals.user = await getFirebaseUser(event.cookies.get("jwt"));
  } catch (error) {
    event.locals.user = null;
  }

  const user = event.locals?.user;
  const url = event.url;
  console.log("User from Firebase: ", user);
  if (url.pathname !== "/") {
    if (!user && protectRoutes.find(u => url.pathname.indexOf(u) > -1)) {
      console.log("User not logged in trying to access protected routes!");
      //throw redirect(302, `/?redirect=${url.pathname}`);
      throw redirect(302, "/");
    }
    /*   if (user && guessRoutes.find(u => url.pathname.indexOf(u) > -1)) {
      throw redirect(302, "/dashboard");
    } */
  }

  const response = await resolve(event);

  return response;
}

async function getFirebaseUser(token) {
  if (!token) {
    return null;
  }

  const decodedToken = await auth.verifyIdToken(token, true);
  const user = await auth.getUser(decodedToken.uid);

  return {
    id: user.uid,
    email: user.email,
  };
}
