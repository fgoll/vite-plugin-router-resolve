import { Parser, Node } from 'acorn'

interface ITargetMap {
  [propName: string]: any
}

interface AcornNode extends Node {
  id?: any
  init?: any
  body?: AcornNode[]
  declaration?: AcornNode
  declarations: AcornNode[]
  elements: AcornNode[]
  properties: any[]
}

const traverse = function (node: AcornNode, routes: any[]) {
  const walk = function (node: AcornNode, parent?: { path: string }) {
    // console.log(node)
    if (node.type === 'ObjectExpression') {
      const route: any = {}
      let children = []
      for (let statement of node.properties) {
        const key = statement.key
        const value = statement.value

        if (key.name === 'path') {
          route.path = parent ? parent.path + '/' + value.value : value.value
        }

        if (key.name === 'ssr') {
          let ssr
          if (value.type === 'ObjectExpression') {
            ssr = value.properties.reduce((prev: any, curr: any) => {
              return {
                ...prev,
                [curr.key.name]: curr.value.value,
              }
            }, {})
          }

          route.ssr = ssr || {}
        }

        if (key.name === 'children' && value.type === 'ArrayExpression') {
          children = value.elements
        }
      }

      for (let child of children) {
        walk(child, route)
      }
      if (route.ssr) {
        routes.push(route)
      }
    }
  }

  if (node.type === 'ArrayExpression') {
    for (let child of node.elements) {
      walk(child)
    }
  }
}

export default function parse(code: string, targetMap: ITargetMap) {
  const ast = Parser.parse(code, {
    sourceType: 'module',
    ecmaVersion: 'latest',
  }) as AcornNode

  const body = (ast.body || []) as AcornNode[]

  const routes: { path: string; ssr: any }[] = []

  const handle = (node: AcornNode) => {
    if (node.type !== 'VariableDeclarator') {
      return
    }
    const id = node.id
    const name = id.name
    if (targetMap[name] && node.init) {
      traverse(node.init, routes)
    }
  }

  const walk = (statement: AcornNode) => {
    if (statement.declarations) {
      for (let child of statement.declarations as AcornNode[]) {
        handle(child)
      }
    } else {
      if (statement.declaration) {
        walk(statement.declaration)
      }
    }
  }

  for (let statement of body) {
    walk(statement)
  }

  return routes
}
