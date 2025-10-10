// areas.worker.ts - Web Worker 用于处理大数据量的地区数据
interface AreaNode {
  value: string
  label: string
  children?: AreaNode[]
}

interface AreaNodeSimple {
  value: string
  label: string
  leaf: boolean
}

interface AreaNodeWithPath {
  value: string
  label: string
  leaf: boolean
  level: number // 1-省, 2-市, 3-区
  path: string[] // 完整路径的value数组
  pathLabels: string[] // 完整路径的label数组
}

// 索引：父级code -> 子节点数组
let indexByParent: Record<string, AreaNodeSimple[]> = {}
let rootNodes: AreaNodeSimple[] = []
let fullData: AreaNode[] = []
// 全局索引：code -> 完整路径信息
let globalIndex: Map<string, AreaNodeWithPath> = new Map()

// 构建索引
function buildIndex(tree: AreaNode[]) {
  indexByParent = {}
  globalIndex = new Map()
  
  function traverse(nodes: AreaNode[], parentValue: string = '', level: number = 1, path: string[] = [], pathLabels: string[] = []) {
    nodes.forEach(node => {
      const currentPath = [...path, node.value]
      const currentPathLabels = [...pathLabels, node.label]
      
      const simpleNode: AreaNodeSimple = {
        value: node.value,
        label: node.label,
        leaf: !node.children || node.children.length === 0
      }
      
      // 构建全局索引
      const nodeWithPath: AreaNodeWithPath = {
        value: node.value,
        label: node.label,
        leaf: simpleNode.leaf,
        level,
        path: currentPath,
        pathLabels: currentPathLabels
      }
      globalIndex.set(node.value, nodeWithPath)
      
      if (parentValue === '') {
        // 根节点（省份）
        rootNodes.push(simpleNode)
      } else {
        // 子节点
        if (!indexByParent[parentValue]) {
          indexByParent[parentValue] = []
        }
        indexByParent[parentValue].push(simpleNode)
      }
      
      // 递归处理子节点
      if (node.children && node.children.length > 0) {
        traverse(node.children, node.value, level + 1, currentPath, currentPathLabels)
      }
    })
  }
  
  traverse(tree)
}

// 监听主线程消息
self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data || {}
  
  switch (type) {
    case 'init':
      // 初始化：接收完整数据并建立索引
      fullData = payload.root
      rootNodes = []
      buildIndex(fullData)
      console.log('[Worker] 索引构建完成，根节点数:', rootNodes.length)
      console.log('[Worker] 索引键数:', Object.keys(indexByParent).length)
      self.postMessage({ type: 'ready' })
      break
      
    case 'roots':
      // 获取根节点（省份列表）
      self.postMessage({ 
        type: 'roots', 
        list: rootNodes 
      })
      break
      
    case 'children':
      // 获取指定父节点的子节点
      const { parent } = payload
      const children = indexByParent[parent] || []
      self.postMessage({ 
        type: 'children', 
        parent, 
        list: children 
      })
      break
      
    case 'getByCode':
      // 根据code获取单个节点信息
      const { code } = payload
      // 先在根节点中查找
      let found = rootNodes.find(n => n.value === code)
      if (!found) {
        // 在索引中查找
        for (const children of Object.values(indexByParent)) {
          found = children.find(n => n.value === code)
          if (found) break
        }
      }
      self.postMessage({ 
        type: 'nodeInfo', 
        code, 
        node: found || null 
      })
      break
      
    case 'search':
      // 全局搜索功能（支持智能反填）
      const { keyword, parentValue } = payload
      if (!keyword || keyword.trim() === '') {
        self.postMessage({ 
          type: 'searchResults', 
          keyword, 
          results: [] 
        })
        break
      }
      
      const searchKeyword = keyword.toLowerCase().trim()
      const searchResults: AreaNodeWithPath[] = []
      
      // 如果指定了父节点，只在该父节点的子节点中搜索
      if (parentValue) {
        const children = indexByParent[parentValue] || []
        for (const node of children) {
          if (node.label.toLowerCase().includes(searchKeyword) || 
              node.value.includes(searchKeyword)) {
            const nodeWithPath = globalIndex.get(node.value)
            if (nodeWithPath) {
              searchResults.push(nodeWithPath)
            }
          }
        }
      } else {
        // 全局搜索：在所有节点中搜索
        for (const [code, node] of globalIndex.entries()) {
          if (node.label.toLowerCase().includes(searchKeyword) || 
              code.includes(searchKeyword)) {
            searchResults.push(node)
            // 限制搜索结果数量
            if (searchResults.length >= 100) break
          }
        }
      }
      
      // 按层级排序：省 > 市 > 区
      searchResults.sort((a, b) => a.level - b.level)
      
      self.postMessage({ 
        type: 'searchResults', 
        keyword, 
        results: searchResults 
      })
      break
      
    default:
      console.warn('[Worker] Unknown message type:', type)
  }
}

// 错误处理
self.onerror = (error) => {
  console.error('[Worker] Error:', error)
  const errorMessage = error instanceof ErrorEvent ? error.message : String(error)
  self.postMessage({ 
    type: 'error', 
    error: errorMessage 
  })
}

export {}

