import { afterAll, beforeAll } from 'vitest';

// 設置測試環境
beforeAll(async () => {
	// 確保測試環境使用正確的配置
	process.env['NODE_ENV'] = 'test';
	console.log('🧪 Test environment initialized');
});

afterAll(async () => {
	// 清理資源
	console.log('🧪 Test environment cleaned up');
});
