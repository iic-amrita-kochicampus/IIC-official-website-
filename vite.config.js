import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), tailwindcss(), visualizer({ open: false, filename: 'dist/stats.html' })],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor libraries grouped into cacheable chunks
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three'
            }
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('lenis')) {
              return 'animation'
            }
            if (id.includes('swiper')) {
              return 'swiper'
            }
            if (id.includes('react-toastify')) {
              return 'toastify'
            }
            if (id.includes('lucide-react')) {
              return 'icons'
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('scheduler')
            ) {
              return 'react-vendor'
            }
            if (id.includes('supabase')) {
              return 'supabase'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
