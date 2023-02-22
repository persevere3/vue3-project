import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/uniqVideo',
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/common.scss";`
      }
    }
  },
  server: {
    proxy: {
      '^/videoTest': {
        target: 'https://demo.uniqcarttest.tk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/videoTest/, '')
      },
      '^/thirdLoginTest': {
        target: 'https://api.line.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/thirdLoginTest/, '')
      }
    }
  },
})
