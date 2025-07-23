import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: {
            host: 'localhost'
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor dependencies
                    vendor: ['react', 'react-dom'],
                    // Chart.js related
                    charts: ['chart.js', 'react-chartjs-2'],
                    // UI components
                    ui: ['@headlessui/react', 'react-icons'],
                    // Editor
                    editor: ['@uiw/react-md-editor'],
                    // Router
                    router: ['react-router-dom'],
                    // Utilities
                    utils: ['axios', 'date-fns']
                }
            }
        },
        chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB
        target: 'esnext',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    }
});
