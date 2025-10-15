# Result 结果

用于反馈一系列操作任务的处理结果。

## 基础用法

基本的结果展示。

:::demo

```vue
<template>
  <XResult
    status="success"
    title="提交成功"
    sub-title="您的订单已成功提交"
  />
</template>
```

:::

## 不同状态

支持成功、失败、警告、信息四种状态。

:::demo

```vue
<template>
  <div class="space-y-8">
    <XResult
      status="success"
      title="操作成功"
      sub-title="恭喜，您的操作已成功完成"
    />
    
    <XDivider />
    
    <XResult
      status="error"
      title="操作失败"
      sub-title="抱歉，操作失败，请稍后重试"
    />
    
    <XDivider />
    
    <XResult
      status="warning"
      title="警告提示"
      sub-title="检测到异常情况，请注意检查"
    />
    
    <XDivider />
    
    <XResult
      status="info"
      title="信息提示"
      sub-title="这是一条普通的信息提示"
    />
  </div>
</template>
```

:::

## 错误页面

常见的错误页面展示。

:::demo

```vue
<template>
  <div class="space-y-8">
    <XResult
      status="404"
      title="页面不存在"
      sub-title="抱歉，您访问的页面不存在"
    >
      <template #extra>
        <XButton type="primary">返回首页</XButton>
      </template>
    </XResult>
    
    <XDivider />
    
    <XResult
      status="403"
      title="无访问权限"
      sub-title="抱歉，您没有权限访问此页面"
    >
      <template #extra>
        <XButton type="primary">返回首页</XButton>
        <XButton>联系管理员</XButton>
      </template>
    </XResult>
    
    <XDivider />
    
    <XResult
      status="500"
      title="服务器错误"
      sub-title="抱歉，服务器出现了一些问题"
    >
      <template #extra>
        <XButton type="primary">刷新页面</XButton>
        <XButton>返回首页</XButton>
      </template>
    </XResult>
  </div>
</template>
```

:::

## 自定义内容

使用插槽自定义内容。

:::demo

```vue
<template>
  <div class="space-y-8">
    <!-- 自定义标题和描述 -->
    <XResult status="success">
      <template #title>
        <div class="text-2xl font-bold">订单提交成功！</div>
      </template>
      <template #subTitle>
        <div>
          <p>订单号：<span class="font-mono">202410150001</span></p>
          <p class="mt-2">预计 3-5 个工作日送达</p>
        </div>
      </template>
      <template #extra>
        <XButton type="primary">查看订单</XButton>
        <XButton>继续购物</XButton>
      </template>
    </XResult>
    
    <XDivider />
    
    <!-- 自定义图标 -->
    <XResult>
      <template #icon>
        <div class="text-6xl">🎉</div>
      </template>
      <template #title>
        恭喜您完成任务！
      </template>
      <template #subTitle>
        您已获得 100 积分奖励
      </template>
      <template #extra>
        <XButton type="primary">查看积分</XButton>
      </template>
    </XResult>
  </div>
</template>
```

:::

## 带操作按钮

结果页面配合操作按钮。

:::demo

```vue
<template>
  <XResult
    status="success"
    title="支付成功"
    sub-title="订单已支付，商品将尽快发货"
  >
    <template #extra>
      <XButton type="primary" @click="handleViewOrder">查看订单</XButton>
      <XButton @click="handleBackHome">返回首页</XButton>
      <XButton @click="handleDownloadInvoice">下载发票</XButton>
    </template>
  </XResult>
</template>

<script setup>
const handleViewOrder = () => {
  console.log('查看订单')
}

const handleBackHome = () => {
  console.log('返回首页')
}

const handleDownloadInvoice = () => {
  console.log('下载发票')
}
</script>
```

:::

## 实际应用场景

在实际项目中的使用示例。

:::demo

```vue
<template>
  <div class="space-y-8">
    <!-- 表单提交成功 -->
    <div class="bg-white p-6 rounded-lg border">
      <XResult
        status="success"
        title="注册成功"
        sub-title="欢迎加入我们，您的账号已创建成功"
      >
        <template #extra>
          <XButton type="primary" @click="handleLogin">立即登录</XButton>
          <XButton @click="handleEditProfile">完善资料</XButton>
        </template>
      </XResult>
    </div>
    
    <!-- 上传失败 -->
    <div class="bg-white p-6 rounded-lg border">
      <XResult
        status="error"
        title="上传失败"
        sub-title="文件大小超过限制（最大 10MB）"
      >
        <template #extra>
          <XButton type="primary" @click="handleRetry">重新上传</XButton>
          <XButton @click="handleCancel">取消</XButton>
        </template>
      </XResult>
    </div>
    
    <!-- 等待审核 -->
    <div class="bg-white p-6 rounded-lg border">
      <XResult
        status="info"
        title="等待审核"
        sub-title="您的申请已提交，我们将在 1-3 个工作日内完成审核"
      >
        <template #extra>
          <XButton type="primary">查看进度</XButton>
          <XButton>返回</XButton>
        </template>
      </XResult>
    </div>
    
    <!-- 警告提示 -->
    <div class="bg-white p-6 rounded-lg border">
      <XResult
        status="warning"
        title="账号异常"
        sub-title="检测到您的账号存在异常登录，建议修改密码"
      >
        <template #extra>
          <XButton type="warning" @click="handleChangePassword">立即修改</XButton>
          <XButton @click="handleViewLog">查看登录日志</XButton>
        </template>
      </XResult>
    </div>
  </div>
</template>

<script setup>
const handleLogin = () => console.log('前往登录')
const handleEditProfile = () => console.log('完善资料')
const handleRetry = () => console.log('重新上传')
const handleCancel = () => console.log('取消')
const handleChangePassword = () => console.log('修改密码')
const handleViewLog = () => console.log('查看日志')
</script>
```

:::

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| status | 结果状态 | `'success' \| 'error' \| 'warning' \| 'info' \| '404' \| '403' \| '500'` | `'info'` |
| title | 标题 | `string` | - |
| sub-title | 副标题 | `string` | - |

## 插槽

| 插槽名 | 说明 |
|--------|------|
| icon | 自定义图标 |
| title | 自定义标题 |
| subTitle | 自定义副标题 |
| extra | 自定义操作区域 |

