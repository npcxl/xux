# Button 按钮

按钮用于触发一个操作，是用户和系统交互的基础组件。

## 基础用法

基本的按钮用法，包含默认、主要、成功、警告和危险五种类型。

:::demo

```vue
<template>
  <div class="flex gap-3 ">
    <XButton  type="primary">主要按钮</XButton>
    <XButton type="success">成功按钮</XButton>
    <XButton type="warning">警告按钮</XButton>
    <XButton type="danger">危险按钮</XButton>
  </div>
</template>
```

:::

## 带图标的按钮

使用 [Iconify](https://icones.js.org/) 图标库，支持 10万+ 图标。

:::demo

```vue
<template>
  <div class="flex gap-3 flex-wrap">
    <XButton type="primary" icon="mdi:cart">加入购物车</XButton>
    <XButton type="success" icon="mdi:check">确认</XButton>
    <XButton type="warning" icon="mdi:alert">警告</XButton>
    <XButton type="danger" icon="mdi:delete">删除</XButton>
    <XButton icon="mdi:search">搜索</XButton>
  </div>
</template>
```

:::

## 右侧图标

图标也可以放在右侧。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="primary" icon-right="mdi:arrow-right">下一步</XButton>
    <XButton type="primary" icon-right="mdi:download">下载</XButton>
    <XButton icon-right="mdi:chevron-down">展开</XButton>
  </div>
</template>
```

:::

## 幽灵按钮

幽灵按钮通过 `ghost` 属性来设置，背景透明，只有边框和文字，常用于页面中的次要操作。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="primary" ghost>主要按钮</XButton>
    <XButton type="success" ghost>成功按钮</XButton>
    <XButton type="warning" ghost>警告按钮</XButton>
    <XButton type="danger" ghost>危险按钮</XButton>
  </div>
</template>
```

:::

## 圆角按钮

通过 `round` 属性来设置圆角按钮。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="primary" round icon="mdi:heart">收藏</XButton>
    <XButton type="success" round>成功按钮</XButton>
    <XButton type="warning" round>警告按钮</XButton>
    <XButton type="danger" round>危险按钮</XButton>
  </div>
</template>
```

:::

## 文字按钮

没有边框和背景色的按钮，通常用于弱化操作。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="text">文字按钮</XButton>
    <XButton type="text" icon="mdi:link">链接</XButton>
    <XButton type="text" disabled>禁用按钮</XButton>
  </div>
</template>
```

:::

## 禁用状态

按钮的禁用状态，通过 `disabled` 属性实现。

:::demo

```vue
<template>
  <div class="flex gap-3 flex-wrap">
    <XButton disabled>默认按钮</XButton>
    <XButton type="primary" disabled>主要按钮</XButton>
    <XButton type="success" disabled>成功按钮</XButton>
    <XButton type="warning" disabled>警告按钮</XButton>
    <XButton type="danger" disabled>危险按钮</XButton>
  </div>
</template>
```

:::

## 加载状态

点击按钮后进行数据加载操作，在按钮上显示加载状态。

:::demo

```vue
<template>
  <div class="flex gap-3">
    <XButton type="primary" loading>加载中</XButton>
    <XButton type="success" loading>加载中</XButton>
    <XButton type="warning" loading>加载中</XButton>
  </div>
</template>
```

:::

## 不同尺寸

Button 组件提供三种尺寸，可以在不同场景下使用。

:::demo

```vue
<template>
  <div class="flex gap-3 items-center">
    <XButton type="primary" size="small" icon="mdi:cart">小型按钮</XButton>
    <XButton type="primary" icon="mdi:cart">默认按钮</XButton>
    <XButton type="primary" size="large" icon="mdi:cart">大型按钮</XButton>
  </div>
</template>
```

:::

## 块级按钮

`block` 属性将使按钮适合其父宽度。

:::demo

```vue
<template>
  <div class="flex flex-col gap-3">
    <XButton type="primary" block icon="mdi:cart">立即购买</XButton>
    <XButton type="success" block icon="mdi:check">确认订单</XButton>
  </div>
</template>
```

:::

## 电商场景示例

常见的电商按钮使用场景。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3">
      <XButton type="primary" icon="mdi:cart">加入购物车</XButton>
      <XButton type="danger" ghost icon="mdi:heart">收藏</XButton>
    </div>
    <div class="flex gap-3">
      <XButton type="primary" block icon="mdi:shopping">立即购买</XButton>
    </div>
    <div class="flex gap-3">
      <XButton type="success" icon="mdi:check-circle">确认付款</XButton>
      <XButton icon="mdi:close">取消</XButton>
    </div>
  </div>
</template>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `default` \| `primary` \| `success` \| `warning` \| `danger` \| `text` | `default` |
| size | 按钮尺寸 | `small` \| `medium` \| `large` | `medium` |
| icon | 左侧图标（使用 iconify 图标名） | `string` | - |
| iconRight | 右侧图标（使用 iconify 图标名） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| round | 是否为圆形按钮 | `boolean` | `false` |
| ghost | 是否为幽灵按钮（透明背景） | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |

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