import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: ['node_modules/', 'dist/', '*.config.*', 'src/index.ts'],
		},
		setupFiles: ['./src/test/setup.ts'],
		testTimeout: 10000,
	},
	resolve: {
		alias: {
			'@': new URL('./src', import.meta.url).pathname,
		},
	},
});
