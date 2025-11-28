<template>
  <div class="x-table-container" ref="containerRef" :style="{ height: height }" :class="[
    `x-table-size-${props.size}`,
    `x-table-border-${props.border}`,
    { 'x-table-stripe': props.stripe }
  ]">
    <!-- 滚动容器 -->
    <div class="x-table-scroll-wrapper" @scroll="handleScroll" ref="scrollRef">
      <div class="x-table-grid" :style="gridTemplateStyle">
        <!-- 表头行 -->
        <template v-if="props.showHeader">
          <!-- 选择列表头 -->
          <div v-if="props.rowSelection" class="x-table-cell x-table-header-cell x-table-selection-cell"
            :class="{ 'x-table-cell-fixed': true }">
            <div class="x-table-cell-content">
              <div class="x-table-checkbox-wrapper">
                <input type="checkbox" :checked="isAllSelected" :indeterminate.prop="isIndeterminate"
                  :disabled="selectableRows.length === 0" @change="handleSelectAll" class="x-table-checkbox"
                  :class="{ 'x-table-checkbox-indeterminate': isIndeterminate }" />
              </div>
            </div>
          </div>

          <!-- 数据列表头 -->
          <div v-for="(col, colIndex) in visibleColumns" :key="`header-${col.key}`"
            class="x-table-cell x-table-header-cell" :class="[
              col.headerClass,
              `x-table-align-${col.align || 'left'}`,
              { 'x-table-cell-fixed': col.fixed === 'left' },
              { 'x-table-cell-fixed-right': col.fixed === 'right' },
              { 'x-table-sortable': col.sortable },
              { 'x-table-sorted': sortState.column?.key === col.key }
            ]" :style="getFixedStyle(col, colIndex)" :title="col.tooltip">
            <div class="x-table-cell-content">
              <span @click="handleSort(col)">{{ col.title }}</span>
              <span v-if="col.sortable" class="x-table-sort-icon" @click="handleSort(col)">
                <svg class="x-table-sort-asc"
                  :class="{ active: sortState.column?.key === col.key && sortState.order === 'asc' }"
                  viewBox="0 0 24 24" width="12" height="12">
                  <path d="M7 14l5-5 5 5z" fill="currentColor" />
                </svg>
                <svg class="x-table-sort-desc"
                  :class="{ active: sortState.column?.key === col.key && sortState.order === 'desc' }"
                  viewBox="0 0 24 24" width="12" height="12">
                  <path d="M7 10l5 5 5-5z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
        </template>

        <!-- 表体行 -->
        <template v-if="dataSource.length > 0">
          <template v-for="(row, idx) in visibleData"
            :key="`row-${row[rowKey] || (props.virtual ? virtualStartIndex + idx : idx)}`">
            <!-- 选择列 -->
            <div v-if="props.rowSelection" class="x-table-cell x-table-body-cell x-table-selection-cell" :class="[
              { 'x-table-cell-fixed': true },
              { 'x-table-row-hover': hoveredRow === getRealRowIndex(idx) },
              { 'x-table-row-selected': isRowSelected(row) },
              { 'x-table-row-stripe': props.stripe && getRealRowIndex(idx) % 2 === 1 }
            ]" @click.stop="handleRowSelect(row)" @mouseenter="handleRowHover(getRealRowIndex(idx))"
              @mouseleave="handleRowLeave">
              <div class="x-table-cell-content">
                <div class="x-table-checkbox-wrapper">
                  <input type="checkbox" :checked="isRowSelected(row)" :disabled="isRowDisabled(row)"
                    class="x-table-checkbox" @click.stop @change="handleRowSelect(row)" />
                </div>
              </div>
            </div>

            <!-- 数据列 -->
            <div v-for="(col, colIndex) in visibleColumns"
              :key="`cell-${row[rowKey] || getRealRowIndex(idx)}-${col.key}`" class="x-table-cell x-table-body-cell"
              :class="[
                col.cellClass,
                `x-table-align-${col.align || 'left'}`,
                { 'x-table-cell-fixed': col.fixed === 'left' },
                { 'x-table-cell-fixed-right': col.fixed === 'right' },
                { 'x-table-row-hover': hoveredRow === getRealRowIndex(idx) },
                { 'x-table-row-selected': isRowSelected(row) },
                { 'x-table-row-stripe': props.stripe && getRealRowIndex(idx) % 2 === 1 }
              ]" :style="getFixedStyle(col, colIndex)" @click="handleRowClick(row, getRealRowIndex(idx))"
              @mouseenter="handleRowHover(getRealRowIndex(idx))" @mouseleave="handleRowLeave">
              <div class="x-table-cell-content">
                <slot v-if="col.slot" :name="col.slot" :record="row" :index="getRealRowIndex(idx)"
                  :value="row[col.dataIndex]">
                  {{ row[col.dataIndex] }}
                </slot>
                <!-- 可编辑单元格 -->
                <div v-else-if="col.editable" class="x-table-editable-cell">
                  <input v-if="editingCell.rowKey === row[rowKey] && editingCell.columnKey === col.key" type="text"
                    class="x-table-edit-input" :value="row[col.dataIndex]" @blur="handleCellEditEnd(row, col, $event)"
                    @keyup.enter="handleCellEditEnd(row, col, $event)" @keyup.esc="handleCellEditCancel"
                    ref="editInputRef" />
                  <span v-else class="x-table-editable-content" @dblclick="handleCellEditStart(row, col)">
                    {{ row[col.dataIndex] }}
                    <svg class="x-table-edit-icon" viewBox="0 0 24 24" width="14" height="14">
                      <path
                        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                        fill="currentColor" />
                    </svg>
                  </span>
                </div>
                <span v-else>{{ row[col.dataIndex] }}</span>
              </div>
            </div>
          </template>
        </template>
      </div>

      <!-- 空状态 -->
      <div v-if="dataSource.length === 0" class="x-table-empty">
        <slot name="empty">
          <XResult :status="emptyStatus" :title="emptyText">
            <template v-if="$slots.emptyIcon" #icon>
              <slot name="emptyIcon"></slot>
            </template>
          </XResult>
        </slot>
      </div>
    </div>

    <!-- 固定列阴影 -->
    <div v-if="hasFixedLeft" class="x-table-fixed-shadow-left"
      :class="{ 'x-table-fixed-shadow-active': scrollLeft > 0 }" :style="{ left: fixedLeftWidth + 'px' }"></div>
    <div v-if="hasFixedRight" class="x-table-fixed-shadow-right"
      :class="{ 'x-table-fixed-shadow-active': scrollLeft < maxScrollLeft }" :style="{ right: fixedRightWidth + 'px' }">
    </div>

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
 * 
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
  /** 空状态类型 */
  emptyStatus?: 'success' | 'error' | 'warning' | 'info' | '404' | '403' | '500'
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
  /** 跨页选择（保留其他页的选择状态） */
  preserveSelectedRowKeys?: boolean
  /** 获取checkbox属性的函数，用于设置禁用状态等 */
  getCheckboxProps?: (record: any) => { disabled?: boolean }
  /** selectionChange 事件是否返回完整行数据。true: 返回完整数据; false: 返回空数组（仅ids） */
  returnSelectedRows?: boolean
  /** 是否启用虚拟滚动（适用于大量数据） */
  virtual?: boolean
  /** 虚拟滚动行高（像素） */
  virtualRowHeight?: number
  /** 虚拟滚动缓冲区行数 */
  virtualBuffer?: number
}

const props = withDefaults(defineProps<TableProps>(), {
  dataSource: () => [],
  rowKey: 'id',
  height: '600px',
  loading: false,
  loadingText: '加载中...',
  emptyText: '暂无数据',
  emptyStatus: 'info',
  size: 'default',
  stripe: false,
  border: 'horizontal',
  showHeader: true,
  rowSelection: false,
  selectedRowKeys: () => [],
  highlightHoverRow: true,
  preserveSelectedRowKeys: false,
  getCheckboxProps: () => () => ({}),
  returnSelectedRows: true,
  virtual: false,
  virtualRowHeight: 48,
  virtualBuffer: 5
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
  refreshVirtualRange: [refreshVirtualRange: () => void]//用于虚拟滚动事件主动刷新
}>()

// Refs
const containerRef = ref<HTMLDivElement>()
const scrollRef = ref<HTMLDivElement>()

// State
const scrollLeft = ref(0)
const maxScrollLeft = ref(0)
const hoveredRow = ref<number | null>(null)
const internalSelectedRowKeys = ref<(string | number)[]>([...props.selectedRowKeys])
// 缓存所有已选行的完整数据（用于跨页选择）
const selectedRowsCache = ref<Map<string | number, any>>(new Map())
const sortState = ref<{ column: Column | null; order: 'asc' | 'desc' | null }>({
  column: null,
  order: null
})
const editingCell = ref<{ rowKey: string | number | null; columnKey: string | null }>({
  rowKey: null,
  columnKey: null
})
const editInputRef = ref<HTMLInputElement | null>(null)

// 虚拟滚动相关状态
const virtualScrollTop = ref(0)
const virtualStartIndex = ref(0)
const virtualEndIndex = ref(0)
const containerHeight = ref(0)

// 监听外部selectedRowKeys变化
watch(() => props.selectedRowKeys, (newVal) => {
  internalSelectedRowKeys.value = [...newVal]

  // 当外部keys变化时，尝试从当前数据源更新缓存
  props.dataSource.forEach(row => {
    const rowKey = row[props.rowKey]
    if (newVal.includes(rowKey)) {
      selectedRowsCache.value.set(rowKey, row)
    }
  })
})

// 监听dataSource变化，更新缓存中的数据
watch(() => props.dataSource, (newDataSource) => {
  // 更新缓存：将当前页的数据添加到缓存中
  newDataSource.forEach(row => {
    const rowKey = row[props.rowKey]
    if (internalSelectedRowKeys.value.includes(rowKey)) {
      selectedRowsCache.value.set(rowKey, row)
    }
  })
}, { immediate: true, deep: true })

// 过滤可见列并验证固定列必须有宽度
const visibleColumns = computed(() => {
  const cols = props.columns.filter(col => col.visible !== false)

  // 验证固定列必须有明确的宽度
  cols.forEach(col => {
    if ((col.fixed === 'left' || col.fixed === 'right') && !col.width) {
      console.warn(`[XTable] 固定列 "${col.title}" (key: ${col.key}) 必须设置 width 属性`)
    }
  })

  return cols
})

// 计算固定列
const fixedLeftColumns = computed(() =>
  visibleColumns.value.filter(col => col.fixed === 'left')
)

const fixedRightColumns = computed(() =>
  visibleColumns.value.filter(col => col.fixed === 'right')
)

const hasFixedLeft = computed(() => fixedLeftColumns.value.length > 0 || props.rowSelection)
const hasFixedRight = computed(() => fixedRightColumns.value.length > 0)

// 虚拟滚动：计算实际渲染的数据
const visibleData = computed(() => {
  if (!props.virtual) {
    return props.dataSource
  }

  return props.dataSource.slice(virtualStartIndex.value, virtualEndIndex.value)
})

// 虚拟滚动：获取真实行索引
const getRealRowIndex = (visibleIndex: number) => {
  return props.virtual ? virtualStartIndex.value + visibleIndex : visibleIndex
}

// 虚拟滚动：计算padding样式
const virtualPaddingStyle = computed(() => {
  if (!props.virtual) {
    return {}
  }

  const paddingTop = virtualStartIndex.value * props.virtualRowHeight
  const paddingBottom = (props.dataSource.length - virtualEndIndex.value) * props.virtualRowHeight

  return {
    paddingTop: `${paddingTop}px`,
    paddingBottom: `${paddingBottom}px`
  }
})

// 计算Grid模板列
const gridTemplateStyle = computed(() => {
  const columns: string[] = []

  // 选择列
  if (props.rowSelection) {
    columns.push('48px')
  }

  // 数据列
  visibleColumns.value.forEach(col => {
    if (col.width) {
      columns.push(col.width)
    } else if (col.minWidth) {
      columns.push(`minmax(${col.minWidth}, 1fr)`)
    } else {
      columns.push('minmax(100px, 1fr)')
    }
  })

  return {
    gridTemplateColumns: columns.join(' '),
    ...virtualPaddingStyle.value
  }
})

// 计算固定列宽度（用于阴影位置）
const fixedLeftWidth = computed(() => {
  let width = props.rowSelection ? 48 : 0
  fixedLeftColumns.value.forEach(col => {
    if (col.width) {
      width += parseFloat(col.width) || 0
    }
  })
  return width
})

const fixedRightWidth = computed(() => {
  let width = 0
  fixedRightColumns.value.forEach(col => {
    if (col.width) {
      width += parseFloat(col.width) || 0
    }
  })
  return width
})

// 获取固定列样式
const getFixedStyle = (col: Column, colIndex: number) => {
  const style: Record<string, string> = {}

  if (col.fixed === 'left') {
    let left = props.rowSelection ? 48 : 0
    for (let i = 0; i < colIndex; i++) {
      const c = visibleColumns.value[i]
      if (c.fixed === 'left' && c.width) {
        left += parseFloat(c.width) || 0
      }
    }
    style.left = left + 'px'
  } else if (col.fixed === 'right') {
    let right = 0
    for (let i = colIndex + 1; i < visibleColumns.value.length; i++) {
      const c = visibleColumns.value[i]
      if (c.fixed === 'right' && c.width) {
        right += parseFloat(c.width) || 0
      }
    }
    style.right = right + 'px'
  }

  return style
}

// 判断行是否禁用
const isRowDisabled = (record: any) => {
  if (!props.getCheckboxProps) return false
  const checkboxProps = props.getCheckboxProps(record)
  return checkboxProps?.disabled || false
}

// 获取所有已选行的完整数据（支持跨页）
const getAllSelectedRows = () => {
  if (!props.preserveSelectedRowKeys) {
    // 非跨页模式：只返回当前页的选中数据
    return props.dataSource.filter(row =>
      internalSelectedRowKeys.value.includes(row[props.rowKey])
    )
  }

  // 跨页模式：从缓存中获取所有已选行数据
  const rows: any[] = []
  internalSelectedRowKeys.value.forEach(key => {
    const cachedRow = selectedRowsCache.value.get(key)
    if (cachedRow) {
      rows.push(cachedRow)
    }
  })
  return rows
}

// 当前页的行键
const currentPageRowKeys = computed(() => {
  return props.dataSource.map(row => row[props.rowKey])
})

// 当前页可选择的行（排除禁用的行）
const selectableRows = computed(() => {
  return props.dataSource.filter(row => !isRowDisabled(row))
})

// 是否全选（只判断当前页的可选行）
const isAllSelected = computed(() => {
  const selectable = selectableRows.value
  if (!selectable.length) return false
  return selectable.every(row =>
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  )
})

// 是否部分选中（只判断当前页的可选行）
const isIndeterminate = computed(() => {
  const selectable = selectableRows.value
  if (!selectable.length) return false
  const selectedCount = selectable.filter(row =>
    internalSelectedRowKeys.value.includes(row[props.rowKey])
  ).length
  return selectedCount > 0 && selectedCount < selectable.length
})

// 计算虚拟滚动的可见范围
const updateVirtualRange = (scrollTop: number) => {
  if (!props.virtual) return

  const visibleCount = Math.ceil(containerHeight.value / props.virtualRowHeight)
  const totalCount = props.dataSource.length

  // 计算起始索引（添加缓冲区）
  const startIndex = Math.max(0, Math.floor(scrollTop / props.virtualRowHeight) - props.virtualBuffer)
  // 计算结束索引（添加缓冲区）
  const endIndex = Math.min(totalCount, startIndex + visibleCount + props.virtualBuffer * 2)

  virtualStartIndex.value = startIndex
  virtualEndIndex.value = endIndex
}

const refreshVirtualRange = () => {
  if (!props.virtual || !containerRef.value) return
  containerHeight.value = containerRef.value.clientHeight
  updateVirtualRange(scrollRef.value?.scrollTop ?? 0)
}

// 监听外部 dataSource 变化（接口返回后）
watch(() => props.dataSource, async () => {
  // 等待 DOM 更新完再量高度
  await nextTick()
  refreshVirtualRange()
}, { immediate: true })

// 处理滚动
const handleScroll = (e: Event) => {
  const target = e.target as HTMLDivElement
  scrollLeft.value = target.scrollLeft
  maxScrollLeft.value = target.scrollWidth - target.clientWidth

  // 虚拟滚动处理
  if (props.virtual) {
    virtualScrollTop.value = target.scrollTop
    updateVirtualRange(target.scrollTop)
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
  const selectableRowKeys = selectableRows.value.map(row => row[props.rowKey])

  if (props.preserveSelectedRowKeys) {
    // 跨页选择模式：只操作当前页的可选行
    if (newSelected) {
      // 全选当前页：合并当前页的可选行键和其他页的已选行键
      const currentPageKeys = currentPageRowKeys.value
      const otherPageKeys = internalSelectedRowKeys.value.filter(
        key => !currentPageKeys.includes(key)
      )
      internalSelectedRowKeys.value = [...otherPageKeys, ...selectableRowKeys]

      // 将当前页的可选行添加到缓存
      selectableRows.value.forEach(row => {
        selectedRowsCache.value.set(row[props.rowKey], row)
      })
    } else {
      // 取消全选当前页：只移除当前页的可选行键
      internalSelectedRowKeys.value = internalSelectedRowKeys.value.filter(
        key => !selectableRowKeys.includes(key)
      )

      // 从缓存中移除当前页的可选行
      selectableRowKeys.forEach(key => {
        selectedRowsCache.value.delete(key)
      })
    }
  } else {
    // 普通模式：全选/取消全选所有可选数据
    if (newSelected) {
      internalSelectedRowKeys.value = selectableRowKeys
      // 清空缓存并添加当前选中的行
      selectedRowsCache.value.clear()
      selectableRows.value.forEach(row => {
        selectedRowsCache.value.set(row[props.rowKey], row)
      })
    } else {
      internalSelectedRowKeys.value = []
      selectedRowsCache.value.clear()
    }
  }

  // 根据 returnSelectedRows 参数决定是否返回完整行数据
  const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []

  emit('selectAll', newSelected)
  emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
}

const handleRowSelect = (record: any) => {
  // 如果行被禁用，则不处理选择
  if (isRowDisabled(record)) {
    return
  }

  const rowKey = record[props.rowKey]
  const index = internalSelectedRowKeys.value.indexOf(rowKey)

  // 使用不可变的方式更新数组，确保响应式更新
  if (index > -1) {
    // 取消选择：从列表和缓存中移除
    internalSelectedRowKeys.value = internalSelectedRowKeys.value.filter(key => key !== rowKey)
    selectedRowsCache.value.delete(rowKey)
  } else {
    // 选择：添加到列表和缓存
    internalSelectedRowKeys.value = [...internalSelectedRowKeys.value, rowKey]
    selectedRowsCache.value.set(rowKey, record)
  }

  // 根据 returnSelectedRows 参数决定是否返回完整行数据
  const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []

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
  // 窗口大小变化时，需要重新计算虚拟滚动范围
  if (props.virtual) {
    refreshVirtualRange()
  }
}

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await nextTick()
  // 初始化虚拟滚动
  refreshVirtualRange()
  setTimeout(() => {
    handleResize()
    // 确保虚拟滚动范围正确
    if (props.virtual) {
      refreshVirtualRange()
    }
  }, 0)
  // 暴露刷新函数给用户手动刷新
  emit('refreshVirtualRange', refreshVirtualRange)
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
  selectedRowsCache.value.clear()
  emit('selectionChange', [], [])
}

/**
 * 设置选中的行
 * @param keys - 行键数组
 */
const setSelectedRows = (keys: (string | number)[]) => {
  internalSelectedRowKeys.value = [...keys]

  // 清空缓存
  selectedRowsCache.value.clear()

  // 从当前数据源中查找对应的行并添加到缓存
  props.dataSource.forEach(row => {
    const rowKey = row[props.rowKey]
    if (keys.includes(rowKey)) {
      selectedRowsCache.value.set(rowKey, row)
    }
  })

  // 根据 returnSelectedRows 参数决定是否返回完整行数据
  const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []

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
 * 获取当前选中的行数据（支持跨页）
 */
const getSelectedRows = () => {
  return getAllSelectedRows()
}

/**
 * 刷新表格布局（重新计算滚动区域）
 */
const refresh = () => {
  handleResize()
}

/**
 * 获取当前页的选中行键
 */
const getCurrentPageSelectedRowKeys = () => {
  const currentKeys = currentPageRowKeys.value
  return internalSelectedRowKeys.value.filter(key => currentKeys.includes(key))
}

/**
 * 获取当前页的选中行数据
 */
const getCurrentPageSelectedRows = () => {
  const selectedKeys = getCurrentPageSelectedRowKeys()
  return props.dataSource.filter(row => selectedKeys.includes(row[props.rowKey]))
}

/**
 * 获取其他页（非当前页）的选中行键
 */
const getOtherPageSelectedRowKeys = () => {
  const currentKeys = currentPageRowKeys.value
  return internalSelectedRowKeys.value.filter(key => !currentKeys.includes(key))
}

/**
 * 清空当前页的选择（仅跨页模式有效）
 */
const clearCurrentPageSelection = () => {
  if (props.preserveSelectedRowKeys) {
    const currentKeys = currentPageRowKeys.value
    // 从缓存中移除当前页的行
    currentKeys.forEach(key => {
      selectedRowsCache.value.delete(key)
    })
    internalSelectedRowKeys.value = internalSelectedRowKeys.value.filter(
      key => !currentKeys.includes(key)
    )
    // 根据 returnSelectedRows 参数决定是否返回完整行数据
    const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []
    emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
  } else {
    clearSelection()
  }
}

/**
 * 全选当前页（仅跨页模式有效）
 */
const selectCurrentPage = () => {
  // 只选择可选择的行（排除禁用的行）
  const selectableRowKeys = selectableRows.value.map(row => row[props.rowKey])

  if (props.preserveSelectedRowKeys) {
    const otherPageKeys = getOtherPageSelectedRowKeys()
    internalSelectedRowKeys.value = [...otherPageKeys, ...selectableRowKeys]
    // 将当前页的可选行添加到缓存
    selectableRows.value.forEach(row => {
      selectedRowsCache.value.set(row[props.rowKey], row)
    })
    // 根据 returnSelectedRows 参数决定是否返回完整行数据
    const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []
    emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
  } else {
    internalSelectedRowKeys.value = selectableRowKeys
    // 清空并重新添加
    selectedRowsCache.value.clear()
    selectableRows.value.forEach(row => {
      selectedRowsCache.value.set(row[props.rowKey], row)
    })
    // 根据 returnSelectedRows 参数决定是否返回完整行数据
    const selectedRows = props.returnSelectedRows ? getAllSelectedRows() : []
    emit('selectionChange', internalSelectedRowKeys.value, selectedRows)
  }
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
  refresh,
  // 跨页选择相关方法
  getCurrentPageSelectedRowKeys,
  getCurrentPageSelectedRows,
  getOtherPageSelectedRowKeys,
  clearCurrentPageSelection,
  selectCurrentPage,
  refreshVirtualRange
})
</script>
