# URL工具 URL

提供 URL 参数解析、拼接、浏览器信息获取、剪贴板、全屏等功能。

## 导入

```javascript
import { 
  parseUrlParams, getUrlParam, buildUrl, addUrlParams, removeUrlParams,
  isAbsoluteUrl, getDomain, copyToClipboard, scrollToTop,
  getBrowserInfo, getOSInfo, isMobile, isWechat
} from '@xlui/xux-ui'
```

## URL 参数操作

解析和构建 URL 参数。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="url" placeholder="输入完整URL" />
    <XButton @click="parse" type="primary" block>解析参数</XButton>
    <div class="p-3 bg-blue-50 rounded">
      <div class="text-xs text-gray-600 mb-2">解析结果：</div>
      <pre class="text-xs">{{ JSON.stringify(params, null, 2) }}</pre>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <XInput v-model="newKey" placeholder="新参数名" />
      <XInput v-model="newValue" placeholder="新参数值" />
    </div>
    <XButton @click="addParam" type="success" block>添加参数</XButton>
    <div class="p-3 bg-green-50 rounded break-all text-xs">
      <div class="text-xs text-gray-600 mb-1">新URL：</div>
      <code class="text-green-600">{{ resultUrl }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, parseUrlParams, addUrlParams } from '@xlui/xux-ui'

const url = ref('https://example.com?name=test&age=20')
const params = ref({})
const newKey = ref('city')
const newValue = ref('Beijing')
const resultUrl = ref('')

const parse = () => {
  try {
    params.value = parseUrlParams(url.value)
  } catch {
    params.value = { error: '无效URL' }
  }
}

const addParam = () => {
  try {
    resultUrl.value = addUrlParams(url.value, { [newKey.value]: newValue.value })
  } catch {
    resultUrl.value = '无效URL'
  }
}
</script>
```

:::

## 剪贴板操作

复制和读取剪贴板。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="text" type="textarea" rows="3" placeholder="输入要复制的文本" />
    <div class="grid grid-cols-2 gap-2">
      <XButton @click="copy" type="primary">复制到剪贴板</XButton>
      <XButton @click="read" type="success">读取剪贴板</XButton>
    </div>
    <div class="p-3 rounded" :class="message ? 'bg-blue-50' : 'bg-gray-50'">
      <code class="text-sm">{{ message || '等待操作...' }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, copyToClipboard, readFromClipboard } from '@xlui/xux-ui'

const text = ref('Hello, Clipboard!')
const message = ref('')

const copy = async () => {
  const success = await copyToClipboard(text.value)
  message.value = success ? '✓ 复制成功' : '✗ 复制失败'
}

const read = async () => {
  const content = await readFromClipboard()
  message.value = content || '剪贴板为空'
}
</script>
```

:::

## 浏览器信息

获取浏览器和系统信息。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">浏览器</div>
        <code class="text-sm text-blue-600">{{ browserInfo.name }} {{ browserInfo.version }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">操作系统</div>
        <code class="text-sm text-green-600">{{ osInfo }}</code>
      </div>
      <div class="p-3 bg-purple-50 rounded">
        <div class="text-xs text-gray-600 mb-1">设备类型</div>
        <code class="text-sm text-purple-600">{{ isMobile() ? '移动设备' : '桌面设备' }}</code>
      </div>
      <div class="p-3 bg-orange-50 rounded">
        <div class="text-xs text-gray-600 mb-1">微信浏览器</div>
        <code class="text-sm text-orange-600">{{ isWechat() ? '是' : '否' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getBrowserInfo, getOSInfo, isMobile, isWechat } from '@xlui/xux-ui'

const browserInfo = getBrowserInfo()
const osInfo = getOSInfo()
</script>
```

:::

## 滚动控制

滚动到顶部/底部。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="grid grid-cols-2 gap-2">
      <XButton @click="scrollToTop()" type="primary">滚动到顶部</XButton>
      <XButton @click="scrollToBottom()" type="success">滚动到底部</XButton>
    </div>
    <div class="p-3 bg-gray-50 rounded text-center text-xs text-gray-600">
      点击按钮测试页面滚动
    </div>
  </div>
</template>

<script setup>
import { XButton, scrollToTop, scrollToBottom } from '@xlui/xux-ui'
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `parseUrlParams(url?)` | 解析URL参数 | `url?: string` |
| `getUrlParam(key, url?)` | 获取URL参数 | `key: string, url?: string` |
| `buildUrl(baseUrl, params?)` | 构建URL | `baseUrl: string, params?: Record` |
| `addUrlParams(url, params)` | 添加参数 | `url: string, params: Record` |
| `removeUrlParams(url, keys)` | 删除参数 | `url: string, keys: string[]` |
| `isAbsoluteUrl(url)` | 是否绝对URL | `url: string` |
| `getDomain(url?)` | 获取域名 | `url?: string` |
| `copyToClipboard(text)` | 复制文本 | `text: string` |
| `readFromClipboard()` | 读取剪贴板 | - |
| `scrollToTop(behavior?)` | 滚动到顶部 | `behavior?: ScrollBehavior` |
| `scrollToBottom(behavior?)` | 滚动到底部 | `behavior?: ScrollBehavior` |
| `getBrowserInfo()` | 浏览器信息 | - |
| `getOSInfo()` | 系统信息 | - |
| `isMobile()` | 是否移动端 | - |
| `isWechat()` | 是否微信浏览器 | - |

