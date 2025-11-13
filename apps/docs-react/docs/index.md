---
hero:
  title: XUX React
  description: 专为电商平台和后台管理系统设计的 React UI 组件库
  actions:
    - text: 快速开始
      link: /guide
    - text: 组件
      link: /components/button
features:
  - title: 🎨 精美设计
    description: 现代化的 UI 设计，提供优雅的视觉体验
  - title: 📦 开箱即用
    description: 高质量的 React 组件，满足企业级应用需求
  - title: 🔧 TypeScript
    description: 完整的 TypeScript 类型支持，提供更好的开发体验
  - title: 🎯 10万+ 图标
    description: 基于 Iconify，支持海量图标库
  - title: 🎭 CSS Modules
    description: 样式隔离，避免全局污染
  - title: ♻️ API 一致
    description: 与 Vue 版本保持 API 一致，方便迁移
---

## 安装

```bash
# npm
npm install @xlui/xux-react

# pnpm
pnpm add @xlui/xux-react

# yarn
yarn add @xlui/xux-react
```

## 快速开始

**实际项目中使用：**

```typescript
import { XButton } from '@xlui/xux-react';
import '@xlui/xux-react/dist/index.css';

export default () => (
  <XButton type="primary">Hello XUX</XButton>
);
```

**在本文档中查看实时示例：**

```tsx
import { XButton } from '../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', padding: '20px' }}>
    <XButton type="primary">Hello XUX</XButton>
    <XButton type="success" icon="mdi:check">成功</XButton>
    <XButton type="danger" icon="mdi:delete">删除</XButton>
  </div>
);
```

## 特性对比

| 特性 | Vue 版本 | React 版本 |
|------|---------|-----------|
| 组件数量 | 40+ | 持续更新中 |
| TypeScript | ✅ | ✅ |
| 图标系统 | Iconify | Iconify |
| 样式方案 | Scoped CSS | CSS Modules |
| 主题定制 | CSS Variables | CSS Variables |
| Tree Shaking | ✅ | ✅ |

