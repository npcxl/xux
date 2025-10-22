# Icon 图标

自研 SVG 图标组件，支持多种样式和动画效果。

<style scoped>
.icon-sidebar {
  position: fixed;
  left: max(0px, calc((100vw - var(--vp-layout-max-width)) / 2 - 320px));
  top: 80px;
  width: 240px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  z-index: 10;
  transition: all 0.3s ease;
}

@media (max-width: 1536px) {
  .icon-sidebar {
    display: none;
  }
}

.icon-sidebar-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.icon-sidebar-link {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  margin: 2px 0;
  gap: 8px;
}

.icon-sidebar-link:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
}

.icon-sidebar-link.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.icon-sidebar-emoji {
  font-size: 16px;
  flex-shrink: 0;
  width: 20px;
  text-align: center;
}

.icon-sidebar-count {
  margin-left: auto;
  font-size: 11px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-default-soft);
  padding: 2px 6px;
  border-radius: 10px;
}

.icon-sidebar::-webkit-scrollbar {
  width: 6px;
}

.icon-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.icon-sidebar::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

.icon-sidebar::-webkit-scrollbar-thumb:hover {
  background: var(--vp-c-text-3);
}
</style>

## 所有图标

点击图标复制名称，悬停查看动画效果。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 32px;">
    <!-- 控制按钮 -->
    <div style="display: flex; gap: 12px; align-items: center; position: sticky; top: 60px; z-index: 10; background: white; padding: 12px 0; border-bottom: 2px solid #f0f0f0;">
      <XButton 
        :type="mode === 'outline' ? 'primary' : 'default'"
        @click="mode = 'outline'"
      >
        单色
      </XButton>
      <XButton 
        :type="mode === 'colorful' ? 'primary' : 'default'"
        @click="mode = 'colorful'"
      >
        多彩
      </XButton>
      <span style="margin-left: 16px; color: #666; font-size: 14px;">
        共 {{ totalIconCount }} 个图标
      </span>
    </div>

    <!-- 按类别展示图标 -->
    <div v-for="category in iconCategories" :key="category.title" :id="category.id">
      <h3 style="margin-bottom: 16px; color: #1a1a1a; font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
        {{ category.icon }} {{ category.title }}
        <span style="font-size: 14px; color: #999; font-weight: 400;">({{ category.icons.length }})</span>
      </h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px;">
        <div
          v-for="icon in category.icons"
          :key="icon"
          class="icon-item"
          :class="{ 'icon-copied': copiedIcon === icon }"
          @click="copyIconName(icon)"
        >
          <div class="icon-wrapper">
            <XIcon
              :name="icon"
              :size="iconSize"
              :colorful="mode === 'colorful'"
            />
          </div>
          <div class="icon-name">{{ icon }}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XFlex, XButton, useAlert } from '@xlui/xux-ui'
const mode = ref('outline')
const iconSize = ref(32)
const copiedIcon = ref('')
const alert = useAlert()

const iconCategories = [
  {
    id: '基础图标',
    title: '基础图标',
    icon: '📦',
    icons: ['home', 'heart', 'star', 'user', 'search', 'settings', 'menu', 'more-vertical', 'more-horizontal']
  },
  {
    id: 'loading动画',
    title: 'Loading 动画',
    icon: '⏳',
    icons: ['loading', 'loading-2', 'loading-3', 'loading-4', 'loading-5', 'loading-6']
  },
  {
    id: '箭头指示',
    title: '箭头指示',
    icon: '➡️',
    icons: ['arrow-right', 'arrow-left', 'chevron-down', 'chevron-up']
  },
  {
    id: '状态提示',
    title: '状态提示',
    icon: '✅',
    icons: ['check', 'close', 'plus', 'minus', 'alert-circle', 'info', 'alert-triangle', 'check-circle', 'x-circle']
  },
  {
    id: '文件操作',
    title: '文件操作',
    icon: '📁',
    icons: ['folder', 'file', 'download', 'upload', 'trash', 'edit', 'copy', 'share']
  },
  {
    id: '通用功能',
    title: '通用功能',
    icon: '🔧',
    icons: ['mail', 'bell', 'calendar', 'clock', 'image', 'link', 'lock', 'unlock', 'eye', 'eye-off', 'sun', 'moon', 'wifi', 'refresh', 'cloud', 'gift', 'shopping-cart', 'credit-card', 'globe', 'map-pin', 'phone', 'bookmark', 'tag', 'zap', 'activity', 'trending-up', 'trending-down', 'printer']
  },
  {
    id: '品牌logo',
    title: '品牌 Logo',
    icon: '🎨',
    icons: [
      // 国际品牌
      'github', 'twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'chrome',
      // 国内品牌
      'wechat', 'weibo', 'taobao', 'jd', 'alipay', 'meituan', 'douyin', 'bilibili', 'xiaohongshu', 'dingtalk'
    ]
  },
  {
    id: '开发工具',
    title: '开发工具',
    icon: '💻',
    icons: ['code', 'terminal', 'database', 'server', 'cpu', 'hard-drive']
  },
  {
    id: '消息通讯',
    title: '消息通讯',
    icon: '💬',
    icons: ['message', 'send', 'message-circle', 'smile', 'thumbs-up', 'thumbs-down']
  },
  {
    id: '媒体控制',
    title: '媒体控制',
    icon: '🎵',
    icons: ['music', 'video', 'camera', 'play', 'pause', 'stop', 'skip-forward', 'skip-back', 'volume', 'volume-up', 'volume-off']
  },
  {
    id: '图像编辑',
    title: '图像编辑',
    icon: '🖼️',
    icons: ['zoom-in', 'zoom-out', 'rotate-cw', 'rotate-ccw', 'maximize', 'minimize', 'move']
  },
  {
    id: '界面布局',
    title: '界面布局',
    icon: '📐',
    icons: ['layers', 'grid', 'layout', 'sidebar', 'filter', 'sliders']
  },
  {
    id: '数据分析',
    title: '数据分析',
    icon: '📊',
    icons: ['pie-chart', 'bar-chart', 'target']
  },
  {
    id: '团队协作',
    title: '团队协作',
    icon: '👥',
    icons: ['briefcase', 'users', 'user-check', 'user-plus', 'user-minus', 'award', 'shield']
  },
  {
    id: '物流包装',
    title: '物流包装',
    icon: '📦',
    icons: ['package', 'box', 'truck']
  },
  {
    id: '其他图标',
    title: '其他图标',
    icon: '🔮',
    icons: ['compass', 'anchor', 'feather', 'key', 'power']
  }
]

const totalIconCount = computed(() => {
  return iconCategories.reduce((sum, category) => sum + category.icons.length, 0)
})

const copyIconName = async (icon) => {
  const iconCode = `<XIcon name="${icon}" />`
  
  try {
    // 方法1: 使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(iconCode)
      copiedIcon.value = icon
      alert.success(`✅ 复制成功`, {
        duration: 2000
      })
      return
    }
    
    // 方法2: 使用传统方法（兼容性更好）
    const textarea = document.createElement('textarea')
    textarea.value = iconCode
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'
    document.body.appendChild(textarea)
    textarea.select()
    
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)
    
    if (successful) {
      copiedIcon.value = icon
      alert.success(`✅ 复制成功`, {
        duration: 2000
      })
    } else {
      throw new Error('execCommand failed')
    }
  } catch (err) {
    console.error('Failed to copy:', err)
    // 复制失败，显示代码让用户手动复制
    alert.warning(`请手动复制: ${iconCode}`, {
      duration: 4000
    })
  }
}
</script>

<style scoped>
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  border-radius: 8px;
  background: #f9fafb;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.icon-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.icon-item:hover {
  background: #ffffff;
  border-color: #3b82f6;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 24px -8px rgba(59, 130, 246, 0.3);
}

.icon-item:hover::before {
  opacity: 1;
}

.icon-item:hover .icon-wrapper {
  transform: rotateY(360deg);
}

.icon-item:active {
  transform: translateY(-2px) scale(1.02);
}

.icon-item.icon-copied {
  background: #10b981;
  border-color: #10b981;
  animation: copyPulse 0.6s ease;
}

.icon-item.icon-copied .icon-name {
  color: #ffffff;
}

@keyframes copyPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.icon-name {
  margin-top: 12px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
  word-break: break-all;
  transition: color 0.2s ease;
  font-weight: 500;
  line-height: 1.4;
}

.icon-item:hover .icon-name {
  color: #1a1a1a;
}

</style>
```

:::

## 使用方法

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <XIcon name="heart" />
    
    <!-- 设置大小 -->
    <XIcon name="star" :size="32" />
    
    <!-- 设置颜色 -->
    <XIcon name="home" color="#3b82f6" />
    
    <!-- 多彩模式（自动应用预设颜色） -->
    <XIcon name="heart" colorful />
    <XIcon name="github" colorful />
    <XIcon name="star" colorful />
    
    <!-- 自定义多彩颜色 -->
    <XIcon name="heart" colorful colorful-color="#ff0080" />
    <XIcon name="star" colorful colorful-color="#00d4ff" />
    
    <!-- 预设尺寸 -->
    <XIcon name="user" preset="sm" />
    <XIcon name="user" preset="md" />
    <XIcon name="user" preset="lg" />
    
    <!-- Loading 加载动画 - 6种风格 -->
    <XIcon name="loading" />      <!-- 圆环旋转 -->
    <XIcon name="loading-2" />    <!-- 波浪柱状 -->
    <XIcon name="loading-3" />    <!-- 三角变形 -->
    <XIcon name="loading-4" />    <!-- 圆点追逐 -->
    <XIcon name="loading-5" />    <!-- 三层交错 -->
    <XIcon name="loading-6" />    <!-- 方块翻转 -->
    
    <!-- 旋转 -->
    <XIcon name="arrow-right" :rotate="45" />
    
    <!-- 翻转 -->
    <XIcon name="arrow-right" :flip-x="true" />
  </div>
</template>

<script setup>
import { XIcon } from '@xlui/xux-ui'
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 图标名称 | `string` | - |
| size | 图标大小 | `number \| string` | `24` |
| color | 图标颜色 | `string` | - |
| colorful | 启用多彩渐变模式 | `boolean` | `false` |
| colorfulColor | 自定义多彩模式颜色（优先级高于预设） | `string` | - |
| fill | 填充颜色 | `string` | `'none'` |
| stroke | 描边颜色 | `string` | `'currentColor'` |
| strokeWidth | 线条粗细 | `number \| string` | `2` |
| strokeLinecap | 线条端点样式 | `'butt' \| 'round' \| 'square'` | `'round'` |
| strokeLinejoin | 线条连接样式 | `'miter' \| 'round' \| 'bevel'` | `'round'` |
| viewBox | 视图框 | `string` | `'0 0 24 24'` |
| rotate | 旋转角度 | `number` | `0` |
| flipX | 水平翻转 | `boolean` | `false` |
| flipY | 垂直翻转 | `boolean` | `false` |
| preset | 预设尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | - |

### 预设尺寸

| 值 | 大小 |
|----|------|
| xs | 16px |
| sm | 20px |
| md | 24px |
| lg | 32px |
| xl | 48px |

## 添加自定义图标

在 `packages/ui/src/components/Icon/icons/` 目录下创建新的 `.vue` 文件：

```vue
<!-- my-icon.vue -->
<template>
  <path d="..." />
  <circle cx="12" cy="12" r="10" />
</template>
```

然后就可以使用：

```vue
<XIcon name="my-icon" />
```
