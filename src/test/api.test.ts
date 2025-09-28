import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import app from '../app';

describe('API Tests', () => {
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
		process.env['CORS_ORIGINS'] = 'http://localhost:3000';
	});

	afterAll(() => {
		// 清理環境變數
		delete process.env['FIREBASE_PROJECT_ID'];
		delete process.env['FIREBASE_PRIVATE_KEY_ID'];
		delete process.env['FIREBASE_PRIVATE_KEY'];
		delete process.env['FIREBASE_CLIENT_EMAIL'];
		delete process.env['FIREBASE_CLIENT_ID'];
		delete process.env['FIREBASE_CLIENT_X509_CERT_URL'];
		delete process.env['CORS_ORIGINS'];
	});

	describe('Health Check', () => {
		it('should return health status', async () => {
			const response = await request(app).get('/health');

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('status', 'ok');
			expect(response.body).toHaveProperty('timestamp');
			expect(response.body).toHaveProperty('uptime');
			expect(response.body).toHaveProperty('environment');
		});
	});

	describe('Test API', () => {
		it('should return API test response', async () => {
			const response = await request(app).get('/api/test');

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('message', 'API is working!');
			expect(response.body).toHaveProperty('timestamp');
		});
	});

	describe('404 Handler', () => {
		it('should return 404 for unknown routes', async () => {
			const response = await request(app).get('/unknown-route');

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty('message', 'Route not found');
			expect(response.body).toHaveProperty('path', '/unknown-route');
		});
	});

	describe('CORS', () => {
		it('should include CORS headers', async () => {
			const response = await request(app)
				.get('/health')
				.set('Origin', 'http://localhost:3000');

			expect(response.headers).toHaveProperty('access-control-allow-origin');
		});
	});

	describe('Security Headers', () => {
		it('should include security headers from helmet', async () => {
			const response = await request(app).get('/health');

			// Helmet 設置的一些基本安全標頭
			expect(response.headers).toHaveProperty('x-content-type-options');
			expect(response.headers).toHaveProperty('x-frame-options');
		});
	});
});
