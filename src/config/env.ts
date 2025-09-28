import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

const envSchema = z.object({
	// Server Configuration
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

	// Firebase Configuration
	FIREBASE_PROJECT_ID: z.string().min(1, 'Firebase project ID is required'),
	FIREBASE_PRIVATE_KEY_ID: z.string().min(1, 'Firebase private key ID is required'),
	FIREBASE_PRIVATE_KEY: z
		.string()
		.min(1, 'Firebase private key is required')
		.refine(
			val =>
				val.includes('-----BEGIN PRIVATE KEY-----') &&
				val.includes('-----END PRIVATE KEY-----'),
			'Firebase private key must be in valid PEM format'
		),
	FIREBASE_CLIENT_EMAIL: z.string().email('Firebase client email must be a valid email'),
	FIREBASE_CLIENT_ID: z.string().min(1, 'Firebase client ID is required'),
	FIREBASE_AUTH_URI: z.string().url().default('https://accounts.google.com/o/oauth2/auth'),
	FIREBASE_TOKEN_URI: z.string().url().default('https://oauth2.googleapis.com/token'),
	FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z
		.string()
		.url()
		.default('https://www.googleapis.com/oauth2/v1/certs'),
	FIREBASE_CLIENT_X509_CERT_URL: z.string().url(),

	// CORS Configuration
	CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

const parseEnv = (): z.infer<typeof envSchema> => {
	try {
		return envSchema.parse(process.env);
	} catch (error) {
		console.error('❌ Invalid environment variables:');
		if (error instanceof z.ZodError) {
			error.issues.forEach(err => {
				console.error(`  - ${err.path.join('.')}: ${err.message}`);
			});
		}
		console.error(
			'Please check your .env file and ensure all required variables are set correctly.'
		);
		process.exit(1);
	}
};

export const env = parseEnv();

// Export typed environment variables
export const config = {
	server: {
		port: env.PORT,
		nodeEnv: env.NODE_ENV,
		isDevelopment: env.NODE_ENV === 'development',
		isProduction: env.NODE_ENV === 'production',
	},
	firebase: {
		projectId: env.FIREBASE_PROJECT_ID,
		privateKeyId: env.FIREBASE_PRIVATE_KEY_ID,
		privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines
		clientEmail: env.FIREBASE_CLIENT_EMAIL,
		clientId: env.FIREBASE_CLIENT_ID,
		authUri: env.FIREBASE_AUTH_URI,
		tokenUri: env.FIREBASE_TOKEN_URI,
		authProviderX509CertUrl: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		clientX509CertUrl: env.FIREBASE_CLIENT_X509_CERT_URL,
	},
	cors: {
		origins: env.CORS_ORIGINS.split(',').map(origin => origin.trim()),
	},
} as const;
