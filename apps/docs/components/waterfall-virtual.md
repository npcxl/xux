# WaterfallVirtual 虚拟滚动瀑布流

高性能虚拟滚动瀑布流组件，支持大数据量流畅渲染。只渲染可见区域的项目，大幅提升性能。内置懒加载、错误处理、响应式断点等功能。

## 基础用法

最简单的虚拟滚动瀑布流，只需设置列数和数据源即可。

::::demo
```vue
<template>
  <XWaterfallVirtual :items="basicItems" :cols="3" :gap="16" :row-gap="16" height="600px">
    <template #default="slotProps">
      <div class="virtual-item" :style="{ height: (slotProps?.item?.height || 150) + 'px' }">
        {{ slotProps?.item?.content || '' }}
      </div>
    </template>
  </XWaterfallVirtual>
</template>

<script setup>
import { ref } from 'vue'

const basicItems = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    content: `项目 ${i + 1}`,
    height: 120 + Math.random() * 100
  }))
)
</script>

<style scoped>
.virtual-item {
  padding: 20px;
  background: var(--x-bg-color, #FFFFFF);
  border: 1px solid var(--x-border-color-lighter, #E5E5EA);
  border-radius: 8px;
  box-shadow: var(--x-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
  text-align: center;
  font-weight: 500;
  color: var(--x-text-color-primary, #000000);
  box-sizing: border-box;
}
</style>
```
:::: 

## 图片瀑布流

适用于大量图片展示场景，支持图片懒加载，自动优化加载性能。

::::demo
```vue
<template>
  <XWaterfallVirtual 
    :items="imageItems" 
    :cols="3" 
    :gap="16" 
    :row-gap="16" 
    height="600px"
    :estimate-item-height="250"
  >
    <template #default="slotProps">
      <div class="image-item" v-if="slotProps?.item">
        <img :src="slotProps.item.url" :alt="slotProps.item.title" class="image" />
        <div class="image-title">{{ slotProps.item.title }}</div>
      </div>
    </template>
  </XWaterfallVirtual>
</template>

<script setup>
import { ref } from 'vue'

const imageItems = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `图片 ${i + 1}`,
    url: `https://picsum.photos/seed/img${i + 1}/400/${300 + Math.floor(Math.random() * 200)}`
  }))
)
</script>

<style scoped>
.image-item {
  background: var(--x-bg-color, #FFFFFF);
  border: 1px solid var(--x-border-color-lighter, #E5E5EA);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--x-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
  box-sizing: border-box;
}

.image {
  width: 100%;
  height: auto;
  display: block;
}

.image-title {
  padding: 16px;
  font-size: 14px;
  color: var(--x-text-color-primary, #000000);
  text-align: center;
}
</style>
```
:::: 

## 商品卡片

适用于商品列表展示，支持大量商品数据流畅渲染。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; justify-content: flex-end;">
      <XButton type="primary" @click="loadMore">
        加载更多
      </XButton>
    </div>
    <XWaterfallVirtual 
      :items="productItems" 
      :cols="3" 
      :gap="16" 
      :row-gap="16" 
      height="600px"
      :loading="loading"
      :estimate-item-height="300"
      @load-more="handleLoadMore"
    >
      <template #default="slotProps">
        <XCard
          v-if="slotProps?.item"
          type="product"
          :title="slotProps.item.name"
          :description="slotProps.item.desc"
          :price="slotProps.item.price"
          :label="slotProps.item.label"
          :show-description="true"
          :fixed-image-ratio="false"
        >
          <template #image>
            <XImage
              :src="slotProps.item.image"
              :alt="slotProps.item.name"
              width="100%"
              height="auto"
              radius="16px"
              fit="cover"
              :hover-zoom="false"
            />
          </template>
        </XCard>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XCard, XImage, XButton } from '@xlui/xux-ui'

const loading = ref(false)
const productItems = ref([])
const page = ref(1)

const labels = ['热卖', '新品', '推荐', null, null, null]
const prices = ['¥199', '¥299', '¥399', '¥499', '¥599', '¥699', '¥799', '¥899']

const generateProducts = (pageNum) => {
  const items = []
  const start = (pageNum - 1) * 12
  for (let i = 0; i < 12; i++) {
    const index = start + i + 1
    const height = 200 + Math.floor(Math.random() * 150)
    items.push({
      id: index,
      name: `商品 ${index}`,
      desc: '这是商品描述信息，可能比较长',
      price: prices[Math.floor(Math.random() * prices.length)],
      image: `https://picsum.photos/seed/p${index}/300/${height}`,
      label: labels[Math.floor(Math.random() * labels.length)]
    })
  }
  return items
}

productItems.value = generateProducts(1)

const handleLoadMore = () => {
  if (loading.value) return
  loading.value = true
  setTimeout(() => {
    page.value++
    productItems.value.push(...generateProducts(page.value))
    loading.value = false
  }, 1000)
}

const loadMore = () => {
  handleLoadMore()
}
</script>
```
:::: 

## 响应式断点

通过 `breakpoints` 属性设置不同屏幕宽度下的列数，实现响应式布局。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">
      调整浏览器窗口大小，列数会自动变化
    </div>
    <XWaterfallVirtual 
      :items="responsiveItems" 
      :breakpoints="breakpoints"
      :gap="16" 
      :row-gap="16" 
      height="600px"
    >
      <template #default="slotProps">
        <div class="responsive-item" v-if="slotProps?.item" :style="{ height: (slotProps.item.height || 150) + 'px' }">
          <div class="item-number">{{ slotProps.item.number }}</div>
          <div class="item-text">{{ slotProps.item.text }}</div>
        </div>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const breakpoints = ref([
  { width: 0, cols: 1 },
  { width: 768, cols: 2 },
  { width: 1200, cols: 3 },
  { width: 1600, cols: 4 }
])

const responsiveItems = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    text: '响应式项目',
    height: 120 + Math.random() * 100
  }))
)
</script>

<style scoped>
.responsive-item {
  padding: 20px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-number {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--x-text-color-primary);
}

.item-text {
  font-size: 14px;
  color: var(--x-text-color-secondary);
}
</style>
```
:::: 

## 自定义缓冲区

通过 `buffer` 属性控制虚拟滚动的缓冲区大小，调整预渲染的项目数量。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
      <span style="color: var(--x-text-color-secondary); font-size: 14px">缓冲区大小：</span>
      <XButton size="small" :type="buffer === 3 ? 'primary' : 'default'" @click="buffer = 3">3</XButton>
      <XButton size="small" :type="buffer === 5 ? 'primary' : 'default'" @click="buffer = 5">5</XButton>
      <XButton size="small" :type="buffer === 10 ? 'primary' : 'default'" @click="buffer = 10">10</XButton>
    </div>
    <XWaterfallVirtual 
      :items="bufferItems" 
      :cols="3" 
      :gap="16" 
      :row-gap="16" 
      height="600px"
      :buffer="buffer"
    >
      <template #default="slotProps">
        <div class="buffer-item" v-if="slotProps?.item" :style="{ height: (slotProps.item.height || 150) + 'px' }">
          <div class="item-index">#{{ slotProps.item.index }}</div>
          <div class="item-content">缓冲区: {{ buffer }}</div>
        </div>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton } from '@xlui/xux-ui'

const buffer = ref(5)

const bufferItems = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    index: i + 1,
    height: 120 + Math.random() * 100
  }))
)
</script>

<style scoped>
.buffer-item {
  padding: 20px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-index {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--x-text-color-primary);
}

.item-content {
  font-size: 14px;
  color: var(--x-text-color-secondary);
}
</style>
```
:::: 

## 禁用虚拟滚动

通过设置 `virtual-scroll="false"` 可以禁用虚拟滚动，渲染所有项目。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">
      禁用虚拟滚动，所有项目都会渲染
    </div>
    <XWaterfallVirtual 
      :items="allItems" 
      :cols="3" 
      :gap="16" 
      :row-gap="16" 
      height="600px"
      :virtual-scroll="false"
    >
      <template #default="slotProps">
        <div class="all-item" v-if="slotProps?.item" :style="{ height: (slotProps.item.height || 150) + 'px' }">
          {{ slotProps.item.content }}
        </div>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const allItems = ref(
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    content: `项目 ${i + 1}`,
    height: 120 + Math.random() * 100
  }))
)
</script>

<style scoped>
.all-item {
  padding: 20px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  text-align: center;
  font-weight: 500;
  color: var(--x-text-color-primary);
  box-sizing: border-box;
}
</style>
```
:::: 

## 错误处理

组件内置错误处理机制，当项目渲染失败时会自动捕获错误，并可以通过 `show-error-toast` 显示错误提示。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
      <XButton @click="triggerError">触发错误</XButton>
      <XButton @click="resetError">重置</XButton>
    </div>
    <XWaterfallVirtual 
      :items="errorItems" 
      :cols="3" 
      :gap="16" 
      :row-gap="16" 
      height="600px"
      :show-error-toast="true"
      @error="handleError"
    >
      <template #default="slotProps">
        <div class="error-item" v-if="slotProps?.item" :style="{ height: (slotProps.item.height || 150) + 'px' }">
          {{ slotProps.item.content }}
        </div>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton } from '@xlui/xux-ui'

const errorItems = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    content: `项目 ${i + 1}`,
    height: 120 + Math.random() * 100,
    shouldError: false
  }))
)

const triggerError = () => {
  errorItems.value[5].shouldError = true
  errorItems.value = [...errorItems.value]
}

const resetError = () => {
  errorItems.value.forEach(item => {
    item.shouldError = false
  })
  errorItems.value = [...errorItems.value]
}

const handleError = (error) => {
  console.log('捕获到错误:', error)
}
</script>

<style scoped>
.error-item {
  padding: 20px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  text-align: center;
  font-weight: 500;
  color: var(--x-text-color-primary);
  box-sizing: border-box;
}
</style>
```
:::: 

## 滚动到指定位置

通过组件暴露的方法可以滚动到指定索引的项目或滚动到顶部。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
      <XButton size="small" @click="scrollToIndex(10)">滚动到第10项</XButton>
      <XButton size="small" @click="scrollToIndex(30)">滚动到第30项</XButton>
      <XButton size="small" @click="scrollToTop">滚动到顶部</XButton>
    </div>
    <XWaterfallVirtual 
      ref="waterfallRef"
      :items="scrollItems" 
      :cols="3" 
      :gap="16" 
      :row-gap="16" 
      height="600px"
    >
      <template #default="slotProps">
        <div class="scroll-item" v-if="slotProps?.item" :style="{ height: (slotProps.item.height || 150) + 'px' }">
          <div class="item-index">#{{ (slotProps.index !== undefined ? slotProps.index : 0) + 1 }}</div>
          <div class="item-content">{{ slotProps.item.content }}</div>
        </div>
      </template>
    </XWaterfallVirtual>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton } from '@xlui/xux-ui'

const waterfallRef = ref()

const scrollItems = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    content: `项目 ${i + 1}`,
    height: 120 + Math.random() * 100
  }))
)

const scrollToIndex = (index) => {
  waterfallRef.value?.scrollToIndex(index)
}

const scrollToTop = () => {
  waterfallRef.value?.scrollToTop()
}
</script>

<style scoped>
.scroll-item {
  padding: 20px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item-index {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--x-text-color-primary);
}

.item-content {
  font-size: 14px;
  color: var(--x-text-color-secondary);
}
</style>
```
:::: 

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据源 | `any[]` | `[]` |
| cols | 列数 | `number` | `3` |
| gap | 列间距（像素） | `number` | `16` |
| rowGap | 行间距（像素） | `number` | `16` |
| buffer | 虚拟滚动缓冲区大小（上下各预渲染的项目数） | `number` | `5` |
| virtualScroll | 是否启用虚拟滚动 | `boolean` | `true` |
| width | 容器宽度 | `string` | `100%` |
| height | 容器高度 | `string` | `600px` |
| loading | 是否加载中 | `boolean` | `false` |
| loadMoreThreshold | 触发加载更多的距离阈值（距离底部多少像素时触发） | `number` | `200` |
| estimateItemHeight | 估算的项目高度（用于虚拟滚动计算） | `number` | `200` |
| breakpoints | 响应式断点配置 | `Array<{ width: number; cols: number }>` | `[{ width: 0, cols: 1 }, { width: 768, cols: 2 }, { width: 1200, cols: 3 }]` |
| showErrorToast | 是否显示错误提示 | `boolean` | `false` |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| load-more | 滚动到底部触发加载更多 | - |
| layout | 布局计算完成时触发 | `{ height: number, cols: number, count: number }` |
| error | 项目渲染失败时触发 | `{ index: number }` |

## 插槽

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义项目内容 | `{ item, index }` |

## 方法

通过组件 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| calculateLayout | 手动触发布局计算 | - |
| scrollToIndex | 滚动到指定索引的项目 | `index: number` |
| scrollToTop | 滚动到顶部 | - |



