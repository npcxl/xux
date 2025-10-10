# CountrySelect 国家选择器

国家选择器组件，支持国旗显示、IP自动检测、自定义后端接口等功能。

## 基础用法

默认显示国家选择器，支持搜索和选择功能。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 300px;">
    <XCountrySelect v-model="selectedCountry" placeholder="请选择国家" />
    <div class="mt-4 text-sm text-gray-600">
      选中的国家：{{ selectedCountry || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCountry = ref('')
</script>
```

:::

## IP 自动检测（默认接口）

启用 `auto-detect-from-ip` 属性后，组件会自动根据用户 IP 检测所在国家。默认使用 ipinfo.io 接口。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XCountrySelect 
      v-model="country" 
      auto-detect-from-ip
      placeholder="自动检测中..."
      @ip-detect-start="handleDetectStart"
      @ip-detect-success="handleDetectSuccess"
      @ip-detect-error="handleDetectError"
    />
    <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
      <div>检测状态：{{ detectStatus }}</div>
      <div v-if="country">当前国家：{{ country }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const country = ref('')
const detectStatus = ref('准备中...')

const handleDetectStart = () => {
  detectStatus.value = '正在检测...'
}

const handleDetectSuccess = (countryCode) => {
  detectStatus.value = `检测成功：${countryCode}`
}

const handleDetectError = (error) => {
  detectStatus.value = `检测失败：${error.message}`
}
</script>
```

:::

## 使用自定义后端接口

可以配置自定义的后端接口进行 IP 检测，支持自定义请求方法、请求头和响应解析。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <div class="mb-4 text-sm text-gray-600">
      <p class="font-medium mb-2">配置示例（实际使用时替换为真实接口）：</p>
      <code class="bg-gray-100 px-2 py-1 rounded">ip-detect-url="https://api.example.com/ip/location"</code>
    </div>
    
    <XCountrySelect 
      v-model="customCountry" 
      auto-detect-from-ip
      placeholder="使用自定义接口"
    />
    
    <div class="mt-4 text-sm text-gray-600">
      选中国家：{{ customCountry || '未选择' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const customCountry = ref('')
</script>
```

:::

## 返回类型

通过 `return-type` 属性可以控制返回国家名称还是国家代码。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 450px;">
    <div style="min-height: 200px;">
      <label class="block text-sm font-medium mb-2">返回国家名称（默认）</label>
      <XCountrySelect v-model="countryName" return-type="name" />
      <div class="mt-2 text-sm text-gray-600">值：{{ countryName }}</div>
    </div>
    
    <div style="min-height: 200px;">
      <label class="block text-sm font-medium mb-2">返回国家代码</label>
      <XCountrySelect v-model="countryCode" return-type="code" />
      <div class="mt-2 text-sm text-gray-600">值：{{ countryCode }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const countryName = ref('')
const countryCode = ref('')
</script>
```

:::

## 优先国家列表

通过 `priority-countries` 属性可以将常用国家显示在列表前面。

:::demo

```vue
<template>
  <div style="min-height: 300px;">
    <XCountrySelect 
      v-model="country" 
      :priority-countries="['CN', 'US', 'GB', 'JP', 'DE']"
      placeholder="常用国家优先"
    />
    <div class="mt-4 text-sm text-gray-600">
      优先显示：中国、美国、英国、日本、德国
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const country = ref('')
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用选择器。

:::demo

```vue
<template>
  <div class="space-y-4" style="min-height: 350px;">
    <div style="min-height: 150px;">
      <XCountrySelect v-model="country1" placeholder="正常状态" />
    </div>
    <div>
      <XCountrySelect v-model="country2" placeholder="禁用状态" disabled />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const country1 = ref('中国')
const country2 = ref('美国')
</script>
```

:::

## 自定义后端接口配置

完整的后端接口配置示例，展示如何对接自己的 IP 检测服务。

:::demo

```vue
<template>
  <div style="min-height: 350px;">
    <div class="mb-4 p-4 bg-blue-50 rounded text-sm">
      <p class="font-medium mb-2">配置说明：</p>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>ip-detect-url: 后端接口地址</li>
        <li>ip-detect-method: 请求方法（GET/POST）</li>
        <li>ip-detect-headers: 自定义请求头（如 token）</li>
        <li>ip-detect-response-parser: 响应解析函数</li>
      </ul>
    </div>

    <XCountrySelect 
      v-model="country" 
      auto-detect-from-ip
      ip-detect-url="https://ipinfo.io/json"
      ip-detect-method="GET"
      :ip-detect-response-parser="parseResponse"
      @ip-detect-success="handleSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const country = ref('')

// 自定义响应解析函数
const parseResponse = (data) => {
  // 根据你的后端接口返回格式解析
  // 返回两位国家代码（如：CN, US）
  return data.country || data.countryCode || data.country_code
}

const handleSuccess = (countryCode) => {
  console.log('检测到国家代码：', countryCode)
}
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 绑定值 | `string` | `''` |
| placeholder | 占位符文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| required | 是否必填 | `boolean` | `false` |
| customClass | 自定义类名 | `string` | `''` |
| autoDetectFromIp | 是否自动从 IP 检测国家 | `boolean` | `true` |
| returnType | 返回类型：name（国家名）或 code（国家代码） | `'name' \| 'code'` | `'name'` |
| priorityCountries | 优先显示的国家代码列表 | `string[]` | `['US', 'CA', 'GB', 'DE', 'FR', 'JP', 'CN', 'AU']` |
| ipDetectUrl | IP 检测接口 URL | `string` | `'https://ipinfo.io/json'` |
| ipDetectMethod | IP 检测请求方法 | `'GET' \| 'POST'` | `'GET'` |
| ipDetectHeaders | IP 检测自定义请求头 | `Record<string, string>` | `{}` |
| ipDetectResponseParser | IP 检测响应解析函数 | `(data: any) => string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 值改变时触发 | `(value: string)` |
| change | 选择国家时触发 | `(value: string, country: Country)` |
| ip-detect-start | IP 检测开始时触发 | `()` |
| ip-detect-success | IP 检测成功时触发 | `(countryCode: string)` |
| ip-detect-error | IP 检测失败时触发 | `(error: Error)` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| detectCountryFromIp | 手动触发 IP 检测 | `() => Promise<void>` |

### Country 接口

```typescript
interface Country {
  name: string        // 国家名称（中文）
  code: string        // 两位国家代码（如：CN, US）
  flagEmoji: string   // 国旗 Emoji
  flagSvg: string     // 国旗 SVG 图片地址
  flagPng: string     // 国旗 PNG 图片地址（备用）
}
```

## 后端接口对接说明

### 接口要求

后端接口需要返回包含国家代码的 JSON 数据，支持以下字段名：
- `country`
- `countryCode`
- `country_code`

### 接口示例

#### 1. 使用默认接口（ipinfo.io）

```javascript
// 默认配置，无需额外设置
<XCountrySelect auto-detect-from-ip />
```

响应格式：
```json
{
  "ip": "8.8.8.8",
  "country": "US",
  "region": "California",
  "city": "Mountain View"
}
```

#### 2. 使用自定义后端接口

```vue
<template>
  <XCountrySelect 
    auto-detect-from-ip
    ip-detect-url="https://api.yourdomain.com/api/ip/location"
    ip-detect-method="POST"
    :ip-detect-headers="{
      'Authorization': 'Bearer YOUR_TOKEN',
      'X-API-Key': 'your-api-key'
    }"
    :ip-detect-response-parser="parseCustomResponse"
  />
</template>

<script setup>
// 自定义响应解析
const parseCustomResponse = (data) => {
  // 情况1: 后端返回 { data: { countryCode: 'CN' } }
  if (data.data?.countryCode) {
    return data.data.countryCode
  }
  
  // 情况2: 后端返回 { result: { country: 'CN' } }
  if (data.result?.country) {
    return data.result.country
  }
  
  // 情况3: 直接返回国家代码
  return data.country || data.countryCode
}
</script>
```

### 后端接口实现参考

#### Node.js + Express 示例

```javascript
// GET /api/ip/location
app.get('/api/ip/location', async (req, res) => {
  const clientIp = req.ip || req.headers['x-forwarded-for']
  
  // 调用 IP 定位服务或数据库查询
  const location = await getLocationByIp(clientIp)
  
  res.json({
    code: 200,
    data: {
      ip: clientIp,
      countryCode: location.country, // 返回两位国家代码
      region: location.region,
      city: location.city
    }
  })
})
```

#### Python + Flask 示例

```python
@app.route('/api/ip/location', methods=['GET'])
def get_ip_location():
    client_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    
    # 调用 IP 定位服务
    location = get_location_by_ip(client_ip)
    
    return jsonify({
        'code': 200,
        'data': {
            'ip': client_ip,
            'countryCode': location['country'],
            'region': location['region'],
            'city': location['city']
        }
    })
```


