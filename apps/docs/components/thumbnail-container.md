# ThumbnailContainer 缩略图容器

缩略图容器组件，用于展示和滚动图片缩略图列表，支持左右滚动、自动定位、响应式布局。

## 基础用法

展示图片缩略图列表，点击切换当前选中的图片。

:::demo

```vue
<template>
  <div>
    <XThumbnailContainer 
      v-model="currentIndex"
      :images="images"
    />
    <div class="mt-4 text-sm text-gray-600">
      当前选中：第 {{ currentIndex + 1 }} 张图片
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const images = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=300'
]
</script>
```

:::

## 左右滚动按钮

当缩略图超出容器宽度时，自动显示左右滚动按钮。

:::demo

```vue
<template>
  <div>
    <XThumbnailContainer 
      v-model="currentIndex"
      :images="manyImages"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
      <div class="font-medium mb-2">提示：</div>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>点击左右箭头按钮可以滚动查看更多缩略图</li>
        <li>点击缩略图会自动滚动到第3个位置</li>
        <li>当前选中：第 {{ currentIndex + 1 }} 张</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const manyImages = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=300',
  'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300'
]
</script>
```

:::

## 事件监听

监听缩略图的点击、切换和悬停事件。

:::demo

```vue
<template>
  <div>
    <XThumbnailContainer 
      v-model="currentIndex"
      :images="images"
      @change="handleChange"
      @hover="handleHover"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm space-y-1">
      <div><strong>事件日志：</strong></div>
      <div v-for="(log, index) in logs" :key="index" class="text-xs">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const logs = ref([])
const images = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300'
]

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${message}`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}

const handleChange = (index) => {
  addLog(`切换到第 ${index + 1} 张图片`)
}

const handleHover = (index) => {
  addLog(`悬停在第 ${index + 1} 张图片`)
}
</script>
```

:::

## 关闭自动滚动

设置 `:auto-scroll="false"` 可以禁用点击时的自动滚动定位。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm font-medium mb-2">自动滚动（默认）</div>
      <XThumbnailContainer 
        v-model="index1"
        :images="images"
        :auto-scroll="true"
      />
    </div>
    <div>
      <div class="text-sm font-medium mb-2">禁用自动滚动</div>
      <XThumbnailContainer 
        v-model="index2"
        :images="images"
        :auto-scroll="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const index1 = ref(0)
const index2 = ref(0)
const images = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=300'
]
</script>
```

:::

## 编程控制

使用 ref 调用组件的方法进行编程控制。

:::demo

```vue
<template>
  <div>
    <XThumbnailContainer 
      ref="thumbnailRef"
      v-model="currentIndex"
      :images="images"
    />
    <div class="mt-4 flex flex-wrap gap-2">
      <button 
        @click="handleScrollLeft"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
      >
        向左滚动
      </button>
      <button 
        @click="handleScrollRight"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
      >
        向右滚动
      </button>
      <button 
        @click="setIndex(0)"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        第1张
      </button>
      <button 
        @click="setIndex(3)"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        第4张
      </button>
      <button 
        @click="setIndex(images.length - 1)"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        最后一张
      </button>
    </div>
    <div class="mt-3 text-sm text-gray-600">
      当前：第 {{ currentIndex + 1 }} 张
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const thumbnailRef = ref(null)
const currentIndex = ref(0)
const images = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300',
  'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=300'
]

const handleScrollLeft = () => {
  thumbnailRef.value?.scrollLeft()
}

const handleScrollRight = () => {
  thumbnailRef.value?.scrollRight()
}

const setIndex = (index) => {
  thumbnailRef.value?.setCurrentIndex(index)
}
</script>
```

:::

## 响应式设计

组件会根据屏幕尺寸自动调整缩略图大小。

:::demo

```vue
<template>
  <div>
    <XThumbnailContainer 
      v-model="currentIndex"
      :images="images"
    />
    <div class="mt-4 p-3 bg-blue-50 rounded text-sm">
      <div class="font-medium mb-2">响应式尺寸：</div>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>移动端（< 640px）：80x80 px</li>
        <li>平板（≥ 640px）：96x96 px</li>
        <li>桌面（≥ 1024px）：123x122 px</li>
        <li>滚动按钮自动适配尺寸</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const images = [
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'
]
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前选中的图片索引 | `number` | `0` |
| images | 图片 URL 数组 | `string[]` | `[]` |
| autoScroll | 点击时是否自动滚动到第3位置 | `boolean` | `true` |
| showIndex | 是否显示图片序号 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 选中索引改变时触发 | `(index: number)` |
| change | 切换图片时触发 | `(index: number)` |
| hover | 鼠标悬停在缩略图时触发 | `(index: number)` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| setCurrentIndex | 设置当前选中索引 | `(index: number)` |
| scrollLeft | 向左滚动 | `()` |
| scrollRight | 向右滚动 | `()` |
| updateScrollState | 更新滚动状态 | `()` |

## 使用场景

1. **电商产品图**：产品详情页的多图预览
2. **相册浏览**：图片集的缩略图导航
3. **轮播图控制**：配合轮播组件使用
4. **视频时间轴**：视频预览缩略图
5. **文档预览**：PDF、PPT 页面缩略图

## 最佳实践

1. **图片优化**：
   - 使用压缩后的缩略图
   - 推荐尺寸：150x150 ~ 300x300
   - 支持懒加载

2. **交互设计**：
   - 自动滚动到第3位置，保持视觉连续性
   - 点击缩略图立即切换，响应迅速
   - 左右按钮只在必要时显示

3. **响应式适配**：
   - 移动端减小缩略图尺寸
   - 平板和桌面逐步增大
   - 触摸设备优化点击区域

4. **性能优化**：
   - 使用 CDN 加速图片加载
   - 虚拟滚动（超过50张图片）
   - 防抖滚动事件处理

5. **可访问性**：
   - 提供 alt 文本
   - 键盘导航支持
   - 明确的视觉反馈

