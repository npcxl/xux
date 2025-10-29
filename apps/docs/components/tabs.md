# Tabs 标签页

选项卡切换组件，支持多种浏览器风格的标签样式。

## 基础用法

基本的标签页用法，支持线条和卡片两种风格。

:::demo

```vue
<template>
  <div class="space-y-6">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">线条风格（默认）</h4>
      <XTabs v-model="activeTab1">
        <XTabPane name="home" label="首页">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">欢迎来到首页</h3>
            <p class="text-gray-600">这是首页的内容区域</p>
          </div>
        </XTabPane>
        <XTabPane name="user" label="用户管理" icon="mdi:account">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">用户管理</h3>
            <p class="text-gray-600">管理系统用户信息</p>
          </div>
        </XTabPane>
        <XTabPane name="settings" label="系统设置" icon="mdi:cog">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">系统设置</h3>
            <p class="text-gray-600">配置系统参数</p>
          </div>
        </XTabPane>
      </XTabs>
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900">卡片风格</h4>
      <XTabs v-model="activeTab2" type="card">
        <XTabPane name="orders" label="订单管理" icon="mdi:clipboard-list">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">订单管理</h3>
            <p class="text-gray-600">查看和管理所有订单</p>
          </div>
        </XTabPane>
        <XTabPane name="products" label="商品管理" icon="mdi:package-variant">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">商品管理</h3>
            <p class="text-gray-600">管理商品库存和信息</p>
          </div>
        </XTabPane>
        <XTabPane name="analytics" label="数据分析" icon="mdi:chart-line">
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">数据分析</h3>
            <p class="text-gray-600">查看销售数据和趋势</p>
          </div>
        </XTabPane>
      </XTabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const activeTab1 = ref('home')
const activeTab2 = ref('orders')
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 边框卡片风格

带边框的卡片样式，适合内容分组。

:::demo

```vue
<template>
  <XTabs v-model="borderCardTab" type="border-card">
    <XTabPane name="overview" label="概览" icon="mdi:view-dashboard">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">系统概览</h3>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-sm text-gray-600">总用户数</div>
            <div class="text-2xl font-bold text-blue-600">12,345</div>
          </div>
          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-sm text-gray-600">活跃用户</div>
            <div class="text-2xl font-bold text-green-600">8,901</div>
          </div>
        </div>
      </div>
    </XTabPane>
    <XTabPane name="stats" label="数据统计" icon="mdi:chart-bar">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">数据统计</h3>
        <p class="text-gray-600">查看详细的数据分析报告</p>
      </div>
    </XTabPane>
    <XTabPane name="reports" label="报表中心" icon="mdi:file-document">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">报表中心</h3>
        <p class="text-gray-600">生成和下载各类报表</p>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const borderCardTab = ref('overview')
</script>
```

:::

## 按钮风格

按钮样式的标签页，更加突出和独立。

:::demo

```vue
<template>
  <XTabs v-model="buttonTab" type="button">
    <XTabPane name="all" label="全部" icon="mdi:apps">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">全部内容</h3>
        <p class="text-gray-600">显示所有类型的内容</p>
      </div>
    </XTabPane>
    <XTabPane name="images" label="图片" icon="mdi:image">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">图片内容</h3>
        <p class="text-gray-600">只显示图片类型</p>
      </div>
    </XTabPane>
    <XTabPane name="videos" label="视频" icon="mdi:video">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">视频内容</h3>
        <p class="text-gray-600">只显示视频类型</p>
      </div>
    </XTabPane>
    <XTabPane name="documents" label="文档" icon="mdi:file-document">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">文档内容</h3>
        <p class="text-gray-600">只显示文档类型</p>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const buttonTab = ref('all')
</script>
```

:::

## 分段控制器风格

类似 iOS 的分段控制器样式，简洁优雅。

:::demo

```vue
<template>
  <XTabs v-model="segmentTab" type="segment">
    <XTabPane name="day" label="日">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">日视图</h3>
        <p class="text-gray-600">按天显示数据</p>
      </div>
    </XTabPane>
    <XTabPane name="week" label="周">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">周视图</h3>
        <p class="text-gray-600">按周显示数据</p>
      </div>
    </XTabPane>
    <XTabPane name="month" label="月">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">月视图</h3>
        <p class="text-gray-600">按月显示数据</p>
      </div>
    </XTabPane>
    <XTabPane name="year" label="年">
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">年视图</h3>
        <p class="text-gray-600">按年显示数据</p>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const segmentTab = ref('day')
</script>
```

:::

## Chrome 浏览器风格

仿 Chrome 浏览器的圆润标签样式，现代简洁。

:::demo

```vue
<template>
  <XTabs v-model="chromeTab" type="chrome" closable addable @tab-add="handleAddTab" @tab-remove="handleRemoveTab">
    <XTabPane 
      v-for="tab in chromeTabs" 
      :key="tab.name"
      :name="tab.name" 
      :label="tab.label" 
      :icon="tab.icon"
    >
      <div class="p-6">
        <h3 class="text-xl font-bold mb-3">{{ tab.label }}</h3>
        <p class="text-gray-600 mb-4">{{ tab.content }}</p>
        <div class="flex gap-2">
          <XButton type="primary" size="small">操作</XButton>
          <XButton size="small">取消</XButton>
        </div>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane, XButton, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
let tabIndex = 4

const chromeTab = ref('tab1')
const chromeTabs = ref([
  { name: 'tab1', label: 'Google', icon: 'mdi:google', content: 'Google 搜索引擎页面' },
  { name: 'tab2', label: 'GitHub', icon: 'mdi:github', content: 'GitHub 代码托管平台' },
  { name: 'tab3', label: '设置', icon: 'mdi:cog', content: '浏览器设置页面' }
])

const handleAddTab = () => {
  const newTab = {
    name: `tab${tabIndex++}`,
    label: `新标签 ${tabIndex - 1}`,
    icon: 'mdi:tab',
    content: `这是新建的标签页 ${tabIndex - 1}`
  }
  chromeTabs.value.push(newTab)
  chromeTab.value = newTab.name
  msg.success('新增标签页成功')
}

const handleRemoveTab = (name) => {
  const index = chromeTabs.value.findIndex(tab => tab.name === name)
  if (index > -1) {
    chromeTabs.value.splice(index, 1)
    msg.info('标签页已关闭')
  }
}
</script>
```

:::

## Safari 浏览器风格

仿 Safari 浏览器的圆润简洁标签样式，更加优雅现代。

:::demo

```vue
<template>
  <XTabs v-model="safariTab" type="safari" closable addable @tab-add="handleAddTab" @tab-remove="handleRemoveTab">
    <XTabPane 
      v-for="tab in safariTabs" 
      :key="tab.name"
      :name="tab.name" 
      :label="tab.label" 
      :icon="tab.icon"
    >
      <div class="p-6 bg-gray-50 rounded-lg">
        <div class="flex items-center gap-3 mb-4">
          <Icon :icon="tab.icon" class="text-2xl text-primary" />
          <h3 class="text-xl font-bold">{{ tab.label }}</h3>
        </div>
        <p class="text-gray-600 mb-4">{{ tab.content }}</p>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-white rounded-lg shadow-sm">
            <div class="text-sm text-gray-500">访问量</div>
            <div class="text-2xl font-bold text-primary">1.2K</div>
          </div>
          <div class="p-4 bg-white rounded-lg shadow-sm">
            <div class="text-sm text-gray-500">活跃度</div>
            <div class="text-2xl font-bold text-success">95%</div>
          </div>
        </div>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane, xlMsg } from '@xlui/xux-ui'
import { Icon } from '@iconify/vue'

const msg = xlMsg()
let tabIndex = 4

const safariTab = ref('tab1')
const safariTabs = ref([
  { name: 'tab1', label: '仪表盘', icon: 'mdi:view-dashboard', content: '查看系统总览和关键指标' },
  { name: 'tab2', label: '数据分析', icon: 'mdi:chart-bar', content: '深入分析业务数据和趋势' },
  { name: 'tab3', label: '用户中心', icon: 'mdi:account-circle', content: '管理用户信息和权限' }
])

const handleAddTab = () => {
  const newTab = {
    name: `tab${tabIndex++}`,
    label: `页面 ${tabIndex - 1}`,
    icon: 'mdi:file-document',
    content: `这是新打开的页面 ${tabIndex - 1}`
  }
  safariTabs.value.push(newTab)
  safariTab.value = newTab.name
  msg.success('新增页面成功')
}

const handleRemoveTab = (name) => {
  const index = safariTabs.value.findIndex(tab => tab.name === name)
  if (index > -1) {
    safariTabs.value.splice(index, 1)
    msg.info('页面已关闭')
  }
}
</script>
```

:::

## 可关闭标签

通过 `closable` 属性设置标签页是否可关闭。

:::demo

```vue
<template>
  <XTabs v-model="closableTab" closable @tab-remove="handleRemove">
    <XTabPane name="tab1" label="标签 1" icon="mdi:numeric-1-circle">
      <div class="p-4">标签 1 的内容</div>
    </XTabPane>
    <XTabPane name="tab2" label="标签 2" icon="mdi:numeric-2-circle">
      <div class="p-4">标签 2 的内容</div>
    </XTabPane>
    <XTabPane name="tab3" label="不可关闭" icon="mdi:lock" :closable="false">
      <div class="p-4">这个标签不能被关闭</div>
    </XTabPane>
    <XTabPane name="tab4" label="标签 4" icon="mdi:numeric-4-circle">
      <div class="p-4">标签 4 的内容</div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
const closableTab = ref('tab1')

const handleRemove = (name) => {
  msg.warning(`标签 ${name} 已关闭`)
}
</script>
```

:::

## 新增标签

通过 `addable` 属性启用新增标签功能。

:::demo

```vue
<template>
  <XTabs v-model="editableTab" type="card" closable addable @tab-add="handleAdd" @tab-remove="handleRemove">
    <XTabPane 
      v-for="tab in editableTabs" 
      :key="tab.name"
      :name="tab.name" 
      :label="tab.label"
    >
      <div class="p-4">
        <h4 class="font-semibold mb-2">{{ tab.label }}</h4>
        <p class="text-gray-600">{{ tab.content }}</p>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
let tabCount = 3

const editableTab = ref('tab1')
const editableTabs = ref([
  { name: 'tab1', label: '标签 1', content: '标签 1 的内容' },
  { name: 'tab2', label: '标签 2', content: '标签 2 的内容' }
])

const handleAdd = () => {
  const newTab = {
    name: `tab${tabCount++}`,
    label: `标签 ${tabCount}`,
    content: `标签 ${tabCount} 的内容`
  }
  editableTabs.value.push(newTab)
  editableTab.value = newTab.name
  msg.success('新增标签成功')
}

const handleRemove = (name) => {
  const index = editableTabs.value.findIndex(tab => tab.name === name)
  if (index > -1) {
    editableTabs.value.splice(index, 1)
    msg.info('标签已删除')
  }
}
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用某个标签。

:::demo

```vue
<template>
  <XTabs v-model="disabledTab">
    <XTabPane name="tab1" label="可用标签 1" icon="mdi:check-circle">
      <div class="p-4">可用标签 1 的内容</div>
    </XTabPane>
    <XTabPane name="tab2" label="禁用标签" icon="mdi:cancel" disabled>
      <div class="p-4">禁用标签的内容</div>
    </XTabPane>
    <XTabPane name="tab3" label="可用标签 2" icon="mdi:check-circle">
      <div class="p-4">可用标签 2 的内容</div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const disabledTab = ref('tab1')
</script>
```

:::

## 额外操作

通过 `extra` 插槽添加额外的操作区域。

:::demo

```vue
<template>
  <XTabs v-model="extraTab">
    <template #extra>
      <XButton type="primary" size="small" icon="mdi:refresh">
        刷新
      </XButton>
    </template>
    
    <XTabPane name="tab1" label="数据监控" icon="mdi:monitor-dashboard">
      <div class="p-4">
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 bg-blue-50 rounded-lg">
            <div class="text-sm text-blue-600">CPU 使用率</div>
            <div class="text-2xl font-bold text-blue-700">45%</div>
          </div>
          <div class="p-4 bg-green-50 rounded-lg">
            <div class="text-sm text-green-600">内存使用</div>
            <div class="text-2xl font-bold text-green-700">2.1GB</div>
          </div>
          <div class="p-4 bg-purple-50 rounded-lg">
            <div class="text-sm text-purple-600">网络流量</div>
            <div class="text-2xl font-bold text-purple-700">150MB</div>
          </div>
        </div>
      </div>
    </XTabPane>
    <XTabPane name="tab2" label="系统日志" icon="mdi:text-box-multiple">
      <div class="p-4">
        <div class="space-y-2">
          <div class="p-3 bg-gray-50 rounded text-sm">
            [INFO] 系统启动成功
          </div>
          <div class="p-3 bg-green-50 rounded text-sm text-green-700">
            [SUCCESS] 用户登录成功
          </div>
          <div class="p-3 bg-yellow-50 rounded text-sm text-yellow-700">
            [WARNING] 磁盘空间不足
          </div>
        </div>
      </div>
    </XTabPane>
    <XTabPane name="tab3" label="警报信息" icon="mdi:bell-alert">
      <div class="p-4">
        <p class="text-gray-600">暂无警报信息</p>
      </div>
    </XTabPane>
  </XTabs>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane, XButton } from '@xlui/xux-ui'

const extraTab = ref('tab1')
</script>
```

:::

## 事件处理

监听标签页的各种事件。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XTabs 
      v-model="eventTab" 
      type="card"
      closable
      @change="handleChange"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <XTabPane name="home" label="首页" icon="mdi:home">
        <div class="p-4">首页内容</div>
      </XTabPane>
      <XTabPane name="profile" label="个人中心" icon="mdi:account">
        <div class="p-4">个人中心内容</div>
      </XTabPane>
      <XTabPane name="settings" label="设置" icon="mdi:cog">
        <div class="p-4">设置内容</div>
      </XTabPane>
    </XTabs>
    
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-2">事件日志：</h4>
      <div class="text-sm text-gray-600 space-y-1">
        <div v-for="(log, index) in eventLogs" :key="index">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XTabs, XTabPane } from '@xlui/xux-ui'

const eventTab = ref('home')
const eventLogs = ref([])

const handleChange = (name) => {
  eventLogs.value.unshift(`切换到标签: ${name}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleTabClick = (tab, index) => {
  eventLogs.value.unshift(`点击了标签: ${tab.label} (索引: ${index})`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}

const handleTabRemove = (name) => {
  eventLogs.value.unshift(`关闭了标签: ${name}`)
  if (eventLogs.value.length > 5) eventLogs.value.pop()
}
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## API

### Tabs Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前激活的标签页 | `string \| number` | - |
| type | 标签页类型 | `'line' \| 'card' \| 'border-card' \| 'button' \| 'segment' \| 'chrome' \| 'safari'` | `'line'` |
| position | 标签位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| closable | 标签是否可关闭 | `boolean` | `false` |
| addable | 是否显示新增按钮 | `boolean` | `false` |
| scrollable | 标签过多时是否可滚动 | `boolean` | `false` |
| animated | 是否启用动画 | `boolean` | `true` |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 激活标签改变时触发 | `(name: string \| number)` |
| change | 激活标签改变时触发 | `(name: string \| number)` |
| tab-click | 点击标签时触发 | `(tab: TabPane, index: number)` |
| tab-remove | 关闭标签时触发 | `(name: string \| number)` |
| tab-add | 点击新增按钮时触发 | `-` |

### Tabs Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签页内容（TabPane 组件） |
| extra | 额外操作区域 |

### TabPane Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 标签页的唯一标识 | `string \| number` | - |
| label | 标签页显示的文本 | `string` | - |
| icon | 标签页图标 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 是否可关闭（优先级高于 Tabs 的 closable） | `boolean` | `true` |
| lazy | 是否懒加载 | `boolean` | `false` |

### TabPane Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签页内容 |

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

