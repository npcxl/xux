/**
 * 树形数据处理工具
 */

export interface TreeNode {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: any
}

export interface TreeOptions {
  id?: string
  parentId?: string
  children?: string
  rootValue?: any
}

/**
 * 列表转树形结构
 * @param list 列表数据
 * @param options 配置项
 * @returns 树形数据
 */
export function listToTree<T extends Record<string, any>>(
  list: T[],
  options: TreeOptions = {}
): T[] {
  const {
    id = 'id',
    parentId = 'parentId',
    children = 'children',
    rootValue = null
  } = options

  const map = new Map<any, T>()
  const result: T[] = []

  // 先创建所有节点的映射
  list.forEach(item => {
    map.set(item[id], { ...item, [children]: [] })
  })

  // 建立父子关系
  list.forEach(item => {
    const node = map.get(item[id])!
    const parent = map.get(item[parentId])

    if (item[parentId] === rootValue || !parent) {
      result.push(node)
    } else {
      if (!parent[children]) {
        parent[children] = []
      }
      parent[children].push(node)
    }
  })

  return result
}

/**
 * 树形结构转列表
 * @param tree 树形数据
 * @param options 配置项
 * @returns 列表数据
 */
export function treeToList<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {}
): T[] {
  const { children = 'children' } = options
  const result: T[] = []

  const traverse = (nodes: T[]) => {
    nodes.forEach(node => {
      const { [children]: childNodes, ...rest } = node
      result.push(rest as T)
      if (childNodes && childNodes.length > 0) {
        traverse(childNodes)
      }
    })
  }

  traverse(tree)
  return result
}

/**
 * 查找树节点
 * @param tree 树形数据
 * @param predicate 查找条件
 * @param options 配置项
 * @returns 找到的节点
 */
export function findTreeNode<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T | null {
  const { children = 'children' } = options

  for (const node of tree) {
    if (predicate(node)) {
      return node
    }
    if (node[children] && node[children].length > 0) {
      const found = findTreeNode(node[children], predicate, options)
      if (found) return found
    }
  }

  return null
}

/**
 * 查找树节点路径
 * @param tree 树形数据
 * @param predicate 查找条件
 * @param options 配置项
 * @returns 节点路径
 */
export function findTreePath<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] {
  const { children = 'children' } = options
  const path: T[] = []

  const traverse = (nodes: T[]): boolean => {
    for (const node of nodes) {
      path.push(node)
      if (predicate(node)) {
        return true
      }
      if (node[children] && node[children].length > 0) {
        if (traverse(node[children])) {
          return true
        }
      }
      path.pop()
    }
    return false
  }

  traverse(tree)
  return path
}

/**
 * 过滤树节点
 * @param tree 树形数据
 * @param predicate 过滤条件
 * @param options 配置项
 * @returns 过滤后的树
 */
export function filterTree<T extends Record<string, any>>(
  tree: T[],
  predicate: (node: T) => boolean,
  options: TreeOptions = {}
): T[] {
  const { children = 'children' } = options

  return tree
    .map(node => ({ ...node }))
    .filter(node => {
      if (node[children]) {
        node[children] = filterTree(node[children], predicate, options)
      }
      return predicate(node) || (node[children] && node[children].length > 0)
    })
}

/**
 * 遍历树节点
 * @param tree 树形数据
 * @param callback 回调函数
 * @param options 配置项
 */
export function traverseTree<T extends Record<string, any>>(
  tree: T[],
  callback: (node: T, level: number) => void,
  options: TreeOptions = {}
): void {
  const { children = 'children' } = options

  const traverse = (nodes: T[], level = 0) => {
    nodes.forEach(node => {
      callback(node, level)
      if (node[children] && node[children].length > 0) {
        traverse(node[children], level + 1)
      }
    })
  }

  traverse(tree)
}

/**
 * 获取树的最大深度
 * @param tree 树形数据
 * @param options 配置项
 * @returns 最大深度
 */
export function getTreeMaxDepth<T extends Record<string, any>>(
  tree: T[],
  options: TreeOptions = {}
): number {
  const { children = 'children' } = options

  const getDepth = (nodes: T[]): number => {
    if (!nodes || nodes.length === 0) return 0
    return 1 + Math.max(...nodes.map(node => getDepth(node[children] || [])))
  }

  return getDepth(tree)
}

