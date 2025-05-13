/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.js',
        include: ['**/*.test.{js,ts,jsx,tsx}'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**/*.js', 'src/**/*.jsx'],
        },
        threads: true,
        isolate: true,
    },
});
