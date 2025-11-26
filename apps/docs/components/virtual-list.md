# VirtualList 虚拟滚动列表

高性能虚拟滚动列表组件，支持大数据量流畅渲染。只渲染可见区域的项目，大幅提升性能。内置加载动画和滚动进入动画，体验更流畅。

## 基础用法

最简单的虚拟滚动列表，支持固定高度项目。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="dataSource"
    height="400px"
    :itemHeight="60"
  >
    <template #default="{ item, index }">
      <div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
        <div style="font-weight: 600; margin-bottom: 4px;">{{ item.title }}</div>
        <div style="font-size: 14px; color: #666;">{{ item.description }}</div>
      </div>
    </template>
  </XVirtualList>
</template>

<script setup>
import { ref } from 'vue'

const dataSource = ref(
  Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
    description: `这是第 ${i + 1} 项的描述信息，虚拟滚动只渲染可见区域，性能更优。`
  }))
)
</script>
```

:::

## 大数据量测试

渲染 10 万条数据，依然流畅。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
      <span>数据量：{{ dataSource.length.toLocaleString() }} 条</span>
      <XButton size="small" @click="generateData(1000)">1千条</XButton>
      <XButton size="small" @click="generateData(10000)">1万条</XButton>
      <XButton size="small" @click="generateData(100000)" type="primary">10万条</XButton>
    </div>
    
    <XVirtualList
      :dataSource="dataSource"
      height="500px"
      :itemHeight="80"
      animated
    >
      <template #default="{ item, index }">
        <div style="padding: 20px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 16px;">
          <div style="width: 50px; height: 50px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
            {{ String(index + 1).padStart(2, '0') }}
          </div>
          <div style="flex: 1;">
            <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">{{ item.title }}</div>
            <div style="font-size: 14px; color: #666;">{{ item.description }}</div>
            <div style="font-size: 12px; color: #999; margin-top: 4px;">ID: {{ item.id }}</div>
          </div>
        </div>
      </template>
    </XVirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dataSource = ref([])

const generateData = (count) => {
  console.time('生成数据')
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      title: `项目 ${i + 1}`,
      description: `这是第 ${i + 1} 个项目的详细描述信息，虚拟滚动技术让大数据量渲染变得轻松。`
    })
  }
  dataSource.value = data
  console.timeEnd('生成数据')
}

// 默认加载1万条
generateData(10000)
</script>
```

:::

## 动态高度

支持不同高度的列表项，需要提供 `getItemHeight` 函数。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="dynamicData"
    height="500px"
    dynamicHeight
    :getItemHeight="getItemHeight"
    animated
  >
    <template #default="{ item, index }">
      <div style="padding: 20px; border-bottom: 1px solid #f0f0f0; background: #fafafa; margin: 4px 0; border-radius: 8px;">
        <div style="font-weight: 600; font-size: 18px; margin-bottom: 8px;">{{ item.title }}</div>
        <div style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 12px;">{{ item.description }}</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <span 
            v-for="tag in item.tags" 
            :key="tag"
            style="padding: 4px 12px; background: #e0e7ff; color: #4338ca; border-radius: 12px; font-size: 12px;"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </template>
  </XVirtualList>
</template>

<script setup>
import { ref } from 'vue'

const dynamicData = ref(
  Array.from({ length: 200 }, (_, i) => {
    const descriptions = [
      '这是一段简短的描述。',
      '这是一段中等长度的描述，包含更多的信息内容，让用户能够更好地理解项目的详情。',
      '这是一段较长的描述内容，详细介绍了项目的各个方面，包括功能特点、使用场景、技术实现等详细信息，帮助用户全面了解项目的价值和意义。这段描述可能会占用更多的空间，展示动态高度的效果。',
      '这是一段非常详细的描述，包含了大量的信息。从项目的背景介绍开始，到具体的技术实现细节，再到实际的应用场景和效果展示，全方位地呈现了项目的完整面貌。这样的描述能够帮助用户深入理解项目的价值和意义，做出更好的决策。'
    ]
    
    return {
      id: i + 1,
      title: `动态高度项目 ${i + 1}`,
      description: descriptions[i % 4],
      tags: ['标签1', '标签2', '标签3'].slice(0, (i % 3) + 1)
    }
  })
)

// 根据内容估算高度
const getItemHeight = (item) => {
  const baseHeight = 60 // 基础高度
  const descriptionLines = Math.ceil(item.description.length / 50) // 估算描述行数
  const tagHeight = item.tags.length > 0 ? 32 : 0 // 标签高度
  return baseHeight + (descriptionLines * 24) + tagHeight
}
</script>
```

:::

## 加载状态

显示加载动画，参考 List 组件的加载效果。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <XButton @click="toggleLoading">切换加载状态</XButton>
    </div>
    
    <XVirtualList
      :dataSource="loading ? [] : dataSource"
      height="400px"
      :itemHeight="60"
      :loading="loading"
      loadingText="正在加载数据..."
    >
      <template #default="{ item }">
        <div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-weight: 600;">{{ item.title }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">{{ item.description }}</div>
        </div>
      </template>
    </XVirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const dataSource = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
    description: `这是第 ${i + 1} 项的描述信息`
  }))
)

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
```

:::

## 滚动进入动画

启用 `animated` 属性，列表项滚动进入视口时会有流畅的动画效果。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="animatedData"
    height="500px"
    :itemHeight="80"
    animated
    :animationDelay="30"
  >
    <template #default="{ item, index }">
      <div style="padding: 20px; border-bottom: 1px solid #f0f0f0; display: flex; align-items: center; gap: 16px;">
        <div style="width: 60px; height: 60px; border-radius: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 24px;">
          {{ String(index + 1).padStart(2, '0') }}
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px; margin-bottom: 4px;">{{ item.title }}</div>
          <div style="font-size: 14px; color: #666;">{{ item.description }}</div>
        </div>
        <div style="font-size: 12px; color: #999;">{{ item.time }}</div>
      </div>
    </template>
  </XVirtualList>
</template>

<script setup>
import { ref } from 'vue'

const animatedData = ref(
  Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    title: `动画项目 ${i + 1}`,
    description: `滚动查看流畅的进入动画效果，每个项目都有独立的动画延迟。`,
    time: `${Math.floor(i / 10)} 分钟前`
  }))
)
</script>
```

:::

## 商品列表场景

适用于电商商品列表等实际业务场景。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="productData"
    height="600px"
    :itemHeight="120"
    animated
  >
    <template #default="{ item }">
      <div style="padding: 16px; border-bottom: 1px solid #f0f0f0; display: flex; gap: 16px;">
        <img 
          :src="item.image" 
          :alt="item.name"
          style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;"
        />
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">{{ item.name }}</div>
          <div style="font-size: 14px; color: #666; margin-bottom: 8px;">{{ item.description }}</div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span style="font-size: 20px; font-weight: 700; color: #ef4444;">¥{{ item.price }}</span>
              <span v-if="item.originalPrice" style="font-size: 14px; color: #999; text-decoration: line-through; margin-left: 8px;">
                ¥{{ item.originalPrice }}
              </span>
            </div>
            <XButton size="small" type="primary">加入购物车</XButton>
          </div>
        </div>
      </div>
    </template>
  </XVirtualList>
</template>

<script setup>
import { ref } from 'vue'

const productData = ref(
  Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `商品 ${i + 1}`,
    description: `精选优质商品，满足您的品质生活需求。商品编号：SP${String(i + 1).padStart(4, '0')}`,
    price: (Math.random() * 1000 + 100).toFixed(2),
    originalPrice: Math.random() > 0.5 ? (Math.random() * 1500 + 200).toFixed(2) : null,
    image: `https://picsum.photos/seed/product${i + 1}/200/200`
  }))
)
</script>
```

:::

## 聊天消息列表

适用于聊天应用的消息列表场景。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="messageData"
    height="500px"
    :itemHeight="80"
    animated
  >
    <template #default="{ item }">
      <div 
        :style="{
          padding: '12px 16px',
          marginBottom: '8px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          flexDirection: item.isMe ? 'row-reverse' : 'row'
        }"
      >
        <img 
          :src="item.avatar" 
          :alt="item.name"
          style="width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;"
        />
        <div :style="{ flex: 1, textAlign: item.isMe ? 'right' : 'left' }">
          <div style="font-size: 12px; color: #999; margin-bottom: 4px;">{{ item.name }}</div>
          <div 
            :style="{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: '12px',
              background: item.isMe ? '#007AFF' : '#f0f0f0',
              color: item.isMe ? '#fff' : '#333',
              maxWidth: '70%',
              wordBreak: 'break-word'
            }"
          >
            {{ item.message }}
          </div>
          <div style="font-size: 11px; color: #999; margin-top: 4px;">{{ item.time }}</div>
        </div>
      </div>
    </template>
  </XVirtualList>
</template>

<script setup>
import { ref } from 'vue'

const messageData = ref(
  Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? '我' : '对方',
    isMe: i % 2 === 0,
    message: `这是第 ${i + 1} 条消息内容，虚拟滚动让聊天列表更流畅。${i % 3 === 0 ? '这是一条比较长的消息，用来测试换行和布局效果。' : ''}`,
    time: `${Math.floor(i / 10)} 分钟前`,
    avatar: `https://picsum.photos/seed/user${i % 2 + 1}/100/100`
  }))
)
</script>
```

:::

## 滚动到底部加载更多

结合 `scroll-end` 事件实现无限滚动加载。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; padding: 12px; background: #f0f9ff; border-radius: 8px;">
      <div>已加载：{{ dataSource.length }} 条</div>
      <div style="font-size: 12px; color: #666; margin-top: 4px;">
        {{ loading ? '正在加载更多...' : '滚动到底部自动加载' }}
      </div>
    </div>
    
    <XVirtualList
      :dataSource="dataSource"
      height="500px"
      :itemHeight="60"
      :loading="loading"
      loadingText="加载更多中..."
      @scroll-end="loadMore"
    >
      <template #default="{ item }">
        <div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-weight: 600;">{{ item.title }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">{{ item.description }}</div>
        </div>
      </template>
    </XVirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dataSource = ref(
  Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
    description: `这是第 ${i + 1} 项的描述信息`
  }))
)

const loading = ref(false)

const loadMore = () => {
  if (loading.value) return
  
  loading.value = true
  
  // 模拟异步加载
  setTimeout(() => {
    const currentLength = dataSource.value.length
    const newData = Array.from({ length: 20 }, (_, i) => ({
      id: currentLength + i + 1,
      title: `列表项 ${currentLength + i + 1}`,
      description: `这是第 ${currentLength + i + 1} 项的描述信息`
    }))
    dataSource.value.push(...newData)
    loading.value = false
  }, 1000)
}
</script>
```

:::

## 自定义空状态

通过 `empty` 插槽自定义空状态显示。

:::demo

```vue
<template>
  <XVirtualList
    :dataSource="[]"
    height="400px"
    :itemHeight="60"
  >
    <template #empty>
      <div style="padding: 60px 20px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #333;">没有找到数据</div>
        <div style="font-size: 14px; color: #999; margin-bottom: 24px;">请尝试调整筛选条件或刷新页面</div>
        <XButton size="small" type="primary">刷新数据</XButton>
      </div>
    </template>
  </XVirtualList>
</template>
```

:::

## 实例方法

通过 ref 可以访问虚拟列表实例方法。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px;">
      <XButton size="small" @click="scrollToIndex(100)">滚动到第100项</XButton>
      <XButton size="small" @click="scrollToTop">滚动到顶部</XButton>
      <XButton size="small" @click="scrollToBottom">滚动到底部</XButton>
    </div>
    
    <XVirtualList
      ref="virtualListRef"
      :dataSource="dataSource"
      height="400px"
      :itemHeight="60"
    >
      <template #default="{ item, index }">
        <div style="padding: 16px 20px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-weight: 600;">{{ item.title }} (索引: {{ index }})</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">{{ item.description }}</div>
        </div>
      </template>
    </XVirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const virtualListRef = ref()

const dataSource = ref(
  Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
    description: `这是第 ${i + 1} 项的描述信息`
  }))
)

const scrollToIndex = (index) => {
  virtualListRef.value?.scrollTo(index)
}

const scrollToTop = () => {
  virtualListRef.value?.scrollToTop()
}

const scrollToBottom = () => {
  virtualListRef.value?.scrollToBottom()
}
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `any[]` | `[]` |
| height | 容器高度 | `string` | `'400px'` |
| itemHeight | 每项高度（固定高度模式） | `number` | `60` |
| dynamicHeight | 是否启用动态高度 | `boolean` | `false` |
| getItemHeight | 获取每项高度的函数（动态高度模式） | `(item: any, index: number) => number` | - |
| buffer | 缓冲区大小（上下各预渲染的项目数） | `number` | `5` |
| loading | 是否加载中 | `boolean` | `false` |
| loadingText | 加载提示文字 | `string` | `'加载中...'` |
| emptyText | 空状态提示文字 | `string` | `'暂无数据'` |
| itemKey | 项的唯一标识字段或函数 | `string \| (item: any, index: number) => string \| number` | `'id'` |
| animated | 是否启用滚动动画 | `boolean` | `true` |
| animationDelay | 动画延迟间隔（ms） | `number` | `30` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| scroll | 滚动时触发 | `(scrollTop: number, scrollLeft: number)` |
| scroll-end | 滚动到底部时触发 | - |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义列表项内容 | `{ item, index }` |
| empty | 自定义空状态 | - |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| scrollTo | 滚动到指定索引位置 | `index: number` |
| scrollToTop | 滚动到顶部 | - |
| scrollToBottom | 滚动到底部 | - |
| getScrollTop | 获取当前滚动位置 | - |

## 性能优化

虚拟滚动列表通过以下方式优化性能：

1. **只渲染可见区域**：只渲染视口内和缓冲区内的项目，大幅减少 DOM 节点
2. **使用占位符**：通过 padding 模拟滚动位置，保持正确的滚动条
3. **动态高度支持**：支持不同高度的列表项，通过 `getItemHeight` 函数计算
4. **缓冲区机制**：上下各预渲染一定数量的项目，减少滚动时的闪烁
5. **滚动动画优化**：使用 IntersectionObserver 实现高效的进入动画

## 使用建议

- **固定高度模式**：当所有项目高度相同时，使用固定 `itemHeight`，性能最佳
- **动态高度模式**：当项目高度不同时，使用 `dynamicHeight` 和 `getItemHeight`，需要准确计算高度
- **缓冲区大小**：根据项目高度和滚动速度调整 `buffer`，建议 3-10 之间
- **大数据量**：适合渲染 1000+ 条数据，10万条数据依然流畅

