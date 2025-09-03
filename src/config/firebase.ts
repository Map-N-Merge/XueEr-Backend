import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
// import { getDatabase } from 'firebase-admin/database';

import { config } from './env';

// Initialize Firebase Admin SDK
const serviceAccount = {
	type: 'service_account',
	project_id: config.firebase.projectId,
	private_key_id: config.firebase.privateKeyId,
	private_key: config.firebase.privateKey,
	client_email: config.firebase.clientEmail,
	client_id: config.firebase.clientId,
	auth_uri: config.firebase.authUri,
	token_uri: config.firebase.tokenUri,
	auth_provider_x509_cert_url: config.firebase.authProviderX509CertUrl,
	client_x509_cert_url: config.firebase.clientX509CertUrl,
};

// Initialize the app only if it hasn't been initialized already
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
		projectId: config.firebase.projectId,
		// Uncomment the next line if you want to use Realtime Database
		// databaseURL: `https://${config.firebase.projectId}-default-rtdb.firebaseio.com/`,
	});
}

// Export Firebase services
export const firebaseAdmin = admin;
export const auth = admin.auth();
export const firestore = getFirestore();

// Export Realtime Database (uncomment if needed)
// export const realtimeDb = getDatabase();

export default admin;
