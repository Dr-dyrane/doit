import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Doit - To-Do List App',
        short_name: 'Doit',
        description: 'A minimalist to-do list app',
        start_url: '/',
        background_color: '#374151', // Customize to your background color (e.g., slate-300)
        theme_color: '#8B5CF6', // Customize to your accent color (e.g., purple-600)
        display: 'standalone',
        icons: [
          {
            src: '/doit.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/doit.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Customize your service worker behavior here if needed
      },
    }),
  ],
  // ... other Vite configuration options
});
