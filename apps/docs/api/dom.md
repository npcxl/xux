# DOM工具 DOM

提供 DOM 操作、样式设置、元素监听等功能。

## 导入

```javascript
import { 
  getOffsetTop, getOffsetLeft, getScrollbarWidth, isInViewport,
  smoothScrollTo, setStyle, hasClass, addClass, removeClass, toggleClass,
  getWidth, getHeight, onResize, waitForElement
} from '@xlui/xux-ui'
```

## 样式类操作

添加、删除、切换 CSS 类名。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div 
      ref="box" 
      class="demo-box p-6 text-center rounded transition-all"
      :class="boxClasses">
      测试元素
    </div>
    <div class="grid grid-cols-4 gap-2">
      <XButton @click="addRed" type="danger" size="small">
        添加红色
      </XButton>
      <XButton @click="addLarge" type="primary" size="small">
        添加大号
      </XButton>
      <XButton @click="removeRed" type="warning" size="small">
        移除红色
      </XButton>
      <XButton @click="toggleBold" type="success" size="small">
        切换粗体
      </XButton>
    </div>
    <div class="p-3 bg-gray-50 rounded text-xs">
      当前类名：<code>{{ boxClasses.join(' ') }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { XButton, addClass, removeClass, toggleClass, hasClass } from '@xlui/xux-ui'

const box = ref(null)
const boxClasses = ref(['bg-blue-100', 'text-blue-600'])

const updateClasses = () => {
  if (box.value) {
    boxClasses.value = Array.from(box.value.classList)
      .filter(c => !c.includes('demo-box') && !c.includes('p-') && !c.includes('text-center') && !c.includes('rounded') && !c.includes('transition'))
  }
}

const addRed = () => {
  if (box.value) {
    addClass(box.value, 'bg-red-100', 'text-red-600')
    updateClasses()
  }
}

const addLarge = () => {
  if (box.value) {
    addClass(box.value, 'text-2xl')
    updateClasses()
  }
}

const removeRed = () => {
  if (box.value) {
    removeClass(box.value, 'bg-red-100', 'text-red-600')
    updateClasses()
  }
}

const toggleBold = () => {
  if (box.value) {
    toggleClass(box.value, 'font-bold')
    updateClasses()
  }
}
</script>

<style scoped>
.demo-box {
  border: 2px dashed currentColor;
}
</style>
```

:::

## 元素位置

获取元素的位置和尺寸。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div 
      ref="element" 
      class="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded text-center">
      测试元素
    </div>
    <XButton @click="getInfo" type="primary" block>获取元素信息</XButton>
    <div v-if="info" class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600">距离顶部</div>
        <code class="text-blue-600 font-bold">{{ info.offsetTop }}px</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600">距离左侧</div>
        <code class="text-green-600 font-bold">{{ info.offsetLeft }}px</code>
      </div>
      <div class="p-3 bg-purple-50 rounded">
        <div class="text-xs text-gray-600">宽度</div>
        <code class="text-purple-600 font-bold">{{ info.width }}px</code>
      </div>
      <div class="p-3 bg-orange-50 rounded">
        <div class="text-xs text-gray-600">高度</div>
        <code class="text-orange-600 font-bold">{{ info.height }}px</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, getOffsetTop, getOffsetLeft, getWidth, getHeight } from '@xlui/xux-ui'

const element = ref(null)
const info = ref(null)

const getInfo = () => {
  if (element.value) {
    info.value = {
      offsetTop: getOffsetTop(element.value),
      offsetLeft: getOffsetLeft(element.value),
      width: getWidth(element.value),
      height: getHeight(element.value)
    }
  }
}
</script>
```

:::

## isInViewport

判断元素是否在可视区域。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div 
      ref="target" 
      class="h-20 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded flex items-center justify-center">
      目标元素
    </div>
    <XButton @click="check" type="primary" block>检查是否在可视区域</XButton>
    <div v-if="result !== null" class="p-4 rounded text-center"
      :class="result ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      <div class="text-2xl font-bold">{{ result ? '✓ 在可视区域内' : '✗ 不在可视区域内' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, isInViewport } from '@xlui/xux-ui'

const target = ref(null)
const result = ref(null)

const check = () => {
  if (target.value) {
    result.value = isInViewport(target.value)
  }
}
</script>
```

:::

## smoothScrollTo

平滑滚动到指定位置。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div>
      <label class="text-xs text-gray-600">滚动位置（像素）</label>
      <XInput v-model.number="position" type="number" />
    </div>
    <div>
      <label class="text-xs text-gray-600">持续时间（毫秒）</label>
      <XInput v-model.number="duration" type="number" />
    </div>
    <XButton @click="scroll" type="primary" block>
      平滑滚动
    </XButton>
    <div class="p-3 bg-gray-50 rounded text-xs text-gray-600 text-center">
      将滚动到页面指定位置
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, smoothScrollTo } from '@xlui/xux-ui'

const position = ref(0)
const duration = ref(500)

const scroll = () => {
  smoothScrollTo(position.value, duration.value)
}
</script>
```

:::

## onResize

监听元素尺寸变化。

:::demo

```vue
<template>
  <div class="space-y-3">
    <textarea 
      ref="resizable"
      class="w-full p-3 border rounded resize"
      rows="3"
      placeholder="拖动调整大小..."
    />
    <div class="p-3 bg-blue-50 rounded">
      <div class="text-xs text-gray-600 mb-1">当前尺寸：</div>
      <code class="text-sm text-blue-600">
        {{ size.width }}px × {{ size.height }}px
      </code>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { onResize } from '@xlui/xux-ui'

const resizable = ref(null)
const size = ref({ width: 0, height: 0 })
let cleanup = null

onMounted(() => {
  if (resizable.value) {
    size.value = {
      width: resizable.value.offsetWidth,
      height: resizable.value.offsetHeight
    }
    
    cleanup = onResize(resizable.value, (entry) => {
      size.value = {
        width: Math.round(entry.contentRect.width),
        height: Math.round(entry.contentRect.height)
      }
    })
  }
})

onUnmounted(() => {
  cleanup?.()
})
</script>
```

:::

## 其他工具

:::demo

```vue
<template>
  <div class="space-y-2">
    <div v-for="item in utils" :key="item.name" 
      class="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
      <div class="flex items-center justify-between">
        <code class="text-sm font-bold text-blue-600">{{ item.name }}()</code>
        <span class="text-xs text-gray-600">{{ item.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const utils = [
  { name: 'getScrollbarWidth', desc: '获取滚动条宽度' },
  { name: 'setStyle', desc: '批量设置样式' },
  { name: 'waitForElement', desc: '等待元素出现' }
]
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `getOffsetTop(element)` | 距离顶部 | `element: HTMLElement` |
| `getOffsetLeft(element)` | 距离左侧 | `element: HTMLElement` |
| `getScrollbarWidth()` | 滚动条宽度 | - |
| `isInViewport(element)` | 是否在可视区 | `element: HTMLElement` |
| `smoothScrollTo(top, duration?)` | 平滑滚动 | `top: number, duration?: number` |
| `setStyle(element, styles)` | 设置样式 | `element: HTMLElement, styles: Object` |
| `hasClass(element, className)` | 是否有类名 | `element: HTMLElement, className: string` |
| `addClass(element, ...classNames)` | 添加类名 | `element: HTMLElement, classNames: string[]` |
| `removeClass(element, ...classNames)` | 移除类名 | `element: HTMLElement, classNames: string[]` |
| `toggleClass(element, className)` | 切换类名 | `element: HTMLElement, className: string` |
| `getWidth(element)` | 获取宽度 | `element: HTMLElement` |
| `getHeight(element)` | 获取高度 | `element: HTMLElement` |
| `onResize(element, callback)` | 监听尺寸变化 | `element: HTMLElement, callback: Function` |
| `waitForElement(selector, timeout?)` | 等待元素出现 | `selector: string, timeout?: number` |

