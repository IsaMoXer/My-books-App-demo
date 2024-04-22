import admin from "firebase-admin";
import serviceAccount from "$lib/firebase/firebase-secret.server.json";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();