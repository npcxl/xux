# XUX React 文档

基于 [dumi](https://d.umijs.org/) 构建的 React 组件库文档。

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建文档
pnpm build

# 预览构建结果
pnpm preview
```

## 文档结构

```
docs-react/
├── docs/                    # 文档目录
│   ├── index.md            # 首页
│   ├── guide/              # 指南
│   └── components/         # 组件文档
├── public/                 # 静态资源
├── .dumirc.ts             # dumi 配置
└── package.json
```

## 编写文档

### 组件文档

在 `docs/components/` 目录下创建 `.md` 文件：

```md
---
nav:
  title: 组件
  order: 2
group:
  title: 通用
  order: 1
toc: content
---

# Button 按钮

## 代码演示

\`\`\`tsx
import { XButton } from '@xlui/xux-react';

export default () => <XButton>按钮</XButton>;
\`\`\`
```

### 特性

- ✅ 实时预览
- ✅ TypeScript 支持
- ✅ 自动生成 API 表格
- ✅ 移动端预览
- ✅ 主题定制

## 相关链接

- [dumi 官方文档](https://d.umijs.org/)
- [Vue 版本文档](https://xux.xlcig.cn)

