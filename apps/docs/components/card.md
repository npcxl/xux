# Card 产品卡片

产品卡片组件，支持瀑布流和网格两种布局方式，适用于电商产品展示。

## 基础用法

单个产品卡片展示，包含产品图片、名称、价格和收藏功能。

:::demo

```vue
<template>
  <XCard 
    :columns="1"
    :products="[{
      id: '1',
      name: '北欧风简约陶瓷花瓶',
      image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
      price: '¥299',
      label: '热卖',
      isWish: false
    }]"
  />
</template>
```

:::

## 网格布局

网格布局使用固定的正方形卡片，适合统一规整的产品展示。

:::demo

```vue
<template>
  <XCard layout="grid" :columns="3" />
</template>
```

:::

## 瀑布流布局

瀑布流布局保持图片自然高度，适合展示不同尺寸的产品图片，创造更自然的视觉效果。

:::demo

```vue
<template>
  <XCard layout="masonry" :columns="3" />
</template>
```

:::

## 列数控制

通过 `columns` 属性控制显示的列数（1-4列）。

:::demo

```vue
<template>
  <div>
    <div class="mb-4 flex gap-3">
      <XButton 
        :type="cols === 1 ? 'primary' : 'default'"
        size="small"
        @click="cols = 1"
      >
        1列
      </XButton>
      <XButton 
        :type="cols === 2 ? 'primary' : 'default'"
        size="small"
        @click="cols = 2"
      >
        2列
      </XButton>
      <XButton 
        :type="cols === 3 ? 'primary' : 'default'"
        size="small"
        @click="cols = 3"
      >
        3列
      </XButton>
    </div>
    <XCard :columns="cols" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const cols = ref(3)
</script>
```

:::

## 自定义数据

可以传入自定义的产品数据，数据格式需要符合 `Product` 接口定义。

:::demo

```vue
<template>
  <XCard :products="productList" :columns="3" />
</template>

<script setup>
import { ref } from 'vue'

const productList = ref([
  {
    id: '1',
    name: '精选商品 - 限时特惠',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    price: '¥199',
    label: '特价',
    isWish: false
  },
  {
    id: '2',
    name: '新品上市 - 时尚单品',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    price: '¥299',
    label: '新品',
    isWish: true
  },
  {
    id: '3',
    name: '热销爆款 - 口碑之选',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    price: '¥159',
    label: '热卖',
    isWish: false
  }
])
</script>
```

:::

## 事件处理

组件提供了产品点击和收藏事件。

:::demo

```vue
<template>
  <div>
    <div class="mb-4 p-3 bg-gray-100 rounded text-sm">
      <div>最后点击的产品：{{ lastClickedId || '无' }}</div>
      <div>最后收藏的产品：{{ lastLikedName || '无' }}</div>
    </div>
    <XCard 
      :columns="3"
      @product-click="handleProductClick"
      @like="handleLike"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lastClickedId = ref('')
const lastLikedName = ref('')

const handleProductClick = (id) => {
  lastClickedId.value = id
  console.log('点击产品:', id)
}

const handleLike = (product) => {
  lastLikedName.value = product.name
  console.log('收藏产品:', product)
}
</script>
```

:::

## 布局切换

动态切换网格和瀑布流布局。

:::demo

```vue
<template>
  <div>
    <div class="mb-4 flex gap-3">
      <XButton 
        :type="layout === 'grid' ? 'primary' : 'default'"
        size="small"
        @click="layout = 'grid'"
      >
        网格布局
      </XButton>
      <XButton 
        :type="layout === 'masonry' ? 'primary' : 'default'"
        size="small"
        @click="layout = 'masonry'"
      >
        瀑布流
      </XButton>
    </div>
    
    <XCard :layout="layout" :columns="3" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const layout = ref('grid')
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| layout | 布局模式 | `string` | `grid` / `masonry` | `grid` |
| columns | 列数 | `number` | 1-4 | `4` |
| products | 产品数据列表 | `Product[]` | - | `[]` |
| useMockData | 是否使用模拟数据 | `boolean` | - | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| product-click | 点击产品卡片时触发 | `(id: string)` |
| like | 点击收藏按钮时触发 | `(product: Product)` |

### Product 接口

```typescript
interface Product {
  id: string          // 产品 ID
  name: string        // 产品名称
  image: string       // 产品图片 URL
  price: string       // 产品价格（格式化后的字符串）
  label: string       // 产品标签（如：热卖、新品、特价）
  isWish: boolean     // 是否已收藏
}
```

## 设计说明

### 布局差异

- **网格布局**：所有产品卡片高度一致，使用 `aspect-square` 确保图片为正方形，布局整齐规范
- **瀑布流布局**：保持图片原始比例，高度自适应，视觉效果更自然，适合展示不同尺寸的商品图

### 列数控制

通过 `columns` 属性可以控制显示的列数（1-4列），响应式规则：

| columns | 移动端 | 平板 | 桌面端 |
|---------|--------|------|--------|
| 1 | 1 列 | 1 列 | 1 列 |
| 2 | 1 列 | 2 列 | 2 列 |
| 3 | 1 列 | 2 列 | 3 列 |
| 4 (默认) | 2 列 | 3 列 | 4 列 |

::: tip 建议
文档展示建议使用 3 列，既能展示多个产品，又不会显得过于拥挤。
:::


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
  <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
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

