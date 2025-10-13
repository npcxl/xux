# Badge 徽标

徽标组件用于在右上角显示数字或小红点，常用于消息提醒、通知等场景。

## 基础用法

最简单的用法，在元素右上角显示徽标。徽标具有优雅的心跳扩散动画效果。

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <XBadge :value="5">
      <div class="demo-item">消息</div>
    </XBadge>

    <XBadge :value="12">
      <div class="demo-item">通知</div>
    </XBadge>

    <XBadge :value="0">
      <div class="demo-item">无消息</div>
    </XBadge>
  </div>
</template>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```


:::

## 小红点模式

设置 `dot` 属性为 `true`，显示小红点而不是数字。小红点具有优雅的心跳扩散动画，增强视觉提醒效果。

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <XBadge dot>
      <div class="demo-item">消息</div>
    </XBadge>

    <XBadge dot>
      <div class="demo-item">通知</div>
    </XBadge>

    <XBadge dot color="#52c41a">
      <div class="demo-item">在线</div>
    </XBadge>

    <XBadge dot color="#faad14">
      <div class="demo-item">警告</div>
    </XBadge>
  </div>
</template>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

## 最大值限制

设置 `max` 属性，当数字超过最大值时显示 `${max}+`。

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <XBadge :value="99" :max="99">
      <div class="demo-item">99</div>
    </XBadge>

    <XBadge :value="100" :max="99">
      <div class="demo-item">100</div>
    </XBadge>

    <XBadge :value="1000" :max="99">
      <div class="demo-item">1000</div>
    </XBadge>
  </div>
</template>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

## 自定义颜色

通过 `color` 属性自定义徽标颜色。

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <XBadge :value="5" color="#52c41a">
      <div class="demo-item">成功</div>
    </XBadge>

    <XBadge :value="12" color="#1890ff">
      <div class="demo-item">信息</div>
    </XBadge>

    <XBadge :value="8" color="#faad14">
      <div class="demo-item">警告</div>
    </XBadge>

    <XBadge dot color="#722ed1">
      <div class="demo-item">自定义</div>
    </XBadge>
  </div>
</template>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

## 隐藏徽标

设置 `hidden` 属性为 `true` 隐藏徽标。

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <XBadge :value="5" :hidden="hidden">
      <div class="demo-item">消息</div>
    </XBadge>

    <XButton @click="hidden = !hidden">
      {{ hidden ? "显示" : "隐藏" }}徽标
    </XButton>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hidden = ref(false);
</script>

<style>
.demo-item {
  width: 60px;
  height: 40px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
```

:::

## 实际应用场景

:::demo

```vue
<template>
  <div class="flex gap-4 items-center">
    <!-- 消息图标 -->
    <XBadge :value="3">
      <div class="icon">📧</div>
    </XBadge>

    <!-- 购物车 -->
    <XBadge :value="cartCount" :max="99">
      <div class="icon">🛒</div>
    </XBadge>

    <!-- 通知小红点 -->
    <XBadge dot>
      <div class="icon">🔔</div>
    </XBadge>

    <!-- 头像徽标 -->
    <XBadge :value="onlineCount" color="#52c41a">
      <div class="avatar">👤</div>
    </XBadge>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cartCount = ref(15);
const onlineCount = ref(23);
</script>

<style>
.icon,
.avatar {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.avatar {
  background: #e6f7ff;
}
</style>
```

:::

## API

### Props

| 参数   | 说明                             | 类型               | 默认值    |
| ------ | -------------------------------- | ------------------ | --------- |
| value  | 徽标显示的数字                   | `number \| string` | `0`       |
| max    | 最大值，超过最大值显示 `${max}+` | `number`           | `99`      |
| dot    | 是否显示小红点                   | `boolean`          | `false`   |
| color  | 徽标颜色                         | `string`           | `#ff4d4f` |
| hidden | 是否隐藏徽标                     | `boolean`          | `false`   |

### 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 徽标内容 |

## 注意事项

1. 徽标会自动定位到右上角，确保父元素有 `position: relative`
2. 当 `value` 为 0 且 `dot` 为 `false` 时，徽标不会显示
3. 徽标支持响应式设计，在小屏幕设备上会自动调整大小
4. 徽标有淡入动画效果，提升用户体验
5. 所有徽标都具有优雅的心跳扩散动画，类似通知铃铛的ping效果，增强视觉提醒
