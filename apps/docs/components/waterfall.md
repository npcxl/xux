# Waterfall 瀑布流布局

瀑布流布局组件，支持多列自适应布局，每个项目会自动填充到最短的列中，适用于图片展示、商品列表、卡片流等场景。

## 基础用法

最简单的瀑布流布局，只需设置列数即可。

::::demo
```vue
<template>
  <XWaterfall :cols="3" gap="16px" row-gap="16px" :items="basicItems">
    <template #item="{ item, index }">
      <div class="waterfall-item" :style="{ height: item.height + 'px' }">
        {{ item.content }}
      </div>
    </template>
  </XWaterfall>
</template>

<script setup>
import { ref } from 'vue'

const basicItems = ref([
  { content: '项目 1', height: 120 },
  { content: '项目 2', height: 180 },
  { content: '项目 3', height: 150 },
  { content: '项目 4', height: 200 },
  { content: '项目 5', height: 100 },
  { content: '项目 6', height: 160 },
  { content: '项目 7', height: 140 },
  { content: '项目 8', height: 190 }
])
</script>

<style scoped>
.waterfall-item {
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

<style>
/* 确保在demo块中CSS变量正确应用 */
.dark .waterfall-item {
  background: var(--x-bg-color, #000000) !important;
  border-color: var(--x-border-color-lighter, #1C1C1E) !important;
  color: var(--x-text-color-primary, #FFFFFF) !important;
}
</style>
```
::::

## 自定义列数

通过 `cols` 属性设置列数，组件会自动根据容器宽度计算每列的宽度。

::::demo
```vue
<template>
  <div style="margin-bottom: 24px;">
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">2列布局</div>
    <XWaterfall :cols="2" gap="16px" row-gap="16px" :items="twoColItems">
      <template #item="{ item }">
        <div class="card-item" :style="{ height: item.height + 'px' }">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-desc">{{ item.desc }}</div>
        </div>
      </template>
    </XWaterfall>
  </div>

  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">4列布局</div>
    <XWaterfall :cols="4" gap="16px" row-gap="16px" :items="fourColItems">
      <template #item="{ item }">
        <div class="card-item" :style="{ height: item.height + 'px' }">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-desc">{{ item.desc }}</div>
        </div>
      </template>
    </XWaterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const twoColItems = ref([
  { title: '卡片 1', desc: '这是卡片描述内容', height: 150 },
  { title: '卡片 2', desc: '这是卡片描述内容', height: 200 },
  { title: '卡片 3', desc: '这是卡片描述内容', height: 120 },
  { title: '卡片 4', desc: '这是卡片描述内容', height: 180 },
  { title: '卡片 5', desc: '这是卡片描述内容', height: 160 }
])

const fourColItems = ref([
  { title: '卡片 1', desc: '描述', height: 120 },
  { title: '卡片 2', desc: '描述', height: 180 },
  { title: '卡片 3', desc: '描述', height: 150 },
  { title: '卡片 4', desc: '描述', height: 200 },
  { title: '卡片 5', desc: '描述', height: 100 },
  { title: '卡片 6', desc: '描述', height: 160 },
  { title: '卡片 7', desc: '描述', height: 140 },
  { title: '卡片 8', desc: '描述', height: 190 }
])
</script>

<style scoped>
.card-item {
  padding: 16px;
  background: var(--x-bg-color);
  border: 1px solid var(--x-border-color-lighter);
  border-radius: 8px;
  box-shadow: var(--x-shadow);
  box-sizing: border-box;
}
.card-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  color: var(--x-text-color-primary);
}
.card-desc {
  color: var(--x-text-color-secondary);
  font-size: 14px;
  line-height: 1.5;
}
</style>

<style>
/* 深色模式覆盖 - 确保在demo块中正确应用 */
.dark .card-item {
  background: var(--x-bg-color) !important;
  border-color: var(--x-border-color-lighter) !important;
  box-shadow: var(--x-shadow) !important;
}

.dark .card-title {
  color: var(--x-text-color-primary) !important;
}

.dark .card-desc {
  color: var(--x-text-color-secondary) !important;
}
</style>
```
::::

## 自定义间距

通过 `gap` 和 `rowGap` 属性分别控制列间距和行间距。

::::demo
```vue
<template>
  <div style="margin-bottom: 24px;">
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">gap="8px" rowGap="8px"</div>
    <XWaterfall :cols="3" gap="8px" row-gap="8px" :items="gapItems">
      <template #item="{ item }">
        <div class="gap-item" :style="{ height: item.height + 'px' }">
          {{ item.name }}
        </div>
      </template>
    </XWaterfall>
  </div>

  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">gap="24px" rowGap="24px"</div>
    <XWaterfall :cols="3" gap="24px" row-gap="24px" :items="gapItems">
      <template #item="{ item }">
        <div class="gap-item" :style="{ height: item.height + 'px' }">
          {{ item.name }}
        </div>
      </template>
    </XWaterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gapItems = ref([
  { name: '项目 1', height: 120 },
  { name: '项目 2', height: 180 },
  { name: '项目 3', height: 150 },
  { name: '项目 4', height: 200 },
  { name: '项目 5', height: 100 },
  { name: '项目 6', height: 160 }
])
</script>

<style scoped>
.gap-item {
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

## 图片瀑布流

适用于图片展示场景，每个图片高度不同，会自动填充到最短的列。

使用 XImage 组件时，需要设置 `height="auto"` 让图片按原始比例显示，这样才能在瀑布流中产生高度差异。

::::demo
```vue
<template>
  <XWaterfall :cols="3" gap="12px" row-gap="12px" :items="imageItems">
    <template #item="{ item }">
      <div class="image-item">
        <XImage 
          :src="item.url" 
          :alt="item.title" 
          width="100%"
          height="auto"
          radius="8px"
          fit="cover"
        />
      </div>
    </template>
  </XWaterfall>
</template>

<script setup>
import { ref } from 'vue'
import { XImage } from '@xlui/xux-ui'

const imageItems = ref([
  { url: 'https://picsum.photos/seed/w1/400/300', title: '图片 1' },
  { url: 'https://picsum.photos/seed/w2/400/500', title: '图片 2' },
  { url: 'https://picsum.photos/seed/w3/400/400', title: '图片 3' },
  { url: 'https://picsum.photos/seed/w4/400/350', title: '图片 4' },
  { url: 'https://picsum.photos/seed/w5/400/450', title: '图片 5' },
  { url: 'https://picsum.photos/seed/w6/400/280', title: '图片 6' },
  { url: 'https://picsum.photos/seed/w7/400/380', title: '图片 7' },
  { url: 'https://picsum.photos/seed/w8/400/320', title: '图片 8' },
  { url: 'https://picsum.photos/seed/w9/400/420', title: '图片 9' }
])
</script>

```
::::

## 商品卡片

适用于商品列表展示，每个商品卡片高度根据内容自适应。

当前示例使用的是 XCard 卡片组件，需要设置 `fixed-image-ratio="false"` 来禁用图片的固定宽高比，让图片按原始比例显示，这样才能在瀑布流中产生高度差异，展示出瀑布流效果。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; justify-content: flex-end;">
      <XButton type="primary" @click="refreshData">
        <template #icon>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V6L10 4M8 2L6 4M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 6.17868 13.1571 4.47083 11.6569 3.34315M8 14V10L6 12M8 14L10 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        刷新数据
      </XButton>
    </div>
    <XWaterfall :cols="3" gap="16px" row-gap="16px" :items="productItems">
      <template #item="{ item }">
        <XCard
          type="product"
          :title="item.name"
          :description="item.desc"
          :price="item.price"
          :label="item.label"
          :show-description="true"
          :fixed-image-ratio="false"
          @click="handleClick"
          @like="handleLike"
        >
          <template #image>
            <XImage
              :src="item.image"
              :alt="item.name"
              width="100%"
              height="auto"
              radius="16px"
              fit="cover"
              :hover-zoom="false"
            />
          </template>
        </XCard>
      </template>
    </XWaterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XCard, XImage, XButton } from '@xlui/xux-ui'

const labels = ['热卖', '新品', '推荐', null, null, null]
const prices = ['¥199', '¥299', '¥399', '¥499', '¥599', '¥699', '¥799', '¥899']
const descriptions = [
  '这是商品描述信息',
  '这是商品描述信息，可能比较长',
  '这是商品描述信息，可能比较长，会占据更多空间',
  '这是商品描述信息，内容可能会比较多，用来测试不同高度的卡片效果'
]

const generateProductItems = () => {
  const items = []
  for (let i = 1; i <= 8; i++) {
    const seed = Math.floor(Math.random() * 1000)
    const height = 180 + Math.floor(Math.random() * 100)
    items.push({
      name: `商品 ${i}`,
      desc: descriptions[Math.floor(Math.random() * descriptions.length)],
      price: prices[Math.floor(Math.random() * prices.length)],
      image: `https://picsum.photos/seed/p${seed}/300/${height}`,
      label: labels[Math.floor(Math.random() * labels.length)]
    })
  }
  return items
}

const productItems = ref(generateProductItems())

const refreshData = () => {
  productItems.value = generateProductItems()
}

const handleClick = () => {
  console.log('点击卡片')
}

const handleLike = () => {
  console.log('点击收藏')
}
</script>
```
::::

## 视频瀑布流

适用于视频列表展示，每个视频高度根据内容自适应。支持清晰度切换、进度条控制、上一个/下一个视频切换，以及根据系统配置自适应加载。

::::demo
```vue
<template>
  <XWaterfall :cols="3" gap="16px" row-gap="16px" :items="videoItems">
    <template #item="{ item }">
      <div class="video-item">
        <XVideo
          :src="item.src"
          :poster="item.poster"
          :adaptive="true"
          width="100%"
          height="auto"
          radius="8px"
        />
        <div class="video-info">
          <div class="video-title">{{ item.title }}</div>
          <div class="video-meta">
            <span>{{ item.views }} 次观看</span>
            <span>·</span>
            <span>{{ item.duration }}</span>
          </div>
        </div>
      </div>
    </template>
  </XWaterfall>
</template>

<script setup>
import { ref } from 'vue'
import { XVideo } from '@xlui/xux-ui'

const videoItems = ref([
  {
    index: 0,
    title: '视频 1',
    views: '1.2万',
    duration: '3:45',
    poster: 'https://picsum.photos/seed/v1/400/300',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 0 }
    ]
  },
  {
    index: 1,
    title: '视频 2',
    views: '8.5万',
    duration: '5:20',
    poster: 'https://picsum.photos/seed/v2/400/400',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 0 }
    ]
  },
  {
    index: 2,
    title: '视频 3',
    views: '3.6万',
    duration: '2:15',
    poster: 'https://picsum.photos/seed/v3/400/250',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', bitrate: 0 }
    ]
  },
  {
    index: 3,
    title: '视频 4',
    views: '12.3万',
    duration: '4:30',
    poster: 'https://picsum.photos/seed/v4/400/350',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', bitrate: 0 }
    ]
  },
  {
    index: 4,
    title: '视频 5',
    views: '5.8万',
    duration: '6:10',
    poster: 'https://picsum.photos/seed/v5/400/280',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', bitrate: 0 }
    ]
  },
  {
    index: 5,
    title: '视频 6',
    views: '9.1万',
    duration: '3:25',
    poster: 'https://picsum.photos/seed/v6/400/320',
    src: [
      { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', bitrate: 5000 },
      { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', bitrate: 3000 },
      { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', bitrate: 1500 },
      { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', bitrate: 0 }
    ]
  }
])

const handleVideoChange = (index) => {
  console.log('切换到视频:', index)
}
</script>

<style scoped>
.video-item {
  background: var(--x-bg-color, #FFFFFF);
  border: 1px solid var(--x-border-color-lighter, #E5E5EA);
  border-radius: 8px;
  box-shadow: var(--x-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
  overflow: hidden;
  box-sizing: border-box;
}

.video-info {
  padding: 12px;
}

.video-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--x-text-color-primary, #000000);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  font-size: 12px;
  color: var(--x-text-color-secondary, #8E8E93);
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
```
::::

## 响应式布局

组件会自动监听容器宽度变化，当窗口大小改变时会自动重新计算布局。可以通过 `responsive` 属性控制是否启用响应式。

::::demo
```vue
<template>
  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">
      调整浏览器窗口大小，布局会自动重新计算
    </div>
    <XWaterfall :cols="3" gap="16px" :items="responsiveItems" :responsive="true">
      <template #item="{ item }">
        <div class="responsive-item" :style="{ height: item.height + 'px' }">
          <div class="item-number">{{ item.number }}</div>
          <div class="item-text">{{ item.text }}</div>
        </div>
      </template>
    </XWaterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const responsiveItems = ref(
  Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    text: '响应式项目',
    height: 120 + Math.random() * 100
  }))
)
</script>

<style scoped>
.responsive-item {
  padding: 24px;
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

## 自定义容器宽度

通过 `width` 属性设置容器宽度，组件会根据宽度自动计算每列的宽度。

::::demo
```vue
<template>
  <div style="margin-bottom: 24px;">
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">width="600px"</div>
    <XWaterfall :cols="3" gap="16px" width="600px" :items="widthItems">
      <template #item="{ item }">
        <div class="width-item" :style="{ height: item.height + 'px' }">
          {{ item.content }}
        </div>
      </template>
    </XWaterfall>
  </div>

  <div>
    <div style="margin-bottom: 12px; color: var(--x-text-color-secondary); font-size: 14px">width="100%"</div>
    <XWaterfall :cols="3" gap="16px" width="100%" :items="widthItems">
      <template #item="{ item }">
        <div class="width-item" :style="{ height: item.height + 'px' }">
          {{ item.content }}
        </div>
      </template>
    </XWaterfall>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const widthItems = ref([
  { content: '项目 1', height: 120 },
  { content: '项目 2', height: 180 },
  { content: '项目 3', height: 150 },
  { content: '项目 4', height: 200 },
  { content: '项目 5', height: 100 },
  { content: '项目 6', height: 160 }
])
</script>

<style scoped>
.width-item {
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


## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数 | `number` | `3` |
| gap | 列间距 | `string \| number` | `16px` |
| rowGap | 行间距 | `string \| number` | `16px` |
| items | 数据源 | `any[]` | `[]` |
| width | 容器宽度 | `string` | `100%` |
| height | 容器高度 | `string` | `auto` |
| responsive | 是否响应式（监听窗口大小变化） | `boolean` | `true` |
| loading | 是否加载中 | `boolean` | `false` |
| loadingText | 加载提示文字 | `string` | `加载中...` |

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| scroll | 滚动事件 | `scrollTop: number` |

## 插槽

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| item | 瀑布流项内容插槽 | `{ item, index }` |


