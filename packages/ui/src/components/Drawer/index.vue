<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div
        v-if="modelValue"
        :class="[
          'x-drawer-container',
          `placement-${placement}`
        ]"
      >
        <!-- 遮罩 -->
        <Transition name="drawer-mask">
          <div
            v-if="modelValue && mask"
            class="x-drawer-mask"
            @click="handleMaskClick"
          ></div>
        </Transition>

        <!-- 抽屉内容 -->
        <Transition :name="`drawer-slide-${placement}`">
          <div
            v-if="modelValue"
            :class="[
              'x-drawer-content',
              drawerClass
            ]"
            :style="drawerStyle"
          >
            <!-- 头部 -->
            <div v-if="showHeader" class="x-drawer-header">
              <div class="x-drawer-title">
                <slot name="title">{{ title }}</slot>
              </div>
              <button
                v-if="closable"
                class="x-drawer-close-btn"
                @click="handleClose"
              >
                <Icon icon="material-symbols:close" class="x-drawer-close-icon" />
              </button>
            </div>

            <!-- 内容 -->
            <div class="x-drawer-body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="x-drawer-footer">
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
import './index.css'

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
    return 'is-horizontal'
  }
  return 'is-vertical'
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

