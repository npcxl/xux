# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 基础用法

最简单的用法。

:::demo

```vue
<template>
<div class="flex gap-3 h-[40px] ">
  <XPopconfirm
    title="确定要删除吗？"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #trigger>
      <XButton type="danger">删除</XButton>
    </template>
  </XPopconfirm>
  </div>
</template>

<script setup>
import { useAlert } from '@xlui/xux-ui'
const alert = useAlert()

const handleConfirm = () => {
  alert.warning('确认删除', {
    duration: 3000,
    closable: false
  })
}

const handleCancel = () => {
  alert.info('取消删除', {
    duration: 3000,
    closable: false
  })
}
</script>
```

:::

## 不同状态

使用 `icon` 属性设置不同的图标状态。

:::demo

```vue
<template>
  <div class="flex gap-3 h-[40px] ">
    <XPopconfirm
      title="确定要执行此操作吗？"
      icon="warning"
    >
      <template #trigger>
        <XButton type="warning">警告</XButton>
      </template>
    </XPopconfirm>
    
    <XPopconfirm
      title="确定要继续吗？"
      icon="info"
    >
      <template #trigger>
        <XButton type="primary">信息</XButton>
      </template>
    </XPopconfirm>
    
    <XPopconfirm
      title="确定要删除吗？"
      icon="error"
    >
      <template #trigger>
        <XButton type="danger">错误</XButton>
      </template>
    </XPopconfirm>
  </div>
</template>
```

:::

## 带描述信息

使用 `description` 属性添加详细描述。

:::demo

```vue
<template>
  <XPopconfirm
    title="确定要删除这条记录吗？"
    description="删除后数据将无法恢复，请谨慎操作"
    @confirm="handleDelete"
  >
    <template #trigger>
      <XButton type="danger">删除记录</XButton>
    </template>
  </XPopconfirm>
</template>

<script setup>
const handleDelete = () => {
  console.log('记录已删除')
}
</script>
```

:::

## 自定义按钮文字

通过 `ok-text` 和 `cancel-text` 自定义按钮文字。

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <XPopconfirm
      title="确定要提交吗？"
      ok-text="提交"
      cancel-text="再想想"
    >
      <template #trigger>
        <XButton type="primary">提交表单</XButton>
      </template>
    </XPopconfirm>
    
    <XPopconfirm
      title="确定要退出登录吗？"
      ok-text="退出"
      cancel-text="留下"
    >
      <template #trigger>
        <XButton>退出登录</XButton>
      </template>
    </XPopconfirm>
  </div>
</template>
```

:::

## 不同位置

通过 `placement` 属性设置弹出位置。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 20px 0;">
    <div>
      <XPopconfirm
        title="顶部提示"
        placement="top"
      >
        <template #trigger>
          <XButton>顶部</XButton>
        </template>
      </XPopconfirm>
    </div>
    
    <div style="display: flex; gap: 80px;">
      <XPopconfirm
        title="左侧提示"
        placement="left"
      >
        <template #trigger>
          <XButton>左侧</XButton>
        </template>
      </XPopconfirm>
      
      <XPopconfirm
        title="右侧提示"
        placement="right"
      >
        <template #trigger>
          <XButton>右侧</XButton>
        </template>
      </XPopconfirm>
    </div>
    
    <div>
      <XPopconfirm
        title="底部提示"
        placement="bottom"
      >
        <template #trigger>
          <XButton>底部</XButton>
        </template>
      </XPopconfirm>
    </div>
  </div>
</template>
```

:::

## 隐藏图标

使用 `hide-icon` 属性隐藏图标。

:::demo

```vue
<template>
  <XPopconfirm
    title="确定要继续吗？"
    hide-icon
  >
    <template #trigger>
      <XButton>无图标</XButton>
    </template>
  </XPopconfirm>
</template>
```

:::

## 实际应用

在实际场景中的应用示例。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- 列表操作 -->
    <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <h4 style="font-weight: 500; margin: 0 0 4px 0;">重要文件.pdf</h4>
          <p style="font-size: 13px; color: #6b7280; margin: 0;">2.5 MB · 2024-10-15</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <XButton size="small">下载</XButton>
          <XPopconfirm
            title="确定要删除这个文件吗？"
            description="删除后将无法恢复"
            ok-text="删除"
            cancel-text="取消"
            @confirm="handleDeleteFile"
          >
            <template #trigger>
              <XButton size="small" type="danger">删除</XButton>
            </template>
          </XPopconfirm>
        </div>
      </div>
    </div>
    
    <!-- 表格操作 -->
    <div style="background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
      <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
        <thead style="background: #f9fafb;">
          <tr>
            <th style="padding: 8px 16px; text-align: left; font-weight: 500;">姓名</th>
            <th style="padding: 8px 16px; text-align: left; font-weight: 500;">邮箱</th>
            <th style="padding: 8px 16px; text-align: left; font-weight: 500;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-top: 1px solid #e5e7eb;">
            <td style="padding: 8px 16px;">张三</td>
            <td style="padding: 8px 16px;">zhangsan@example.com</td>
            <td style="padding: 8px 16px;">
              <div style="display: flex; gap: 8px;">
                <XButton size="small">编辑</XButton>
                <XPopconfirm
                  title="确定要删除用户 张三 吗？"
                  icon="error"
                  @confirm="handleDeleteUser('张三')"
                >
                  <template #trigger>
                    <XButton size="small" type="danger">删除</XButton>
                  </template>
                </XPopconfirm>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const handleDeleteFile = () => {
  console.log('文件已删除')
}

const handleDeleteUser = (name) => {
  console.log(`用户 ${name} 已删除`)
}
</script>
```

:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| title | 确认框标题 | `string` | - |
| description | 确认框描述 | `string` | - |
| ok-text | 确认按钮文字 | `string` | `'确定'` |
| cancel-text | 取消按钮文字 | `string` | `'取消'` |
| icon | 图标类型 | `'warning' \| 'info' \| 'error'` | `'warning'` |
| hide-icon | 是否隐藏图标 | `boolean` | `false` |
| placement | 弹出位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |

## 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| trigger | 触发元素 |

