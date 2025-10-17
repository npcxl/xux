# 颜色工具 Color

提供颜色格式转换、颜色混合、明暗调整等功能。

## 导入

```javascript
import { 
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb,
  mixColors, lighten, darken, isDark, randomColor
} from '@xlui/xux-ui'
```

## hexToRgb / rgbToHex

HEX与RGB互转。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">HEX 颜色</label>
        <XInput v-model="hex" placeholder="#ff5733" />
        <div class="mt-2 p-4 rounded" :style="`background: ${hex}`"></div>
      </div>
      <div>
        <label class="text-xs text-gray-600">RGB 对象</label>
        <pre class="p-3 bg-gray-50 rounded text-xs">{{ hexToRgb(hex) }}</pre>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <XInput v-model.number="r" placeholder="R" type="number" min="0" max="255" />
      <XInput v-model.number="g" placeholder="G" type="number" min="0" max="255" />
      <XInput v-model.number="b" placeholder="B" type="number" min="0" max="255" />
    </div>
    <div class="p-4 rounded" :style="`background: ${rgbToHex(r,g,b)}`">
      <code class="text-white font-bold">{{ rgbToHex(r,g,b) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, hexToRgb, rgbToHex } from '@xlui/xux-ui'
const hex = ref('#ff5733')
const r = ref(255)
const g = ref(87)
const b = ref(51)
</script>
```

:::

## lighten / darken

颜色变亮/变暗。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">基础颜色</label>
        <XInput v-model="color" />
      </div>
      <div>
        <label class="text-xs text-gray-600">程度 (0-100)</label>
        <XInput v-model.number="amount" type="number" min="0" max="100" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="p-4 rounded text-center" :style="`background: ${lighten(color, amount)}`">
        <code class="text-white font-bold text-xs">lighten</code>
      </div>
      <div class="p-4 rounded text-center" :style="`background: ${color}`">
        <code class="text-white font-bold text-xs">原色</code>
      </div>
      <div class="p-4 rounded text-center" :style="`background: ${darken(color, amount)}`">
        <code class="text-white font-bold text-xs">darken</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, lighten, darken } from '@xlui/xux-ui'
const color = ref('#3498db')
const amount = ref(30)
</script>
```

:::

## mixColors

混合两种颜色。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">颜色1</label>
        <XInput v-model="color1" />
        <div class="mt-2 h-12 rounded" :style="`background: ${color1}`"></div>
      </div>
      <div>
        <label class="text-xs text-gray-600">权重 (0-1)</label>
        <XInput v-model.number="weight" type="number" step="0.1" min="0" max="1" />
      </div>
      <div>
        <label class="text-xs text-gray-600">颜色2</label>
        <XInput v-model="color2" />
        <div class="mt-2 h-12 rounded" :style="`background: ${color2}`"></div>
      </div>
    </div>
    <div class="p-6 rounded text-center" :style="`background: ${mixColors(color1, color2, weight)}`">
      <code class="text-white font-bold">混合结果: {{ mixColors(color1, color2, weight) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, mixColors } from '@xlui/xux-ui'
const color1 = ref('#ff0000')
const color2 = ref('#0000ff')
const weight = ref(0.5)
</script>
```

:::

## isDark / randomColor

判断颜色深浅和生成随机颜色。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="testColor" placeholder="输入颜色测试" />
    <div class="p-6 rounded text-center" :style="`background: ${testColor}`">
      <code :class="isDark(testColor) ? 'text-white' : 'text-black'" class="font-bold">
        {{ isDark(testColor) ? '深色' : '浅色' }}
      </code>
    </div>
    <XButton @click="testColor = randomColor()" type="primary" block>
      生成随机颜色
    </XButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, isDark, randomColor } from '@xlui/xux-ui'
const testColor = ref(randomColor())
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `hexToRgb(hex)` | HEX转RGB | `hex: string` |
| `rgbToHex(r, g, b)` | RGB转HEX | `r: number, g: number, b: number` |
| `rgbToHsl(r, g, b)` | RGB转HSL | `r: number, g: number, b: number` |
| `hslToRgb(h, s, l)` | HSL转RGB | `h: number, s: number, l: number` |
| `mixColors(color1, color2, weight?)` | 颜色混合 | `color1: string, color2: string, weight?: number` |
| `lighten(color, amount)` | 颜色变亮 | `color: string, amount: number` |
| `darken(color, amount)` | 颜色变暗 | `color: string, amount: number` |
| `isDark(color)` | 判断深浅 | `color: string` |
| `randomColor()` | 随机颜色 | - |

