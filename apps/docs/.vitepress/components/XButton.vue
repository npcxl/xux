<template>
  <button 
    class="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 border-none cursor-pointer transition-colors"
    :class="customClass" 
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
}>()

const emit = defineEmits<{
  click: []
}>()

function handleClick() {
  emit('click')
}
</script>

