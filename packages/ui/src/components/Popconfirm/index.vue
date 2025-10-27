<template>
  <ElPopover
    v-model:visible="visible"
    :placement="placement"
    :width="280"
    :offset="12"
    :show-arrow="true"
    trigger="click"
    :teleported="true"
    popper-class="x-popconfirm-popper"
  >
    <template #reference>
      <slot name="trigger"></slot>
    </template>

    <template #default>
      <div class="x-popconfirm-content">
        <div class="x-popconfirm-main">
          <div v-if="!hideIcon" class="x-popconfirm-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path 
                v-if="icon === 'warning'"
                fill="#f59e0b" 
                d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
              />
              <path 
                v-else-if="icon === 'info'"
                fill="#3b82f6" 
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
              />
              <path 
                v-else-if="icon === 'error'"
                fill="#ef4444" 
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
              <path 
                v-else
                fill="#f59e0b" 
                d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
              />
            </svg>
          </div>
          <div class="x-popconfirm-message">
            <div class="x-popconfirm-title">{{ title }}</div>
            <div v-if="description" class="x-popconfirm-description">{{ description }}</div>
          </div>
        </div>
        <div class="x-popconfirm-actions">
          <XButton 
            size="small" 
            @click="handleCancel"
          >
            {{ cancelText }}
          </XButton>
          <XButton 
            size="small" 
            type="primary"
            @click="handleConfirm"
          >
            {{ okText }}
          </XButton>
        </div>
      </div>
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElPopover } from 'element-plus'
import XButton from '../Button/index.vue'

export interface PopconfirmProps {
  title: string
  description?: string
  okText?: string
  cancelText?: string
  icon?: 'warning' | 'info' | 'error'
  hideIcon?: boolean
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  okText: '确定',
  cancelText: '取消',
  icon: 'warning',
  hideIcon: false,
  placement: 'top'
})

const emit = defineEmits(['confirm', 'cancel'])

const visible = ref(false)

function handleConfirm() {
  emit('confirm')
  visible.value = false
}

function handleCancel() {
  emit('cancel')
  visible.value = false
}
</script>

<style>
/* 全局样式 - 自定义 Element Plus Popover */
.x-popconfirm-popper {
  padding: 16px !important;
  max-width: 360px !important;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 8px !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08),
              0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05) !important;
}

.x-popconfirm-popper .el-popper__arrow::before {
  border-color: #ffffff !important;
  background: #ffffff !important;
}

/* 暗色模式 */
.dark .x-popconfirm-popper {
  background: #1a1a1a !important;
  border: 1px solid #333 !important;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.32),
              0 3px 6px -4px rgba(0, 0, 0, 0.48) !important;
}

.dark .x-popconfirm-popper .el-popper__arrow::before {
  border-color: #1a1a1a !important;
  background: #1a1a1a !important;
}
</style>

<style lang="scss" scoped>
.x-popconfirm-content {
  /* 不需要额外的样式，使用 Element Plus 的默认样式 */
}

.x-popconfirm-main {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  
  .x-popconfirm-icon {
    flex-shrink: 0;
    
    svg {
      display: block;
    }
  }
  
  .x-popconfirm-message {
    flex: 1;
    
    .x-popconfirm-title {
      font-size: 14px;
      font-weight: 500;
      color: #303133;
      line-height: 1.5;
    }
    
    .x-popconfirm-description {
      font-size: 13px;
      color: #606266;
      margin-top: 4px;
      line-height: 1.5;
    }
  }
}

.x-popconfirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* 暗色模式下的文字颜色 */
:global(.dark) {
  .x-popconfirm-title {
    color: #e5e5e5 !important;
  }
  
  .x-popconfirm-description {
    color: #aaa !important;
  }
}
</style>
