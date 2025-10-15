# Timeline 时间轴

垂直或水平展示时间流信息。

## 基础用法

基本的时间轴。

:::demo

```vue
<template>
  <XTimeline :items="items" />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { time: '2024-01-15 10:30', title: '创建订单', description: '用户创建了新订单 #12345' },
  { time: '2024-01-15 10:35', title: '支付成功', description: '订单已支付，等待发货' },
  { time: '2024-01-15 14:20', title: '商品出库', description: '商品已从仓库发出' },
  { time: '2024-01-16 09:00', title: '配送中', description: '快递小哥正在配送' },
  { time: '2024-01-16 18:30', title: '已签收', description: '订单已完成' }
])
</script>
```

:::

## 水平时间轴

设置 `mode="horizontal"` 显示水平时间轴。

:::demo

```vue
<template>
  <XTimeline :items="horizontalItems" mode="horizontal" />
</template>

<script setup>
import { ref } from 'vue'

const horizontalItems = ref([
  { title: '需求评审', time: '01-10' },
  { title: 'UI 设计', time: '01-12' },
  { title: '开发', time: '01-15' },
  { title: '测试', time: '01-20' },
  { title: '上线', time: '01-25' }
])
</script>
```

:::

## 自定义图标

使用 `icon` 属性自定义节点图标。

:::demo

```vue
<template>
  <XTimeline :items="iconItems" />
</template>

<script setup>
import { ref } from 'vue'

const iconItems = ref([
  { 
    time: '2024-01-15', 
    title: '项目启动', 
    description: '团队召开项目启动会议',
    icon: 'material-symbols:rocket-launch',
    type: 'primary'
  },
  { 
    time: '2024-01-20', 
    title: '设计完成', 
    description: 'UI/UX 设计稿已完成',
    icon: 'material-symbols:design-services',
    type: 'success'
  },
  { 
    time: '2024-01-25', 
    title: '开发中', 
    description: '功能开发进行中',
    icon: 'material-symbols:code',
    type: 'warning'
  },
  { 
    time: '2024-02-01', 
    title: '待测试', 
    description: '等待测试团队测试',
    icon: 'material-symbols:bug-report'
  }
])
</script>
```

:::

## 不同状态

使用 `type` 属性设置不同状态颜色。

:::demo

```vue
<template>
  <XTimeline :items="statusItems" />
</template>

<script setup>
import { ref } from 'vue'

const statusItems = ref([
  { title: '成功状态', description: '操作已成功完成', type: 'success' },
  { title: '警告状态', description: '操作需要注意', type: 'warning' },
  { title: '危险状态', description: '操作失败或异常', type: 'danger' },
  { title: '主要状态', description: '当前进行中的操作', type: 'primary' },
  { title: '默认状态', description: '普通状态' }
])
</script>
```

:::

## 自定义颜色

使用 `color` 属性自定义节点颜色。

:::demo

```vue
<template>
  <XTimeline :items="colorItems" />
</template>

<script setup>
import { ref } from 'vue'

const colorItems = ref([
  { title: '紫色节点', time: '10:00', color: '#8b5cf6' },
  { title: '粉色节点', time: '11:00', color: '#ec4899' },
  { title: '青色节点', time: '12:00', color: '#06b6d4' },
  { title: '橙色节点', time: '13:00', color: '#f97316' }
])
</script>
```

:::

## 自定义内容

使用插槽完全自定义节点和内容。

:::demo

```vue
<template>
  <XTimeline :items="customItems">
    <template #icon-1="{ item }">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
        2
      </div>
    </template>
    
    <template #content-2="{ item }">
      <div style="padding: 12px; background: var(--vp-c-bg-soft); border-radius: 8px; border-left: 3px solid #10b981;">
        <div style="font-weight: 600; color: #10b981; margin-bottom: 4px;">{{ item.title }}</div>
        <div style="font-size: 13px; color: var(--vp-c-text-2);">{{ item.description }}</div>
      </div>
    </template>
  </XTimeline>
</template>

<script setup>
import { ref } from 'vue'

const customItems = ref([
  { title: '第一步', description: '普通节点' },
  { title: '第二步', description: '自定义图标节点' },
  { title: '第三步', description: '自定义内容节点' },
  { title: '第四步', description: '普通节点' }
])
</script>
```

:::

## 步骤控制

使用 `ref` 控制当前步骤，支持上一步/下一步操作。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XTimeline ref="timelineRef" :items="stepItems" :current="current" @change="handleChange" />
    
    <div class="flex gap-2 justify-center">
      <XButton @click="handlePrev" :disabled="current <= 0">上一步</XButton>
      <XButton type="primary" @click="handleNext" :disabled="current >= stepItems.length - 1">下一步</XButton>
      <XButton @click="handleReset">重置</XButton>
    </div>
    
    <div class="text-center text-sm text-gray-600">
      当前步骤：{{ current + 1 }} / {{ stepItems.length }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const timelineRef = ref()
const current = ref(0)

const stepItems = ref([
  { title: '提交申请', description: '用户提交了申请表单', type: 'success' },
  { title: '审核中', description: '正在进行资料审核', type: 'primary' },
  { title: '审核通过', description: '审核已通过，等待发放', type: 'default' },
  { title: '已完成', description: '流程已完成', type: 'default' }
])

const handlePrev = () => {
  timelineRef.value.prev()
}

const handleNext = () => {
  timelineRef.value.next()
}

const handleReset = () => {
  timelineRef.value.goTo(0)
}

const handleChange = (curr, prev) => {
  current.value = curr
  console.log(`从步骤 ${prev + 1} 到 ${curr + 1}`)
}
</script>
```

:::

## API

### Timeline Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 时间轴数据 | `TimelineItem[]` | `[]` |
| mode | 模式 | `'vertical' / 'horizontal'` | `'vertical'` |
| current | 当前步骤（从 0 开始） | `number` | `-1` |

### TimelineItem

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| time | 时间 | `string` | - |
| title | 标题 | `string` | - |
| description | 描述 | `string` | - |
| icon | 图标（iconify） | `string` | - |
| color | 节点颜色 | `string` | - |
| type | 类型 | `'default' / 'primary' / 'success' / 'warning' / 'danger'` | `'default'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当前步骤变化时触发 | `(current: number, prev: number)` |
| update:current | 当前步骤更新时触发 | `(value: number)` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| icon-{index} | 自定义节点图标 | `{ item, index, isCurrent }` |
| content-{index} | 自定义内容 | `{ item, index, isCurrent }` |

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| prev | 上一步 | `() => void` |
| next | 下一步 | `() => void` |
| goTo | 跳转到指定步骤 | `(step: number) => void` |
| getCurrentStep | 获取当前步骤 | `() => number` |

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
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
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

