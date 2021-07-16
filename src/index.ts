import { Plugin } from 'vite'
import path from 'path'
import jsParse from './parse/js-parser'
export interface ViteOptions {
  path?: string | RegExp
  target?: string | string[]
  callback?: (routes: { path: string; ssr: any }[]) => void
}

const optionsHandle = (rawOptions: ViteOptions = {}) => {
  const matchPath = rawOptions.path || '/router'

  let target = rawOptions.target || []

  if (!Array.isArray(target)) {
    target = [target]
  }

  const targetMap = target.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: 1,
    }),
    {}
  )

  const result = {
    matchPath,
    targetMap,
  }

  return result
}

export function createResolvePlugin(rawOptions: ViteOptions = {}): Plugin {
  return {
    name: 'vite-plugin-router-reslove',

    apply: 'build',
    async transform(code, id) {
      const { matchPath, targetMap } = optionsHandle(rawOptions)

      const isMatch = id.match(matchPath)

      let routes: any = []

      if (isMatch) {
        const ext = path.extname(id)

        if (ext === '.js' || ext === '.ts') {
          routes = jsParse(code, targetMap)
        }

        const callback = rawOptions.callback || (() => {})

        callback(routes)
      }

      return code
    },
  }
}
