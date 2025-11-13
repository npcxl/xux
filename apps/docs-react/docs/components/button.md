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

按钮用于触发一个操作，是用户和系统交互的基础组件。

## 代码演示

### 基础用法

基本的按钮用法。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton>默认按钮</XButton>
    <XButton type="primary">主要按钮</XButton>
    <XButton type="success">成功按钮</XButton>
    <XButton type="warning">警告按钮</XButton>
    <XButton type="danger">危险按钮</XButton>
  </div>
);
```

### 带图标的按钮

使用 [Iconify](https://icones.js.org/) 图标库，支持 10万+ 图标。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton type="primary" icon="mdi:cart">加入购物车</XButton>
    <XButton type="success" icon="mdi:check">确认</XButton>
    <XButton type="warning" icon="mdi:alert">警告</XButton>
    <XButton type="danger" icon="mdi:delete">删除</XButton>
    <XButton icon="mdi:search">搜索</XButton>
  </div>
);
```

### 右侧图标

图标也可以放在右侧。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton type="primary" iconRight="mdi:arrow-right">
      下一步
    </XButton>
    <XButton iconRight="mdi:open-in-new">
      打开链接
    </XButton>
  </div>
);
```

### 幽灵按钮

透明背景，只有边框和文字。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton type="primary" ghost>主要按钮</XButton>
    <XButton type="success" ghost>成功按钮</XButton>
    <XButton type="warning" ghost>警告按钮</XButton>
    <XButton type="danger" ghost>危险按钮</XButton>
  </div>
);
```

### 圆角按钮

使用 `round` 属性设置圆角按钮。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton type="primary" round>主要按钮</XButton>
    <XButton type="success" round icon="mdi:check">成功</XButton>
    <XButton type="warning" round ghost>警告</XButton>
    <XButton type="danger" round icon="mdi:delete">删除</XButton>
  </div>
);
```

### 加载状态

通过 `loading` 属性设置按钮为加载状态。

```tsx
import { XButton } from '../../../../packages/react/src';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <XButton type="primary" loading>加载中</XButton>
      <XButton type="success" loading onClick={handleClick}>
        点击加载
      </XButton>
      <XButton 
        type="primary" 
        loading={loading}
        onClick={handleClick}
      >
        {loading ? '加载中...' : '点击测试'}
      </XButton>
    </div>
  );
};
```

### 禁用状态

使用 `disabled` 属性设置按钮为禁用状态。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton disabled>默认按钮</XButton>
    <XButton type="primary" disabled>主要按钮</XButton>
    <XButton type="success" disabled>成功按钮</XButton>
    <XButton type="danger" disabled icon="mdi:delete">删除</XButton>
  </div>
);
```

### 不同尺寸

提供三种尺寸：`small`、`medium`（默认）、`large`。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
    <XButton type="primary" size="small">小型按钮</XButton>
    <XButton type="primary" size="medium">中等按钮</XButton>
    <XButton type="primary" size="large">大型按钮</XButton>
  </div>
);
```

### 块级按钮

通过 `block` 属性可以将按钮设置为块级元素。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <XButton type="primary" block>块级按钮</XButton>
    <XButton type="success" block icon="mdi:check">
      确认提交
    </XButton>
  </div>
);
```

### 文本和链接按钮

没有边框和背景色的按钮。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton type="text">文本按钮</XButton>
    <XButton type="link">链接按钮</XButton>
    <XButton type="text" icon="mdi:delete">删除</XButton>
  </div>
);
```

### 按钮组合

组合使用多个按钮。

```tsx
import { XButton } from '../../../../packages/react/src';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <XButton icon="mdi:chevron-left">上一页</XButton>
    <XButton type="primary">确定</XButton>
    <XButton>取消</XButton>
    <XButton iconRight="mdi:chevron-right">下一页</XButton>
  </div>
);
```

## API

### Button Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'text' \| 'link'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| icon | 左侧图标（iconify 图标名） | `string` | - |
| iconRight | 右侧图标（iconify 图标名） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| ghost | 是否为幽灵按钮 | `boolean` | `false` |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLButtonElement>) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 按钮内容 | `ReactNode` | - |

### Button Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| onClick | 点击按钮时触发 | `(event: React.MouseEvent<HTMLButtonElement>) => void` |

## 主题定制

可以通过 CSS Variables 自定义按钮样式：

```css
:root {
  /* 主色调 */
  --x-color-primary: #1a1a1a;
  --x-color-success: #10b981;
  --x-color-warning: #f59e0b;
  --x-color-danger: #ef4444;
  
  /* 渐变色 */
  --x-gradient-primary: linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%);
  --x-gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
  
  /* 圆角 */
  --x-radius-sm: 4px;
  --x-radius: 6px;
  --x-radius-lg: 12px;
}
```

