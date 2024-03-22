import { json } from "@sveltejs/kit";
import { auth } from "$lib/firebase/firebase.server";

export async function POST({ request, cookies }) {
  const { token, email } = await request.json();

  try {
    const verifiedToken = await auth.verifyIdToken(token ?? "", true);

    if (verifiedToken.email === email) {
      cookies.set("jwt", token, {
        maxAge: verifiedToken.exp - Date.now() / 1000,
        path: "/",
      });

      return json({ message: "success" }, { status: 200 });
    }
  } catch (error) {
    console.error(
      "Error occurred during token verification or cookie setting:",
      error
    );
    return json({ message: "Access Denied" }, { status: 403 });
  }
}
