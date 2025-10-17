<template>
  <div>
    <div
      :class="['x-tree-node-row', { 'is-selected': isSelected }]"
      :style="{ paddingLeft: `${level * 20 + 8}px` }"
      @click="handleRowClick"
    >
      <!-- 展开/收起图标或加载图标 -->
      <div
        v-if="(node.children && node.children.length) || (lazy && !node.isLeaf)"
        :class="['x-tree-expand-icon', { 'is-expanded': isExpanded && !isLoading }]"
      >
        <Icon 
          v-if="isLoading" 
          icon="svg-spinners:ring-resize" 
          class="x-tree-loading-icon" 
        />
        <Icon 
          v-else
          icon="material-symbols:chevron-right" 
          class="x-tree-chevron-icon" 
        />
      </div>
      <div v-else class="x-tree-expand-icon-placeholder"></div>
      
      <div
        v-if="checkable"
        class="x-tree-checkbox-wrapper"
        role="checkbox"
        :aria-checked="isIndeterminate ? 'mixed' : isChecked"
        @click.stop="handleCheckboxClick"
      >
        <div
          :class="[
            'x-tree-checkbox',
            {
              'is-checked': isChecked,
              'is-indeterminate': isIndeterminate
            }
          ]"
        >
          <Icon
            v-if="isChecked"
            icon="mdi:check"
            class="x-tree-checkbox-icon"
          />
          <div
            v-else-if="isIndeterminate"
            class="x-tree-checkbox-minus"
          />
        </div>
      </div>
      
      <!-- 图标 -->
      <slot name="icon" :node="node">
        <Icon v-if="node.icon" :icon="node.icon" class="x-tree-node-icon" />
      </slot>

      <!-- 标题 -->
      <slot name="title" :node="node">
        <span class="x-tree-node-title">{{ node.title }}</span>
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
