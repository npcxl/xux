# 验证工具 Validate

提供各种常用的数据格式验证功能。

## 导入

```javascript
import { 
  isPhone, isEmail, isIdCard, isUrl, isChinese,
  isUsername, isStrongPassword, isIPv4, isBankCard,
  isPostCode, getPasswordStrength
} from '@xlui/xux-ui'
```

## isPhone

验证手机号码（中国大陆）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="phone" 
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入手机号测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isPhone(phone) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isPhone(phone) ? '✓ 有效手机号' : '✗ 无效手机号' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isPhone } from '@xlui/xux-ui'
const phone = ref('13800138000')
</script>
```

:::

## isEmail

验证邮箱地址。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="email" 
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入邮箱测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isEmail(email) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isEmail(email) ? '✓ 有效邮箱' : '✗ 无效邮箱' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isEmail } from '@xlui/xux-ui'
const email = ref('user@example.com')
</script>
```

:::

## isIdCard

验证身份证号（含校验码）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="id" 
      class="w-full px-3 py-2 border rounded text-sm font-mono" 
      placeholder="输入身份证号测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isIdCard(id) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isIdCard(id) ? '✓ 有效身份证' : '✗ 无效身份证' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isIdCard } from '@xlui/xux-ui'
const id = ref('110101199001011234')
</script>
```

:::

## isUrl

验证URL地址。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="url" 
      class="w-full px-3 py-2 border rounded text-sm" 
      placeholder="输入URL测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isUrl(url) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isUrl(url) ? '✓ 有效URL' : '✗ 无效URL' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isUrl } from '@xlui/xux-ui'
const url = ref('https://example.com')
</script>
```

:::

## isChinese

验证是否为纯中文。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="text" 
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入文本测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isChinese(text) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isChinese(text) ? '✓ 纯中文' : '✗ 非纯中文' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isChinese } from '@xlui/xux-ui'
const text = ref('你好世界')
</script>
```

:::

## isUsername

验证用户名（4-16位字母数字下划线）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="name" 
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入用户名测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isUsername(name) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isUsername(name) ? '✓ 有效用户名' : '✗ 无效用户名（需要4-16位字母数字下划线）' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isUsername } from '@xlui/xux-ui'
const name = ref('user_123')
</script>
```

:::

## isStrongPassword

验证强密码（≥8位含大小写+数字）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="pwd" 
      type="password"
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入密码测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isStrongPassword(pwd) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isStrongPassword(pwd) ? '✓ 强密码' : '✗ 弱密码（需要≥8位，含大小写字母和数字）' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isStrongPassword } from '@xlui/xux-ui'
const pwd = ref('Aa123456')
</script>
```

:::

## getPasswordStrength

获取密码强度等级（0弱/1中/2强）。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput 
      v-model="password" 
      class="w-full px-3 py-2 border rounded" 
      placeholder="输入密码测试强度"
    />
    <div class="flex items-center gap-2">
      <span class="text-sm">强度：</span>
      <div class="flex gap-1 flex-1">
        <div 
          v-for="i in 3" 
          :key="i" 
          class="flex-1 h-2 rounded transition-colors"
          :class="i <= strength + 1 ? colors[strength] : 'bg-gray-200'">
        </div>
      </div>
      <span :class="['text-sm font-bold', textColors[strength]]">
        {{ texts[strength] }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getPasswordStrength } from '@xlui/xux-ui'

const password = ref('Aa123456')
const strength = computed(() => getPasswordStrength(password.value))
const texts = ['弱', '中', '强']
const colors = ['bg-red-500', 'bg-orange-500', 'bg-green-500']
const textColors = ['text-red-600', 'text-orange-600', 'text-green-600']
</script>
```

:::

## isIPv4

验证IPv4地址。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="ip" 
      class="w-full px-3 py-2 border rounded font-mono text-sm" 
      placeholder="输入IP地址测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isIPv4(ip) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isIPv4(ip) ? '✓ 有效IPv4地址' : '✗ 无效IPv4地址' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isIPv4 } from '@xlui/xux-ui'
const ip = ref('192.168.1.1')
</script>
```

:::

## isBankCard

验证银行卡号（16-19位）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="card" 
      class="w-full px-3 py-2 border rounded font-mono text-sm" 
      placeholder="输入银行卡号测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isBankCard(card) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isBankCard(card) ? '✓ 有效银行卡号' : '✗ 无效银行卡号' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isBankCard } from '@xlui/xux-ui'
const card = ref('6222021234567890123')
</script>
```

:::

## isPostCode

验证邮政编码（中国6位）。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="code" 
      class="w-full px-3 py-2 border rounded font-mono" 
      placeholder="输入邮政编码测试"
    />
    <div class="p-3 rounded text-center" 
      :class="isPostCode(code) ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      {{ isPostCode(code) ? '✓ 有效邮政编码' : '✗ 无效邮政编码' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isPostCode } from '@xlui/xux-ui'
const code = ref('100000')
</script>
```

:::

## API

| 函数 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `isPhone(phone)` | 验证手机号 | `phone: string` | `boolean` |
| `isEmail(email)` | 验证邮箱 | `email: string` | `boolean` |
| `isIdCard(idCard)` | 验证身份证 | `idCard: string` | `boolean` |
| `isUrl(url)` | 验证URL | `url: string` | `boolean` |
| `isChinese(str)` | 验证纯中文 | `str: string` | `boolean` |
| `isUsername(username)` | 验证用户名 | `username: string` | `boolean` |
| `isStrongPassword(password)` | 验证强密码 | `password: string` | `boolean` |
| `getPasswordStrength(password)` | 密码强度 | `password: string` | `0\|1\|2` |
| `isIPv4(ip)` | 验证IPv4 | `ip: string` | `boolean` |
| `isBankCard(cardNo)` | 验证银行卡 | `cardNo: string` | `boolean` |
| `isPostCode(code)` | 验证邮编 | `code: string` | `boolean` |
