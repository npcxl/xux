<template>
  <div class="w-full">
    <TreeNode
      v-for="node in treeData"
      :key="node.key"
      :node="node"
      :level="0"
      :selected-keys="selectedKeys"
      :expanded-keys="expandedKeys"
      :checkable="checkable"
      :checked-keys="checkedKeys"
      :half-checked-keys="halfCheckedKeys"
      :lazy="lazy"
      :load-data="loadData"
      :loading-keys="loadingKeys"
      @select="handleSelect"
      @expand="handleExpand"
      @check="handleCheck"
      @load="handleLoad"
    >
      <template #icon="{ node: n }">
        <slot name="icon" :node="n"></slot>
      </template>
      <template #title="{ node: n }">
        <slot name="title" :node="n"></slot>
      </template>
    </TreeNode>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore - Vue SFC type inference issue
import TreeNode from './TreeNode.vue'

export interface TreeNodeData {
  key: string
  title: string
  icon?: string
  children?: TreeNodeData[]
  disabled?: boolean
  /** 是否为叶子节点（懒加载时使用，标记节点不可展开） */
  isLeaf?: boolean
  [key: string]: any
}

export interface TreeProps {
  /** 树节点数据 */
  data: TreeNodeData[]
  /** 是否可勾选 */
  checkable?: boolean
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean
  /** 默认选中的节点key */
  defaultSelectedKeys?: string[]
  /** 默认勾选的节点key */
  defaultCheckedKeys?: string[]
  /** 默认展开的节点key */
  defaultExpandedKeys?: string[]
  /** 是否懒加载 */
  lazy?: boolean
  /** 异步加载数据的方法 */
  loadData?: (node: TreeNodeData) => Promise<TreeNodeData[]>
  /** 是否级联选择（父子节点关联） */
  checkStrictly?: boolean
}

const props = withDefaults(defineProps<TreeProps>(), {
  data: () => [],
  checkable: false,
  defaultExpandAll: false,
  defaultSelectedKeys: () => [],
  defaultCheckedKeys: () => [],
  defaultExpandedKeys: () => [],
  lazy: false,
  checkStrictly: false
})

const emit = defineEmits<{
  select: [keys: string[], node: TreeNodeData]
  check: [keys: string[], halfCheckedKeys: string[], node: TreeNodeData]
  expand: [keys: string[], node: TreeNodeData]
  load: [node: TreeNodeData, children: TreeNodeData[]]
}>()

const treeData = ref<TreeNodeData[]>(props.data)
const selectedKeys = ref<string[]>(props.defaultSelectedKeys)
const checkedKeys = ref<string[]>(props.defaultCheckedKeys)
const halfCheckedKeys = ref<string[]>([])
const expandedKeys = ref<string[]>(props.defaultExpandAll ? getAllKeys(props.data) : props.defaultExpandedKeys)
const loadingKeys = ref<string[]>([])

function getAllKeys(nodes: TreeNodeData[]): string[] {
  const keys: string[] = []
  const traverse = (list: TreeNodeData[]) => {
    list.forEach(node => {
      keys.push(node.key)
      if (node.children) traverse(node.children)
    })
  }
  traverse(nodes)
  return keys
}

// 获取节点的所有子节点key
function getAllChildKeys(node: TreeNodeData): string[] {
  const keys: string[] = []
  const traverse = (n: TreeNodeData) => {
    if (n.children) {
      n.children.forEach(child => {
        keys.push(child.key)
        traverse(child)
      })
    }
  }
  traverse(node)
  return keys
}

// 在树中查找节点
function findNode(nodes: TreeNodeData[], key: string): TreeNodeData | null {
  for (const node of nodes) {
    if (node.key === key) return node
    if (node.children) {
      const found = findNode(node.children, key)
      if (found) return found
    }
  }
  return null
}

// 获取节点的父节点
function getParentNode(nodes: TreeNodeData[], targetKey: string, parent: TreeNodeData | null = null): TreeNodeData | null {
  for (const node of nodes) {
    if (node.key === targetKey) return parent
    if (node.children) {
      const found = getParentNode(node.children, targetKey, node)
      if (found !== null) return found
    }
  }
  return null
}

// 更新父节点的选中状态
function updateParentCheckState(nodeKey: string) {
  if (props.checkStrictly) return
  
  const parent = getParentNode(treeData.value, nodeKey)
  if (!parent) return
  
  const childKeys = parent.children?.map(c => c.key) || []
  const checkedCount = childKeys.filter(k => checkedKeys.value.includes(k)).length
  const halfCheckedCount = childKeys.filter(k => halfCheckedKeys.value.includes(k)).length
  
  // 移除父节点的半选状态
  const halfIndex = halfCheckedKeys.value.indexOf(parent.key)
  if (halfIndex > -1) halfCheckedKeys.value.splice(halfIndex, 1)
  
  if (checkedCount === childKeys.length) {
    // 全选：父节点选中
    if (!checkedKeys.value.includes(parent.key)) {
      checkedKeys.value.push(parent.key)
    }
  } else if (checkedCount > 0 || halfCheckedCount > 0) {
    // 部分选中：父节点半选
    const checkIndex = checkedKeys.value.indexOf(parent.key)
    if (checkIndex > -1) checkedKeys.value.splice(checkIndex, 1)
    if (!halfCheckedKeys.value.includes(parent.key)) {
      halfCheckedKeys.value.push(parent.key)
    }
  } else {
    // 都未选中：父节点取消选中
    const checkIndex = checkedKeys.value.indexOf(parent.key)
    if (checkIndex > -1) checkedKeys.value.splice(checkIndex, 1)
  }
  
  // 递归更新祖先节点
  updateParentCheckState(parent.key)
}

const handleSelect = (key: string, node: TreeNodeData) => {
  selectedKeys.value = [key]
  emit('select', selectedKeys.value, node)
}

const handleExpand = (key: string, node: TreeNodeData) => {
  const index = expandedKeys.value.indexOf(key)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  } else {
    expandedKeys.value.push(key)
  }
  emit('expand', expandedKeys.value, node)
}

const handleCheck = (data: { key: string; checked: boolean; node: TreeNodeData }) => {
  const { key, checked, node } = data
  
  if (checked) {
    // 选中节点
    if (!checkedKeys.value.includes(key)) {
      checkedKeys.value.push(key)
    }
    // 移除半选状态
    const halfIndex = halfCheckedKeys.value.indexOf(key)
    if (halfIndex > -1) halfCheckedKeys.value.splice(halfIndex, 1)
    
    // 级联选择：选中所有子节点
    if (!props.checkStrictly) {
      const childKeys = getAllChildKeys(node)
      childKeys.forEach(childKey => {
        if (!checkedKeys.value.includes(childKey)) {
          checkedKeys.value.push(childKey)
        }
        const halfIndex = halfCheckedKeys.value.indexOf(childKey)
        if (halfIndex > -1) halfCheckedKeys.value.splice(halfIndex, 1)
      })
    }
  } else {
    // 取消选中节点
    const index = checkedKeys.value.indexOf(key)
    if (index > -1) checkedKeys.value.splice(index, 1)
    
    // 级联选择：取消选中所有子节点
    if (!props.checkStrictly) {
      const childKeys = getAllChildKeys(node)
      childKeys.forEach(childKey => {
        const index = checkedKeys.value.indexOf(childKey)
        if (index > -1) checkedKeys.value.splice(index, 1)
        const halfIndex = halfCheckedKeys.value.indexOf(childKey)
        if (halfIndex > -1) halfCheckedKeys.value.splice(halfIndex, 1)
      })
    }
  }
  
  // 更新父节点状态
  if (!props.checkStrictly) {
    updateParentCheckState(key)
  }
  
  emit('check', checkedKeys.value, halfCheckedKeys.value, node)
}

const handleLoad = async (key: string, node: TreeNodeData) => {
  if (props.loadData && !node.children) {
    // 添加加载状态
    if (!loadingKeys.value.includes(key)) {
      loadingKeys.value.push(key)
    }
    
    try {
      const children = await props.loadData(node)
      const targetNode = findNode(treeData.value, key)
      if (targetNode) {
        targetNode.children = children
      }
      emit('load', node, children)
      // 加载后自动展开
      if (!expandedKeys.value.includes(key)) {
        expandedKeys.value.push(key)
      }
    } catch (error) {
      console.error('Failed to load tree node data:', error)
    } finally {
      // 移除加载状态
      const loadingIndex = loadingKeys.value.indexOf(key)
      if (loadingIndex > -1) {
        loadingKeys.value.splice(loadingIndex, 1)
      }
    }
  }
}

defineExpose({
  getSelectedKeys: () => selectedKeys.value,
  getCheckedKeys: () => ({
    checked: checkedKeys.value,
    halfChecked: halfCheckedKeys.value
  }),
  getExpandedKeys: () => expandedKeys.value,
  setCheckedKeys: (keys: string[]) => {
    checkedKeys.value = keys
  },
  setExpandedKeys: (keys: string[]) => {
    expandedKeys.value = keys
  }
})
</script>

