# Link 链接

文字超链接组件，用于页面内跳转或外部链接。

## 基础用法

基础的文字链接用法。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-8">
    <XLink href="https://xux.xlcig.cn">默认链接</XLink>
    <XLink href="https://xux.xlcig.cn" type="primary">主要链接</XLink>
    <XLink href="https://xux.xlcig.cn" type="success">成功链接</XLink>
    <XLink href="https://xux.xlcig.cn" type="warning">警告链接</XLink>
    <XLink href="https://xux.xlcig.cn" type="danger">危险链接</XLink>
    <XLink href="https://xux.xlcig.cn" type="info">信息链接</XLink>
  </div>
</template>
```

:::

## 禁用状态

链接不可用状态。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <XLink disabled>默认链接</XLink>
    <XLink disabled type="primary">主要链接</XLink>
    <XLink disabled type="success">成功链接</XLink>
    <XLink disabled type="warning">警告链接</XLink>
    <XLink disabled type="danger">危险链接</XLink>
    <XLink disabled type="info">信息链接</XLink>
  </div>
</template>
```

:::

## 下划线

设置 `underline` 属性控制是否显示下划线。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm text-gray-600 mb-2">有下划线（默认）</p>
      <div class="flex flex-wrap gap-4">
        <XLink href="#">默认链接</XLink>
        <XLink href="#" type="primary">主要链接</XLink>
        <XLink href="#" type="success">成功链接</XLink>
      </div>
    </div>
    
    <div>
      <p class="text-sm text-gray-600 mb-2">无下划线</p>
      <div class="flex flex-wrap gap-4">
        <XLink href="#" :underline="false">默认链接</XLink>
        <XLink href="#" type="primary" :underline="false">主要链接</XLink>
        <XLink href="#" type="success" :underline="false">成功链接</XLink>
      </div>
    </div>
  </div>
</template>
```

:::

## 图标链接

带图标的链接。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <XLink href="https://xux.xlcig.cn" icon="mdi:link">链接地址</XLink>
    <XLink href="#" icon="mdi:home" type="primary">返回首页</XLink>
    <XLink href="#" icon="mdi:download" type="success">下载文件</XLink>
    <XLink href="#" icon="mdi:delete" type="danger">删除</XLink>
    <XLink href="#" icon="mdi:information" type="info">查看详情</XLink>
    <XLink href="#" icon="mdi:arrow-right">了解更多</XLink>
  </div>
</template>
```

:::

## 外部链接

使用 `target="_blank"` 在新标签页打开链接。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <XLink 
      href="https://gitee.com/leheya/xux" 
      target="_blank"
      icon="mdi:open-in-new"
    >
      在新窗口打开
    </XLink>
    
    <XLink 
      href="https://www.npmjs.com/package/@xlui/xux-ui" 
      target="_blank"
      type="primary"
      icon="mdi:package-variant"
    >
      NPM 包
    </XLink>
    
    <XLink 
      href="https://gitee.com/leheya/xux" 
      target="_blank"
      type="success"
      icon="mdi:git"
    >
      Gitee 仓库
    </XLink>
  </div>
</template>
```

:::

## 点击事件

监听链接的点击事件。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <XLink @click="handleClick" icon="mdi:cursor-default-click">
      点击触发事件
    </XLink>
    
    <XLink 
      href="https://xux.xlcig.cn" 
      @click="handleBeforeNavigate"
      type="primary"
      icon="mdi:navigation"
    >
      导航前确认
    </XLink>
    
    <XLink 
      disabled 
      @click="handleClick"
      type="danger"
    >
      禁用状态（不触发）
    </XLink>
  </div>
</template>

<script setup>
import { xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const handleClick = (e) => {
  msg.success('链接被点击了！')
}

const handleBeforeNavigate = (e) => {
  e.preventDefault()
  msg.info('导航被拦截，你可以在这里做一些操作')
}
</script>
```

:::

## 不同场景

在不同场景下使用链接。

:::demo

```vue
<template>
  <div class="space-y-6">
    <!-- 导航链接 -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">导航链接</h4>
      <div class="flex gap-4">
        <XLink href="#" icon="mdi:home">首页</XLink>
        <XLink href="#" icon="mdi:view-dashboard">控制台</XLink>
        <XLink href="#" icon="mdi:cog">设置</XLink>
        <XLink href="#" icon="mdi:help-circle">帮助</XLink>
      </div>
    </div>

    <!-- 操作链接 -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">操作链接</h4>
      <div class="flex gap-4">
        <XLink href="#" type="primary" icon="mdi:pencil">编辑</XLink>
        <XLink href="#" type="success" icon="mdi:eye">查看</XLink>
        <XLink href="#" type="danger" icon="mdi:delete">删除</XLink>
        <XLink href="#" type="warning" icon="mdi:alert">警告</XLink>
      </div>
    </div>

    <!-- 文档链接 -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">文档链接</h4>
      <div class="flex gap-4">
        <XLink href="#" icon="mdi:file-document" :underline="false">
          用户手册
        </XLink>
        <XLink href="#" icon="mdi:book-open" type="info" :underline="false">
          API 文档
        </XLink>
        <XLink href="#" icon="mdi:video" type="primary" :underline="false">
          视频教程
        </XLink>
      </div>
    </div>

    <!-- 下载链接 -->
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">下载链接</h4>
      <div class="flex gap-4">
        <XLink href="#" icon="mdi:file-pdf" type="danger">
          下载 PDF
        </XLink>
        <XLink href="#" icon="mdi:microsoft-excel" type="success">
          导出 Excel
        </XLink>
        <XLink href="#" icon="mdi:file-word" type="info">
          Word 文档
        </XLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 文本中的链接

在段落中使用链接。

:::demo

```vue
<template>
  <div class="space-y-4">
    <p class="text-gray-700">
      欢迎使用 <XLink href="https://xux.xlcig.cn" type="primary">XUX</XLink> 组件库，
      这是一个专为电商平台打造的现代化 UI 组件库。
      你可以查看 <XLink href="#" type="info" icon="mdi:book">文档</XLink> 
      或访问 <XLink href="https://gitee.com/leheya/xux" target="_blank" type="success">
        Gitee 仓库
      </XLink> 了解更多。
    </p>
    
    <p class="text-gray-700">
      遇到问题？请 
      <XLink href="#" type="warning" icon="mdi:bug">报告 Bug</XLink> 或 
      <XLink href="#" type="primary" icon="mdi:email">联系我们</XLink>。
    </p>
  </div>
</template>
```

:::

## 链接组

链接的组合使用。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600">分享到：</span>
      <XLink href="#" icon="mdi:wechat" type="success" :underline="false">微信</XLink>
      <span class="text-gray-300">|</span>
      <XLink href="#" icon="mdi:sina-weibo" type="danger" :underline="false">微博</XLink>
      <span class="text-gray-300">|</span>
      <XLink href="#" icon="mdi:qq" type="info" :underline="false">QQ</XLink>
      <span class="text-gray-300">|</span>
      <XLink href="#" icon="mdi:twitter" type="primary" :underline="false">Twitter</XLink>
    </div>
    
    <div class="flex items-center gap-2">
      <span class="text-sm text-gray-600">友情链接：</span>
      <XLink href="#" :underline="false">Vue.js</XLink>
      <span class="text-gray-300">•</span>
      <XLink href="#" :underline="false">Vite</XLink>
      <span class="text-gray-300">•</span>
      <XLink href="#" :underline="false">TypeScript</XLink>
      <span class="text-gray-300">•</span>
      <XLink href="#" :underline="false">VitePress</XLink>
    </div>
  </div>
</template>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| href | 链接地址 | `string` | - |
| to | 路由地址（用于 vue-router） | `string \| object` | - |
| type | 链接类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| underline | 是否显示下划线 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 图标名称 | `string` | - |
| target | 链接打开方式 | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击链接时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 链接内容 |

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

