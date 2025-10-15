import { DefineComponent } from 'vue'
import type { TreeNodeData } from './index.vue'

declare const TreeNode: DefineComponent<{
  node: TreeNodeData
  level: number
  selectedKeys: string[]
  expandedKeys: string[]
  checkable: boolean
  checkedKeys: string[]
}>

export default TreeNode

