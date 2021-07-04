import { defineConfig } from 'vite'
const { createResolvePlugin } = require('../dist')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createResolvePlugin({
      path: 'src/router/index.js',
      target: 'menus',
      callback: (routes) => {
        console.log('callback', routes)
      },
    }),
    vue(),
  ],
})
