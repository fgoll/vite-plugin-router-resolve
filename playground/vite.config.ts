import { defineConfig } from 'vite'
const { createResolvePlugin } = require('../dist')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createResolvePlugin({
      path: 'src/router/index2.ts',
      target: 'children',
      callback: (routes) => {
        console.log('callback', routes)
      },
    }),
    vue(),
  ],
})
