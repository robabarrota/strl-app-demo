module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: ['airbnb-base', 'prettier', 'plugin:react/recommended'],
	plugins: ['prettier', 'react'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	// parserOptions: {
	// 	ecmaVersion: 'latest',
	// 	sourceType: 'module',
	// },
	rules: {
		'class-methods-use-this': 'off',
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
		'import/extensions': 0,
		// indent: ['error', 'tab', { SwitchCase: 1 }],
		indent: 'off',
		'prettier/prettier': 'error',
		'consistent-return': 'off',
		'no-restricted-syntax': 'off',
		'no-plusplus': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/prop-types': 0,
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
			},
			// alias: {
			// 	map: [['@', path.resolve(__dirname, './src')]],
			// 	extensions: ['.js', '.jsx'],
			// },
			jsconfig: {
				config: 'jsconfig.json',
			},
		},
	},
};
