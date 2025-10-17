# Grid 网格布局

简洁的网格布局组件，支持自定义行列、响应式布局，适用于数据展示、商品列表、图片画廊等场景。

跟传统的 row 和 col 组件相比，XGrid 组件使用内部插槽渲染，更方便使用。

## 基础用法

::::demo
```vue
<template>
  <XGrid :cols="3" :items="basicItems">
    <template #item="{ item, index }">
      <div class="demo-item">{{ item }}</div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const basicItems = ref([
  '项目 1', '项目 2', '项目 3',
  '项目 4', '项目 5', '项目 6',
  '项目 7', '项目 8', '项目 9'
])
</script>

<style scoped>
.demo-item {
  padding: 20px;
  background: #1a1a1a;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}
</style>
```
::::

## 4列布局

::::demo
```vue
<template>
  <XGrid :cols="4" gap="12px" :items="fourColItems">
    <template #item="{ item }">
      <div class="color-box" :style="{ backgroundColor: item.color }">
        {{ item.name }}
      </div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const fourColItems = ref([
  { name: '红色', color: '#ef4444' },
  { name: '橙色', color: '#f97316' },
  { name: '黄色', color: '#eab308' },
  { name: '绿色', color: '#22c55e' },
  { name: '青色', color: '#06b6d4' },
  { name: '蓝色', color: '#3b82f6' },
  { name: '紫色', color: '#a855f7' },
  { name: '粉色', color: '#ec4899' }
])
</script>

<style scoped>
.color-box {
  padding: 30px;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```
::::

## 固定行列

::::demo
```vue
<template>
  <XGrid :cols="3" :rows="2" row-height="120px" gap="16px" :items="fixedItems">
    <template #item="{ index }">
      <div class="fixed-item">
        <div class="number">{{ index + 1 }}</div>
      </div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const fixedItems = ref(Array.from({ length: 6 }, (_, i) => i + 1))
</script>

<style scoped>
.fixed-item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border-radius: 8px;
  color: white;
}
.number {
  font-size: 32px;
  font-weight: bold;
}
</style>
```
::::

## 商品列表

::::demo
```vue
<template>
  <XGrid :cols="4" gap="16px" :items="productItems">
    <template #item="{ item }">
      <div class="product-card">
        <img :src="item.image" class="product-img" />
        <div class="product-info">
          <div class="product-name">{{ item.name }}</div>
          <div class="product-price">¥{{ item.price }}</div>
        </div>
      </div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const productItems = ref([
  { name: '商品 1', price: 199, image: 'https://picsum.photos/seed/p1/300/300' },
  { name: '商品 2', price: 299, image: 'https://picsum.photos/seed/p2/300/300' },
  { name: '商品 3', price: 399, image: 'https://picsum.photos/seed/p3/300/300' },
  { name: '商品 4', price: 499, image: 'https://picsum.photos/seed/p4/300/300' },
  { name: '商品 5', price: 599, image: 'https://picsum.photos/seed/p5/300/300' },
  { name: '商品 6', price: 699, image: 'https://picsum.photos/seed/p6/300/300' },
  { name: '商品 7', price: 799, image: 'https://picsum.photos/seed/p7/300/300' },
  { name: '商品 8', price: 899, image: 'https://picsum.photos/seed/p8/300/300' }
])
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.product-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.product-info {
  padding: 12px;
}
.product-name {
  font-weight: 500;
  margin-bottom: 8px;
}
.product-price {
  color: #ef4444;
  font-weight: 600;
  font-size: 18px;
}
</style>
```
::::

## 响应式布局

使用 `min-col-width` 实现响应式网格，列数自动根据容器宽度调整。

::::demo
```vue
<template>
  <XGrid min-col-width="200px" gap="16px" :items="responsiveItems">
    <template #item="{ item }">
      <div class="responsive-card">
        <div class="icon">{{ item.icon }}</div>
        <div class="title">{{ item.title }}</div>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const responsiveItems = ref([
  { icon: '🚀', title: '快速部署', desc: '一键部署到生产环境' },
  { icon: '💡', title: '智能优化', desc: '自动优化性能和体验' },
  { icon: '🔒', title: '安全可靠', desc: '企业级安全保障' },
  { icon: '📊', title: '数据分析', desc: '实时监控业务数据' },
  { icon: '🎨', title: '自定义主题', desc: '灵活的主题配置' },
  { icon: '⚡', title: '极速响应', desc: '毫秒级响应速度' }
])
</script>

<style scoped>
.responsive-card {
  padding: 24px;
  background: white;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.responsive-card:hover {
  transform: translateY(-4px);
}
.icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}
.desc {
  color: #666;
  font-size: 14px;
}
</style>
```
::::

## 图片画廊

::::demo
```vue
<template>
  <XGrid :cols="3" gap="8px" :items="galleryItems">
    <template #item="{ item }">
      <div class="gallery-item">
        <img :src="item" />
      </div>
    </template>
  </XGrid>
</template>

<script setup>
import { ref } from 'vue'

const galleryItems = ref([
  'https://picsum.photos/seed/g1/400/300',
  'https://picsum.photos/seed/g2/400/300',
  'https://picsum.photos/seed/g3/400/300',
  'https://picsum.photos/seed/g4/400/300',
  'https://picsum.photos/seed/g5/400/300',
  'https://picsum.photos/seed/g6/400/300',
  'https://picsum.photos/seed/g7/400/300',
  'https://picsum.photos/seed/g8/400/300',
  'https://picsum.photos/seed/g9/400/300'
])
</script>

<style scoped>
.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 4/3;
  cursor: pointer;
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.gallery-item:hover img {
  transform: scale(1.1);
}
</style>
```
::::

## 自定义对齐方式

::::demo
```vue
<template>
  <div style="margin-bottom: 20px;">
    <XGrid :cols="3" gap="16px" row-height="100px" justify-items="center" align-items="center" :items="alignItems">
      <template #item="{ item }">
        <div class="align-box">{{ item }}</div>
      </template>
    </XGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const alignItems = ref(['居中对齐', '居中对齐', '居中对齐'])
</script>

<style scoped>
.align-box {
  padding: 16px 24px;
  background: #1a1a1a;
  color: white;
  border-radius: 8px;
  font-weight: 500;
}
</style>
```
::::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数 | `number` | `3` |
| rows | 行数（可选，自动计算） | `number` | - |
| gap | 间距 | `string` | `16px` |
| colWidth | 列宽（如 '1fr', '200px' 等） | `string` | `1fr` |
| rowHeight | 行高（如 '1fr', '100px', 'auto' 等） | `string` | `auto` |
| items | 数据源 | `any[]` | `[]` |
| minColWidth | 最小列宽（响应式） | `string` | - |
| justifyItems | 水平对齐方式 | `'start' \| 'end' \| 'center' \| 'stretch'` | `stretch` |
| alignItems | 垂直对齐方式 | `'start' \| 'end' \| 'center' \| 'stretch'` | `stretch` |
| width | 容器宽度 | `string` | `100%` |
| height | 容器高度 | `string` | `auto` |

## 插槽

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| item | 网格项内容插槽 | `{ item, index }` |

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