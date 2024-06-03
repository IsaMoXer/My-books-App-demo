import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_KEY
);

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
