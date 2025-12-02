<template>
  <div>
    <slot v-if="!hasError"></slot>
    <div v-else class="x-error-fallback">
      <slot name="error">
        <div class="x-error-box">渲染失败</div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, inject } from 'vue'
const hasError = ref(false)
const ctx = inject<any>('x-waterfall-context')
const props = defineProps<{ index?: number }>()
onErrorCaptured(() => { hasError.value = true; ctx?.reportError?.(props.index); return false })
</script>

<style scoped>
.x-error-fallback { position: relative }
.x-error-box { padding: 8px 12px; background: rgba(255,0,0,.08); color: #D32F2F; border: 1px solid rgba(211,47,47,.2); border-radius: 6px; font-size: 12px }
</style>
