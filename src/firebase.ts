import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebaseAppletConfig from '../firebase-applet-config.json';

const configApiKey = import.meta.env.VITE_FIREBASE_API_KEY || firebaseAppletConfig.apiKey;
const configAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain;
const configProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId;
const configStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket;
const configMessagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId;
const configAppId = import.meta.env.VITE_FIREBASE_APP_ID || firebaseAppletConfig.appId;

export const missingFirebaseKeys = [
  !configApiKey && 'VITE_FIREBASE_API_KEY',
  !configAuthDomain && 'VITE_FIREBASE_AUTH_DOMAIN',
  !configProjectId && 'VITE_FIREBASE_PROJECT_ID',
  !configStorageBucket && 'VITE_FIREBASE_STORAGE_BUCKET',
  !configMessagingSenderId && 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  !configAppId && 'VITE_FIREBASE_APP_ID'
].filter((k): k is string => !!k);

const firebaseConfig = {
  apiKey: configApiKey,
  authDomain: configAuthDomain,
  projectId: configProjectId,
  storageBucket: configStorageBucket,
  messagingSenderId: configMessagingSenderId,
  appId: configAppId,
};

export const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let firebaseApp: any = null;
let firestoreDb: any = null;
let fireSecurityAuth: any = null;
let firebaseStorage: any = null;
let initError: Error | null = null;

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
    console.error("Firebase is not fully configured. Cloud synchronization is unavailable.");
  }
} catch (err) {
  console.error("Failed to initialize Firebase SDK:", err);
  initError = err instanceof Error ? err : new Error(String(err));
}

export const app = firebaseApp;
export const db = firestoreDb;
export const auth = fireSecurityAuth;
export const storage = firebaseStorage;
export const firebaseInitError = initError;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMessage = error instanceof Error ? error.message : String(error);
  const currentUser = auth ? auth.currentUser : null;
  
  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: currentUser?.uid || null,
      email: currentUser?.email || null,
      emailVerified: currentUser?.emailVerified || null,
      isAnonymous: currentUser?.isAnonymous || null,
      tenantId: currentUser?.tenantId || null,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  
  console.error('[Firestore Error Connection Debug Log]', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

