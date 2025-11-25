# Autocomplete 自动补全输入框

根据输入内容提供对应的输入建议

## 基础用法

`fetch-suggestions` 属性是返回建议输入的方法。 在此示例中， `querySearch(queryString, cb)` 方法通过 `cb(data)` 给 Autocomplete 组件返回建议。

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 300px;">
      <p style="font-size: 14px; color: #86868b; margin-bottom: 8px;">激活时显示建议</p>
      <XAutocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        placeholder="请输入内容"
        @select="handleSelect"
      />
    </div>
    
    <div style="flex: 1; min-width: 300px;">
      <p style="font-size: 14px; color: #86868b; margin-bottom: 8px;">输入时显示建议</p>
      <XAutocomplete
        v-model="state2"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        placeholder="请输入内容"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const state1 = ref('')
const state2 = ref('')

const restaurants = ref([])
const querySearch = (queryString, cb) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}

const createFilter = (queryString) => {
  return (restaurant) => {
    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const loadAll = () => {
  return [
    { value: 'Vue.js', link: 'https://vuejs.org' },
    { value: 'Vue Router', link: 'https://router.vuejs.org' },
    { value: 'Vuex', link: 'https://vuex.vuejs.org' },
    { value: 'Vue CLI', link: 'https://cli.vuejs.org' },
    { value: 'Vite', link: 'https://vitejs.dev' },
    { value: 'Vitest', link: 'https://vitest.dev' },
    { value: 'TypeScript', link: 'https://www.typescriptlang.org' },
    { value: 'JavaScript', link: 'https://developer.mozilla.org' },
  ]
}

const handleSelect = (item) => {
  console.log('选中项：', item)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>
```

:::

## 自定义模板

使用默认插槽自定义输入建议的展示。

:::demo

```vue
<template>
  <XAutocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
    @select="handleSelect"
  >
    <template #suffix>
      <XIcon name="search" :size="16" style="cursor: pointer;" @click="handleIconClick" />
    </template>
    <template #default="{ item }">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-weight: 500;">{{ item.value }}</div>
          <div style="font-size: 12px; color: #86868b; margin-top: 4px;">{{ item.desc }}</div>
        </div>
        <XIcon name="arrow-right" :size="14" style="color: #86868b;" />
      </div>
    </template>
  </XAutocomplete>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const state = ref('')
const links = ref([])

const querySearch = (queryString, cb) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value
  cb(results)
}

const createFilter = (queryString) => {
  return (link) => {
    return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}

const loadAll = () => {
  return [
    { value: 'Vue.js', desc: '渐进式 JavaScript 框架' },
    { value: 'React', desc: '用于构建用户界面的 JavaScript 库' },
    { value: 'Angular', desc: '现代 Web 开发平台' },
    { value: 'Svelte', desc: '编译时优化的前端框架' },
    { value: 'Solid', desc: '简单高效的响应式库' },
  ]
}

const handleSelect = (item) => {
  console.log('选中项：', item)
}

const handleIconClick = () => {
  console.log('点击了搜索图标')
}

onMounted(() => {
  links.value = loadAll()
})
</script>
```

:::

## 远程搜索

从服务端搜索数据。

:::demo

```vue
<template>
  <XAutocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="输入关键词搜索"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const state = ref('')

const querySearchAsync = (queryString, cb) => {
  if (!queryString) {
    cb([])
    return
  }
  
  // 模拟异步请求
  setTimeout(() => {
    const results = [
      { value: `${queryString} - 搜索结果1` },
      { value: `${queryString} - 搜索结果2` },
      { value: `${queryString} - 搜索结果3` },
      { value: `${queryString} - 搜索结果4` },
      { value: `${queryString} - 搜索结果5` },
    ]
    cb(results)
  }, 500)
}

const handleSelect = (item) => {
  console.log('选中项：', item)
}
</script>
```

:::

## 输入长度限制

通过 `maxlength` 和 `minlength` 限制输入长度。

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 300px;">
      <p style="font-size: 14px; color: #86868b; margin-bottom: 8px;">最大长度10</p>
      <XAutocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        maxlength="10"
        placeholder="最多输入10个字符"
      />
    </div>
    
    <div style="flex: 1; min-width: 300px;">
      <p style="font-size: 14px; color: #86868b; margin-bottom: 8px;">最小长度3</p>
      <XAutocomplete
        v-model="state2"
        :fetch-suggestions="querySearchMin"
        placeholder="至少输入3个字符"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const state1 = ref('')
const state2 = ref('')

const querySearch = (queryString, cb) => {
  const results = queryString
    ? [
        { value: `${queryString}1` },
        { value: `${queryString}2` },
        { value: `${queryString}3` },
      ]
    : []
  cb(results)
}

const querySearchMin = (queryString, cb) => {
  // 至少3个字符才显示建议
  if (queryString.length < 3) {
    cb([])
    return
  }
  
  const results = [
    { value: `${queryString} - 结果1` },
    { value: `${queryString} - 结果2` },
    { value: `${queryString} - 结果3` },
  ]
  cb(results)
}
</script>
```

:::

## 自定义头部与底部

通过 `header` 和 `footer` 插槽自定义下拉列表的头部和底部。

:::demo

```vue
<template>
  <XAutocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入内容"
  >
    <template #header>
      <div style="padding: 8px 12px; color: #86868b; font-size: 12px;">
        搜索历史
      </div>
    </template>
    <template #footer>
      <div style="padding: 8px 12px; text-align: center;">
        <a href="#" style="color: #007aff; text-decoration: none; font-size: 14px;">
          查看更多结果
        </a>
      </div>
    </template>
  </XAutocomplete>
</template>

<script setup>
import { ref } from 'vue'

const state = ref('')

const querySearch = (queryString, cb) => {
  const results = queryString
    ? [
        { value: '最近搜索1' },
        { value: '最近搜索2' },
        { value: '最近搜索3' },
      ]
    : [
        { value: '热门搜索1' },
        { value: '热门搜索2' },
        { value: '热门搜索3' },
      ]
  cb(results)
}
</script>
```

:::

## 前后置元素

通过 `prepend` 和 `append` 插槽添加前后置元素，通过 `prefix` 和 `suffix` 插槽添加前后缀图标。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <XAutocomplete
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入网址"
    >
      <template #prepend>
        https://
      </template>
    </XAutocomplete>
    
    <XAutocomplete
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入邮箱"
    >
      <template #append>
        @gmail.com
      </template>
    </XAutocomplete>
    
    <XAutocomplete
      v-model="state3"
      :fetch-suggestions="querySearch"
      prefix-icon="search"
      suffix-icon="info"
      placeholder="带图标的输入框"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const state1 = ref('')
const state2 = ref('')
const state3 = ref('')

const querySearch = (queryString, cb) => {
  const results = queryString
    ? [
        { value: queryString + '建议1' },
        { value: queryString + '建议2' },
        { value: queryString + '建议3' },
      ]
    : []
  cb(results)
}
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用输入框。

:::demo

```vue
<template>
  <XAutocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    disabled
    placeholder="禁用状态"
  />
</template>

<script setup>
import { ref } from 'vue'

const state = ref('禁用的输入框')

const querySearch = (queryString, cb) => {
  cb([])
}
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项绑定值 | `string` | — |
| placeholder | 占位文本 | `string` | — |
| clearable | 是否可清空 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| value-key | 输入建议对象中用于显示的键名 | `string` | `value` |
| debounce | 获取输入建议的防抖延时，单位为毫秒 | `number` | `300` |
| placement | 菜单弹出位置 | `string` | `bottom-start` |
| fetch-suggestions | 获取输入建议的方法 | `Function` | — |
| trigger-on-focus | 是否在输入框 focus 时显示建议 | `boolean` | `true` |
| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | — |
| aria-label | 原生 aria-label 属性 | `string` | — |
| hide-loading | 是否隐藏远程加载时的加载图标 | `boolean` | `false` |
| popper-class | 下拉列表的类名 | `string / object` | — |
| popper-style | 下拉列表的样式 | `string / object` | — |
| teleported | 是否将下拉列表插入至 body 元素 | `boolean` | `true` |
| highlight-first-item | 是否默认高亮远程搜索结果的第一项 | `boolean` | `false` |
| fit-input-width | 下拉框的宽度是否与输入框相同 | `boolean` | `true` |
| loop-navigation | 键盘导航是否从末尾循环到开头 | `boolean` | `true` |
| prefix-icon | 输入框头部图标 | `string` | — |
| suffix-icon | 输入框尾部图标 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| blur | 当选择器的输入框失去焦点时触发 | `(event: Event)` |
| focus | 当选择器的输入框获得焦点时触发 | `(event: Event)` |
| input | 在 Input 值改变时触发 | `(value: string)` |
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | — |
| select | 点击选中建议项时触发 | `(item: any)` |
| change | 在 Input 值改变时触发 | `(value: string)` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义输入建议的内容 | `{ item }` |
| header | 下拉列表顶部的内容 | — |
| footer | 下拉列表底部的内容 | — |
| prefix | 输入框头部内容 | — |
| suffix | 输入框尾部内容 | — |
| prepend | 输入框前置内容 | — |
| append | 输入框后置内容 | — |
| loading | 自定义加载中内容 | — |
| empty | 自定义空状态内容 | — |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | — |
| blur | 使 input 失去焦点 | — |
| close | 折叠建议列表 | — |
| handleSelect | 手动触发选中建议事件 | `(item: any)` |
| handleKeyEnter | 手动触发键盘回车事件 | — |
| highlight | 在建议中高亮显示一个项目 | `(index: number)` |
| getData | 重新加载建议列表 | `(queryString?: string)` |

## 设计特点

- **iOS风格设计**：采用毛玻璃效果、圆角设计、平滑过渡动画
- **高性能**：使用防抖优化、虚拟列表（大数据量时）
- **完整的键盘支持**：上下箭头导航、回车选择、ESC关闭
- **无障碍支持**：完整的ARIA属性支持
- **暗黑模式**：自动适配暗黑主题
