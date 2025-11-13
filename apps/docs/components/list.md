# List 列表

通用列表组件，支持多种展示样式和丰富的交互功能，适用于展示结构化数据。

<div style="columns: 2; column-gap: 32px; margin-top: 32px; align-items: start;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

最简单的列表展示。

:::demo

```vue
<template>
  <XList
    :items="basicItems"
    bordered
  />
</template>

<script setup>
const basicItems = [
  { id: 1, title: '列表项 1', description: '这是列表项的描述信息' },
  { id: 2, title: '列表项 2', description: '这是列表项的描述信息' },
  { id: 3, title: '列表项 3', description: '这是列表项的描述信息' },
  { id: 4, title: '列表项 4', description: '这是列表项的描述信息' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带图标的列表

使用图标增强视觉效果。

:::demo

```vue
<template>
  <XList
    :items="iconItems"
    bordered
  />
</template>

<script setup>
const iconItems = [
  { id: 1, icon: 'mdi:email', title: '邮件通知', description: '您有3条未读邮件' },
  { id: 2, icon: 'mdi:shopping', title: '订单更新', description: '您的订单已发货' },
  { id: 3, icon: 'mdi:heart', title: '收藏提醒', description: '您关注的商品降价了' },
  { id: 4, icon: 'mdi:bell', title: '系统消息', description: '系统将于今晚维护' }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带头像的列表

展示用户列表或联系人。

:::demo

```vue
<template>
  <XList
    :items="userItems"
    bordered
  />
</template>

<script setup>
const userItems = [
  { 
    id: 1, 
    avatar: 'https://picsum.photos/seed/user1/100',
    title: '张三', 
    subtitle: '前端工程师',
    description: '专注于 Vue.js 和现代前端技术',
    meta: '在线'
  },
  { 
    id: 2, 
    avatar: 'https://picsum.photos/seed/user2/100',
    title: '李四', 
    subtitle: '后端工程师',
    description: '精通 Node.js 和数据库设计',
    meta: '2小时前'
  },
  { 
    id: 3, 
    avatar: 'https://picsum.photos/seed/user3/100',
    title: '王五', 
    subtitle: 'UI/UX 设计师',
    description: '注重用户体验和界面美观',
    meta: '离线'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带图片的列表

展示商品或内容列表。

:::demo

```vue
<template>
  <XList
    :items="productItems"
    bordered
  />
</template>

<script setup>
const productItems = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/product1/100',
    title: '无线蓝牙耳机',
    subtitle: '高音质 | 降噪 | 长续航',
    description: '采用最新蓝牙5.3技术，支持主动降噪',
    price: '¥299',
    tag: '热销',
    tagType: 'danger'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/product2/100',
    title: '智能手表',
    subtitle: '运动追踪 | 心率监测',
    description: '多种运动模式，全天候健康监测',
    price: '¥1,299',
    tag: '新品',
    tagType: 'primary'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/product3/100',
    title: '机械键盘',
    subtitle: 'RGB背光 | 青轴',
    description: '游戏办公两用，手感出色',
    price: '¥599',
    tag: '折扣',
    tagType: 'warning'
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可点击列表

设置 `clickable` 属性使列表项可点击。

:::demo

```vue
<template>
  <div>
    <XList
      :items="clickableItems"
      bordered
      clickable
      @item-click="handleClick"
    />
    <div v-if="clickedItem" style="margin-top: 12px; padding: 12px; background: #f3f4f6; border-radius: 8px;">
      点击了: {{ clickedItem.title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const clickedItem = ref(null)

const clickableItems = [
  { id: 1, icon: 'mdi:home', title: '首页', description: '返回首页' },
  { id: 2, icon: 'mdi:cog', title: '设置', description: '系统设置' },
  { id: 3, icon: 'mdi:account', title: '个人中心', description: '查看个人信息' },
  { id: 4, icon: 'mdi:logout', title: '退出登录', description: '安全退出系统', disabled: true }
]

const handleClick = (item) => {
  clickedItem.value = item
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可选择列表

启用 `selectable` 属性实现多选功能。

:::demo

```vue
<template>
  <div>
    <XList
      :items="selectableItems"
      bordered
      selectable
      :selected-keys="selectedKeys"
      @selection-change="handleSelectionChange"
    />
    <div v-if="selectedKeys.length > 0" style="margin-top: 12px; padding: 12px; background: #eff6ff; border-radius: 8px; color: #1e40af;">
      已选择 {{ selectedKeys.length }} 项
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedKeys = ref([])

const selectableItems = [
  { id: 1, title: '选项 1', description: '这是一个可选择的列表项' },
  { id: 2, title: '选项 2', description: '这是一个可选择的列表项' },
  { id: 3, title: '选项 3', description: '这是一个可选择的列表项' },
  { id: 4, title: '选项 4', description: '这是一个可选择的列表项' }
]

const handleSelectionChange = (items, keys) => {
  selectedKeys.value = keys
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带操作按钮

每个列表项可以包含操作按钮。

:::demo

```vue
<template>
  <XList
    :items="actionItems"
    bordered
  />
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'
const msg = xlMsg()

const actionItems = [
  {
    id: 1,
    icon: 'mdi:file-document',
    title: '项目文档.pdf',
    subtitle: '2.5 MB',
    description: '最后修改: 2024-01-15',
    actions: [
      { 
        icon: 'mdi:download', 
        label: '下载',
        type: 'primary',
        onClick: () => msg.success('开始下载')
      },
      { 
        icon: 'mdi:delete', 
        type: 'danger',
        onClick: () => msg.warning('确认删除？')
      }
    ]
  },
  {
    id: 2,
    icon: 'mdi:image',
    title: '产品图片.jpg',
    subtitle: '1.2 MB',
    description: '最后修改: 2024-01-14',
    actions: [
      { icon: 'mdi:eye', label: '预览' },
      { icon: 'mdi:download', label: '下载', type: 'primary' }
    ]
  },
  {
    id: 3,
    icon: 'mdi:video',
    title: '演示视频.mp4',
    subtitle: '15.8 MB',
    description: '最后修改: 2024-01-13',
    actions: [
      { icon: 'mdi:play', label: '播放', type: 'primary' },
      { icon: 'mdi:download', label: '下载' }
    ]
  }
]
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 不同尺寸

提供三种尺寸。

:::demo

```vue
<template>
  <div style=" gap: 16px; width: 100%;">
    <div>
      <div style="margin-bottom: 8px; font-weight: 500;">小尺寸</div>
      <XList size="small" :items="sizeItems" bordered />
    </div>
    <div>
      <div style="margin-bottom: 8px; font-weight: 500;">默认尺寸</div>
      <XList :items="sizeItems" bordered />
    </div>
    <div>
      <div style="margin-bottom: 8px; font-weight: 500;">大尺寸</div>
      <XList size="large" :items="sizeItems" bordered />
    </div>
  </div>
</template>

<script setup>
const sizeItems = [
  { id: 1, icon: 'mdi:star', title: '列表项', description: '描述信息' },
  { id: 2, icon: 'mdi:heart', title: '列表项', description: '描述信息' }
]
</script>
```

:::

</div>

</div>

## 卡片样式列表

使用 `variant="card"` 展示卡片样式列表。

:::demo

```vue
<template>
  <XList
    variant="card"
    :items="cardItems"
  />
</template>

<script setup>
const cardItems = [
  {
    id: 1,
    icon: 'mdi:package-variant',
    title: '订单 #12345',
    subtitle: '已发货',
    description: '预计 2024-01-20 送达',
    extra: '¥299.00',
    tag: '进行中',
    tagType: 'primary'
  },
  {
    id: 2,
    icon: 'mdi:check-circle',
    title: '订单 #12344',
    subtitle: '已完成',
    description: '2024-01-10 已签收',
    extra: '¥599.00',
    tag: '已完成',
    tagType: 'success'
  },
  {
    id: 3,
    icon: 'mdi:clock',
    title: '订单 #12343',
    subtitle: '待付款',
    description: '请在 24 小时内完成支付',
    extra: '¥1,299.00',
    tag: '待付款',
    tagType: 'warning'
  }
]
</script>
```

:::

## 带标题和额外内容

列表可以有标题和额外的头部/底部内容。

:::demo

```vue
<template>
  <XList
    title="通知列表"
    extra="查看全部"
    :items="notificationItems"
    bordered
  >
    <template #footer>
      <div style="text-align: center; padding: 8px;">
        <a href="#" style="color: #1a1a1a; text-decoration: none;">加载更多</a>
      </div>
    </template>
  </XList>
</template>

<script setup>
const notificationItems = [
  {
    id: 1,
    icon: 'mdi:bell',
    title: '系统更新',
    description: '系统将在今晚进行升级维护',
    meta: '刚刚'
  },
  {
    id: 2,
    icon: 'mdi:email',
    title: '新消息',
    description: '您有一条新的私信',
    meta: '5分钟前'
  },
  {
    id: 3,
    icon: 'mdi:gift',
    title: '优惠活动',
    description: '新人专享优惠券已到账',
    meta: '1小时前'
  }
]
</script>
```

:::

## 电商场景：商品列表

展示商品信息，包含图片、价格和操作。

:::demo

```vue
<template>
  <XList
    title="购物车"
    :items="cartItems"
    bordered
    :max-height="400"
  >
    <template #actions="{ item }">
      <XButton 
        size="small" 
        icon="mdi:heart" 
        ghost
        @click="() => handleCollect(item)"
      >
        收藏
      </XButton>
      <XButton 
        size="small" 
        type="danger" 
        icon="mdi:delete"
        ghost
        @click="() => handleDelete(item)"
      >
        删除
      </XButton>
    </template>
  </XList>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'
const msg = xlMsg()

const cartItems = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/phone/100',
    title: 'iPhone 15 Pro Max',
    subtitle: '天蓝钛金属 | 256GB',
    description: '全新A17 Pro芯片，支持5G',
    price: '¥9,999',
    tag: '现货',
    tagType: 'success'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/laptop/100',
    title: 'MacBook Pro 14"',
    subtitle: 'M3 Pro芯片 | 18GB + 512GB',
    description: '适合专业创作者',
    price: '¥16,999',
    tag: '预售',
    tagType: 'primary'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/airpods/100',
    title: 'AirPods Pro 2',
    subtitle: '主动降噪 | 无线充电',
    description: '自适应音频，空间音频',
    price: '¥1,899',
    tag: '限时优惠',
    tagType: 'warning'
  }
]

const handleCollect = (item) => {
  msg.success(`已收藏: ${item.title}`)
}

const handleDelete = (item) => {
  msg.warning(`确认删除: ${item.title}?`)
}
</script>
```

:::

## 加载和空状态

列表的加载和空数据状态。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div class="w-full">
      <div style="margin-bottom: 8px; font-weight: 500;">加载中</div>
      <XList
        :items="[]"
        loading
        loading-text="正在加载数据..."
        bordered
      />
    </div>
    
    <div class="w-full">
      <div style="margin-bottom: 8px; font-weight: 500;">空状态</div>
      <XList
        :items="[]"
        empty-text="暂无数据"
        bordered
      />
    </div>
  </XFlex>
</template>
```

:::

## 自定义渲染

使用插槽自定义列表项渲染。

:::demo

```vue
<template>
  <XList :items="customItems" bordered>
    <template #default="{ item }">
      <div style="display: flex; align-items: center; gap: 16px; width: 100%;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">
          {{ item.initial }}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">
            {{ item.name }}
          </div>
          <div style="font-size: 14px; color: #6b7280;">
            {{ item.role }} · {{ item.department }}
          </div>
          <div style="font-size: 12px; color: #9ca3af; margin-top: 4px;">
            {{ item.email }}
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: #10b981; margin-bottom: 4px;">
            ● {{ item.status }}
          </div>
          <div style="font-size: 11px; color: #9ca3af;">
            {{ item.lastSeen }}
          </div>
        </div>
      </div>
    </template>
  </XList>
</template>

<script setup>
const customItems = [
  {
    id: 1,
    initial: 'Z',
    name: '张三',
    role: '高级工程师',
    department: '技术部',
    email: 'zhangsan@example.com',
    status: '在线',
    lastSeen: '刚刚活跃'
  },
  {
    id: 2,
    initial: 'L',
    name: '李四',
    role: '产品经理',
    department: '产品部',
    email: 'lisi@example.com',
    status: '忙碌',
    lastSeen: '5分钟前'
  },
  {
    id: 3,
    initial: 'W',
    name: '王五',
    role: 'UI设计师',
    department: '设计部',
    email: 'wangwu@example.com',
    status: '离线',
    lastSeen: '2小时前'
  }
]
</script>
```

:::

## 滚动动画列表

启用 `animated` 属性，列表项滚动进入视口时会以流畅的动画效果出现。首屏元素即刻显示，滚动时提前预加载，体验更快速。

:::demo

```vue
<template>
  <div>
    <XList
      title="商品列表"
      extra="共 30 件商品"
      :items="longList"
      animated
      :animation-delay="30"
      :max-height="500"
      bordered
      hoverable
    />
  </div>
</template>

<script setup>
const longList = Array.from({ length: 30 }, (_, i) => {
  const categories = ['数码产品', '家居用品', '运动户外', '美妆护肤', '图书音像', '食品饮料']
  const brands = ['品牌A', '品牌B', '品牌C', '品牌D', '品牌E']
  
  return {
    id: i + 1,
    image: `https://picsum.photos/seed/product${i + 1}/100`,
    title: `${categories[i % 6]} - 商品 ${i + 1}`,
    subtitle: `${brands[i % 5]} | ${i % 2 === 0 ? '包邮' : '自营'} | 库存充足`,
    description: `精选优质商品，满足您的品质生活需求。商品编号：SP${String(i + 1).padStart(4, '0')}`,
    price: `¥${(Math.random() * 1000 + 100).toFixed(2)}`,
    tag: i % 4 === 0 ? '热销' : i % 4 === 1 ? '新品' : i % 4 === 2 ? '推荐' : '特惠',
    tagType: i % 4 === 0 ? 'danger' : i % 4 === 1 ? 'primary' : i % 4 === 2 ? 'success' : 'warning',
    meta: i % 3 === 0 ? '刚刚' : i % 3 === 1 ? '5分钟前' : '1小时前'
  }
})
</script>
```

:::

## 简单动画示例

快速上手，查看基础的滚动动画效果。

:::demo

```vue
<template>
  <XList
    :items="simpleItems"
    animated
    :animation-delay="40"
    bordered
  />
</template>

<script setup>
const simpleItems = [
  { 
    id: 1, 
    icon: 'mdi:rocket-launch', 
    title: '快速启动', 
    description: '一键启动您的项目' 
  },
  { 
    id: 2, 
    icon: 'mdi:shield-check', 
    title: '安全可靠', 
    description: '企业级安全防护' 
  },
  { 
    id: 3, 
    icon: 'mdi:lightning-bolt', 
    title: '性能卓越', 
    description: '极速响应体验' 
  },
  { 
    id: 4, 
    icon: 'mdi:puzzle', 
    title: '易于集成', 
    description: '简单快捷集成' 
  },
  { 
    id: 5, 
    icon: 'mdi:chart-line', 
    title: '数据分析', 
    description: '实时数据洞察' 
  },
  { 
    id: 6, 
    icon: 'mdi:account-group', 
    title: '团队协作', 
    description: '高效团队协作' 
  }
]
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 列表数据 | `ListItem[]` | `[]` |
| title | 列表标题 | `string` | - |
| extra | 列表额外内容 | `string` | - |
| size | 尺寸 | `small` \| `medium` \| `large` | `medium` |
| variant | 变体 | `default` \| `card` | `default` |
| bordered | 是否显示边框 | `boolean` | `false` |
| split | 是否显示分割线 | `boolean` | `true` |
| hoverable | 是否可悬停 | `boolean` | `true` |
| clickable | 是否可点击 | `boolean` | `false` |
| selectable | 是否可选择 | `boolean` | `false` |
| max-height | 最大高度（超出滚动） | `number` | - |
| loading | 是否加载中 | `boolean` | `false` |
| loading-text | 加载文本 | `string` | `加载中...` |
| empty-text | 空状态文本 | `string` | `暂无数据` |
| selected-keys | 已选中的项 | `(string \| number)[]` | `[]` |
| item-key | 项的唯一标识字段 | `string` | `id` |
| animated | 是否启用动画 | `boolean` | `false` |
| animation-delay | 动画延迟间隔（ms） | `number` | `50` |

### ListItem 类型

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| title | 标题 | `string` |
| subtitle | 副标题 | `string` |
| description | 描述 | `string` |
| icon | 图标（iconify 图标名） | `string` |
| image | 图片URL | `string` |
| avatar | 头像URL | `string` |
| extra | 额外内容 | `string` |
| price | 价格 | `string` |
| tag | 标签文本 | `string` |
| tagType | 标签类型 | `default` \| `primary` \| `success` \| `warning` \| `danger` |
| meta | 元信息（右上角） | `string` |
| actions | 操作按钮列表 | `ListAction[]` |
| disabled | 是否禁用 | `boolean` |

### ListAction 类型

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| label | 按钮文本 | `string` |
| icon | 图标 | `string` |
| type | 按钮类型 | `default` \| `primary` \| `danger` |
| onClick | 点击回调 | `(item: ListItem) => void` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| item-click | 点击列表项时触发 | `(item: ListItem, index: number)` |
| selection-change | 选择项改变时触发 | `(selectedItems: ListItem[], selectedKeys: (string \| number)[])` |
| action-click | 点击操作按钮时触发 | `(action: ListAction, item: ListItem, index: number)` |
| update:selected-keys | 更新选中项 | `(keys: (string \| number)[])` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义列表项内容 | `{ item, index }` |
| header | 自定义头部 | - |
| footer | 自定义底部 | - |
| empty | 自定义空状态 | - |
| prefix | 自定义前缀内容 | `{ item, index }` |
| suffix | 自定义后缀内容 | `{ item, index }` |
| actions | 自定义操作按钮 | `{ item, index }` |
| extra | 自定义头部额外内容 | - |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| clearSelection | 清除所有选择 | - |
| selectAll | 全选 | - |

### 主题变量

List 组件使用以下CSS变量，可通过全局主题定制：

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `--x-list-selected-bg` | `#eff6ff` | 选中项背景色 |
| `--x-fill-color-success-light` | `rgba(16, 185, 129, 0.1)` | 成功标签背景 |
| `--x-fill-color-warning-light` | `rgba(245, 158, 11, 0.1)` | 警告标签背景 |
| `--x-fill-color-danger-light` | `rgba(239, 68, 68, 0.1)` | 危险标签背景 |

以及所有通用主题变量（颜色、边框、阴影等），详见 [主题化配置](/components/theme-config)。

