# 主题化配置 Theme Config

XUX-UI 提供了完整的主题定制系统，通过 CSS 变量实现深色/浅色主题切换和个性化定制。

## 设计理念

所有组件都使用全局 CSS 变量，无需修改源代码即可实现主题定制。这种方式具有以下优势：

- ✅ **零侵入**：不修改组件源代码
- ✅ **实时切换**：支持动态主题切换
- ✅ **高性能**：CSS 原生支持，无需 JavaScript 计算
- ✅ **易维护**：集中管理，一处修改全局生效

## 快速开始

### 基础用法

在你的全局 CSS 文件中定义 CSS 变量：

```css
/* styles/theme.css */
:root {
  /* 主题色 */
  --x-color-primary: #1a73e8;
  --x-color-success: #10b981;
  --x-color-warning: #f59e0b;
  --x-color-danger: #ef4444;
  
  /* 背景色 */
  --x-bg-color: #ffffff;
  --x-text-color-primary: #1a1a1a;
}
```

然后在 `main.ts` 中引入：

```typescript
import './styles/theme.css'
```

### 深色主题

使用 `.dark` 类名切换到深色主题：

```css
.dark {
  /* 背景色 */
  --x-bg-color: #1a1a1a;
  --x-bg-color-dark: #0d0d0d;
  
  /* 文本色 */
  --x-text-color-primary: #ffffff;
  --x-text-color-secondary: #b0b0b0;
  --x-text-color-regular: #d0d0d0;
  
  /* 边框色 */
  --x-border-color: #333333;
  --x-border-color-light: #444444;
  
  /* 填充色 */
  --x-fill-color: #2a2a2a;
  --x-fill-color-lighter: #363636;
}
```

在 Vue 中动态切换：

```vue
<script setup>
import { ref, watchEffect } from 'vue'

const isDark = ref(false)

watchEffect(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <XSwitch v-model="isDark" variant="theme" />
</template>
```

## CSS 变量清单

### 颜色系统

#### 主题色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-color-primary` | `#1a1a1a` | 主题色 |
| `--x-color-primary-light` | `rgba(26, 26, 26, 0.8)` | 浅主题色 |
| `--x-color-primary-dark` | `#0d0d0d` | 深主题色 |
| `--x-color-primary-lighter` | `rgba(26, 26, 26, 0.04)` | 更浅主题色 |

#### 功能色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-color-success` | `#10b981` | 成功色 |
| `--x-color-warning` | `#f59e0b` | 警告色 |
| `--x-color-danger` | `#ef4444` | 危险色 |
| `--x-color-white` | `#ffffff` | 白色 |

### 背景色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-bg-color` | `#ffffff` | 主背景色 |
| `--x-bg-color-dark` | `#1a1a1a` | 深色背景（仅深色主题） |
| `--x-fill-color` | `#f5f5f5` | 填充色 |
| `--x-fill-color-lighter` | `#fafafa` | 浅填充色 |
| `--x-fill-color-dark` | `rgba(0, 0, 0, 0.04)` | 深填充色 |

### 文本色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-text-color-primary` | `#1a1a1a` | 主文本色 |
| `--x-text-color-secondary` | `#6b7280` | 次要文本色 |
| `--x-text-color-regular` | `#374151` | 常规文本色 |
| `--x-text-color-placeholder` | `#9ca3af` | 占位符文本色 |
| `--x-text-color-disabled` | `#9ca3af` | 禁用文本色 |

### 边框色

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-border-color` | `#e5e7eb` | 主边框色 |
| `--x-border-color-light` | `#d1d5db` | 浅边框色 |
| `--x-border-color-lighter` | `#f0f0f0` | 更浅边框色 |
| `--x-border-color-dark` | `#333333` | 深边框色（仅深色主题） |

### 阴影

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.05)` | 小阴影 |
| `--x-shadow-md` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` | 中阴影 |
| `--x-shadow-lg` | `0 10px 15px -3px rgba(0, 0, 0, 0.1)` | 大阴影 |
| `--x-shadow-xl` | `0 20px 25px -5px rgba(0, 0, 0, 0.1)` | 超大阴影 |
| `--x-shadow-focus` | `rgba(26, 26, 26, 0.1)` | 焦点阴影 |
| `--x-shadow-primary` | `0 4px 12px rgba(26, 26, 26, 0.3)` | 主题阴影 |

### 渐变

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-gradient-primary` | `linear-gradient(135deg, #1a1a1a, #333)` | 主题渐变 |
| `--x-gradient-danger` | `linear-gradient(135deg, #ef4444, #dc2626)` | 危险色渐变 |
| `--x-gradient-bg-light` | `linear-gradient(135deg, #fafafa, #f3f4f6)` | 背景渐变 |

### 组件特定变量

#### Badge 徽标

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-badge-bg` | `var(--x-color-danger, #ff4d4f)` | Badge 背景色 |

#### Modal 弹窗

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-modal-mask-bg` | `rgba(0, 0, 0, 0.5)` | 遮罩背景色 |

#### Menu 菜单

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-menu-bg` | `linear-gradient(135deg, #ffffff, #f8f9fa)` | 菜单背景渐变 |

#### Skeleton 骨架屏

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-skeleton-bg` | `#e5e7eb` | 骨架屏背景色 |

#### Table 表格

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-table-row-hover-gradient` | `linear-gradient(...)` | 行悬停渐变 |
| `--x-table-row-selected-bg` | `#e6f7ff` | 选中行背景 |
| `--x-table-row-selected-hover-bg` | `#bae7ff` | 选中行悬停背景 |

#### Tree 树形控件

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-tree-node-selected-bg` | `#eff6ff` | 节点选中背景 |
| `--x-tree-node-selected-bg-dark` | `rgba(30, 64, 175, 0.2)` | 深色节点选中背景 |

#### Timeline 时间轴

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-timeline-node-shadow` | `rgba(59, 130, 246, 0.3)` | 节点阴影 |

#### CountrySelect 国家选择器

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--x-region-selected-bg` | `#eff6ff` | 选中项背景色 |
| `--x-color-danger-dark` | `#dc2626` | 深色危险色 |

## 预设主题

### 商务主题

```css
:root {
  --x-color-primary: #1a73e8;
  --x-gradient-primary: linear-gradient(135deg, #1a73e8 0%, #4285f4 100%);
  --x-shadow-primary: 0 4px 12px rgba(26, 115, 232, 0.3);
}
```

### 活力主题

```css
:root {
  --x-color-primary: #ff6b35;
  --x-color-success: #00d084;
  --x-gradient-primary: linear-gradient(135deg, #ff6b35 0%, #ff8c61 100%);
}
```

### 专业主题

```css
:root {
  --x-color-primary: #2c3e50;
  --x-bg-color: #ecf0f1;
  --x-text-color-primary: #2c3e50;
  --x-border-color: #bdc3c7;
}
```

### 电商主题

```css
:root {
  --x-color-primary: #ff4d4f;
  --x-color-warning: #faad14;
  --x-gradient-primary: linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%);
  --x-badge-bg: #ff4d4f;
}
```

## 完整深色主题示例

```css
/* 完整的深色主题配置 */
.dark {
  /* 颜色 */
  --x-color-primary: #3b82f6;
  --x-color-success: #10b981;
  --x-color-warning: #f59e0b;
  --x-color-danger: #ef4444;
  
  /* 背景 */
  --x-bg-color: #1a1a1a;
  --x-bg-color-dark: #0d0d0d;
  --x-fill-color: #2a2a2a;
  --x-fill-color-lighter: #363636;
  --x-fill-color-dark: rgba(255, 255, 255, 0.05);
  
  /* 文本 */
  --x-text-color-primary: #ffffff;
  --x-text-color-secondary: #b0b0b0;
  --x-text-color-regular: #d0d0d0;
  --x-text-color-placeholder: #6b7280;
  --x-text-color-disabled: #6b7280;
  
  /* 边框 */
  --x-border-color: #333333;
  --x-border-color-light: #444444;
  --x-border-color-lighter: #2a2a2a;
  --x-border-color-dark: #555555;
  
  /* 阴影 */
  --x-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --x-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --x-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --x-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
  
  /* 组件特定 */
  --x-modal-mask-bg: rgba(0, 0, 0, 0.7);
  --x-skeleton-bg: #2a2a2a;
  --x-table-row-selected-bg: rgba(59, 130, 246, 0.15);
  --x-tree-node-selected-bg: rgba(59, 130, 246, 0.2);
  --x-region-selected-bg: rgba(59, 130, 246, 0.15);
  --x-color-danger-dark: #dc2626;
}
```

## 主题切换实现

### 使用 Composition API

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useStorage } from '@vueuse/core'

// 持久化主题状态
const isDark = useStorage('theme-mode', false)

watchEffect(() => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <div class="theme-switcher">
    <XSwitch 
      v-model="isDark" 
      variant="theme"
      @change="toggleTheme"
    />
  </div>
</template>
```

### 使用 VueUse

```typescript
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

### 系统主题检测

```typescript
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  // 检测系统主题偏好
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDark.value = mediaQuery.matches
  
  // 监听系统主题变化
  mediaQuery.addEventListener('change', (e) => {
    isDark.value = e.matches
  })
})
```

## 动态主题生成

### 基于主色自动生成配色

```typescript
function generateTheme(primaryColor: string) {
  // 使用 tinycolor 或其他颜色库
  const color = tinycolor(primaryColor)
  
  return {
    '--x-color-primary': primaryColor,
    '--x-color-primary-light': color.lighten(10).toString(),
    '--x-color-primary-dark': color.darken(10).toString(),
    '--x-color-primary-lighter': color.setAlpha(0.1).toString(),
  }
}

// 应用主题
const theme = generateTheme('#1a73e8')
Object.entries(theme).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})
```

## 最佳实践

### 1. 变量命名规范

- 使用 `--x-` 前缀避免冲突
- 使用语义化命名（如 `primary`、`success`）而不是具体颜色（如 `blue`、`green`）
- 保持命名层级清晰（如 `--x-text-color-primary`）

### 2. 渐进增强

```css
/* 提供默认值作为回退 */
.button {
  background: var(--x-color-primary, #1a1a1a);
}
```

### 3. 主题分层

```css
/* 基础层 - 全局变量 */
:root {
  --x-color-primary: #1a73e8;
}

/* 组件层 - 组件特定变量 */
.x-button {
  --button-bg: var(--x-color-primary);
}

/* 状态层 - 状态变量 */
.x-button:hover {
  --button-bg: var(--x-color-primary-dark);
}
```

### 4. 性能优化

```css
/* 避免在频繁变化的属性上使用复杂计算 */
/* ❌ 不推荐 */
.element {
  opacity: calc(var(--x-opacity) * 0.5 + 0.3);
}

/* ✅ 推荐 */
.element {
  opacity: var(--x-element-opacity, 0.8);
}
```

## TypeScript 类型支持

```typescript
// types/theme.d.ts
export interface ThemeConfig {
  colorPrimary?: string
  colorSuccess?: string
  colorWarning?: string
  colorDanger?: string
  bgColor?: string
  textColorPrimary?: string
  borderColor?: string
}

// 应用主题的工具函数
export function applyTheme(config: ThemeConfig) {
  const root = document.documentElement
  Object.entries(config).forEach(([key, value]) => {
    const cssVar = `--x-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
    root.style.setProperty(cssVar, value)
  })
}

// 使用
applyTheme({
  colorPrimary: '#1a73e8',
  bgColor: '#ffffff',
})
```

## 主题调试工具

```vue
<script setup lang="ts">
import { ref } from 'vue'

const primaryColor = ref('#1a73e8')

const updatePrimaryColor = () => {
  document.documentElement.style.setProperty('--x-color-primary', primaryColor.value)
}
</script>

<template>
  <div class="theme-debugger">
    <h3>主题调试器</h3>
    <div class="color-picker">
      <label>主题色：</label>
      <input 
        v-model="primaryColor" 
        type="color"
        @input="updatePrimaryColor"
      />
      <span>{{ primaryColor }}</span>
    </div>
  </div>
</template>
```

## 常见问题

### Q: 主题切换时有闪烁？

A: 在 HTML 中提前设置主题类，避免页面加载时的闪烁：

```html
<script>
  // 在 head 中立即执行
  const theme = localStorage.getItem('theme-mode')
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
</script>
```

### Q: 如何支持多个主题？

A: 使用不同的类名：

```css
.theme-blue { --x-color-primary: #1a73e8; }
.theme-red { --x-color-primary: #ef4444; }
.theme-green { --x-color-primary: #10b981; }
```

### Q: CSS 变量在 IE 不支持？

A: 使用 postcss-custom-properties 插件转换，或提供静态 CSS 回退。

## 总结

XUX-UI 的主题系统设计灵活、易用，支持：

- ✅ 深色/浅色主题无缝切换
- ✅ 完整的 CSS 变量体系
- ✅ 组件级别的精细控制
- ✅ TypeScript 类型支持
- ✅ 性能优化的最佳实践

通过合理使用这些变量，你可以轻松实现符合品牌风格的个性化主题！

