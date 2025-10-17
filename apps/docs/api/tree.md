# 树结构工具 Tree

提供树形数据的转换、查找、过滤、遍历等功能。

## 导入

```javascript
import { 
  listToTree, treeToList, findTreeNode, findTreePath,
  filterTree, traverseTree, getTreeMaxDepth
} from '@xlui/xux-ui'
```

## listToTree / treeToList

列表与树形结构互转。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-start">
      <div class="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-bold text-blue-700">📋 平级列表</span>
          <span class="text-xs text-blue-500">{{ list.length }} 项</span>
        </div>
        <div class="overflow-x-auto">
          <pre class="text-xs max-h-48 overflow-y-auto  rounded border border-blue-100 whitespace-pre">{{ JSON.stringify(list, null, 2) }}</pre>
        </div>
      </div>
      
      <div class="flex lg:flex-col gap-2 justify-center">
        <XButton @click="toTree" type="primary" size="small" class="!px-6">
          列表 → 树
        </XButton>
        <XButton @click="toList" type="success" size="small" class="!px-6">
          树 → 列表
        </XButton>
      </div>
      
      <div class="p-4  rounded-lg border-2 border-green-200">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-bold text-green-700">🌲 树形结构</span>
          <span class="text-xs text-green-500">{{ tree.length }} 个根节点</span>
        </div>
        <div class="overflow-x-auto">
          <pre class="text-xs max-h-48 overflow-y-auto p-3 rounded border border-green-100 whitespace-pre">{{ tree.length > 0 ? JSON.stringify(tree, null, 2) : '点击"列表 → 树"进行转换' }}</pre>
        </div>
      </div>
    </div>
    
    <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
      <div class="text-sm font-bold text-purple-700 mb-2">📊 转换结果详情</div>
      <div class="overflow-x-auto">
        <pre class="text-xs max-h-60 overflow-y-auto p-3 rounded border border-purple-100 whitespace-pre">{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, listToTree, treeToList } from '@xlui/xux-ui'

const list = [
  { id: 1, name: '根节点', parentId: null },
  { id: 2, name: '子节点1', parentId: 1 },
  { id: 3, name: '子节点2', parentId: 1 },
  { id: 4, name: '孙节点', parentId: 2 }
]

const tree = ref([])
const result = ref('👆 点击上方按钮进行列表和树的转换操作')

const toTree = () => {
  tree.value = listToTree(list)
  result.value = `✅ 成功将 ${list.length} 个平级节点转换为树形结构\n\n${JSON.stringify(tree.value, null, 2)}`
}

const toList = () => {
  if (tree.value.length === 0) {
    result.value = '⚠️ 请先执行"列表 → 树"转换'
    return
  }
  const flatList = treeToList(tree.value)
  result.value = `✅ 成功将树形结构扁平化为 ${flatList.length} 个节点\n\n${JSON.stringify(flatList, null, 2)}`
}
</script>
```

:::

## findTreeNode / findTreePath

查找节点和路径。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="p-4 bg-gray-50 rounded-lg border">
      <div class="text-sm font-bold text-gray-700 mb-3">🌳 测试数据</div>
      <div class="overflow-x-auto">
        <pre class="text-xs max-h-32 overflow-y-auto p-3 rounded whitespace-pre">{{ JSON.stringify(tree, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="flex gap-3">
      <div class="flex-1">
        <label class="text-xs text-gray-600 mb-1 block">🔍 输入节点ID</label>
        <XInput v-model="searchId" type="number" placeholder="输入要查找的节点ID" />
      </div>
      <div class="flex gap-2 items-end">
        <XButton @click="find" type="primary">查找节点</XButton>
        <XButton @click="findPath" type="success">查找路径</XButton>
      </div>
    </div>
    
    <div class="p-4 rounded-lg border-2" 
      :class="findResult.includes('未找到') ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'">
      <div class="flex items-center gap-2 mb-2">
        <span class="text-sm font-bold" :class="findResult.includes('未找到') ? 'text-red-700' : 'text-blue-700'">
          {{ findResult.includes('未找到') ? '❌' : '✅' }} 查找结果
        </span>
      </div>
      <div class="overflow-x-auto">
        <pre class="text-xs max-h-60 overflow-y-auto p-3 rounded border whitespace-pre" 
          :class="findResult.includes('未找到') ? 'border-red-100' : 'border-blue-100'">{{ findResult }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, findTreeNode, findTreePath } from '@xlui/xux-ui'

const tree = [
  { 
    id: 1, 
    name: '根节点',
    children: [
      { id: 2, name: '子节点1', children: [{ id: 4, name: '孙节点' }] },
      { id: 3, name: '子节点2', children: [] }
    ]
  }
]

const searchId = ref(4)
const findResult = ref('👆 输入ID后点击按钮开始查找')

const find = () => {
  const node = findTreeNode(tree, n => n.id === Number(searchId.value))
  if (node) {
    findResult.value = `找到节点：\n\n${JSON.stringify(node, null, 2)}`
  } else {
    findResult.value = `未找到 ID 为 ${searchId.value} 的节点`
  }
}

const findPath = () => {
  const path = findTreePath(tree, n => n.id === Number(searchId.value))
  if (path.length > 0) {
    const pathStr = path.map(n => n.name).join(' → ')
    findResult.value = `路径：${pathStr}\n\n详细信息：\n${JSON.stringify(path, null, 2)}`
  } else {
    findResult.value = `未找到 ID 为 ${searchId.value} 的节点路径`
  }
}
</script>
```

:::

## filterTree

过滤树节点。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="flex items-centenr gap-3">em
      <div class="flex-1">
        <label class="text-xs text-gray-600 mb-1 block">🔎 输入关键词</label>
        <XInput v-model="keyword" placeholder="输入关键词过滤节点" />
      </div>
      <div class="flex items-end">
        <XButton @click="filter" type="primary">开始过滤</XButton>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-gray-50 rounded-lg border">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-bold text-gray-700">📂 原始树</span>
          <span class="text-xs text-gray-500">4个节点</span>
        </div>
        <div class="overflow-x-auto">
          <pre class="text-xs max-h-60 overflow-y-auto p-3 rounded whitespace-pre">{{ JSON.stringify(tree, null, 2) }}</pre>
        </div>
      </div>
      
      <div class="p-4 rounded-lg border-2"
        :class="filtered.length > 0 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-bold" :class="filtered.length > 0 ? 'text-green-700' : 'text-gray-700'">
            {{ filtered.length > 0 ? '✅' : '📋' }} 过滤结果
          </span>
          <span class="text-xs" :class="filtered.length > 0 ? 'text-green-500' : 'text-gray-500'">
            {{ filtered.length > 0 ? `${countNodes(filtered)} 个匹配节点` : '等待过滤' }}
          </span>
        </div>
        <div class="overflow-x-auto">
          <pre class="text-xs max-h-60 overflow-y-auto p-3 rounded border whitespace-pre"
            :class="filtered.length > 0 ? 'border-green-100' : 'border-gray-100'">{{ filtered.length > 0 ? JSON.stringify(filtered, null, 2) : '👆 输入关键词后点击"开始过滤"' }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, filterTree } from '@xlui/xux-ui'

const tree = [
  { 
    id: 1, 
    name: '前端开发',
    children: [
      { id: 2, name: 'Vue', children: [] },
      { id: 3, name: 'React', children: [] }
    ]
  },
  { 
    id: 4, 
    name: '后端开发',
    children: [
      { id: 5, name: 'Node.js', children: [] },
      { id: 6, name: 'Python', children: [] }
    ]
  }
]

const keyword = ref('Vue')
const filtered = ref([])

const filter = () => {
  filtered.value = filterTree(tree, n => n.name.includes(keyword.value))
}

const countNodes = (tree) => {
  let count = 0
  const traverse = (nodes) => {
    nodes.forEach(node => {
      count++
      if (node.children && node.children.length > 0) {
        traverse(node.children)
      }
    })
  }
  traverse(tree)
  return count
}
</script>
```

:::

## traverseTree / getTreeMaxDepth

遍历树和获取深度。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
      <div class="text-sm font-bold text-blue-700 mb-3">🌳 测试树结构</div>
      <div class="overflow-x-auto">
        <pre class="text-xs max-h-40 overflow-y-auto p-3 rounded border border-blue-100 whitespace-pre">{{ JSON.stringify(tree, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-3">
      <XButton @click="traverse" type="primary" block>
        🔄 遍历树结构
      </XButton>
      <XButton @click="getDepth" type="success" block>
        📏 计算最大深度
      </XButton>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="text-sm font-bold text-blue-700 mb-3">📝 遍历结果（显示层级）</div>
        <div class="overflow-x-auto">
          <pre class="text-xs max-h-48 overflow-y-auto p-3 rounded border border-blue-100 font-mono whitespace-pre-wrap">{{ traverseResult || '👈 点击"遍历树结构"查看结果' }}</pre>
        </div>
      </div>
      
      <div class="p-4 bg-green-50 rounded-lg border border-green-200">
        <div class="text-sm font-bold text-green-700 mb-3 text-center">📊 树的最大深度</div>
        <div class="flex items-center justify-center h-32">
          <div class="text-center">
            <div class="text-6xl font-bold text-green-600 mb-2">{{ depth || '?' }}</div>
            <div class="text-xs text-green-500">{{ depth > 0 ? '层' : '点击"计算最大深度"' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, traverseTree, getTreeMaxDepth } from '@xlui/xux-ui'

const tree = [
  { 
    id: 1, 
    name: '一级',
    children: [
      { 
        id: 2, 
        name: '二级', 
        children: [
          { id: 3, name: '三级', children: [] }
        ] 
      }
    ]
  }
]

const traverseResult = ref('')
const depth = ref(0)

const traverse = () => {
  const result = []
  traverseTree(tree, (node, level) => {
    const indent = '  '.repeat(level)
    const icon = level === 0 ? '🌳' : level === 1 ? '📁' : '📄'
    result.push(`${indent}${icon} ${node.name} (第${level}层)`)
  })
  traverseResult.value = result.join('\n')
}

const getDepth = () => {
  depth.value = getTreeMaxDepth(tree)
}
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `listToTree(list, options?)` | 列表转树 | `list: any[], options?: TreeOptions` |
| `treeToList(tree, options?)` | 树转列表 | `tree: any[], options?: TreeOptions` |
| `findTreeNode(tree, predicate, options?)` | 查找节点 | `tree: any[], predicate: Function, options?: TreeOptions` |
| `findTreePath(tree, predicate, options?)` | 查找路径 | `tree: any[], predicate: Function, options?: TreeOptions` |
| `filterTree(tree, predicate, options?)` | 过滤树 | `tree: any[], predicate: Function, options?: TreeOptions` |
| `traverseTree(tree, callback, options?)` | 遍历树 | `tree: any[], callback: Function, options?: TreeOptions` |
| `getTreeMaxDepth(tree, options?)` | 获取深度 | `tree: any[], options?: TreeOptions` |
