# Input 输入框

企业级输入框组件，支持多种类型、尺寸和状态，提供丰富的交互功能。

## 基础用法

基本的文本输入功能。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput v-model="input1" placeholder="请输入内容" width="300px" />
    <div class="text-sm text-gray-600">输入的值：{{ input1 }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
</script>
```

:::

## 不同尺寸

提供三种尺寸：small、medium（默认）、large。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm text-gray-600 mb-2">Small 小尺寸</div>
      <XInput v-model="small" size="small" placeholder="小尺寸输入框" width="300px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">Medium 中等尺寸（默认）</div>
      <XInput v-model="medium" size="medium" placeholder="中等尺寸输入框" width="300px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">Large 大尺寸</div>
      <XInput v-model="large" size="large" placeholder="大尺寸输入框" width="300px" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const small = ref('')
const medium = ref('')
const large = ref('')
</script>
```

:::

## 带标签

使用 `label` 属性为输入框添加浮动标签，支持必填标记。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput v-model="name" label="姓名" width="300px" />
    <XInput v-model="email" label="邮箱地址" type="email" width="300px" />
    <XInput v-model="phone" label="手机号码" type="tel" required width="300px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const phone = ref('')
</script>
```

:::

## 前缀和后缀图标

通过 `prefix-icon` 和 `suffix-icon` 添加图标，或使用插槽自定义。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="search" 
      placeholder="搜索内容" 
      prefix-icon="mdi:magnify"
      clearable
      width="300px" 
    />
    <XInput 
      v-model="email" 
      placeholder="输入邮箱" 
      prefix-icon="mdi:email-outline"
      type="email"
      width="300px" 
    />
    <XInput 
      v-model="username" 
      placeholder="用户名" 
      prefix-icon="mdi:account-outline"
      suffix-icon="mdi:check-circle"
      width="300px" 
    />
    <XInput 
      v-model="website" 
      placeholder="网站地址" 
      prefix-icon="mdi:web"
      type="url"
      width="300px" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const email = ref('')
const username = ref('')
const website = ref('')
</script>
```

:::

## 状态反馈

支持错误、成功、加载等多种状态，并可显示帮助文本。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="errorInput" 
      label="用户名"
      error
      error-text="用户名至少需要3个字符"
      width="300px"
    />
    
    <XInput 
      v-model="successInput" 
      label="邮箱地址"
      type="email"
      success
      success-text="邮箱格式正确"
      width="300px"
    />
    
    <XInput 
      v-model="loadingInput" 
      label="验证中"
      loading
      help-text="正在验证用户名是否可用..."
      width="300px"
    />
    
    <XInput 
      v-model="helpInput" 
      label="密码"
      type="password"
      help-text="密码至少8位，包含字母和数字"
      width="300px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const errorInput = ref('ab')
const successInput = ref('user@example.com')
const loadingInput = ref('checking...')
const helpInput = ref('')
</script>
```

:::

## 可清空

添加 `clearable` 属性，可快速清空输入内容。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="clearableValue" 
      placeholder="可清空的输入框" 
      clearable 
      width="300px"
      @clear="handleClear"
    />
    <div class="text-sm text-gray-600">
      输入的值：{{ clearableValue || '空' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clearableValue = ref('可以点击清空按钮')

const handleClear = () => {
  console.log('输入框已清空')
}
</script>
```

:::

## 密码输入

设置 `type="password"` 实现密码输入功能，自动显示密码可见性切换按钮。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="password1" 
      type="password"
      label="密码"
      placeholder="请输入密码"
      width="300px"
    />
    
    <XInput 
      v-model="password2" 
      type="password"
      label="确认密码"
      placeholder="请再次输入密码"
      :error="password2 && password2 !== password1"
      :error-text="password2 && password2 !== password1 ? '两次密码输入不一致' : ''"
      clearable
      width="300px"
    />
    
    <div class="text-sm text-gray-600">
      密码长度：{{ password1.length }} 位
      <span v-if="password1.length >= 8" class="text-green-600">✓ 长度符合要求</span>
      <span v-else-if="password1.length > 0" class="text-red-600">✗ 至少需要8位</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const password1 = ref('')
const password2 = ref('')
</script>
```

:::

## 禁用和只读

通过 `disabled` 或 `readonly` 属性控制输入框状态。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="value1" 
      label="正常状态"
      placeholder="可以输入" 
      width="300px" 
    />
    <XInput 
      v-model="value2" 
      label="禁用状态"
      disabled 
      width="300px" 
    />
    <XInput 
      v-model="value3" 
      label="只读状态"
      readonly 
      width="300px" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('已禁用的内容')
const value3 = ref('这是只读内容')
</script>
```

:::

## 字数限制

使用 `maxlength` 和 `show-word-limit` 属性限制和显示字数，接近限制时会高亮显示。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="text1" 
      label="用户名"
      placeholder="最多20个字符"
      :maxlength="20"
      show-word-limit
      clearable
      width="400px"
    />
    
    <XInput 
      v-model="text2" 
      label="个人简介"
      placeholder="最多100个字符"
      :maxlength="100"
      show-word-limit
      clearable
      width="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const text1 = ref('')
const text2 = ref('')
</script>
```

:::

## 数字输入与步进器

数字类型输入框会自动显示步进器按钮，支持精度控制和范围限制。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm text-gray-600 mb-2">基础数字输入</div>
      <XInput 
        v-model="count" 
        type="number" 
        label="数量"
        :step="1"
        :min="0"
        :max="100"
        width="300px" 
      />
      <div class="text-sm text-gray-500 mt-1">当前值：{{ count }}</div>
    </div>
    
    <div>
      <div class="text-sm text-gray-600 mb-2">带步长控制</div>
      <XInput 
        v-model="quantity" 
        type="number" 
        label="库存数量"
        :step="10"
        :min="0"
        :max="1000"
        width="300px" 
      />
      <div class="text-sm text-gray-500 mt-1">每次增减 10，当前值：{{ quantity }}</div>
    </div>
    
    <div>
      <div class="text-sm text-gray-600 mb-2">小数精度控制</div>
      <XInput 
        v-model="price" 
        type="number" 
        label="商品价格"
        prefix-icon="mdi:currency-usd"
        :step="0.1"
        :min="0"
        :max="9999.99"
        :precision="2"
        width="300px" 
      />
      <div class="text-sm text-gray-500 mt-1">保留2位小数，当前值：${{ price }}</div>
    </div>
    
    <div>
      <div class="text-sm text-gray-600 mb-2">负数范围</div>
      <XInput 
        v-model="temperature" 
        type="number" 
        label="温度 (°C)"
        prefix-icon="mdi:thermometer"
        :step="0.5"
        :min="-50"
        :max="50"
        :precision="1"
        width="300px" 
      />
      <div class="text-sm text-gray-500 mt-1">当前值：{{ temperature }}°C</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(10)
const quantity = ref(100)
const price = ref(99.99)
const temperature = ref(25.5)
</script>
```

:::

## 不同输入类型

支持各种原生 HTML5 输入类型。

:::demo

```vue
<template>
  <div class="space-y-6">
    <XInput 
      v-model="textValue" 
      type="text" 
      label="文本"
      prefix-icon="mdi:text" 
      width="300px" 
    />
    <XInput 
      v-model="emailValue" 
      type="email" 
      label="邮箱"
      prefix-icon="mdi:email-outline" 
      width="300px" 
    />
    <XInput 
      v-model="urlValue" 
      type="url" 
      label="网址"
      prefix-icon="mdi:web" 
      width="300px" 
    />
    <XInput 
      v-model="telValue" 
      type="tel" 
      label="电话"
      prefix-icon="mdi:phone-outline" 
      width="300px" 
    />
    <XInput 
      v-model="searchValue" 
      type="search" 
      label="搜索"
      prefix-icon="mdi:magnify"
      clearable
      width="300px" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textValue = ref('')
const emailValue = ref('')
const urlValue = ref('')
const telValue = ref('')
const searchValue = ref('')
</script>
```

:::

## 复杂表单示例

一个完整的表单验证示例。

:::demo

```vue
<template>
  <div class="space-y-6 max-w-md">
    <div class="text-lg font-semibold mb-4">用户注册</div>
    
    <XInput 
      v-model="form.username" 
      label="用户名"
      placeholder="请输入用户名"
      prefix-icon="mdi:account-outline"
      required
      :maxlength="20"
      show-word-limit
      :error="usernameError !== ''"
      :success="form.username && !usernameError"
      :error-text="usernameError"
      :success-text="form.username && !usernameError ? '用户名可用' : ''"
      clearable
      @blur="validateUsername"
    />
    
    <XInput 
      v-model="form.email" 
      label="邮箱地址"
      placeholder="请输入邮箱"
      type="email"
      prefix-icon="mdi:email-outline"
      required
      :error="emailError !== ''"
      :success="form.email && !emailError"
      :error-text="emailError"
      :success-text="form.email && !emailError ? '邮箱格式正确' : ''"
      clearable
      @blur="validateEmail"
    />
    
    <XInput 
      v-model="form.password" 
      label="密码"
      placeholder="请输入密码"
      type="password"
      prefix-icon="mdi:lock-outline"
      required
      :error="passwordError !== ''"
      :success="form.password && !passwordError"
      :error-text="passwordError"
      help-text="密码至少8位，包含字母和数字"
      @blur="validatePassword"
    />
    
    <XInput 
      v-model="form.phone" 
      label="手机号码"
      placeholder="请输入手机号"
      type="tel"
      prefix-icon="mdi:phone-outline"
      required
      :maxlength="11"
      :error="phoneError !== ''"
      :success="form.phone && !phoneError"
      :error-text="phoneError"
      clearable
      @blur="validatePhone"
    />
    
    <XInput 
      v-model="form.age" 
      label="年龄"
      type="number"
      prefix-icon="mdi:calendar-outline"
      :min="1"
      :max="150"
      :step="1"
      help-text="请输入真实年龄"
    />
    
    <div class="text-sm text-gray-600">
      <div>表单数据：</div>
      <pre class="mt-2 p-3 bg-gray-100 rounded text-xs">{{ JSON.stringify(form, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: '',
  phone: '',
  age: 18
})

const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const phoneError = ref('')

const validateUsername = () => {
  if (!form.username) {
    usernameError.value = '用户名不能为空'
  } else if (form.username.length < 3) {
    usernameError.value = '用户名至少3个字符'
  } else if (form.username.length > 20) {
    usernameError.value = '用户名最多20个字符'
  } else {
    usernameError.value = ''
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    emailError.value = '邮箱不能为空'
  } else if (!emailRegex.test(form.email)) {
    emailError.value = '邮箱格式不正确'
  } else {
    emailError.value = ''
  }
}

const validatePassword = () => {
  if (!form.password) {
    passwordError.value = '密码不能为空'
  } else if (form.password.length < 8) {
    passwordError.value = '密码至少8位'
  } else if (!/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
    passwordError.value = '密码必须包含字母和数字'
  } else {
    passwordError.value = ''
  }
}

const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!form.phone) {
    phoneError.value = '手机号不能为空'
  } else if (!phoneRegex.test(form.phone)) {
    phoneError.value = '手机号格式不正确'
  } else {
    phoneError.value = ''
  }
}
</script>
```

:::

## 事件监听

监听输入框的各种事件。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XInput 
      v-model="eventValue" 
      label="事件测试"
      placeholder="输入查看事件日志"
      clearable
      width="400px"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
    <div class="p-4 bg-gray-50 rounded-lg text-sm space-y-2">
      <div class="font-semibold text-gray-700">事件日志：</div>
      <div class="space-y-1 max-h-48 overflow-y-auto">
        <div v-for="(log, index) in logs" :key="index" class="text-xs text-gray-600 font-mono">
          {{ log }}
        </div>
        <div v-if="logs.length === 0" class="text-xs text-gray-400">
          暂无事件记录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const eventValue = ref('')
const logs = ref([])

const addLog = (message) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift(`[${time}] ${message}`)
  if (logs.value.length > 10) {
    logs.value.pop()
  }
}

const handleInput = (value) => {
  addLog(`输入事件: "${value}"`)
}

const handleChange = (value) => {
  addLog(`改变事件: "${value}"`)
}

const handleFocus = () => {
  addLog('获得焦点')
}

const handleBlur = () => {
  addLog('失去焦点')
}

const handleClear = () => {
  addLog('清空输入')
}
</script>
```

:::

## 自定义宽度

通过 `width` 属性自定义输入框宽度。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 150px</div>
      <XInput v-model="value1" placeholder="150px" size="small" width="150px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 300px</div>
      <XInput v-model="value2" placeholder="300px" width="300px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 500px</div>
      <XInput v-model="value3" placeholder="500px" size="large" width="500px" />
    </div>
    <div>
      <div class="text-sm text-gray-600 mb-2">宽度: 100%</div>
      <XInput v-model="value4" placeholder="100%" width="100%" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `string \| number` | - |
| type | 输入框类型 | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` |
| size | 输入框尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| placeholder | 占位符文本 | `string` | `''` |
| label | 浮动标签文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| required | 是否必填（显示*标记） | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| showWordLimit | 是否显示字数统计 | `boolean` | `false` |
| maxlength | 最大输入长度 | `number` | - |
| minlength | 最小输入长度 | `number` | - |
| autocomplete | 自动完成 | `string` | `'off'` |
| error | 错误状态 | `boolean` | `false` |
| success | 成功状态 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| width | 输入框宽度 | `string` | `'100%'` |
| prefixIcon | 前缀图标（Iconify 图标名） | `string` | - |
| suffixIcon | 后缀图标（Iconify 图标名） | `string` | - |
| helpText | 帮助文本 | `string` | - |
| errorText | 错误提示文本 | `string` | - |
| successText | 成功提示文本 | `string` | - |
| showPasswordToggle | 是否显示密码可见性切换（type="password"时） | `boolean` | `true` |
| step | 数字输入框的步长 | `number` | `1` |
| min | 数字输入框的最小值 | `number` | `-Infinity` |
| max | 数字输入框的最大值 | `number` | `Infinity` |
| precision | 数字输入框的小数精度 | `number` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: string \| number)` |
| input | 输入时触发 | `(value: string \| number, event: Event)` |
| change | 值改变且失去焦点时触发 | `(value: string \| number, event: Event)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
| clear | 点击清空按钮时触发 | `()` |
| keydown | 按下键盘时触发 | `(event: KeyboardEvent)` |
| keyup | 释放键盘时触发 | `(event: KeyboardEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| prefix | 前缀内容 |
| suffix | 后缀内容 |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 使输入框获得焦点 | `()` |
| blur | 使输入框失去焦点 | `()` |
| select | 选中输入框中的文本 | `()` |

## 设计规范

### 何时使用

- 需要用户输入表单域内容
- 需要进行输入验证和状态反馈
- 需要限制输入内容的长度和格式

### 最佳实践

1. **标签和占位符**：优先使用浮动标签，占位符作为辅助提示
2. **状态反馈**：及时显示验证结果，使用合适的颜色和图标
3. **帮助文本**：为复杂输入提供清晰的指导说明
4. **尺寸选择**：根据场景选择合适尺寸，表单建议使用 medium
5. **图标使用**：前缀图标用于表示输入类型，后缀图标用于操作或状态
6. **宽度设置**：输入框宽度应与预期输入长度匹配

## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>
