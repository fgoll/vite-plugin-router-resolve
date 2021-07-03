import { Plugin } from 'vite'
export function createResolvePlugin(rawOptions = {}): Plugin {
  return {
    name: 'vite-plugin-router-reslove',

    apply: 'build',
    async transform(code, id) {
      console.log(rawOptions, '====>', id)
      return code
    },
  }
}
