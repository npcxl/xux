# Tag 标签

用于标记和分类的标签组件。

## 基础用法

基本的标签展示。

:::demo

```vue
<template>
  <div class="flex gap-2">
    <XTag>默认标签</XTag>
    <XTag type="primary">主要标签</XTag>
    <XTag type="success">成功标签</XTag>
    <XTag type="warning">警告标签</XTag>
    <XTag type="danger">危险标签</XTag>
  </div>
</template>
```

:::

## 不同尺寸

提供三种尺寸的标签。

:::demo

```vue
<template>
  <div class="flex items-center gap-3">
    <XTag size="small" type="primary">小号标签</XTag>
    <XTag size="medium" type="primary">中号标签</XTag>
    <XTag size="large" type="primary">大号标签</XTag>
  </div>
</template>
```

:::

## 可关闭标签

通过 `closable` 属性设置标签可关闭。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XTag 
      v-for="tag in tags" 
      :key="tag.id"
      :type="tag.type"
      closable
      @close="handleClose(tag.id)"
    >
      {{ tag.label }}
    </XTag>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref([
  { id: 1, label: 'Vue.js', type: 'primary' },
  { id: 2, label: 'React', type: 'success' },
  { id: 3, label: 'Angular', type: 'warning' },
  { id: 4, label: 'Svelte', type: 'danger' }
])

const handleClose = (id) => {
  tags.value = tags.value.filter(tag => tag.id !== id)
}
</script>
```

:::

## 带边框

通过 `bordered` 属性添加边框。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="flex gap-2">
      <XTag bordered>默认</XTag>
      <XTag type="primary" bordered>主要</XTag>
      <XTag type="success" bordered>成功</XTag>
      <XTag type="warning" bordered>警告</XTag>
      <XTag type="danger" bordered>危险</XTag>
    </div>
    
    <div class="flex gap-2">
      <XTag bordered closable>可关闭</XTag>
      <XTag type="primary" bordered closable>可关闭</XTag>
      <XTag type="success" bordered closable>可关闭</XTag>
    </div>
  </div>
</template>
```

:::

## 标签组

标签组合使用示例。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <div class="text-sm font-medium mb-2 text-gray-700">前端技术栈</div>
      <div class="flex flex-wrap gap-2">
        <XTag type="primary">Vue 3</XTag>
        <XTag type="primary">TypeScript</XTag>
        <XTag type="primary">Vite</XTag>
        <XTag type="primary">Pinia</XTag>
      </div>
    </div>
    
    <div>
      <div class="text-sm font-medium mb-2 text-gray-700">项目状态</div>
      <div class="flex flex-wrap gap-2">
        <XTag type="success">已完成</XTag>
        <XTag type="warning">进行中</XTag>
        <XTag type="danger">已逾期</XTag>
        <XTag>待开始</XTag>
      </div>
    </div>
    
    <div>
      <div class="text-sm font-medium mb-2 text-gray-700">标签云</div>
      <div class="flex flex-wrap gap-2">
        <XTag size="small">JavaScript</XTag>
        <XTag size="small" type="primary">CSS3</XTag>
        <XTag size="small" type="success">HTML5</XTag>
        <XTag size="small">Node.js</XTag>
        <XTag size="small" type="warning">Webpack</XTag>
        <XTag size="small" type="danger">Git</XTag>
        <XTag size="small">Docker</XTag>
        <XTag size="small" type="primary">MySQL</XTag>
      </div>
    </div>
  </div>
</template>
```

:::

## 动态添加标签

可以动态添加和删除标签。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="flex flex-wrap gap-2">
      <XTag 
        v-for="tag in dynamicTags" 
        :key="tag"
        closable
        @close="removeTag(tag)"
      >
        {{ tag }}
      </XTag>
      
      <input
        v-if="inputVisible"
        ref="inputRef"
        v-model="inputValue"
        type="text"
        class="w-24 px-2 py-1 text-sm border rounded"
        @keyup.enter="addTag"
        @blur="addTag"
      >
      
      <button
        v-else
        @click="showInput"
        class="px-3 py-1 text-sm border border-dashed border-gray-300 rounded hover:border-gray-400 transition-colors"
      >
        + 新标签
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const dynamicTags = ref(['标签1', '标签2', '标签3'])
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref()

const removeTag = (tag) => {
  dynamicTags.value = dynamicTags.value.filter(t => t !== tag)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const addTag = () => {
  if (inputValue.value && !dynamicTags.value.includes(inputValue.value)) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
```

:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 标签类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| size | 标签尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| closable | 是否可关闭 | `boolean` | `false` |
| bordered | 是否带边框 | `boolean` | `false` |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭标签时触发 | - |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容 |

