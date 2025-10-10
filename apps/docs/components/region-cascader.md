# RegionCascader 地区级联选择器

地区级联选择器组件，支持中国省市区三级联动选择，支持自定义显示级别。

使用 Web Worker 线程处理数据，懒加载机制，极致性能。当前数据源支持省市区三级数据。


## 基础用法

最基本的地区选择功能。

:::demo

```vue
<template>
  <div class="demo-region-cascader">
    <XRegionCascader v-model="region" @change="handleChange" />
    <div class="text-sm text-gray-600 mt-4">
      选中的值: {{ region }}
    </div>
    <div class="text-sm text-gray-600 mt-2">
      选中的标签: {{ labels }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region = ref([])
const labels = ref([])

const handleChange = (values, labelArr) => {
  labels.value = labelArr
  console.log('选中的值:', values)
  console.log('选中的标签:', labelArr)
}
</script>

<style scoped>
.demo-region-cascader {
  min-height: 400px;
  padding-bottom: 20px;
}
</style>
```

:::

## 默认值

设置组件的默认选中值。

:::demo

```vue
<template>
  <div class="demo-region-cascader">
    <XRegionCascader v-model="region" />
    <div class="text-sm text-gray-600 mt-4">
      当前选中: {{ displayText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const region = ref(['11', '1101', '110101'])

const displayText = computed(() => {
  if (region.value.length === 0) return '未选择'
  return region.value.join(' > ')
})
</script>

<style scoped>
.demo-region-cascader {
  min-height: 400px;
  padding-bottom: 20px;
}
</style>
```

:::

## 自定义分隔符

可以自定义显示的分隔符。

:::demo

```vue
<template>
  <div class="demo-region-cascader-separator">
    <div class="mb-6">
      <label class="block text-sm font-medium mb-2">默认分隔符 ( / )</label>
      <XRegionCascader v-model="region1" />
    </div>
    
    <div class="mb-6">
      <label class="block text-sm font-medium mb-2">破折号分隔符 ( - )</label>
      <XRegionCascader v-model="region2" separator=" - " />
    </div>
    
    <div>
      <label class="block text-sm font-medium mb-2">箭头分隔符 ( → )</label>
      <XRegionCascader v-model="region3" separator=" → " />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region1 = ref(['11', '1101', '110101'])
const region2 = ref(['31', '3101', '310101'])
const region3 = ref(['44', '4401', '440103'])
</script>

<style scoped>
.demo-region-cascader-separator {
  min-height: 500px;
  padding-bottom: 20px;
}
</style>
```

:::

## 禁用状态

通过 `disabled` 属性禁用组件。

:::demo

```vue
<template>
  <div class="demo-region-cascader-disabled">
    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">正常状态</label>
      <XRegionCascader v-model="region" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-2">禁用状态</label>
      <XRegionCascader v-model="region" disabled />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region = ref(['11', '1101', '110101'])
</script>

<style scoped>
.demo-region-cascader-disabled {
  min-height: 450px;
  padding-bottom: 20px;
}
</style>
```

:::

## 自定义占位符

可以自定义输入框的占位文本。

:::demo

```vue
<template>
  <div class="demo-region-cascader-placeholder">
    <div class="mb-4">
      <XRegionCascader v-model="region1" placeholder="请选择所在地区" />
    </div>
    <div>
      <XRegionCascader v-model="region2" placeholder="选择省份、城市、区县" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region1 = ref([])
const region2 = ref([])
</script>

<style scoped>
.demo-region-cascader-placeholder {
  min-height: 450px;
  padding-bottom: 20px;
}
</style>
```

:::

## 智能搜索功能（全局搜索 + 智能反填）

组件内置强大的全局搜索功能，支持跨层级搜索和智能路径反填。通过设置 `searchable` 属性为 `true` 来启用。

:::demo

```vue
<template>
  <div class="demo-region-cascader-search">
    <XRegionCascader v-model="region" searchable @change="handleChange" />
    <div class="text-sm text-gray-600 mt-4">
      选中的值: {{ region }}
    </div>
    <div class="text-sm text-gray-600 mt-2">
      选中的标签: {{ labels }}
    </div>
    <div class="mt-4 p-4 bg-blue-50 rounded-md">
      <div class="text-sm font-semibold text-blue-900 mb-2">💡 全局搜索 + 智能反填：</div>
      <ul class="text-sm text-blue-800 space-y-1 list-disc list-inside">
        <li><strong>全局搜索</strong>：可以直接搜索任意层级（省/市/区）</li>
        <li><strong>智能反填</strong>：选择区县时自动反填省份和城市</li>
        <li><strong>路径显示</strong>：搜索结果显示完整路径，一目了然</li>
        <li><strong>层级标识</strong>：每个结果标注层级（省/市/区）</li>
        <li><strong>实时高亮</strong>：匹配的文字黄色高亮显示</li>
      </ul>
    </div>
    <div class="mt-4 p-3 bg-gray-50 rounded-md">
      <div class="text-sm font-medium text-gray-700 mb-2">🎯 使用示例：</div>
      <ol class="text-sm text-gray-600 space-y-1 list-decimal list-inside">
        <li><strong>直接搜索区县</strong>：输入"海淀"，选择"海淀区"，自动反填"北京市"</li>
        <li><strong>搜索城市</strong>：输入"杭州"，选择"杭州市"，自动反填"浙江省"</li>
        <li><strong>搜索省份</strong>：输入"广东"，选择"广东省"，然后继续选择市区</li>
        <li><strong>模糊搜索</strong>：输入"朝阳"，会显示所有包含"朝阳"的地区</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region = ref([])
const labels = ref([])

const handleChange = (values, labelArr) => {
  labels.value = labelArr
  console.log('选中的值:', values)
  console.log('选中的标签:', labelArr)
}
</script>

<style scoped>
.demo-region-cascader-search {
  min-height: 600px;
  padding-bottom: 20px;
}
</style>
```

:::

## 控制显示级别

通过 `maxLevel` 属性控制选择器的级别深度，支持1-3级。

:::demo

```vue
<template>
  <div class="demo-region-cascader-levels">
    <div class="level-item">
      <label class="block text-sm font-medium mb-2">省级（maxLevel = 1）</label>
      <XRegionCascader v-model="region1" :max-level="1" placeholder="选择省份" />
      <div class="text-sm text-gray-600 mt-2">选中: {{ region1.join(' / ') || '未选择' }}</div>
    </div>
    
    <div class="level-item">
      <label class="block text-sm font-medium mb-2">省市二级（maxLevel = 2）</label>
      <XRegionCascader v-model="region2" :max-level="2" placeholder="选择省/市" />
      <div class="text-sm text-gray-600 mt-2">选中: {{ region2.join(' / ') || '未选择' }}</div>
    </div>
    
    <div class="level-item">
      <label class="block text-sm font-medium mb-2">省市区三级（maxLevel = 3，默认）</label>
      <XRegionCascader v-model="region3" :max-level="3" placeholder="选择省/市/区" />
      <div class="text-sm text-gray-600 mt-2">选中: {{ region3.join(' / ') || '未选择' }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const region1 = ref([])
const region2 = ref([])
const region3 = ref([])
</script>

<style scoped>
.demo-region-cascader-levels {
  min-height: 600px;
  padding-bottom: 20px;
}

.level-item {
  margin-bottom: 60px;
  min-height: 150px;
}

.level-item:last-child {
  margin-bottom: 0;
}
</style>
```

:::


## 表单应用

在表单中使用地区选择器。

:::demo

```vue
<template>
  <div class="demo-region-cascader-form">
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h3 class="text-lg font-semibold mb-4">用户信息</h3>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">姓名</label>
          <input 
            v-model="form.name"
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="请输入姓名"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">所在地区 *</label>
          <XRegionCascader v-model="form.region" placeholder="请选择省/市/区" />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">详细地址</label>
          <textarea 
            v-model="form.address"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="请输入详细地址"
            rows="3"
          ></textarea>
        </div>
        
        <button 
          type="submit"
          class="w-full px-4 py-2 bg-[#1a1a1a] text-white rounded-md hover:bg-[#2a2a2a] transition-colors"
        >
          提交
        </button>
      </form>
      
      <div v-if="submittedData" class="mt-4 p-4 bg-gray-50 rounded-md">
        <h4 class="font-medium mb-2">提交的数据：</h4>
        <pre class="text-sm">{{ JSON.stringify(submittedData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  region: [],
  address: ''
})

const submittedData = ref(null)

const handleSubmit = () => {
  if (form.value.region.length === 0) {
    alert('请选择所在地区')
    return
  }
  
  submittedData.value = {
    ...form.value,
    regionCodes: form.value.region,
    timestamp: new Date().toISOString()
  }
  
  console.log('表单提交:', submittedData.value)
}
</script>

<style scoped>
.demo-region-cascader-form {
  min-height: 600px;
  padding-bottom: 20px;
}
</style>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值（地区代码数组） | `string[]` | `[]` |
| placeholder | 输入框占位文本 | `string` | `'请选择地区'` |
| disabled | 是否禁用 | `boolean` | `false` |
| customClass | 自定义样式类名 | `string` | `''` |
| separator | 显示分隔符 | `string` | `' / '` |
| maxLevel | 最大级别：1-省，2-省市，3-省市区 | `1 \| 2 \| 3` | `3` |
| searchable | 是否启用搜索功能 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | `(value: string[])` |
| change | 选择完成时触发 | `(values: string[], labels: string[])` |

## 数据说明

### 地区代码格式

组件使用的地区代码格式如下：

- 省级（1级）：2位代码，如 `11`（北京市）
- 市级（2级）：4位代码，如 `1101`（北京市市辖区）
- 区县（3级）：6位代码，如 `110101`（东城区）

### 示例代码

```javascript
// 北京市东城区
const region = ['11', '1101', '110101']

// 上海市黄浦区
const region = ['31', '3101', '310101']

// 广东省广州市荔湾区
const region = ['44', '4401', '440103']
```

## 级别控制说明

### 最大级别（maxLevel）

通过 `maxLevel` 属性可以精确控制地区选择的深度：

- **maxLevel = 1**：只选择省级，适用于大区域统计
- **maxLevel = 2**：选择到市级，适用于省市联动场景
- **maxLevel = 3**：选择到区县级（默认），最常用的场景

### 懒加载机制

组件使用 Web Worker 实现数据懒加载，有效避免大数据量带来的性能问题：

1. 初始化时只加载省级数据
2. 选择省份后，异步加载该省的市级数据
3. 选择城市后，异步加载该市的区县数据

这种方式确保了即使数据量达到数千条，UI 仍然流畅响应。

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

