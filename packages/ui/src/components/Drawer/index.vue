<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-1000 flex"
        :class="{
          'justify-end': placement === 'right',
          'justify-start': placement === 'left',
          'items-end flex-col': placement === 'bottom',
          'items-start flex-col': placement === 'top'
        }"
      >
        <!-- 遮罩 -->
        <Transition name="drawer-mask">
          <div
            v-if="modelValue && mask"
            class="absolute inset-0 bg-black/50 backdrop-blur-sm"
            @click="handleMaskClick"
          ></div>
        </Transition>

        <!-- 抽屉内容 -->
        <Transition :name="`drawer-slide-${placement}`">
          <div
            v-if="modelValue"
            class="relative bg-white dark:bg-gray-900 shadow-2xl flex flex-col z-1"
            :class="drawerClass"
            :style="drawerStyle"
          >
            <!-- 头部 -->
            <div v-if="showHeader" class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div class="text-lg font-600 text-gray-900 dark:text-gray-100">
                <slot name="title">{{ title }}</slot>
              </div>
              <button
                v-if="closable"
                class="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                @click="handleClose"
              >
                <Icon icon="material-symbols:close" class="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <!-- 内容 -->
            <div class="flex-1 overflow-y-auto px-6 py-4">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

export interface DrawerProps {
  modelValue: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: string | number
  mask?: boolean
  maskClosable?: boolean
  closable?: boolean
  showHeader?: boolean
}

const props = withDefaults(defineProps<DrawerProps>(), {
  modelValue: false,
  title: '',
  placement: 'right',
  size: '378px',
  mask: true,
  maskClosable: true,
  closable: true,
  showHeader: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
  open: []
}>()

const drawerClass = computed(() => {
  const { placement } = props
  if (placement === 'left' || placement === 'right') {
    return 'h-full'
  }
  return 'w-full'
})

const drawerStyle = computed(() => {
  const { placement, size } = props
  const sizeValue = typeof size === 'number' ? `${size}px` : size

  if (placement === 'left' || placement === 'right') {
    return { width: sizeValue, maxWidth: '100vw' }
  }
  return { height: sizeValue, maxHeight: '100vh' }
})

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleClose()
  }
}

watch(() => props.modelValue, (val) => {
  if (val) {
    emit('open')
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* 淡入淡出 */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

/* 遮罩动画 */
.drawer-mask-enter-active,
.drawer-mask-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-mask-enter-from,
.drawer-mask-leave-to {
  opacity: 0;
}

/* 右侧滑入 */
.drawer-slide-right-enter-active,
.drawer-slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-right-enter-from {
  transform: translateX(100%);
}

.drawer-slide-right-leave-to {
  transform: translateX(100%);
}

/* 左侧滑入 */
.drawer-slide-left-enter-active,
.drawer-slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-left-enter-from {
  transform: translateX(-100%);
}

.drawer-slide-left-leave-to {
  transform: translateX(-100%);
}

/* 顶部滑入 */
.drawer-slide-top-enter-active,
.drawer-slide-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-top-enter-from {
  transform: translateY(-100%);
}

.drawer-slide-top-leave-to {
  transform: translateY(-100%);
}

/* 底部滑入 */
.drawer-slide-bottom-enter-active,
.drawer-slide-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-slide-bottom-enter-from {
  transform: translateY(100%);
}

.drawer-slide-bottom-leave-to {
  transform: translateY(100%);
}
</style>

