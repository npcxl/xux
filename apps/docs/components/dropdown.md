# Dropdown 下拉容器

一个灵活的下拉容器组件，可以包裹任意内容作为触发器，支持 hover 或 click 触发，可自定义宽度、高度和位置。

## 基础用法

最简单的下拉菜单，使用 hover 触发。

:::demo

```vue
<template>
<div >
  <XDropdown>
    <XButton>悬停显示菜单</XButton>
    <template #dropdown>
      <div style="padding: 12px; min-width: 160px;">
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             @click="handleAction('操作1')"
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          操作 1
        </div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             @click="handleAction('操作2')"
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          操作 2
        </div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             @click="handleAction('操作3')"
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          操作 3
        </div>
      </div>
    </template>
  </XDropdown>
  </div>
</template>

<script setup>
const handleAction = (action) => {
  alert(`点击了 ${action}`)
}
</script>
```

:::

## 点击触发

使用 `trigger="click"` 来切换为点击触发，点击外部自动关闭。

:::demo

```vue
<template>
<div >
  <XDropdown trigger="click">
    <XButton type="primary">点击显示菜单</XButton>
    <template #dropdown>
      <div style="padding: 12px; min-width: 180px;">
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          📧 发送邮件
        </div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          💾 保存草稿
        </div>
        <div style="height: 1px; background: #e5e7eb; margin: 8px 0;"></div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px; color: #ef4444;" 
             @mouseenter="e => e.target.style.background = '#fef2f2'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          🗑️ 删除
        </div>
      </div>
    </template>
  </XDropdown>
  </div>
</template>
```

:::

## 不同位置

通过 `placement` 属性设置下拉菜单出现的位置，支持 12 个方向。

:::demo

```vue
<template>
  <div style="min-height: 400px; padding: 100px 20px;">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px 80px; max-width: 800px; margin: 0 auto;">
      <!-- 顶部 -->
      <div></div>
      <div style="text-align: center;">
        <XDropdown placement="top-start">
          <XButton size="small">上左</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">top-start</div>
          </template>
        </XDropdown>
        <XDropdown placement="top-center" style="margin: 0 8px;">
          <XButton size="small">上中</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">top-center</div>
          </template>
        </XDropdown>
        <XDropdown placement="top-end">
          <XButton size="small">上右</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">top-end</div>
          </template>
        </XDropdown>
      </div>
      <div></div>
      
      <!-- 左侧和右侧 -->
      <div style="text-align: right;">
        <XDropdown placement="left">
          <XButton size="small">左边</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">left</div>
          </template>
        </XDropdown>
      </div>
      <div></div>
      <div>
        <XDropdown placement="right">
          <XButton size="small">右边</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">right</div>
          </template>
        </XDropdown>
      </div>
      
      <!-- 底部 -->
      <div></div>
      <div style="text-align: center;">
        <XDropdown placement="bottom-start">
          <XButton size="small">下左</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">bottom-start</div>
          </template>
        </XDropdown>
        <XDropdown placement="bottom-center" style="margin: 0 8px;">
          <XButton size="small">下中</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">bottom-center</div>
          </template>
        </XDropdown>
        <XDropdown placement="bottom-end">
          <XButton size="small">下右</XButton>
          <template #dropdown>
            <div style="padding: 16px; min-width: 120px; text-align: center;">bottom-end</div>
          </template>
        </XDropdown>
      </div>
      <div></div>
    </div>
  </div>
</template>
```

:::

## 自定义宽度和高度

可以自由设置下拉容器的宽度、高度、最大高度等。

:::demo

```vue
<template>
<div > 
  <div style="display: flex; gap: 16px; flex-wrap: wrap;" >
    <XDropdown :width="300">
      <XButton>固定宽度 300px</XButton>
      <template #dropdown>
        <div style="padding: 16px;">
          <h3 style="margin: 0 0 12px 0;">自定义内容</h3>
          <p style="margin: 0; line-height: 1.6; color: #6b7280;">
            这是一个宽度为 300px 的下拉容器，你可以在这里放置任何自定义内容，
            比如表单、列表、图片等。
          </p>
        </div>
      </template>
    </XDropdown>

    <XDropdown :width="400" :max-height="200">
      <XButton type="primary">宽 400px + 最大高度 200px</XButton>
      <template #dropdown>
        <div style="padding: 16px;">
          <h3 style="margin: 0 0 12px 0;">长内容示例</h3>
          <div v-for="i in 20" :key="i" style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
            列表项 {{ i }}
          </div>
        </div>
      </template>
    </XDropdown>

    <XDropdown :min-width="200" :max-width="500">
      <XButton>最小 200px / 最大 500px</XButton>
      <template #dropdown>
        <div style="padding: 16px;">
          这个容器的宽度会根据内容自适应，但最小 200px，最大 500px。
        </div>
      </template>
    </XDropdown>
  </div>
  </div>
</template>
```

:::

## 点击内容关闭

设置 `close-on-click` 属性，点击下拉内容后自动关闭。

:::demo

```vue
<template>
<div >
  <XDropdown trigger="click" close-on-click>
    <XButton>点击项后自动关闭</XButton>
    <template #dropdown>
      <div style="padding: 8px; min-width: 160px;">
        <div v-for="item in options" :key="item.value"
             style="padding: 8px 12px; cursor: pointer; border-radius: 4px;"
             @click="handleSelect(item)"
             @mouseenter="e => e.target.style.background = '#f3f4f6'"
             @mouseleave="e => e.target.style.background = 'transparent'">
          {{ item.label }}
        </div>
      </div>
    </template>
  </XDropdown>
  
  <div v-if="selected" style="margin-top: 12px; color: #6b7280;">
    已选择: {{ selected }}
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const options = [
  { label: '选项 1', value: '1' },
  { label: '选项 2', value: '2' },
  { label: '选项 3', value: '3' },
  { label: '选项 4', value: '4' }
]

const selected = ref('')

const handleSelect = (item) => {
  selected.value = item.label
}
</script>
```

:::

## 禁用状态

通过 `disabled` 属性禁用下拉菜单。

:::demo

```vue
<template>

  <div style="display: flex; gap: 16px;">
    <XDropdown disabled>
      <XButton disabled>禁用状态（hover）</XButton>
      <template #dropdown>
        <div style="padding: 16px; min-width: 160px;">
          这个内容不会显示
        </div>
      </template>
    </XDropdown>

    <XDropdown trigger="click" disabled>
      <XButton disabled>禁用状态（click）</XButton>
      <template #dropdown>
        <div style="padding: 16px; min-width: 160px;">
          这个内容也不会显示
        </div>
      </template>
    </XDropdown>
  </div>
</template>
```

:::

## 自定义内容示例

下拉容器可以放置任何内容，这里展示一些实用的例子。

:::demo

```vue
<template>
  <div style="min-height: 250px; padding: 20px 0;">
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <!-- 用户信息卡片 -->
      <XDropdown :width="280" trigger="click">
        <div style="display: flex; align-items: center; gap: 8px; cursor: pointer; 
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
            X
          </div>
          <span>用户信息</span>
        </div>
        <template #dropdown>
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px;">
                X
              </div>
              <div>
                <div style="font-weight: 600;">XUX UI</div>
                <div style="font-size: 12px; color: #6b7280;">admin@example.com</div>
              </div>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
              <div style="padding: 8px; cursor: pointer; border-radius: 4px;"
                   @mouseenter="e => e.target.style.background = '#f3f4f6'"
                   @mouseleave="e => e.target.style.background = 'transparent'">
                👤 个人资料
              </div>
              <div style="padding: 8px; cursor: pointer; border-radius: 4px;"
                   @mouseenter="e => e.target.style.background = '#f3f4f6'"
                   @mouseleave="e => e.target.style.background = 'transparent'">
                ⚙️ 设置
              </div>
              <div style="padding: 8px; cursor: pointer; border-radius: 4px; color: #ef4444;"
                   @mouseenter="e => e.target.style.background = '#fef2f2'"
                   @mouseleave="e => e.target.style.background = 'transparent'">
                🚪 退出登录
              </div>
            </div>
          </div>
        </template>
      </XDropdown>

      <!-- 颜色选择器 -->
      <XDropdown :width="200" trigger="click">
        <div style="display: flex; align-items: center; gap: 8px; cursor: pointer; 
                    padding: 8px 12px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <div :style="{ width: '20px', height: '20px', borderRadius: '4px', background: currentColor }"></div>
          <span>选择颜色</span>
        </div>
        <template #dropdown>
          <div style="padding: 16px;">
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;">
              <div v-for="color in colors" :key="color"
                   :style="{ 
                     width: '32px', 
                     height: '32px', 
                     background: color, 
                     borderRadius: '6px',
                     cursor: 'pointer',
                     border: currentColor === color ? '2px solid #000' : '1px solid #e5e7eb'
                   }"
                   @click="currentColor = color">
              </div>
            </div>
          </div>
        </template>
      </XDropdown>

      <!-- 通知列表 -->
      <XDropdown :width="320" :max-height="300" trigger="click">
        <div style="position: relative; cursor: pointer;">
          <XButton>🔔 通知</XButton>
          <div style="position: absolute; top: -4px; right: -4px; width: 18px; height: 18px; 
                      background: #ef4444; border-radius: 50%; color: white; font-size: 11px;
                      display: flex; align-items: center; justify-content: center;">
            3
          </div>
        </div>
        <template #dropdown>
          <div>
            <div style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">
              通知中心
            </div>
            <div v-for="i in 5" :key="i" 
                 style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;"
                 @mouseenter="e => e.target.style.background = '#f9fafb'"
                 @mouseleave="e => e.target.style.background = 'transparent'">
              <div style="font-size: 14px; margin-bottom: 4px;">通知标题 {{ i }}</div>
              <div style="font-size: 12px; color: #6b7280;">这是通知的详细内容...</div>
              <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">2 分钟前</div>
            </div>
          </div>
        </template>
      </XDropdown>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentColor = ref('#3b82f6')
const colors = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#64748b', '#6b7280', '#000000'
]
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `'hover'` / `'click'` | `'hover'` |
| placement | 下拉菜单位置 | `'bottom-start'` / `'bottom-end'` / `'bottom-center'` / `'top-start'` / `'top-end'` / `'top-center'` / `'left'` / `'right'` | `'bottom-start'` |
| width | 自定义宽度 | `string` / `number` | - |
| min-width | 最小宽度 | `string` / `number` | - |
| max-width | 最大宽度 | `string` / `number` | - |
| height | 自定义高度 | `string` / `number` | - |
| max-height | 最大高度 | `string` / `number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| show-shadow | 是否显示阴影 | `boolean` | `true` |
| close-on-click | 点击内容后是否关闭 | `boolean` | `false` |
| offset | 下拉菜单偏移距离（px） | `number` | `8` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发器内容 |
| dropdown | 下拉菜单内容 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 下拉菜单打开时触发 | - |
| close | 下拉菜单关闭时触发 | - |
| toggle | 下拉菜单状态切换时触发 | `(visible: boolean)` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开下拉菜单 | - |
| close | 关闭下拉菜单 | - |
| toggle | 切换下拉菜单显示状态 | - |

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| isVisible | 下拉菜单是否可见 | `Ref<boolean>` |
| open | 打开下拉菜单方法 | `() => void` |
| close | 关闭下拉菜单方法 | `() => void` |
| toggle | 切换下拉菜单方法 | `() => void` |

