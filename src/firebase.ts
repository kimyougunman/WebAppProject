import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY,
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: metaEnv.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let firebaseApp;
let firestoreDb;
let fireSecurityAuth;
let firebaseStorage;

try {
  if (isFirebaseConfigured) {
    firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    firestoreDb = getFirestore(firebaseApp);
    fireSecurityAuth = getAuth(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);

    // Validate connection to Firestore on initialization
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(firestoreDb, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn("Please check your Firebase network/configuration.");
        }
      }
    };
    testConnection();
  } else {
    console.warn("Firebase is not fully configured, falling back to local simulation mode.");
  }
} catch (err) {
  console.error("Failed to initialize Firebase SDK:", err);
}

export const app = firebaseApp;
export const db = firestoreDb;
export const auth = fireSecurityAuth;
export const storage = firebaseStorage;
