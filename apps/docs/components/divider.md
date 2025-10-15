# Divider 分割线

区隔内容的分割线。

## 基础用法

默认为水平分割线。

:::demo

```vue
<template>
  <div>
    <p>这是第一段内容</p>
    <XDivider />
    <p>这是第二段内容</p>
    <XDivider />
    <p>这是第三段内容</p>
  </div>
</template>
```

:::

## 带文字的分割线

可以在分割线中间插入文字。

:::demo

```vue
<template>
  <div>
    <p>上面的内容</p>
    <XDivider>分割线文字</XDivider>
    <p>下面的内容</p>
  </div>
</template>
```

:::

## 文字位置

通过 `content-position` 设置文字位置。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <XDivider content-position="left">左侧文字</XDivider>
      <p>左侧对齐的分割线</p>
    </div>
    
    <div>
      <XDivider content-position="center">居中文字</XDivider>
      <p>居中对齐的分割线（默认）</p>
    </div>
    
    <div>
      <XDivider content-position="right">右侧文字</XDivider>
      <p>右侧对齐的分割线</p>
    </div>
  </div>
</template>
```

:::

## 虚线

通过 `dashed` 属性设置为虚线。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <p>实线分割（默认）</p>
      <XDivider />
    </div>
    
    <div>
      <p>虚线分割</p>
      <XDivider dashed />
    </div>
    
    <div>
      <XDivider dashed>虚线带文字</XDivider>
      <p>虚线也可以带文字</p>
    </div>
  </div>
</template>
```

:::

## 垂直分割线

使用 `direction="vertical"` 设置垂直分割线。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <span>选项1</span>
      <XDivider direction="vertical" />
      <span>选项2</span>
      <XDivider direction="vertical" />
      <span>选项3</span>
      <XDivider direction="vertical" />
      <span>选项4</span>
    </div>
    
    <div>
      <a href="#" class="text-blue-600">链接1</a>
      <XDivider direction="vertical" />
      <a href="#" class="text-blue-600">链接2</a>
      <XDivider direction="vertical" />
      <a href="#" class="text-blue-600">链接3</a>
    </div>
    
    <div class="flex items-center">
      <XButton type="primary" >按钮</XButton>
      <XDivider direction="vertical" />
      <XButton type='success' >按钮</XButton>
      <XDivider direction="vertical" />
      <XButton type="danger" >按钮</XButton>
    </div>
  </div>
</template>
```

:::

## 自定义间距

通过 `margin` 属性自定义分割线的外边距。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <p>默认间距（24px）</p>
      <XDivider />
      <p>内容</p>
    </div>
    
    <div>
      <p>小间距</p>
      <XDivider margin="12px" />
      <p>内容</p>
    </div>
    
    <div>
      <p>大间距</p>
      <XDivider margin="48px" />
      <p>内容</p>
    </div>
    
    <div class="flex items-center">
      <span>垂直分割线间距</span>
      <XDivider direction="vertical" margin="8px" />
      <span>内容</span>
      <XDivider direction="vertical" margin="24px" />
      <span>内容</span>
    </div>
  </div>
</template>
```

:::

## 实际应用

分割线在实际项目中的应用示例。

:::demo

```vue
<template>
  <div class="space-y-6">
    <!-- 文章分类 -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-lg font-bold mb-4">技术文章</h3>
      <XDivider margin="16px" />
      <div class="space-y-3">
        <div class="text-sm">
          <h4 class="font-medium">Vue 3 组件设计</h4>
          <p class="text-gray-600 mt-1">深入理解 Vue 3 Composition API</p>
        </div>
        <XDivider dashed margin="12px" />
        <div class="text-sm">
          <h4 class="font-medium">TypeScript 最佳实践</h4>
          <p class="text-gray-600 mt-1">在项目中使用 TypeScript 的技巧</p>
        </div>
        <XDivider dashed margin="12px" />
        <div class="text-sm">
          <h4 class="font-medium">性能优化指南</h4>
          <p class="text-gray-600 mt-1">前端性能优化的常用方法</p>
        </div>
      </div>
    </div>
    
    <!-- 用户信息 -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="font-bold">张三</h4>
          <p class="text-sm text-gray-600">前端工程师</p>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <span>文章: 128</span>
          <XDivider direction="vertical" />
          <span>关注: 256</span>
          <XDivider direction="vertical" />
          <span>粉丝: 512</span>
        </div>
      </div>
      <XDivider margin="16px">个人简介</XDivider>
      <p class="text-gray-700 text-sm">
        热爱编程，专注于前端技术领域。擅长 Vue、React 等现代前端框架。
      </p>
    </div>
    
    <!-- 产品列表 -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h3 class="text-lg font-bold">产品列表</h3>
      <XDivider content-position="left">热门产品</XDivider>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="p-3 border rounded text-center">产品 A</div>
        <div class="p-3 border rounded text-center">产品 B</div>
        <div class="p-3 border rounded text-center">产品 C</div>
      </div>
      <XDivider content-position="left" dashed>其他产品</XDivider>
      <div class="grid grid-cols-3 gap-4">
        <div class="p-3 border rounded text-center">产品 D</div>
        <div class="p-3 border rounded text-center">产品 E</div>
        <div class="p-3 border rounded text-center">产品 F</div>
      </div>
    </div>
  </div>
</template>
```

:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| direction | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | 是否虚线 | `boolean` | `false` |
| content-position | 内容位置（仅水平分割线） | `'left' \| 'center' \| 'right'` | `'center'` |
| margin | 外边距 | `string` | `''` |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 分割线中间的内容（仅水平分割线支持） |

