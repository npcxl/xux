<template>
  <div 
    class="x-table-container" 
    ref="containerRef" 
    :style="{ height: height }"
    :class="[
      `x-table-size-${props.size}`,
      `x-table-border-${props.border}`,
      { 'x-table-stripe': props.stripe }
    ]"
  >
    <!-- 表头区域 -->
    <div v-if="props.showHeader" class="x-table-header-wrapper">
      <div class="x-table-header" ref="headerRef">
        <div class="x-table-row x-table-header-row">
          <!-- 全选复选框列 -->
          <div 
            v-if="props.rowSelection" 
            class="x-table-cell x-table-header-cell x-table-selection-column"
            :class="{ 'x-table-cell-fixed-left': true }"
            :style="{ left: '0px', width: '48px', minWidth: '48px' }"
          >
            <div class="x-table-cell-content">
              <div class="x-table-checkbox-wrapper">
                <input 
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate.prop="isIndeterminate"
                  @change="handleSelectAll"
                  class="x-table-checkbox"
                  :class="{ 'x-table-checkbox-indeterminate': isIndeterminate }"
                />
              </div>
            </div>
          </div>
          <!-- 数据列表头 -->
          <div 
            v-for="col in visibleColumns" 
            :key="col.key"
            class="x-table-cell x-table-header-cell"
            :class="[
              col.headerClass,
              `x-table-align-${col.align || 'left'}`,
              { 'x-table-cell-fixed-left': col.fixed === 'left' },
              { 'x-table-cell-fixed-right': col.fixed === 'right' },
              { 'x-table-sortable': col.sortable },
              { 'x-table-sorted': sortState.column?.key === col.key }
            ]"
            :style="getCellStyle(col)"
            :title="col.tooltip"
          >
            <div class="x-table-cell-content">
              <span @click="handleSort(col)">{{ col.title }}</span>
              <span v-if="col.sortable" class="x-table-sort-icon" @click="handleSort(col)">
                <svg 
                  class="x-table-sort-asc" 
                  :class="{ active: sortState.column?.key === col.key && sortState.order === 'asc' }"
                  viewBox="0 0 24 24" 
                  width="12" 
                  height="12"
                >
                  <path d="M7 14l5-5 5 5z" fill="currentColor"/>
                </svg>
                <svg 
                  class="x-table-sort-desc" 
                  :class="{ active: sortState.column?.key === col.key && sortState.order === 'desc' }"
                  viewBox="0 0 24 24" 
                  width="12" 
                  height="12"
                >
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 表体区域 -->
    <div class="x-table-body-wrapper" @scroll="handleScroll" ref="scrollRef">
      <div v-if="dataSource.length > 0" class="x-table-body">
        <div 
          v-for="(row, index) in dataSource" 
          :key="row[rowKey] || index"
          class="x-table-row x-table-body-row"
          :class="[
            { 'x-table-row-hover': hoveredRow === index },
            { 'x-table-row-selected': isRowSelected(row) }
          ]"
          @click="handleRowClick(row, index)"
          @mouseenter="handleRowHover(index)"
          @mouseleave="handleRowLeave"
        >
          <!-- 选择列 -->
          <div 
            v-if="props.rowSelection" 
            class="x-table-cell x-table-body-cell x-table-selection-column"
            :class="{ 'x-table-cell-fixed-left': true }"
            :style="{ left: '0px', width: '48px', minWidth: '48px' }"
            @click.stop="handleRowSelect(row)"
          >
            <div class="x-table-cell-content">
              <div class="x-table-checkbox-wrapper">
                <input 
                  type="checkbox"
                  :checked="isRowSelected(row)"
                  class="x-table-checkbox"
                  @click.stop
                  @change="handleRowSelect(row)"
                />
              </div>
            </div>
          </div>
          
          <!-- 数据列 -->
          <div 
            v-for="col in visibleColumns" 
            :key="col.key"
            class="x-table-cell x-table-body-cell"
            :class="[
              col.cellClass,
              `x-table-align-${col.align || 'left'}`,
              { 'x-table-cell-fixed-left': col.fixed === 'left' },
              { 'x-table-cell-fixed-right': col.fixed === 'right' }
            ]"
            :style="getCellStyle(col)"
          >
            <div class="x-table-cell-content">
              <slot 
                v-if="col.slot" 
                :name="col.slot" 
                :record="row" 
                :index="index"
                :value="row[col.dataIndex]"
              >
                {{ row[col.dataIndex] }}
              </slot>
              <!-- 可编辑单元格 -->
              <div v-else-if="col.editable" class="x-table-editable-cell">
                <input
                  v-if="editingCell.rowKey === row[rowKey] && editingCell.columnKey === col.key"
                  type="text"
                  class="x-table-edit-input"
                  :value="row[col.dataIndex]"
                  @blur="handleCellEditEnd(row, col, $event)"
                  @keyup.enter="handleCellEditEnd(row, col, $event)"
                  @keyup.esc="handleCellEditCancel"
                  ref="editInputRef"
                />
                <span 
                  v-else
                  class="x-table-editable-content"
                  @dblclick="handleCellEditStart(row, col)"
                >
                  {{ row[col.dataIndex] }}
                  <svg class="x-table-edit-icon" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
              <span v-else>{{ row[col.dataIndex] }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="dataSource.length === 0" class="x-table-empty">
        <XResult
          status="info"
          :title="emptyText"
          subTitle="暂无数据显示"
        />
      </div>
    </div>

    <!-- 固定列阴影 -->
    <div 
      v-if="hasFixedLeft" 
      class="x-table-fixed-shadow-left"
      :class="{ 'x-table-fixed-shadow-active': scrollLeft > 0 }"
      :style="{ left: fixedLeftWidth + 'px' }"
    ></div>
    <div 
      v-if="hasFixedRight" 
      class="x-table-fixed-shadow-right"
      :class="{ 'x-table-fixed-shadow-active': scrollLeft < maxScrollLeft }"
      :style="{ right: fixedRightWidth + 'px' }"
    ></div>

    <!-- 加载状态 -->
    <div v-if="loading" class="x-table-loading">
      <div class="x-table-loading-spinner">
        <div class="x-table-loading-dot"></div>
        <div class="x-table-loading-dot"></div>
        <div class="x-table-loading-dot"></div>
      </div>
      <div class="x-table-loading-text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import XResult from '../Result/index.vue'
import './index.css'

/**
 * Table 表格组件
 * @displayName XTable
 */

export interface Column {
  /** 列标识 */
  key: string
  /** 列标题 */
  title: string
  /** 数据字段名 */
  dataIndex: string
  /** 列宽度 */
  width?: string
  /** 最小列宽 */
  minWidth?: string
  /** 固定列: left | right */
  fixed?: 'left' | 'right'
  /** 自定义插槽名称 */
  slot?: string
  /** 表头自定义类名 */
  headerClass?: string
  /** 单元格自定义类名 */
  cellClass?: string
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 是否可编辑 */
  editable?: boolean
  /** 是否可排序 */
  sortable?: boolean
  /** 列是否可见 */
  visible?: boolean
  /** 列提示信息 */
  tooltip?: string
}

export type TableSize = 'large' | 'default' | 'small'
export type TableBorder = 'none' | 'horizontal' | 'vertical' | 'all'

export interface TableProps {
  /** 列配置 */
  columns: Column[]
  /** 数据源 */
  dataSource: any[]
  /** 行唯一键 */
  rowKey?: string
  /** 表格高度 */
  height?: string
  /** 加载状态 */
  loading?: boolean
  /** 加载提示文字 */
  loadingText?: string
  /** 空数据提示文字 */
  emptyText?: string
  /** 表格尺寸 */
  size?: TableSize
  /** 是否显示斑马纹 */
  stripe?: boolean
  /** 边框样式 */
  border?: TableBorder
  /** 是否显示表头 */
  showHeader?: boolean
  /** 是否可选择行 */
  rowSelection?: boolean
  /** 已选择的行键 */
  selectedRowKeys?: (string | number)[]
  /** 悬停行高亮 */
  highlightHoverRow?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'id',
  height: '600px',
  loading: false,
  loadingText: '加载中...',
  emptyText: '暂无数据',
  size: 'default',
  stripe: false,
  border: 'horizontal',
  showHeader: true,
  rowSelection: false,
  selectedRowKeys: () => [],
  highlightHoverRow: true
})

const emit = defineEmits<{
  /** 行点击事件 */
  rowClick: [record: any, index: number]
  /** 行选择变化事件 */
  selectionChange: [selectedRowKeys: (string | number)[], selectedRows: any[]]
  /** 排序变化事件 */
  sortChange: [column: Column, order: 'asc' | 'desc' | null]
  /** 全选/取消全选事件 */
  selectAll: [selected: boolean]
  cellEdit: [record: any, column: Column, value: any]
  filterChange: [filters: Record<string, any[]>]
}>()

// Refs
const containerRef = ref<HTMLDivElement>()
const scrollRef = ref<HTMLDivElement>()
const headerRef = ref<HTMLDivElement>()

// State
const scrollLeft = ref(0)
const maxScrollLeft = ref(0)
const hoveredRow = ref<number | null>(null)
const internalSelectedRowKeys = ref<(string | number)[]>([...props.selectedRowKeys])
const sortState = ref<{ column: Column | null; order: 'asc' | 'desc' | null }>({
  column: null,
  order: null
})
const editingCell = ref<{ rowKey: string | number | null; columnKey: string | null }>({
  rowKey: null,
  columnKey: null
})
const editInputRef = ref<HTMLInputElement | null>(null)

// 监听外部selectedRowKeys变化
watch(() => props.selectedRowKeys, (newVal) => {
  internalSelectedRowKeys.value = [...newVal]
})

// 过滤可见列
const visibleColumns = computed(() => 
  props.columns.filter(col => col.visible !== false)
)

// 计算固定列
const fixedLeftColumns = computed(() => 
  visibleColumns.value.filter(col => col.fixed === 'left')
)

const fixedRightColumns = computed(() => 
  visibleColumns.value.filter(col => col.fixed === 'right')
)

const hasFixedLeft = computed(() => fixedLeftColumns.value.length > 0)
const hasFixedRight = computed(() => fixedRightColumns.value.length > 0)

// 是否全选
const isAllSelected = computed(() => {
  if (!props.dataSource.length) return false
  return props.dataSource.every(row => 
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  )
})

// 是否部分选中
const isIndeterminate = computed(() => {
  if (!props.dataSource.length) return false
  const selectedCount = props.dataSource.filter(row => 
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  ).length
  return selectedCount > 0 && selectedCount < props.dataSource.length
})

// 计算固定列宽度
const fixedLeftWidth = computed(() => {
  return fixedLeftColumns.value.reduce((sum, col) => {
    const width = parseInt(col.width || '100')
    return sum + width
  }, 0)
})

const fixedRightWidth = computed(() => {
  return fixedRightColumns.value.reduce((sum, col) => {
    const width = parseInt(col.width || '100')
    return sum + width
  }, 0)
})

// 计算单元格样式（包括宽度和固定定位）
const getCellStyle = (col: Column) => {
  const style: Record<string, string> = {}
  
  // 设置列宽
  if (col.width) {
    // 有固定宽度 - 严格使用固定宽度，不拉伸不收缩
    style.width = col.width
    style.minWidth = col.width
    style.maxWidth = col.width
  } else {
    // 无固定宽度 - 自适应内容，但设置最小宽度
    style.minWidth = col.minWidth || '100px'
  }
  
  // 处理固定列位置
  if (col.fixed === 'left') {
    // 计算左侧固定列的位置（需要考虑选择列）
    let left = props.rowSelection ? 48 : 0
    for (const c of visibleColumns.value) {
      if (c.key === col.key) break
      if (c.fixed === 'left') {
        left += parseInt(c.width || '100')
      }
    }
    style.left = left + 'px'
  } else if (col.fixed === 'right') {
    // 计算右侧固定列的位置
    let right = 0
    const cols = [...visibleColumns.value].reverse()
    for (const c of cols) {
      if (c.key === col.key) break
      if (c.fixed === 'right') {
        right += parseInt(c.width || '100')
      }
    }
    style.right = right + 'px'
  }
  
  return style
}

// 处理滚动
const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement
  
  // 更新滚动位置（用于阴影显示）
  scrollLeft.value = target.scrollLeft
  
  // 计算最大滚动距离
  maxScrollLeft.value = target.scrollWidth - target.clientWidth
  
  // 同步表头横向滚动
  if (headerRef.value) {
    headerRef.value.scrollLeft = target.scrollLeft
  }
}

// 排序处理
const handleSort = (column: Column) => {
  if (!column.sortable) return
  
  // 切换排序状态: null -> asc -> desc -> null
  let newOrder: 'asc' | 'desc' | null = null
  if (sortState.value.column?.key === column.key) {
    if (sortState.value.order === null) {
      newOrder = 'asc'
    } else if (sortState.value.order === 'asc') {
      newOrder = 'desc'
    } else {
      newOrder = null
    }
  } else {
    newOrder = 'asc'
  }
  
  sortState.value = {
    column: newOrder ? column : null,
    order: newOrder
  }
  
  emit('sortChange', column, newOrder)
}

// 行选择处理
const handleSelectAll = () => {
  const newSelected = !isAllSelected.value
  
  if (newSelected) {
    internalSelectedRowKeys.value = props.dataSource.map(row => row[props.rowKey])
  } else {
    internalSelectedRowKeys.value = []
  }
  
  const selectedRows = props.dataSource.filter(row => 
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  )
  
  emit('selectAll', newSelected)
  emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
}

const handleRowSelect = (record: any) => {
  const rowKey = record[props.rowKey]
  const index = internalSelectedRowKeys.value.indexOf(rowKey)
  
  if (index > -1) {
    internalSelectedRowKeys.value.splice(index, 1)
  } else {
    internalSelectedRowKeys.value.push(rowKey)
  }
  
  const selectedRows = props.dataSource.filter(row => 
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  )
  
  emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
}

const isRowSelected = (record: any) => {
  return internalSelectedRowKeys.value.includes(record[props.rowKey])
}

// 行交互
const handleRowClick = (record: any, index: number) => {
  emit('rowClick', record, index)
}

const handleRowHover = (index: number) => {
  if (props.highlightHoverRow) {
    hoveredRow.value = index
  }
}

const handleRowLeave = () => {
  if (props.highlightHoverRow) {
    hoveredRow.value = null
  }
}

// 编辑相关处理函数
const handleCellEditStart = (record: any, column: Column) => {
  editingCell.value = {
    rowKey: record[props.rowKey],
    columnKey: column.key
  }
  nextTick(() => {
    if (editInputRef.value) {
      editInputRef.value.focus()
      editInputRef.value.select()
    }
  })
}

const handleCellEditEnd = (record: any, column: Column, event: Event) => {
  const input = event.target as HTMLInputElement
  const newValue = input.value
  const oldValue = record[column.dataIndex]
  
  if (newValue !== oldValue) {
    // 触发编辑事件
    emit('cellEdit', record, column, newValue)
  }
  
  // 清空编辑状态
  editingCell.value = { rowKey: null, columnKey: null }
}

const handleCellEditCancel = () => {
  editingCell.value = { rowKey: null, columnKey: null }
}


// 监听窗口大小变化
const handleResize = () => {
  if (scrollRef.value) {
    maxScrollLeft.value = scrollRef.value.scrollWidth - scrollRef.value.clientWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  // 初始化时计算最大滚动距离
  setTimeout(() => {
    handleResize()
  }, 0)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// ========== 暴露的实例方法 ==========

/**
 * 清空所有选择
 */
const clearSelection = () => {
  internalSelectedRowKeys.value = []
  emit('selectionChange', [], [])
}

/**
 * 设置选中的行
 * @param keys - 行键数组
 */
const setSelectedRows = (keys: (string | number)[]) => {
  internalSelectedRowKeys.value = [...keys]
  const selectedRows = props.dataSource.filter(row => 
    keys.includes(row[props.rowKey])
  )
  emit('selectionChange', keys, selectedRows)
}

/**
 * 滚动到指定位置
 * @param options - 滚动选项
 */
const scrollTo = (options: { top?: number; left?: number; behavior?: ScrollBehavior }) => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo({
      top: options.top,
      left: options.left,
      behavior: options.behavior || 'smooth'
    })
  }
}

/**
 * 滚动到顶部
 */
const scrollToTop = () => {
  scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * 滚动到底部
 */
const scrollToBottom = () => {
  if (scrollRef.value) {
    scrollTo({ top: scrollRef.value.scrollHeight, behavior: 'smooth' })
  }
}

/**
 * 获取当前选中的行键
 */
const getSelectedRowKeys = () => {
  return [...internalSelectedRowKeys.value]
}

/**
 * 获取当前选中的行数据
 */
const getSelectedRows = () => {
  return props.dataSource.filter(row => 
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  )
}

/**
 * 刷新表格布局（重新计算滚动区域）
 */
const refresh = () => {
  handleResize()
}

// 暴露方法给父组件
defineExpose({
  clearSelection,
  setSelectedRows,
  scrollTo,
  scrollToTop,
  scrollToBottom,
  getSelectedRowKeys,
  getSelectedRows,
  refresh
})
</script>

