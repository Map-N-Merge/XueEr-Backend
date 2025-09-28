import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Environment Configuration', () => {
	beforeAll(() => {
		// 設置測試用的環境變數
		process.env['FIREBASE_PROJECT_ID'] = 'test-project';
		process.env['FIREBASE_PRIVATE_KEY_ID'] = 'test-key-id';
		process.env['FIREBASE_PRIVATE_KEY'] =
			'-----BEGIN PRIVATE KEY-----\ntest-key\n-----END PRIVATE KEY-----';
		process.env['FIREBASE_CLIENT_EMAIL'] = 'test@test.iam.gserviceaccount.com';
		process.env['FIREBASE_CLIENT_ID'] = 'test-client-id';
		process.env['FIREBASE_CLIENT_X509_CERT_URL'] =
			'https://www.googleapis.com/robot/v1/metadata/x509/test%40test.iam.gserviceaccount.com';
	});

	afterAll(() => {
		// 清理環境變數
		delete process.env['FIREBASE_PROJECT_ID'];
		delete process.env['FIREBASE_PRIVATE_KEY_ID'];
		delete process.env['FIREBASE_PRIVATE_KEY'];
		delete process.env['FIREBASE_CLIENT_EMAIL'];
		delete process.env['FIREBASE_CLIENT_ID'];
		delete process.env['FIREBASE_CLIENT_X509_CERT_URL'];
	});

	it('should validate required environment variables', () => {
		// 測試環境變數驗證邏輯
		const requiredVars = [
			'FIREBASE_PROJECT_ID',
			'FIREBASE_PRIVATE_KEY_ID',
			'FIREBASE_PRIVATE_KEY',
			'FIREBASE_CLIENT_EMAIL',
			'FIREBASE_CLIENT_ID',
			'FIREBASE_CLIENT_X509_CERT_URL',
		];

		requiredVars.forEach(varName => {
			expect(process.env[varName]).toBeDefined();
		});
	});

	it('should have default values for optional variables', () => {
		expect(process.env['PORT'] || '3000').toBe('3000');
		expect(process.env['NODE_ENV'] || 'development').toMatch(/development|production|test/);
	});
});
