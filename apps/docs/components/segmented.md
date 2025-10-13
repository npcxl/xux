# Segmented 分段控制器

分段控制器用于在多个选项之间进行切换，适合用于导航、设置选择等场景。

## 基础用法

基本的分段控制器用法，通过 `v-model` 绑定选中值，会跟随父级高度或宽度自适应。

图标与色彩搭配一定要慎重选择，不然给用户造成的误区很大，深浅色是最优解决方案。

:::demo

```vue
<template>
  <div class="flex gap-6 h-[350px]">
    <XSegmented v-model="selectedValue" :options="options" />
    <div>
      <p class="mb-2">当前选中: {{ selectedValue }}</p>
      <p class="text-sm text-gray-500">选中的标签: {{ selectedLabel }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedValue = ref('vscode')

const options = [
  { label: 'IntelliJ', value: 'intellij', icon: 'logos:intellij-idea' },
  { label: 'VS Code', value: 'vscode', icon: 'logos:visual-studio-code' },
  { label: 'Appcode', value: 'appcode', icon: 'logos:appcode' }
]

const selectedLabel = computed(() => {
  const option = options.find(opt => opt.value === selectedValue.value)
  return option?.label || ''
})
</script>
```

:::

## 横向布局

通过设置 `direction="horizontal"` 可以使用横向布局。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <XSegmented 
      v-model="selectedValue" 
      :options="options" 
      direction="horizontal"
    />
    <p>当前选中: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('react')

const options = [
  { label: 'React', value: 'react', icon: 'logos:react' },
  { label: 'Vue', value: 'vue', icon: 'logos:vue' },
  { label: 'Angular', value: 'angular', icon: 'logos:angular-icon' }
]
</script>
```

:::

## 不同尺寸

分段控制器提供三种尺寸：`small`、`medium`、`large`。

:::demo

```vue
<template>
  <div class="flex flex-col gap-8">
    <div class="flex items-center gap-6">
      <XSegmented 
        v-model="value1" 
        :options="options" 
        size="small"
        direction="horizontal"
      />
      <span class="text-sm text-gray-500">小尺寸</span>
    </div>
    
    <div class="flex items-center gap-6">
      <XSegmented 
        v-model="value2" 
        :options="options" 
        size="medium"
        direction="horizontal"
      />
      <span class="text-sm text-gray-500">中等尺寸</span>
    </div>
    
    <div class="flex items-center gap-6">
      <XSegmented 
        v-model="value3" 
        :options="options" 
        size="large"
        direction="horizontal"
      />
      <span class="text-sm text-gray-500">大尺寸</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('node')
const value2 = ref('node')
const value3 = ref('node')

const options = [
  { label: 'Node.js', value: 'node', icon: 'logos:nodejs-icon' },
  { label: 'Deno', value: 'deno', icon: 'logos:deno' },
  { label: 'Bun', value: 'bun', icon: 'logos:bun' }
]
</script>
```

:::

## 块级元素

设置 `block` 属性可以让分段控制器占满整个容器宽度。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XSegmented 
      v-model="selectedValue" 
      :options="options" 
      direction="horizontal"
      block
    />
    <p class="text-center">当前选中: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('home')

const options = [
  { label: '首页', value: 'home' },
  { label: '文档', value: 'docs' },
  { label: '组件', value: 'components' },
  { label: '关于', value: 'about' }
]
</script>
```

:::

## 禁用选项

可以设置某个选项为禁用状态。

:::demo

```vue
<template>
  <div class="flex gap-6">
    <XSegmented v-model="selectedValue" :options="options" />
    <div>
      <p class="mb-2">当前选中: {{ selectedValue }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('chrome')

const options = [
  { label: 'Chrome', value: 'chrome', icon: 'logos:chrome' },
  { label: 'Firefox', value: 'firefox', icon: 'logos:firefox', disabled: true },
  { label: 'Safari', value: 'safari', icon: 'logos:safari' }
]
</script>
```

:::

## 自定义颜色

每个选项可以设置自定义的激活颜色。

:::demo

```vue
<template>
  <div class="flex gap-6">
    <XSegmented v-model="selectedValue" :options="options" direction="horizontal" />
    <p>当前环境: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('dev')

const options = [
  { label: '开发', value: 'dev', color: '#10b981' },
  { label: '测试', value: 'test', color: '#f59e0b' },
  { label: '生产', value: 'prod', color: '#ef4444' }
]
</script>
```

:::

## 只有图标

可以只显示图标，不显示文字标签。

:::demo

```vue
<template>
  <div class="flex items-start gap-6">
    <XSegmented 
      v-model="selectedValue" 
      :options="options"
      direction="horizontal"
    />
    <div>
      <p>当前选中: {{ selectedValue }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('github')

const options = [
  { value: 'github', icon: 'logos:github-icon' },
  { value: 'gitlab', icon: 'logos:gitlab' },
  { value: 'bitbucket', icon: 'logos:bitbucket' }
]
</script>
```

:::

## 只有文字

也可以只显示文字，不显示图标。

:::demo

```vue
<template>
  <div class="flex gap-6">
    <XSegmented 
      v-model="selectedValue" 
      :options="options"
      direction="horizontal"
    />
    <p>当前选项: {{ selectedValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('all')

const options = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'pending' },
  { label: '已完成', value: 'completed' }
]
</script>
```

:::

## 技术栈选择器

一个实际应用场景：技术栈选择。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-semibold">选择你的技术栈</h3>
    
    <div class="">
      <div>
        <h4 class="mb-3 font-medium text-gray-700">前端框架</h4>
        <XSegmented 
          v-model="frontend" 
          :options="frontendOptions"
          direction="horizontal"
          block
        />
      </div>
      
      <div>
        <h4 class="mb-3 font-medium text-gray-700">后端语言</h4>
        <XSegmented 
          v-model="backend" 
          :options="backendOptions"
          direction="horizontal"
          block
        />
      </div>
      
      <div>
        <h4 class="mb-3 font-medium text-gray-700">数据库</h4>
        <XSegmented 
          v-model="database" 
          :options="databaseOptions"
          direction="horizontal"
          block
        />
      </div>
      
      <div>
        <h4 class="mb-3 font-medium text-gray-700">部署平台</h4>
        <XSegmented 
          v-model="deploy" 
          :options="deployOptions"
          direction="horizontal"
          block
        />
      </div>
    </div>
    
    <div class="mt-4 p-4 bg-white rounded-lg">
      <h4 class="font-medium mb-2">你的选择:</h4>
      <p class="text-sm text-gray-600">
        前端: {{ frontend }} | 后端: {{ backend }} | 数据库: {{ database }} | 部署: {{ deploy }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const frontend = ref('vue')
const backend = ref('node')
const database = ref('postgres')
const deploy = ref('vercel')

const frontendOptions = [
  { label: 'React', value: 'react', icon: 'logos:react', color: '#61dafb' },
  { label: 'Vue', value: 'vue', icon: 'logos:vue', color: '#42b883' },
  { label: 'Angular', value: 'angular', icon: 'logos:angular-icon', color: '#dd0031' }
]

const backendOptions = [
  { label: 'Node.js', value: 'node', icon: 'logos:nodejs-icon', color: '#339933' },
  { label: 'Python', value: 'python', icon: 'logos:python', color: '#3776ab' },
  { label: 'Go', value: 'go', icon: 'logos:go', color: '#00add8' }
]

const databaseOptions = [
  { label: 'MySQL', value: 'mysql', icon: 'logos:mysql', color: '#4479a1' },
  { label: 'PostgreSQL', value: 'postgres', icon: 'logos:postgresql', color: '#336791' },
  { label: 'MongoDB', value: 'mongo', icon: 'logos:mongodb-icon', color: '#47a248' }
]

const deployOptions = [
  { label: 'Vercel', value: 'vercel', icon: 'logos:vercel-icon', color: '#000000' },
  { label: 'Netlify', value: 'netlify', icon: 'logos:netlify', color: '#00c7b7' },
  { label: 'AWS', value: 'aws', icon: 'logos:aws', color: '#ff9900' }
]
</script>
```

:::

## 监听变化

监听分段控制器的选中值变化。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <XSegmented 
      v-model="selectedValue" 
      :options="options"
      direction="horizontal"
      @change="handleChange"
    />
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="font-medium mb-2">变化历史:</h4>
      <ul class="text-sm text-gray-600 space-y-1">
        <li v-for="(log, index) in logs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedValue = ref('js')
const logs = ref(['初始值: js'])

const options = [
  { label: 'JavaScript', value: 'js', icon: 'logos:javascript' },
  { label: 'TypeScript', value: 'ts', icon: 'logos:typescript-icon' },
  { label: 'Python', value: 'py', icon: 'logos:python' }
]

const handleChange = (value) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.unshift(`${timestamp} - 切换到: ${value}`)
  if (logs.value.length > 5) {
    logs.value.pop()
  }
}
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前选中的值 | `string \| number` | - |
| options | 选项数组 | `SegmentedOption[]` | `[]` |
| direction | 布局方向 | `'horizontal' \| 'vertical'` | `'vertical'` |
| size | 尺寸大小 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| block | 是否为块级元素 | `boolean` | `false` |
| name | 原生 name 属性 | `string` | `'segmented'` |

### SegmentedOption

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项显示的文本 | `string` | - |
| value | 选项的值 | `string \| number` | - |
| icon | 图标（使用 iconify） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| color | 激活时的背景颜色 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中值改变时触发 | `(value: string \| number)` |
| change | 选中值改变时触发 | `(value: string \| number)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| - | 无插槽 |

## 使用 Iconify 图标

组件使用 [Iconify](https://icon-sets.iconify.design/) 图标库，支持超过 100,000 个图标。

常用图标集：
- `logos:*` - 品牌 Logo
- `mdi:*` - Material Design Icons
- `heroicons:*` - Heroicons
- `carbon:*` - Carbon Design System

图标查找：[https://icon-sets.iconify.design/](https://icon-sets.iconify.design/)

使用示例：
```javascript
const options = [
  { label: 'GitHub', value: 'github', icon: 'logos:github-icon' },
  { label: 'GitLab', value: 'gitlab', icon: 'logos:gitlab' }
]
```

## 注意事项

1. **图标加载**：组件会自动加载 Iconify 脚本，首次使用时可能有轻微延迟
2. **响应式**：横向布局在小屏幕上会自动切换为纵向布局
3. **无障碍**：组件使用原生 radio 输入，支持键盘导航
4. **颜色配置**：如果不设置 color，会使用预设的颜色循环

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

