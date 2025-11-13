# React 文档快速开始

## 📦 安装依赖

首先安装 React 文档所需的依赖：

```bash
# 在项目根目录
pnpm install
```

## 🚀 启动开发服务器

```bash
# 方式 1：在项目根目录
pnpm dev:react

# 方式 2：在 apps/docs-react 目录
cd apps/docs-react
pnpm dev
```

访问 http://localhost:8000 即可查看文档。

## 📝 编写组件文档

### 1. 创建文档文件

在 `docs/components/` 目录下创建新的 markdown 文件，例如 `input.md`：

```md
---
nav:
  title: 组件
  order: 2
group:
  title: 表单
  order: 2
toc: content
---

# Input 输入框

输入框组件说明。

## 代码演示

### 基础用法

\`\`\`tsx
import { XInput } from '@xlui/xux-react';

export default () => <XInput placeholder="请输入" />;
\`\`\`

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | 占位文本 | string | - |
```

### 2. 文档特性

#### 实时预览

所有 `tsx` 代码块都会自动渲染为可交互的组件：

```tsx
import { XButton } from '@xlui/xux-react';
import { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  
  return (
    <XButton onClick={() => setCount(count + 1)}>
      点击了 {count} 次
    </XButton>
  );
};
```

#### 代码高亮

支持多种语言的代码高亮：

```typescript
interface ButtonProps {
  type?: 'primary' | 'default';
  children: ReactNode;
}
```

#### 自动生成 API 表格

dumi 支持从 TypeScript 类型自动生成 API 文档表格。

### 3. 文档组织结构

```
docs/
├── index.md              # 首页
├── guide/               # 指南
│   └── index.md        # 快速开始
└── components/          # 组件文档
    ├── button.md       # 按钮
    ├── input.md        # 输入框
    └── ...
```

### 4. Front Matter 配置

每个文档页面顶部的 YAML 配置：

```yaml
---
nav:
  title: 组件      # 导航标题
  order: 2         # 导航排序
group:
  title: 通用      # 分组标题
  order: 1         # 分组排序
toc: content       # 显示目录
---
```

## 🎨 主题定制

编辑 `.dumirc.ts` 配置文件：

```typescript
export default defineConfig({
  themeConfig: {
    name: 'XUX React',
    logo: '/logo.png',
    // 自定义主题色
    theme: {
      '@primary-color': '#1a1a1a',
    },
  },
});
```

## 📤 构建和部署

### 构建文档

```bash
# 在项目根目录
pnpm build:docs-react

# 或在 apps/docs-react 目录
pnpm build
```

构建产物在 `apps/docs-react/dist` 目录。

### 预览构建结果

```bash
pnpm preview:react
```

### 部署

将 `dist` 目录部署到任何静态网站托管服务：

- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 🔧 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm dev:react` | 启动 React 文档开发服务器 |
| `pnpm build:docs-react` | 构建 React 文档 |
| `pnpm preview:react` | 预览构建后的文档 |
| `pnpm dev` | 启动 Vue 文档开发服务器 |

## 📚 文档特性对比

| 特性 | Vue 文档 (VitePress) | React 文档 (dumi) |
| --- | --- | --- |
| 实时预览 | ✅ | ✅ |
| TypeScript | ✅ | ✅ |
| API 自动生成 | ❌ | ✅ |
| 移动端预览 | ❌ | ✅ |
| 主题定制 | ✅ | ✅ |
| 搜索功能 | ✅ | ✅ |

## 📖 参考资料

- [dumi 官方文档](https://d.umijs.org/)
- [Markdown 语法](https://markdown.com.cn/)
- [React 官方文档](https://react.dev/)
- [Iconify 图标库](https://icones.js.org/)

## 💡 最佳实践

1. **组件示例要完整**：每个示例都应该是可运行的完整代码
2. **添加交互示例**：使用 `useState` 等 Hooks 展示组件的交互
3. **API 文档要详细**：为每个 prop 添加说明和类型
4. **提供多种用法**：基础用法、高级用法、边界情况
5. **添加 TypeScript 类型**：展示如何在 TypeScript 中使用

## 🐛 常见问题

### Q: 为什么代码块没有渲染？

A: 确保代码块语言标记为 `tsx` 而不是 `jsx` 或 `javascript`。

### Q: 如何引用组件源码？

A: 在文档示例中，直接使用相对路径：

```tsx
// 从 docs/components/*.md 引用
import { XButton } from '../../../../packages/react/src';

// 从 docs/index.md 引用
import { XButton } from '../../../packages/react/src';

// 在实际项目中使用发布的包
import { XButton } from '@xlui/xux-react';
```

### Q: 如何添加新的导航菜单？

A: 编辑 `.dumirc.ts` 中的 `themeConfig.nav` 配置。

