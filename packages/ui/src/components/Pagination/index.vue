<template>
  <div class="flex items-center justify-between px-5 py-4 bg-white rounded-xl shadow-sm">
    <!-- 左侧信息 -->
    <div class="text-sm text-gray-600">
      <slot name="info">
        共 <span class="font-semibold text-gray-900">{{ total }}</span> 条，
        当前第 <span class="font-semibold text-gray-900">{{ current }}</span>/{{ totalPages }} 页
      </slot>
    </div>

    <!-- 右侧控制 -->
    <div class="flex items-center gap-2">
      <!-- 首页 -->
      <XButton
        size="small"
        :disabled="current === 1"
        @click="handlePageChange(1)"
      >
        <Icon icon="mdi:page-first" class="text-base" />
      </XButton>
      
      <!-- 上一页 -->
      <XButton
        size="small"
        :disabled="current === 1"
        @click="handlePageChange(current - 1)"
      >
        <Icon icon="mdi:chevron-left" class="text-base" />
      </XButton>
      
      <!-- 页码 -->
      <div class="flex gap-1.5 mx-1">
        <XButton
          v-for="page in pages"
          :key="page"
          size="small"
          :type="page === current ? 'primary' : 'default'"
          :disabled="page === '...'"
          @click="page !== '...' && handlePageChange(page as number)"
        >
          {{ page }}
        </XButton>
      </div>

      <!-- 下一页 -->
      <XButton
        size="small"
        :disabled="current === totalPages"
        @click="handlePageChange(current + 1)"
      >
        <Icon icon="mdi:chevron-right" class="text-base" />
      </XButton>
      
      <!-- 末页 -->
      <XButton
        size="small"
        :disabled="current === totalPages"
        @click="handlePageChange(totalPages)"
      >
        <Icon icon="mdi:page-last" class="text-base" />
      </XButton>

      <!-- 分隔线 -->
      <div class="w-px h-6 bg-gray-200 mx-2"></div>

      <!-- 每页条数 -->
      <XSelect
        v-model="internalPageSize"
        :options="pageSizeOpts"
        width="120px"
        @change="handlePageSizeChange"
      />
      
      <!-- 快速跳转 -->
      <template v-if="showQuickJumper">
        <div class="w-px h-6 bg-gray-200 mx-2"></div>
        <span class="text-sm text-gray-600">跳至</span>
        <input
          v-model.number="jumpPage"
          type="number"
          class="jump-input"
          placeholder="页码"
          :min="1"
          :max="totalPages"
          @keyup.enter="handleQuickJump"
        />
        <span class="text-sm text-gray-600">页</span>
        <XButton
          size="small"
          @click="handleQuickJump"
        >
          跳转
        </XButton>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import XButton from '../Button/index.vue'
import XSelect from '../Select/index.vue'

export interface PaginationProps {
  current?: number
  pageSize?: number
  total?: number
  pageSizeOptions?: number[]
  showQuickJumper?: boolean
}

const props = withDefaults(defineProps<PaginationProps>(), {
  current: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: () => [10, 20, 50, 100],
  showQuickJumper: false
})

const emit = defineEmits<{
  (e: 'update:current', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'change', current: number, pageSize: number): void
}>()

const internalPageSize = ref(props.pageSize)
const jumpPage = ref<number | string>('')

const totalPages = computed(() => Math.ceil(props.total / internalPageSize.value) || 1)

const pageSizeOpts = computed(() => 
  props.pageSizeOptions.map(size => ({
    label: `${size} 条/页`,
    value: size
  }))
)

const pages = computed(() => {
  const pageList: (number | string)[] = []
  const total = totalPages.value
  const current = props.current
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pageList.push(i)
    }
  } else {
    pageList.push(1)
    
    if (current > 3) {
      pageList.push('...')
    }
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pageList.push(i)
    }
    
    if (current < total - 2) {
      pageList.push('...')
    }
    
    pageList.push(total)
  }
  
  return pageList
})

const handlePageChange = (page: number) => {
  console.log('handlePageChange 被调用，目标页码:', page, '当前页码:', props.current)
  if (page === props.current || page < 1 || page > totalPages.value) {
    console.log('跳转被拦截:', { same: page === props.current, tooSmall: page < 1, tooBig: page > totalPages.value })
    return
  }
  console.log('发送 update:current 事件:', page)
  emit('update:current', page)
  emit('change', page, internalPageSize.value)
}

const handlePageSizeChange = () => {
  emit('update:pageSize', internalPageSize.value)
  emit('update:current', 1)
  emit('change', 1, internalPageSize.value)
}

const handleQuickJump = () => {
  console.log('快速跳转触发, jumpPage.value:', jumpPage.value, '类型:', typeof jumpPage.value, '总页数:', totalPages.value)
  
  const page = typeof jumpPage.value === 'string' ? parseInt(jumpPage.value) : jumpPage.value
  console.log('转换后的页码:', page)
  
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    console.log('✅ 页码有效，执行跳转到页面:', page)
    handlePageChange(page)
    jumpPage.value = ''
  } else {
    console.log('❌ 跳转失败，页码无效:', { page, isNaN: isNaN(page), tooSmall: page < 1, tooBig: page > totalPages.value })
  }
}

watch(() => props.pageSize, (val) => {
  internalPageSize.value = val
})
</script>

<style scoped>
.jump-input {
  width: 64px;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  text-align: center;
  color: #1a1a1a;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s ease;
}

.jump-input:hover {
  border-color: #1a1a1a;
}

.jump-input:focus {
  border-color: #1a1a1a;
  box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
}

.jump-input::placeholder {
  color: #9ca3af;
}

.jump-input::-webkit-inner-spin-button,
.jump-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.jump-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
