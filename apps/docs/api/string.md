# 字符串工具 String

提供字符串处理、格式转换、脱敏、随机生成等功能。

## 导入

```javascript
import { 
  capitalize, uncapitalize, camelToSnake, snakeToCamel,
  camelToKebab, kebabToCamel, trim, trimAll, truncate,
  maskString, maskPhone, maskEmail, maskIdCard, maskBankCard,
  randomString, reverse, countChar, toBase64, fromBase64
} from '@xlui/xux-ui'
```

## capitalize / uncapitalize

首字母大小写转换。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="text" 
      placeholder="输入文本测试"
    />
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">capitalize</div>
        <code class="text-blue-600">{{ capitalize(text) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">uncapitalize</div>
        <code class="text-green-600">{{ uncapitalize(text) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, capitalize, uncapitalize } from '@xlui/xux-ui'
const text = ref('hello World')
</script>
```

:::

## 命名风格转换

驼峰、下划线、短横线互转。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="text" 
      placeholder="输入驼峰命名测试"
    />
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">camelToSnake</div>
        <code class="text-sm text-blue-600">{{ camelToSnake(text) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">camelToKebab</div>
        <code class="text-sm text-green-600">{{ camelToKebab(text) }}</code>
      </div>
      <div class="p-3 bg-purple-50 rounded">
        <div class="text-xs text-gray-600 mb-1">snakeToCamel</div>
        <code class="text-sm text-purple-600">{{ snakeToCamel(camelToSnake(text)) }}</code>
      </div>
      <div class="p-3 bg-orange-50 rounded">
        <div class="text-xs text-gray-600 mb-1">kebabToCamel</div>
        <code class="text-sm text-orange-600">{{ kebabToCamel(camelToKebab(text)) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, camelToSnake, snakeToCamel, camelToKebab, kebabToCamel } from '@xlui/xux-ui'
const text = ref('userName')
</script>
```

:::

## trim / trimAll / truncate

去除空格和截断字符串。

:::demo

```vue
<template>
  <div class="space-y-2">
    <XInput 
      v-model="text" 
      placeholder="输入带空格的文本"
    />
    <div class="grid grid-cols-3 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">trim()</div>
        <code class="text-xs text-blue-600">{{ trim(text) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">trimAll()</div>
        <code class="text-xs text-green-600">{{ trimAll(text) }}</code>
      </div>
      <div class="p-3 bg-purple-50 rounded">
        <div class="text-xs text-gray-600 mb-1">truncate(10)</div>
        <code class="text-xs text-purple-600">{{ truncate(text, 10) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, trim, trimAll, truncate } from '@xlui/xux-ui'
const text = ref('  hello  world  ')
</script>
```

:::

## maskPhone / maskEmail

手机号和邮箱脱敏。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div>
      <XInput 
        v-model="phone" 
        placeholder="输入手机号"
      />
      <div class="mt-2 p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">maskPhone</div>
        <code class="text-blue-600">{{ maskPhone(phone) }}</code>
      </div>
    </div>
    <div>
      <XInput 
        v-model="email" 
        placeholder="输入邮箱"
      />
      <div class="mt-2 p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">maskEmail</div>
        <code class="text-green-600">{{ maskEmail(email) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, maskPhone, maskEmail } from '@xlui/xux-ui'
const phone = ref('13800138000')
const email = ref('user@example.com')
</script>
```

:::

## maskIdCard / maskBankCard

身份证和银行卡脱敏。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div>
      <XInput 
        v-model="idCard" 
        placeholder="输入身份证号"
      />
      <div class="mt-2 p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">maskIdCard</div>
        <code class="text-sm text-blue-600">{{ maskIdCard(idCard) }}</code>
      </div>
    </div>
    <div>
      <XInput 
        v-model="bankCard" 
        placeholder="输入银行卡号"
      />
      <div class="mt-2 p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">maskBankCard</div>
        <code class="text-sm text-green-600">{{ maskBankCard(bankCard) }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, maskIdCard, maskBankCard } from '@xlui/xux-ui'
const idCard = ref('110101199001011234')
const bankCard = ref('6222021234567890123')
</script>
```

:::

## maskString

自定义脱敏规则。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput 
      v-model="text" 
      placeholder="输入文本"
    />
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">起始位置</label>
        <XInput 
          v-model.number="start" 
          type="number"
        />
      </div>
      <div>
        <label class="text-xs text-gray-600">结束位置</label>
        <XInput 
          v-model.number="end" 
          type="number"
        />
      </div>
      <div>
        <label class="text-xs text-gray-600">掩码字符</label>
        <XInput 
          v-model="mask" 
          maxlength="1"
        />
      </div>
    </div>
    <div class="p-4 bg-blue-50 rounded text-center">
      <code class="text-lg font-mono text-blue-600">{{ maskString(text, start, end, mask) }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, maskString } from '@xlui/xux-ui'
const text = ref('Hello World')
const start = ref(2)
const end = ref(8)
const mask = ref('*')
</script>
```

:::

## randomString

生成随机字符串。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-gray-600">长度</label>
        <XInput 
          v-model.number="length" 
          type="number" 
          min="1" 
          max="32"
        />
      </div>
      <div>
        <label class="text-xs text-gray-600">类型</label>
        <XSelect v-model="type">
          <option value="all">数字+字母</option>
          <option value="number">仅数字</option>
          <option value="letter">仅字母</option>
        </XSelect>
      </div>
    </div>
    <XButton 
      @click="generate" 
      type="primary"
      block>
      生成随机字符串
    </XButton>
    <div class="p-4 bg-gray-50 rounded text-center">
      <code class="text-2xl font-bold text-blue-600 font-mono">{{ result }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XSelect, XButton, randomString } from '@xlui/xux-ui'
const length = ref(8)
const type = ref('all')
const result = ref(randomString(8))
const generate = () => {
  result.value = randomString(length.value, type.value)
}
</script>
```

:::

## reverse / countChar

字符串反转和字符统计。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput 
      v-model="text" 
      placeholder="输入文本测试"
    />
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-2">reverse - 字符串反转</div>
        <code class="text-blue-600 font-mono">{{ reverse(text) }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-2">
          countChar - 统计字符
          <XInput 
            v-model="char" 
            maxlength="1" 
            style="width: 50px; display: inline-block; margin: 0 4px;"
          /> 出现次数
        </div>
        <div class="text-3xl font-bold text-green-600">{{ countChar(text, char) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, reverse, countChar } from '@xlui/xux-ui'
const text = ref('hello world')
const char = ref('l')
</script>
```

:::

## Base64 编解码

字符串 Base64 转换。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput 
      v-model="text" 
      placeholder="输入文本进行编码"
    />
    <div class="p-3 bg-blue-50 rounded">
      <div class="text-xs text-gray-600 mb-2">Base64 编码</div>
      <code class="text-xs break-all text-blue-600">{{ encoded }}</code>
    </div>
    <div class="p-3 bg-green-50 rounded">
      <div class="text-xs text-gray-600 mb-2">解码还原</div>
      <code class="text-sm text-green-600">{{ decoded }}</code>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XInput, toBase64, fromBase64 } from '@xlui/xux-ui'
const text = ref('Hello 世界')
const encoded = computed(() => {
  try { return toBase64(text.value) }
  catch { return '编码失败' }
})
const decoded = computed(() => {
  try { return fromBase64(encoded.value) }
  catch { return '解码失败' }
})
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `capitalize(str)` | 首字母大写 | `str: string` |
| `uncapitalize(str)` | 首字母小写 | `str: string` |
| `camelToSnake(str)` | 驼峰转下划线 | `str: string` |
| `snakeToCamel(str)` | 下划线转驼峰 | `str: string` |
| `camelToKebab(str)` | 驼峰转短横线 | `str: string` |
| `kebabToCamel(str)` | 短横线转驼峰 | `str: string` |
| `trim(str)` | 去除两端空格 | `str: string` |
| `trimAll(str)` | 去除所有空格 | `str: string` |
| `truncate(str, maxLength, suffix?)` | 截断字符串 | `str: string, maxLength: number, suffix?: string` |
| `maskString(str, start, end, mask?)` | 自定义脱敏 | `str: string, start: number, end: number, mask?: string` |
| `maskPhone(phone)` | 手机号脱敏 | `phone: string` |
| `maskEmail(email)` | 邮箱脱敏 | `email: string` |
| `maskIdCard(idCard)` | 身份证脱敏 | `idCard: string` |
| `maskBankCard(cardNo)` | 银行卡脱敏 | `cardNo: string` |
| `randomString(length, type?)` | 随机字符串 | `length: number, type?: 'number'\|'letter'\|'all'` |
| `reverse(str)` | 字符串反转 | `str: string` |
| `countChar(str, char)` | 统计字符次数 | `str: string, char: string` |
| `toBase64(str)` | 转Base64 | `str: string` |
| `fromBase64(base64)` | 从Base64解码 | `base64: string` |
