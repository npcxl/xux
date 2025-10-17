<template>
  <div class="x-result" :class="`result-${status}`">
    <div class="result-icon">
      <slot name="icon">
        <!-- Success Icon -->
        <svg v-if="status === 'success'" viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="#10b981" opacity="0.1"/>
          <circle cx="32" cy="32" r="24" fill="none" stroke="#10b981" stroke-width="2"/>
          <path d="M22 32l8 8 12-16" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <!-- Error Icon -->
        <svg v-else-if="status === 'error'" viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="#ef4444" opacity="0.1"/>
          <circle cx="32" cy="32" r="24" fill="none" stroke="#ef4444" stroke-width="2"/>
          <path d="M24 24l16 16M40 24L24 40" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
        </svg>
        
        <!-- Warning Icon -->
        <svg v-else-if="status === 'warning'" viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="#f59e0b" opacity="0.1"/>
          <path d="M32 8L8 56h48L32 8z" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
          <path d="M32 24v16M32 44v4" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        </svg>
        
        <!-- Info Icon -->
        <svg v-else-if="status === 'info'" viewBox="0 0 64 64" width="64" height="64">
          <circle cx="32" cy="32" r="30" fill="#3b82f6" opacity="0.1"/>
          <circle cx="32" cy="32" r="24" fill="none" stroke="#3b82f6" stroke-width="2"/>
          <path d="M32 28v16M32 20v4" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>
        </svg>
        
        <!-- 404 状态码 -->
        <div v-else-if="status === '404'" class="result-status-code status-404">
          404
        </div>
        
        <!-- 403 状态码 -->
        <div v-else-if="status === '403'" class="result-status-code status-403">
          403
        </div>
        
        <!-- 500 状态码 -->
        <div v-else-if="status === '500'" class="result-status-code status-500">
          500
        </div>
      </slot>
    </div>
    
    <div class="result-title">
      <slot name="title">{{ title }}</slot>
    </div>
    
    <div v-if="$slots.subTitle || subTitle" class="result-subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>
    
    <div v-if="$slots.extra" class="result-extra">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ResultProps {
  status?: 'success' | 'error' | 'warning' | 'info' | '404' | '403' | '500'
  title?: string
  subTitle?: string
}

withDefaults(defineProps<ResultProps>(), {
  status: 'info',
  title: '',
  subTitle: ''
})
</script>

<style lang="scss" scoped>
.x-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px;
  text-align: center;
  
  .result-icon {
    margin-bottom: 24px;
    
    svg {
      display: block;
    }
    
    .result-status-code {
      font-size: 72px;
      font-weight: 700;
      line-height: 1;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .status-404 {
      color: #6b7280;
    }
    
    .status-403 {
      color: #f59e0b;
    }
    
    .status-500 {
      color: #ef4444;
    }
  }
  
  .result-title {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  
  .result-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 24px;
    line-height: 1.6;
    max-width: 500px;
  }
  
  .result-extra {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  /* 状态颜色 */
  &.result-success .result-title {
    color: #10b981;
  }
  
  &.result-error .result-title {
    color: #ef4444;
  }
  
  &.result-warning .result-title {
    color: #f59e0b;
  }
  
  &.result-info .result-title {
    color: #3b82f6;
  }
  
  &.result-404 .result-title,
  &.result-403 .result-title,
  &.result-500 .result-title {
    color: #6b7280;
  }
}
</style>

