<template>
  <div
    v-show="isActive"
    class="x-tab-pane"
    :class="{ 'is-active': isActive }"
    role="tabpanel"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted } from 'vue'

export interface TabPaneProps {
  name: string | number
  label: string
  icon?: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}

const props = withDefaults(defineProps<TabPaneProps>(), {
  disabled: false,
  closable: true,
  lazy: false
})

// 获取 tabs 上下文
const tabsContext = inject<any>('x-tabs', null)

// 是否激活
const isActive = computed(() => {
  return tabsContext?.activeKey?.value === props.name
})

onMounted(() => {
  if (tabsContext) {
    tabsContext.registerTab({
      name: props.name,
      label: props.label,
      icon: props.icon,
      disabled: props.disabled,
      closable: props.closable
    })
  }
})

onUnmounted(() => {
  if (tabsContext) {
    tabsContext.unregisterTab(props.name)
  }
})
</script>

<style scoped>
.x-tab-pane {
  animation: tabPaneIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes tabPaneIn {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

