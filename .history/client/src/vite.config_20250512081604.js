/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // 👈 Add this
        globals: true,
        setupFiles: './src/setupTests.js', // Optional for additional setup
    },
});