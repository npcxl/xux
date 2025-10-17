# 存储工具 Storage

提供 localStorage、sessionStorage 和 Cookie 的封装，支持过期时间、加密等功能。

## 导入

```javascript
import { 
  localStore, sessionStore,
  setLocal, getLocal, removeLocal, clearLocal,
  setSession, getSession, removeSession, clearSession,
  cookie
} from '@xlui/xux-ui'
```

## LocalStorage

本地持久化存储，支持过期时间。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">键名</label>
        <XInput v-model="key" placeholder="key" />
      </div>
      <div>
        <label class="text-xs text-gray-600">值</label>
        <XInput v-model="value" placeholder="value" />
      </div>
    </div>
    <div>
      <label class="text-xs text-gray-600">过期时间（秒，0表示永久）</label>
      <XInput v-model.number="expires" type="number" min="0" />
    </div>
    <div class="grid grid-cols-3 gap-2">
      <XButton @click="save" type="primary">保存</XButton>
      <XButton @click="load" type="success">读取</XButton>
      <XButton @click="remove" type="danger">删除</XButton>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-1">读取结果：</div>
      <code class="text-sm">{{ result || '无数据' }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, setLocal, getLocal, removeLocal } from '@xlui/xux-ui'

const key = ref('test-key')
const value = ref('Hello World')
const expires = ref(0)
const result = ref('')

const save = () => {
  const options = expires.value > 0 ? { expires: expires.value * 1000 } : undefined
  setLocal(key.value, value.value, options)
  result.value = '保存成功'
}

const load = () => {
  result.value = getLocal(key.value) || '未找到数据'
}

const remove = () => {
  removeLocal(key.value)
  result.value = '已删除'
}
</script>
```

:::

## SessionStorage

会话存储，关闭浏览器后失效。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="sessionKey" placeholder="Session Key" />
    <XInput v-model="sessionValue" placeholder="Session Value" />
    <div class="grid grid-cols-3 gap-2">
      <XButton @click="setSession(sessionKey, sessionValue)" type="primary">
        保存
      </XButton>
      <XButton @click="sessionResult = getSession(sessionKey) || '无数据'" type="success">
        读取
      </XButton>
      <XButton @click="removeSession(sessionKey); sessionResult = '已删除'" type="danger">
        删除
      </XButton>
    </div>
    <div class="p-3 bg-blue-50 rounded">
      <code class="text-blue-600">{{ sessionResult }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, setSession, getSession, removeSession } from '@xlui/xux-ui'

const sessionKey = ref('session-test')
const sessionValue = ref('Session Data')
const sessionResult = ref('')
</script>
```

:::

## Cookie

Cookie 操作工具。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">Cookie名</label>
        <XInput v-model="cookieName" />
      </div>
      <div>
        <label class="text-xs text-gray-600">Cookie值</label>
        <XInput v-model="cookieValue" />
      </div>
      <div>
        <label class="text-xs text-gray-600">过期天数</label>
        <XInput v-model.number="days" type="number" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <XButton @click="setCookie" type="primary">设置</XButton>
      <XButton @click="getCookie" type="success">获取</XButton>
      <XButton @click="removeCookie" type="danger">删除</XButton>
    </div>
    <div class="p-3 bg-orange-50 rounded">
      <div class="text-xs text-gray-600 mb-1">Cookie值：</div>
      <code class="text-orange-600">{{ cookieResult }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, cookie } from '@xlui/xux-ui'

const cookieName = ref('test-cookie')
const cookieValue = ref('cookie-value')
const days = ref(7)
const cookieResult = ref('')

const setCookie = () => {
  cookie.set(cookieName.value, cookieValue.value, days.value)
  cookieResult.value = '设置成功'
}

const getCookie = () => {
  cookieResult.value = cookie.get(cookieName.value) || '未找到'
}

const removeCookie = () => {
  cookie.remove(cookieName.value)
  cookieResult.value = '已删除'
}
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `setLocal(key, value, options?)` | 设置本地存储 | `key: string, value: any, options?: StorageOptions` |
| `getLocal(key, options?)` | 获取本地存储 | `key: string, options?: StorageOptions` |
| `removeLocal(key)` | 删除本地存储 | `key: string` |
| `clearLocal()` | 清空本地存储 | - |
| `setSession(key, value, options?)` | 设置会话存储 | `key: string, value: any, options?: StorageOptions` |
| `getSession(key, options?)` | 获取会话存储 | `key: string, options?: StorageOptions` |
| `removeSession(key)` | 删除会话存储 | `key: string` |
| `clearSession()` | 清空会话存储 | - |
| `cookie.set(name, value, days?, path?)` | 设置Cookie | `name: string, value: string, days?: number, path?: string` |
| `cookie.get(name)` | 获取Cookie | `name: string` |
| `cookie.remove(name, path?)` | 删除Cookie | `name: string, path?: string` |
| `cookie.clear()` | 清空Cookie | - |

