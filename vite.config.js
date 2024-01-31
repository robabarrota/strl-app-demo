/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { resolve } from 'path';

export default defineConfig(() => ({
	build: {
		outDir: 'build',
	},
	plugins: [
		react(),
		eslint({
			cache: false,
			include: ['./src/**/*.js', './src/**/*.jsx'],
			exclude: [],
		}),
	],
	resolve: {
		alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
	},
}));
