<template>
  <div>
    <div
      class="flex items-center py-1 px-2 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      :class="{ 'bg-blue-50 dark:bg-blue-900/20': isSelected }"
      :style="{ paddingLeft: `${level * 20 + 8}px` }"
      @click="handleRowClick"
    >
      <!-- 展开/收起图标或加载图标 -->
      <div
        v-if="(node.children && node.children.length) || (lazy && !node.isLeaf)"
        class="w-4 h-4 flex items-center justify-center mr-1 flex-shrink-0"
        :class="{ 'rotate-90': isExpanded && !isLoading }"
      >
        <Icon 
          v-if="isLoading" 
          icon="svg-spinners:ring-resize" 
          class="text-blue-500" 
        />
        <Icon 
          v-else
          icon="material-symbols:chevron-right" 
          class="text-gray-500 transition-transform" 
        />
      </div>
      <div v-else class="w-4 mr-1 flex-shrink-0"></div>
      
      <div
        v-if="checkable"
        class="flex items-center mr-2 flex-shrink-0"
        role="checkbox"
        :aria-checked="isIndeterminate ? 'mixed' : isChecked"
        @click.stop="handleCheckboxClick"
      >
        <div
          :class="[
            'w-4 h-4 rounded border flex items-center justify-center transition-all duration-150',
            {
              'border-[#1a1a1a]': isChecked || isIndeterminate,
              'border-gray-300 bg-white': !isChecked && !isIndeterminate
            }
          ]"
        >
          <Icon
            v-if="isChecked"
            icon="mdi:check"
            class="text-[#1a1a1a] text-xs font-bold"
          />
          <div
            v-else-if="isIndeterminate"
            class="w-2.5 h-0.5 bg-[#1a1a1a] rounded"
          />
        </div>
      </div>
      
      <!-- 图标 -->

      <slot name="icon" :node="node">
        <Icon v-if="node.icon" :icon="node.icon" class="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
      </slot>

      <!-- 标题 -->
      <slot name="title" :node="node">
        <span class="text-sm text-gray-900 dark:text-gray-100 flex-1">{{ node.title }}</span>
      </slot>
    </div>

    <!-- 子节点 -->
    <Transition name="tree-expand">
      <div v-if="node.children && isExpanded">
        <TreeNode
          v-for="child in node.children"
          :key="child.key"
          :node="child"
          :level="level + 1"
          :selected-keys="selectedKeys"
          :expanded-keys="expandedKeys"
          :checkable="checkable"
          :checked-keys="checkedKeys"
          :half-checked-keys="halfCheckedKeys"
          :lazy="lazy"
          :load-data="loadData"
          :loading-keys="loadingKeys"
          @select="(key, node) => $emit('select', key, node)"
          @expand="(key, node) => $emit('expand', key, node)"
          @check="(data) => $emit('check', data)"
          @load="(key, node) => $emit('load', key, node)"
        >
          <template #icon>
            <slot name="icon"></slot>
          </template>
          <template #title>
            <slot name="title"></slot>
          </template>
        </TreeNode>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { TreeNodeData } from './index.vue'
interface Props {
  node: TreeNodeData
  level: number
  selectedKeys: string[]
  expandedKeys: string[]
  checkable: boolean
  checkedKeys: string[]
  halfCheckedKeys?: string[]
  lazy?: boolean
  loadData?: (node: TreeNodeData) => Promise<TreeNodeData[]>
  loadingKeys?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  halfCheckedKeys: () => [],
  lazy: false,
  loadingKeys: () => []
})

const emit = defineEmits<{
  select: [key: string, node: TreeNodeData]
  expand: [key: string, node: TreeNodeData]
  check: [data: { key: string; checked: boolean; node: TreeNodeData }]
  load: [key: string, node: TreeNodeData]
}>()

const isSelected = computed(() => props.selectedKeys.includes(props.node.key))
const isExpanded = computed(() => props.expandedKeys.includes(props.node.key))
const isChecked = computed(() => props.checkedKeys.includes(props.node.key))
const isIndeterminate = computed(() => props.halfCheckedKeys?.includes(props.node.key))
const isLoading = computed(() => props.loadingKeys?.includes(props.node.key))

const handleRowClick = async () => {
  if (!props.node.disabled) {
    // 如果正在加载，不处理点击
    if (isLoading.value) {
      return
    }
    
    // 如果是叶子节点，只触发选中
    if (props.node.isLeaf) {
      emit('select', props.node.key, props.node)
      return
    }
    
    // 如果是懒加载且未加载子节点且不是叶子节点
    if (props.lazy && props.loadData && !props.node.children && !props.node.isLeaf) {
      emit('load', props.node.key, props.node)
      return // 加载完成后会自动展开，不需要再次触发 expand
    }
    
    // 如果有子节点或可能有子节点，展开/收起
    if (props.node.children?.length || (props.lazy && !props.node.isLeaf)) {
      emit('expand', props.node.key, props.node)
    }
    
    // 选中节点
    emit('select', props.node.key, props.node)
  }
}

const handleCheckboxClick = () => {
  // indeterminate 视为选中并切换到选中
  const nextChecked = isIndeterminate.value ? true : !isChecked.value
  emit('check', { key: props.node.key, checked: nextChecked, node: props.node })
}
</script>

<style scoped>
.tree-expand-enter-active,
.tree-expand-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.tree-expand-enter-from,
.tree-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.tree-expand-enter-to,
.tree-expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

/* 复选框样式 */
.tree-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #d1d5db;
  border-radius: 3px;
  outline: none;
  transition: all 0.2s ease;
  position: relative;
  background-color: white;
}

.tree-checkbox:hover {
  border-color: #1a1a1a;
}

.tree-checkbox:checked {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}

.tree-checkbox:checked::before {
  content: '';
  position: absolute;
  left: 3px;
  top: 0px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.tree-checkbox:indeterminate {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}

.tree-checkbox:indeterminate::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 5px;
  width: 8px;
  height: 2px;
  background-color: white;
}

:global(.dark) .tree-checkbox {
  border-color: #4b5563;
  background-color: #374151;
}

:global(.dark) .tree-checkbox:hover {
  border-color: #9ca3af;
}

:global(.dark) .tree-checkbox:checked,
:global(.dark) .tree-checkbox:indeterminate {
  background-color: #1a1a1a;
  border-color: #1a1a1a;
}
</style>

