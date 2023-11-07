import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@services/': `${path.resolve(__dirname, 'src/services')}/`,
      '@stores/': `${path.resolve(__dirname, 'src/stores')}/`,
      '@ctypes/': `${path.resolve(__dirname, 'src/types')}/`,
      '@views/': `${path.resolve(__dirname, 'src/views')}/`,
      '@components/': `${path.resolve(__dirname, 'src/components')}/`,
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  }
})
