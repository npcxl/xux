# Icon 图标

自研 SVG 图标组件，支持单色和多彩两种模式，共 205 个图标。

:::demo

```vue
<template>
  <div>
    <!-- 模式切换 -->
    <div style="position: sticky; top: 60px; z-index: 100; background: white; padding: 16px 0; margin-bottom: 24px; border-bottom: 2px solid #f0f0f0;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <XButton 
          :type="colorful ? 'default' : 'primary'"
          @click="colorful = false"
          size="small"
        >
          单色模式
        </XButton>
        <XButton 
          :type="colorful ? 'primary' : 'default'"
          @click="colorful = true"
          size="small"
        >
          多彩模式
        </XButton>
        <span style="margin-left: 16px; color: #666; font-size: 14px;">
          共 205 个图标，点击复制代码
        </span>
      </div>
    </div>

    <!-- 所有分类 -->
    <div v-for="category in categories" :key="category.title" style="margin-bottom: 48px;">
      <h2 :id="category.title" style="font-size: 20px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
        {{ category.title }}
      </h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px;">
        <div 
          v-for="icon in category.icons" 
          :key="icon" 
          class="icon-item"
          @click="copy(icon)"
        >
          <XIcon :name="icon" :size="28" :colorful="colorful" />
          <span>{{ icon }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAlert } from '@xlui/xux-ui'

const alert = useAlert()
const colorful = ref(false)

const categories = [
  {
    title: '基础图标',
    icons: ['home', 'heart', 'star', 'user', 'users', 'search', 'settings', 'menu', 'more-vertical', 'more-horizontal']
  },
  {
    title: 'Loading 动画',
    icons: ['loading', 'loading-2', 'loading-3', 'loading-4', 'loading-5', 'loading-6']
  },
  {
    title: '箭头指示',
    icons: ['arrow-right', 'arrow-left', 'chevron-down', 'chevron-up']
  },
  {
    title: '状态提示',
    icons: ['check', 'check-circle', 'close', 'x-circle', 'plus', 'minus', 'alert-circle', 'alert-triangle', 'info']
  },
  {
    title: '文件操作',
    icons: ['folder', 'folder-plus', 'file', 'file-text', 'download', 'upload', 'trash', 'edit', 'copy', 'share', 'share-2', 'save', 'clipboard']
  },
  {
    title: '通用功能',
    icons: [
      'mail', 'bell', 'calendar', 'clock', 'image', 'link', 'lock', 'unlock',
      'eye', 'eye-off', 'sun', 'moon', 'wifi', 'bluetooth', 'refresh',
      'cloud', 'cloud-upload', 'cloud-download', 'gift', 'shopping-cart', 'shopping-bag',
      'credit-card', 'globe', 'map-pin', 'map', 'navigation', 'phone',
      'bookmark', 'tag', 'zap', 'activity', 'trending-up', 'trending-down',
      'printer', 'percent', 'dollar-sign', 'flag', 'coffee', 'umbrella',
      'droplet', 'thermometer', 'battery', 'battery-charging'
    ]
  },
  {
    title: '品牌 Logo',
    icons: [
      'github', 'twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'chrome',
      'wechat', 'weibo', 'taobao', 'jd', 'alipay', 'meituan', 'douyin', 'bilibili', 'xiaohongshu', 'dingtalk'
    ]
  },
  {
    title: '开发工具',
    icons: ['code', 'terminal', 'database', 'server', 'cpu', 'hard-drive', 'git-branch', 'git-commit', 'git-merge', 'command', 'codesandbox']
  },
  {
    title: '消息通讯',
    icons: ['message', 'message-circle', 'send', 'smile', 'thumbs-up', 'thumbs-down', 'at-sign', 'hash', 'rss', 'airplay', 'cast']
  },
  {
    title: '媒体控制',
    icons: ['music', 'video', 'camera', 'play', 'pause', 'stop', 'skip-forward', 'skip-back', 'volume', 'volume-up', 'volume-off', 'mic', 'mic-off', 'radio', 'film', 'headphones']
  },
  {
    title: '图像编辑',
    icons: ['zoom-in', 'zoom-out', 'rotate-cw', 'rotate-ccw', 'maximize', 'minimize', 'move', 'crop', 'scissors', 'aperture']
  },
  {
    title: '界面布局',
    icons: ['layers', 'grid', 'layout', 'sidebar', 'filter', 'sliders', 'columns', 'align-left', 'align-center', 'align-right']
  },
  {
    title: '数据分析',
    icons: ['pie-chart', 'bar-chart', 'target']
  },
  {
    title: '团队协作',
    icons: ['briefcase', 'user-check', 'user-plus', 'user-minus', 'award', 'shield']
  },
  {
    title: '天气环境',
    icons: ['cloud-rain', 'cloud-snow', 'wind', 'sunrise', 'sunset']
  },
  {
    title: '物流包装',
    icons: ['package', 'box', 'truck']
  },
  {
    title: '其他图标',
    icons: ['compass', 'anchor', 'feather', 'key', 'power',
    'sparkles', 'magic-wand', 'moon-stars', 'fire', 'snowflake', 'lightning', 'rainbow', 'butterfly', 'cherry', 'flower', 'leaf', 'tree',
    'rocket', 'crown', 'gem', 'diamond', 'medal', 'wand', 'palette', 'paint-brush', 'gamepad', 'cake', 'ice-cream' 
    ]
  }
]

const copy = async (icon) => {
  const code = `<XIcon name="${icon}" ${colorful.value ? 'colorful ' : ''}/>`
  const successCode = code + '\n复制成功，请粘贴到代码中'
  try {
    // 尝试使用现代 API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(code)
      
      alert.success(successCode, { duration: 2000 })
    } else {
      // 备用方案：创建临时文本框
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.left = '-999px'
      textarea.style.top = '-999px'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          alert.success(successCode, { duration: 2000 })
        } else {
          throw new Error('复制失败')
        }
      } finally {
        document.body.removeChild(textarea)
      }
    }
  } catch (err) {
    // 最终备用方案：显示可选择的文本
    const textarea = document.createElement('textarea')
    textarea.value = code
    textarea.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      border: 2px solid #3b82f6;
      border-radius: 8px;
      background: white;
      z-index: 10001;
      font-family: monospace;
      font-size: 14px;
      width: 400px;
      max-width: 90%;
    `
    textarea.readOnly = true
    document.body.appendChild(textarea)
    textarea.select()
    
    alert.info('请按 Ctrl+C (Mac: Cmd+C) 复制代码', { duration: 3000 })
    
    setTimeout(() => {
      if (textarea.parentNode) {
        document.body.removeChild(textarea)
      }
    }, 3000)
  }
}
</script>

<style scoped>
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border-radius: 8px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
  color: #666;
  word-break: break-all;
  text-align: center;
}

.icon-item:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.icon-item:hover :deep(svg) {
  transform: scale(1.2);
}

.icon-item:active {
  transform: translateY(0);
}

:deep(svg) {
  transition: transform 0.3s ease;
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
    
    <!-- 多彩模式 -->
    <XIcon name="heart" colorful />
    
    <!-- 设置大小 -->
    <XIcon name="star" :size="32" />
    
    <!-- 设置颜色 -->
    <XIcon name="home" color="#3b82f6" />
    
    <!-- 自定义多彩颜色 -->
    <XIcon name="heart" colorful colorful-color="#ff0080" />
    
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
| colorfulColor | 自定义多彩模式颜色 | `string` | - |
| rotate | 旋转角度 | `number` | `0` |
| flipX | 水平翻转 | `boolean` | `false` |
| flipY | 垂直翻转 | `boolean` | `false` |
| preset | 预设尺寸 (`xs`/`sm`/`md`/`lg`/`xl`) | `string` | - |

### 预设尺寸

| 值 | 大小 |
|----|------|
| xs | 16px |
| sm | 20px |
| md | 24px |
| lg | 32px |
| xl | 48px |
