import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue() , 
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets/images', 
          dest: 'assets/', // Destination folder in the build output
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@fingerprintjs/fingerprintjs': '@fingerprintjs/fingerprintjs',
    },
  },
  build: {
    chunkSizeWarningLimit: 100000, // Set the limit to 1000 kB
  },
})
