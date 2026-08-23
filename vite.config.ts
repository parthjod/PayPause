import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /\/models\/.+\.onnx$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'onnx-models',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      manifest: {
        name: 'PayPause',
        short_name: 'PayPause',
        description: 'Check suspicious UPI messages and QR codes before you act — in plain language, in seconds.',
        theme_color: '#050c14',
        background_color: '#050c14',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        share_target: {
          action: '/check',
          method: 'GET',
          params: { text: 'text' },
        },
      },
    }),
  ],
  worker: { format: 'es' },
  optimizeDeps: { exclude: ['onnxruntime-web'] },
  css: {
    postcss: {},
  },
});
