// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
	plugins: {
		import: importPlugin,
		'unused-imports': unusedImports,
	},
	rules: {
		// TypeScript rules
		'@typescript-eslint/no-unused-vars': 'off', // We use unused-imports plugin instead
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-inferrable-types': 'error',

		// Import rules
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],

		// Unused imports rules
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],

		// General rules
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'prefer-const': 'error',
		'no-var': 'error',
	},
});
