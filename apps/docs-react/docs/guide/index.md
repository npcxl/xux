---
nav:
  title: 指南
  order: 1
group:
  title: 快速开始
  order: 1
---

# 快速开始

## 安装

### 使用包管理器

推荐使用 pnpm 或 npm 安装：

```bash
# pnpm
pnpm add @xlui/xux-react

# npm
npm install @xlui/xux-react

# yarn
yarn add @xlui/xux-react
```

## 完整引入

在应用的入口文件中引入所有组件和样式：

```typescript
// main.tsx 或 App.tsx
import '@xlui/xux-react/dist/index.css';
```

## 按需引入（推荐）

XUX React 支持基于 ES modules 的 tree shaking，直接引入组件即可。

在实际项目中：

```typescript
import { XButton, XInput } from '@xlui/xux-react';
import '@xlui/xux-react/dist/index.css';

export default () => (
  <div>
    <XButton type="primary">按钮</XButton>
    <XInput placeholder="请输入" />
  </div>
);
```

在本文档示例中：

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div>
    <XButton type="primary">按钮</XButton>
  </div>
);
```

## 使用图标

XUX React 使用 [Iconify](https://icones.js.org/) 图标系统，支持 10万+ 图标：

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <XButton icon="mdi:cart">加入购物车</XButton>
    <XButton icon="mdi:delete" type="danger">删除</XButton>
  </div>
);
```

你可以在 [icones.js.org](https://icones.js.org/) 搜索和浏览所有可用的图标。

**注意**：在文档示例中，请使用相对路径导入组件：

```typescript
// 在 docs/components/*.md 中
import { XButton } from '../../../../packages/react/src';

// 在实际项目中使用发布的包
import { XButton } from '@xlui/xux-react';
```

## TypeScript 支持

XUX React 使用 TypeScript 编写，提供完整的类型定义：

```typescript
import { XButton, type ButtonProps } from '@xlui/xux-react';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <XButton {...props} />;
};
```

## 主题定制

XUX React 使用 CSS Variables 实现主题定制，你可以覆盖这些变量：

```css
:root {
  --x-color-primary: #1a1a1a;
  --x-color-success: #10b981;
  --x-color-warning: #f59e0b;
  --x-color-danger: #ef4444;
  --x-radius: 6px;
  --x-font-size: 16px;
}
```

## 下一步

- 查看[组件列表](/components/button)
- 了解[主题配置](#主题定制)
- 查看完整的 [API 文档](/components/button#api)

