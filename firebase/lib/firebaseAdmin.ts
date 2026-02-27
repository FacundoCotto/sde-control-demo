import admin from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
}
export const adminAuth = admin.auth();
export const adminDb = admin.database();
