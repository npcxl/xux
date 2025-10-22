<template>
  <!-- 品牌LOGO使用完整svg -->
  <div 
    v-if="isFullSvgIcon"
    :class="['x-icon', sizeClass]"
    :style="{ ...iconStyle, width: computedSize, height: computedSize }"
  >
    <slot>
      <component :is="iconComponent" v-if="iconComponent" />
    </slot>
  </div>
  
  <!-- 普通图标使用svg包装 -->
  <svg
    v-else
    :class="['x-icon', sizeClass]"
    :style="iconStyle"
    :width="computedSize"
    :height="computedSize"
    :viewBox="viewBox"
    :fill="computedFill"
    :stroke="computedStroke"
    :stroke-width="computedStrokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot>
      <component :is="iconComponent" v-if="iconComponent" />
    </slot>
  </svg>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

export interface IconProps {
  /** 图标名称 */
  name?: string
  /** 图标大小 */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 填充颜色 */
  fill?: string
  /** 描边颜色 */
  stroke?: string
  /** 线条粗细 */
  strokeWidth?: number | string
  /** 线条端点样式 */
  strokeLinecap?: 'butt' | 'round' | 'square'
  /** 线条连接样式 */
  strokeLinejoin?: 'miter' | 'round' | 'bevel'
  /** 视图框 */
  viewBox?: string
  /** 旋转角度 */
  rotate?: number
  /** 是否翻转（水平） */
  flipX?: boolean
  /** 是否翻转（垂直） */
  flipY?: boolean
  /** 预设尺寸 */
  preset?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** 是否启用多彩渐变模式 */
  colorful?: boolean
  /** 自定义多彩模式颜色（优先级高于预设） */
  colorfulColor?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  rotate: 0,
  flipX: false,
  flipY: false
})

// 预设尺寸映射
const presetSizes: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48
}

// 多彩模式颜色映射
const colorfulColors: Record<string, string> = {
  'home': '#3b82f6',
  'heart': '#ef4444',
  'star': '#eab308',
  'user': '#8b5cf6',
  'search': '#6b7280',
  'settings': '#1a1a1a',
  'check': '#10b981',
  'close': '#ef4444',
  'arrow-right': '#3b82f6',
  'arrow-left': '#3b82f6',
  'chevron-down': '#6b7280',
  'chevron-up': '#6b7280',
  'plus': '#10b981',
  'minus': '#ef4444',
  'loading': '#3b82f6',
  'loading-2': '#8b5cf6',
  'loading-3': '#10b981',
  'loading-4': '#f59e0b',
  'loading-5': '#ec4899',
  'loading-6': '#06b6d4',
  'menu': '#1a1a1a',
  'trash': '#ef4444',
  'edit': '#f59e0b',
  'download': '#3b82f6',
  'upload': '#10b981',
  'mail': '#3b82f6',
  'bell': '#f59e0b',
  'calendar': '#8b5cf6',
  'clock': '#6b7280',
  'folder': '#eab308',
  'file': '#6b7280',
  'image': '#ec4899',
  'link': '#3b82f6',
  'lock': '#ef4444',
  'unlock': '#10b981',
  'eye': '#3b82f6',
  'eye-off': '#6b7280',
  'sun': '#eab308',
  'moon': '#8b5cf6',
  'wifi': '#10b981',
  'refresh': '#3b82f6',
  'share': '#10b981',
  'copy': '#6b7280',
  'alert-circle': '#ef4444',
  'info': '#3b82f6',
  'alert-triangle': '#f59e0b',
  'check-circle': '#10b981',
  'x-circle': '#ef4444',
  'more-vertical': '#6b7280',
  'more-horizontal': '#6b7280',
  'github': '#1a1a1a',
  'twitter': '#1da1f2',
  'facebook': '#1877f2',
  'instagram': '#e4405f',
  'linkedin': '#0a66c2',
  'youtube': '#ff0000',
  'wechat': '#07c160',
  'chrome': '#4285f4',
  // 国内品牌
  'taobao': '#ff6a00',
  'jd': '#e3001b',
  'douyin': '#000000',
  'alipay': '#1677ff',
  'meituan': '#ffc300',
  'weibo': '#e6162d',
  'bilibili': '#00a1d6',
  'xiaohongshu': '#ff2442',
  'dingtalk': '#1e6fff',
  'code': '#f59e0b',
  'terminal': '#10b981',
  'database': '#3b82f6',
  'server': '#8b5cf6',
  'cpu': '#ef4444',
  'hard-drive': '#6b7280',
  'cloud': '#3b82f6',
  'gift': '#ec4899',
  'shopping-cart': '#10b981',
  'credit-card': '#8b5cf6',
  'globe': '#3b82f6',
  'map-pin': '#ef4444',
  'phone': '#10b981',
  'bookmark': '#eab308',
  'tag': '#f59e0b',
  'zap': '#eab308',
  'activity': '#10b981',
  'trending-up': '#10b981',
  'music': '#ec4899',
  'video': '#8b5cf6',
  'camera': '#3b82f6',
  'printer': '#6b7280',
  'message': '#3b82f6',
  'send': '#10b981',
  'message-circle': '#3b82f6',
  'smile': '#eab308',
  'thumbs-up': '#10b981',
  'thumbs-down': '#ef4444',
  'award': '#f59e0b',
  'shield': '#10b981',
  'package': '#8b5cf6',
  'box': '#f59e0b',
  'truck': '#3b82f6',
  'layers': '#8b5cf6',
  'grid': '#6b7280',
  'layout': '#3b82f6',
  'sidebar': '#6b7280',
  'filter': '#8b5cf6',
  'sliders': '#6b7280',
  'pie-chart': '#3b82f6',
  'bar-chart': '#10b981',
  'target': '#ef4444',
  'briefcase': '#8b5cf6',
  'users': '#3b82f6',
  'user-check': '#10b981',
  'user-plus': '#10b981',
  'user-minus': '#ef4444',
  'compass': '#3b82f6',
  'anchor': '#6b7280',
  'feather': '#ec4899',
  'key': '#f59e0b',
  'power': '#ef4444',
  // 动漫风格图标
  'sparkles': '#eab308',
  'magic-wand': '#a855f7',
  'moon-stars': '#8b5cf6',
  'rocket': '#3b82f6',
  'crown': '#eab308',
  'gem': '#ec4899',
  'diamond': '#06b6d4',
  'fire': '#ef4444',
  'snowflake': '#06b6d4',
  'lightning': '#eab308',
  'rainbow': '#ec4899',
  'palette': '#8b5cf6',
  'paint-brush': '#f59e0b',
  'cherry': '#ef4444',
  'leaf': '#10b981',
  'flower': '#ec4899',
  'tree': '#10b981',
  'butterfly': '#ec4899',
  'medal': '#eab308',
  'wand': '#a855f7',
  'gamepad': '#8b5cf6',
  'cake': '#ec4899',
  'ice-cream': '#06b6d4'
}

// 计算实际尺寸
const computedSize = computed(() => {
  if (props.preset) {
    return presetSizes[props.preset]
  }
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

// 尺寸类名
const sizeClass = computed(() => {
  if (props.preset) {
    return `x-icon-${props.preset}`
  }
  return ''
})

// 计算实际的 fill 属性
const computedFill = computed(() => {
  if (props.colorful) {
    return 'none' // 多彩模式使用线条，不填充
  }
  return props.fill
})

// 计算实际的 stroke 属性
const computedStroke = computed(() => {
  if (props.colorful) {
    return 'currentColor' // 多彩模式使用线条
  }
  return props.stroke
})

// 计算实际的 strokeWidth 属性
const computedStrokeWidth = computed(() => {
  if (props.colorful) {
    return 2 // 多彩模式使用固定线宽
  }
  return props.strokeWidth
})

// 图标样式
const iconStyle = computed(() => {
  const styles: Record<string, string> = {}
  
  // 多彩模式：优先使用自定义颜色，再使用预设颜色，否则使用 props.color
  if (props.colorful) {
    if (props.colorfulColor) {
      styles.color = props.colorfulColor
    } else if (props.name) {
      styles.color = colorfulColors[props.name] || '#1a1a1a'
    }
  } else if (props.color) {
    styles.color = props.color
  }
  
  const transforms: string[] = []
  
  if (props.rotate) {
    transforms.push(`rotate(${props.rotate}deg)`)
  }
  
  if (props.flipX) {
    transforms.push('scaleX(-1)')
  }
  
  if (props.flipY) {
    transforms.push('scaleY(-1)')
  }
  
  if (transforms.length > 0) {
    styles.transform = transforms.join(' ')
  }
  
  return styles
})

// 使用完整svg的品牌LOGO列表（这些LOGO使用彩色svg，不可调色）
const fullSvgIcons = ['taobao', 'jd', 'douyin', 'alipay', 'meituan', 'weibo', 'bilibili', 'xiaohongshu', 'dingtalk', 'chrome', 'wechat']

// 判断是否是完整svg图标
const isFullSvgIcon = computed(() => {
  return props.name ? fullSvgIcons.includes(props.name) : false
})

// 动态加载图标组件
const iconComponent = computed(() => {
  if (!props.name) return null
  
  try {
    return defineAsyncComponent(() => 
      import(`./icons/${props.name}.vue`).catch(() => {
        console.warn(`Icon "${props.name}" not found`)
        return null
      })
    )
  } catch {
    return null
  }
})
</script>

<style scoped>
.x-icon {
  display: inline-block;
  vertical-align: middle;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

/* 品牌LOGO完整svg样式 */
.x-icon :deep(svg) {
  width: 100% !important;
  height: 100% !important;
  display: block;
}

.x-icon-xs {
  width: 16px;
  height: 16px;
}

.x-icon-sm {
  width: 20px;
  height: 20px;
}

.x-icon-md {
  width: 24px;
  height: 24px;
}

.x-icon-lg {
  width: 32px;
  height: 32px;
}

.x-icon-xl {
  width: 48px;
  height: 48px;
}
</style>

