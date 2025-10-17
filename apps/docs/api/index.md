# API 工具函数

XUX UI 提供了丰富的工具函数库，涵盖验证、类型检查、字符串处理、数组操作、对象操作、格式化、WebSocket、存储、URL处理、函数增强、树结构、文件处理、数学计算、颜色处理、DOM操作等各个方面。

## 🚀 快速开始

```bash
npm install @xlui/xux-ui
```

```javascript
import {
  isPhone,
  isEmail,
  deepClone,
  formatNumber,
  debounce,
  throttle
} from '@xlui/xux-ui'

// 验证手机号
const isValid = isPhone('13800138000')

// 深度克隆对象
const cloned = deepClone({ name: 'test' })

// 格式化数字
const formatted = formatNumber(1234567.89)

// 防抖函数
const debouncedFn = debounce(() => {
  console.log('防抖执行')
}, 500)
```

## 📚 工具分类

### 🔍 基础工具
- **[验证工具](/api/validate)** - 手机号、邮箱、身份证等格式验证
- **[类型检查](/api/type)** - 各种数据类型判断
- **[字符串工具](/api/string)** - 格式转换、掩码处理、随机生成
- **[数组工具](/api/array)** - 去重、排序、分组、统计
- **[对象工具](/api/object)** - 深度克隆、属性操作、路径访问

### 🎨 格式化工具
- **[格式化工具](/api/format)** - 数字、货币、文件大小、时间格式化
- **[数学工具](/api/math)** - 精确计算、避免浮点数问题
- **[颜色工具](/api/color)** - 格式转换、颜色调整

### 🌐 网络与存储
- **[WebSocket 工具](/api/websocket)** - 连接管理、自动重连、消息队列
- **[存储工具](/api/storage)** - 本地存储、Cookie操作
- **[URL 工具](/api/url)** - URL解析、浏览器检测

### ⚡ 高级功能
- **[函数工具](/api/function)** - 防抖、节流、重试
- **[树结构工具](/api/tree)** - 列表转树、节点查找、遍历
- **[文件工具](/api/file)** - 文件转换、图片压缩
- **[DOM 工具](/api/dom)** - 元素操作、位置计算、滚动控制

## 💡 使用示例

### 验证工具
```javascript
import { isPhone, isEmail, isIdCard } from '@xlui/xux-ui'

// 手机号验证
console.log(isPhone('13800138000')) // true

// 邮箱验证
console.log(isEmail('user@example.com')) // true

// 身份证验证
console.log(isIdCard('110101199001011234')) // true
```

### 字符串工具
```javascript
import { camelToSnake, maskPhone, randomString } from '@xlui/xux-ui'

// 驼峰转下划线
console.log(camelToSnake('userName')) // 'user_name'

// 手机号掩码
console.log(maskPhone('13800138000')) // '138****8000'

// 随机字符串
console.log(randomString(8)) // 'aB3xY9mK'
```

### 数组工具
```javascript
import { unique, groupBy, shuffle } from '@xlui/xux-ui'

// 数组去重
console.log(unique([1, 2, 2, 3, 3, 3])) // [1, 2, 3]

// 数组分组
const users = [
  { name: '张三', age: 20 },
  { name: '李四', age: 25 },
  { name: '王五', age: 20 }
]
console.log(groupBy(users, 'age'))
// { 20: [{ name: '张三', age: 20 }, { name: '王五', age: 20 }], 25: [{ name: '李四', age: 25 }] }

// 数组打乱
console.log(shuffle([1, 2, 3, 4, 5])) // [3, 1, 5, 2, 4]
```

### 对象工具
```javascript
import { deepClone, pick, omit, getProp } from '@xlui/xux-ui'

// 深度克隆
const obj = { name: 'test', nested: { value: 123 } }
const cloned = deepClone(obj)

// 提取属性
console.log(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])) // { a: 1, c: 3 }

// 排除属性
console.log(omit({ a: 1, b: 2, c: 3 }, ['b'])) // { a: 1, c: 3 }

// 路径访问
const data = { user: { profile: { name: '张三' } } }
console.log(getProp(data, 'user.profile.name')) // '张三'
```

### 格式化工具
```javascript
import { formatNumber, formatCurrency, formatFileSize } from '@xlui/xux-ui'

// 数字格式化
console.log(formatNumber(1234567.89, 2)) // '1,234,567.89'

// 货币格式化
console.log(formatCurrency(1234.56, 'CNY')) // '¥1,234.56'

// 文件大小格式化
console.log(formatFileSize(1048576)) // '1.00 MB'
```

### 函数工具
```javascript
import { debounce, throttle, retry } from '@xlui/xux-ui'

// 防抖
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query)
}, 300)

// 节流
const throttledScroll = throttle(() => {
  console.log('滚动事件')
}, 100)

// 重试
const fetchData = retry(async () => {
  const response = await fetch('/api/data')
  if (!response.ok) throw new Error('请求失败')
  return response.json()
}, 3, 1000)
```

## 🔧 完整导入

```javascript
// 导入所有工具函数
import * as Utils from '@xlui/xux-ui'

// 或者按需导入
import {
  // 验证工具
  isPhone, isEmail, isIdCard,
  // 类型检查
  isObject, isArray, isString,
  // 字符串工具
  camelToSnake, maskPhone, randomString,
  // 数组工具
  unique, groupBy, shuffle,
  // 对象工具
  deepClone, pick, omit,
  // 格式化工具
  formatNumber, formatCurrency,
  // 函数工具
  debounce, throttle, retry
} from '@xlui/xux-ui'
```

## 📖 详细文档

每个工具模块都有详细的文档和交互式示例，点击上方分类链接查看具体使用方法。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来完善工具函数库！