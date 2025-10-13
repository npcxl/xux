# Skeleton 骨架屏

骨架屏组件，用于在内容加载时显示占位符，提升用户体验。

## 基础用法

显示基本的骨架屏占位符。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XSkeleton width="200px" height="20px" />
    <XSkeleton width="300px" height="20px" />
    <XSkeleton width="250px" height="20px" />
  </div>
</template>
```

:::

## 不同形状

支持矩形、圆角和圆形三种形状。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <div class="text-sm mb-2">矩形（默认）</div>
      <XSkeleton width="300px" height="40px" shape="rectangle" />
    </div>
    <div>
      <div class="text-sm mb-2">圆角</div>
      <XSkeleton width="300px" height="40px" shape="rounded" />
    </div>
    <div>
      <div class="text-sm mb-2">圆形</div>
      <XSkeleton width="60px" height="60px" shape="circle" />
    </div>
  </div>
</template>
```

:::

## 加载状态控制

通过 `loading` 属性控制显示骨架屏还是实际内容。

:::demo

```vue
<template>
  <div>
    <button 
      @click="loading = !loading"
      class="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
    >
      {{ loading ? '加载完成' : '重新加载' }}
    </button>
    <div class="space-y-3">
      <XSkeleton :loading="loading" width="100%" height="24px">
        <h3 class="text-lg font-bold">这是标题内容</h3>
      </XSkeleton>
      <XSkeleton :loading="loading" width="100%" height="60px">
        <p class="text-gray-600">
          这是实际的内容文本。当 loading 为 false 时，会显示这段文字而不是骨架屏。
          骨架屏组件可以很好地提升用户体验，让用户知道内容正在加载中。
        </p>
      </XSkeleton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

:::

## 取消动画

设置 `:animated="false"` 可以禁用脉冲动画效果。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <div class="text-sm mb-2">有动画（默认）</div>
      <XSkeleton width="300px" height="40px" :animated="true" />
    </div>
    <div>
      <div class="text-sm mb-2">无动画</div>
      <XSkeleton width="300px" height="40px" :animated="false" />
    </div>
  </div>
</template>
```

:::

## 组合使用

组合多个骨架屏创建复杂的加载布局。

:::demo

```vue
<template>
  <div>
    <button 
      @click="loading = !loading"
      class="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
    >
      {{ loading ? '加载完成' : '重新加载' }}
    </button>
    
    <div class="border rounded-lg p-4">
      <!-- 用户卡片 -->
      <div class="flex items-center space-x-4 mb-4">
        <XSkeleton :loading="loading" width="60px" height="60px" shape="circle">
          <img src="https://i.pravatar.cc/60" class="w-15 h-15 rounded-full" />
        </XSkeleton>
        <div class="flex-1 space-y-2">
          <XSkeleton :loading="loading" width="120px" height="20px">
            <div class="font-bold">张三</div>
          </XSkeleton>
          <XSkeleton :loading="loading" width="200px" height="16px">
            <div class="text-sm text-gray-600">前端开发工程师</div>
          </XSkeleton>
        </div>
      </div>
      
      <!-- 内容区 -->
      <div class="space-y-2">
        <XSkeleton :loading="loading" width="100%" height="16px">
          <p class="text-gray-700">个人简介：热爱编程，专注于前端技术...</p>
        </XSkeleton>
        <XSkeleton :loading="loading" width="80%" height="16px">
          <p class="text-gray-700">擅长 Vue.js、React、TypeScript 等技术栈。</p>
        </XSkeleton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

:::

## 列表骨架屏

创建列表项的骨架屏效果。

:::demo

```vue
<template>
  <div>
    <button 
      @click="loading = !loading"
      class="mb-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
    >
      {{ loading ? '加载完成' : '重新加载' }}
    </button>
    
    <div class="space-y-3">
      <div v-for="i in 3" :key="i" class="flex items-center space-x-3 p-3 border rounded">
        <XSkeleton :loading="loading" width="40px" height="40px" shape="circle">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {{ i }}
          </div>
        </XSkeleton>
        <div class="flex-1 space-y-2">
          <XSkeleton :loading="loading" width="60%" height="16px">
            <div class="font-medium">列表项 {{ i }}</div>
          </XSkeleton>
          <XSkeleton :loading="loading" width="40%" height="14px">
            <div class="text-sm text-gray-500">描述信息 {{ i }}</div>
          </XSkeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(true)
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 宽度 | `string \| number` | `'100%'` |
| height | 高度 | `string \| number` | `'1rem'` |
| shape | 形状 | `'rectangle' \| 'circle' \| 'rounded'` | `'rectangle'` |
| animated | 是否显示动画 | `boolean` | `true` |
| loading | 是否加载中 | `boolean` | `true` |
| class | 自定义类名 | `string` | `''` |
| style | 自定义样式 | `Record<string, any>` | `{}` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 加载完成后显示的内容 |


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