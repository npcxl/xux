# Tour 漫游式引导

新手引导组件，用于分步骤引导用户了解产品功能和操作流程。

## 基础用法

最基本的漫游式引导用法。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导</XButton>
    
    <div class="demo-container mt-8">
      <div class="demo-box" id="tour-demo-1">
        <h4>第一个功能</h4>
        <p>这是第一个需要介绍的功能</p>
      </div>
      
      <div class="demo-box" id="tour-demo-2">
        <h4>第二个功能</h4>
        <p>这是第二个需要介绍的功能</p>
      </div>
      
      <div class="demo-box" id="tour-demo-3">
        <h4>第三个功能</h4>
        <p>这是第三个需要介绍的功能</p>
      </div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tourVisible = ref(false)

const steps = [
  {
    target: '#tour-demo-1',
    title: '欢迎使用',
    description: '这是一个功能强大的组件，让我们一起来了解它的使用方法。',
    placement: 'bottom'
  },
  {
    target: '#tour-demo-2',
    title: '核心功能',
    description: '这里展示了组件的核心功能，你可以通过简单的配置来实现复杂的交互。',
    placement: 'bottom'
  },
  {
    target: '#tour-demo-3',
    title: '完成',
    description: '恭喜你！已经学会了基本使用方法，现在可以开始使用了。',
    placement: 'bottom'
  }
]

const startTour = () => {
  tourVisible.value = true
}
</script>

<style scoped>
.demo-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.demo-box {
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.demo-box:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.demo-box h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
}

.demo-box p {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

@media (max-width: 768px) {
  .demo-container {
    grid-template-columns: 1fr;
  }
}
</style>
```

:::

## 不同位置

通过 `placement` 设置引导卡片的位置。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导</XButton>
    
    <div class="placement-demo mt-8">
      <div id="tour-top" class="placement-box">顶部</div>
      <div id="tour-bottom" class="placement-box">底部</div>
      <div id="tour-left" class="placement-box">左侧</div>
      <div id="tour-right" class="placement-box">右侧</div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tourVisible = ref(false)

const steps = [
  {
    target: '#tour-top',
    title: '顶部引导',
    description: '引导卡片显示在目标元素的顶部',
    placement: 'top'
  },
  {
    target: '#tour-bottom',
    title: '底部引导',
    description: '引导卡片显示在目标元素的底部',
    placement: 'bottom'
  },
  {
    target: '#tour-left',
    title: '左侧引导',
    description: '引导卡片显示在目标元素的左侧',
    placement: 'left'
  },
  {
    target: '#tour-right',
    title: '右侧引导',
    description: '引导卡片显示在目标元素的右侧',
    placement: 'right'
  }
]

const startTour = () => {
  tourVisible.value = true
}
</script>

<style scoped>
.placement-demo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}

.placement-box {
  padding: 30px;
  text-align: center;
  border: 2px dashed #3b82f6;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea20, #764ba220);
  font-weight: 600;
  color: #3b82f6;
  transition: all 0.3s ease;
}

.placement-box:hover {
  background: linear-gradient(135deg, #667eea40, #764ba240);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .placement-demo {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }
}
</style>
```

:::

## 自定义卡片宽度

使用 `cardWidth` 设置引导卡片的宽度。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导</XButton>
    
    <div class="width-demo mt-8">
      <div id="tour-width-1" class="width-box">小卡片</div>
      <div id="tour-width-2" class="width-box">大卡片</div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tourVisible = ref(false)

const steps = [
  {
    target: '#tour-width-1',
    title: '小卡片',
    description: '这是一个宽度为 300px 的小卡片，适合简短的提示。',
    placement: 'bottom',
    cardWidth: 300
  },
  {
    target: '#tour-width-2',
    title: '大卡片',
    description: '这是一个宽度为 500px 的大卡片，可以容纳更多的内容和详细的说明。你可以在这里展示更复杂的引导信息，包括多段文字、列表等内容。',
    placement: 'bottom',
    cardWidth: 500
  }
]

const startTour = () => {
  tourVisible.value = true
}
</script>

<style scoped>
.width-demo {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.width-box {
  padding: 40px 60px;
  border: 2px solid #8b5cf6;
  border-radius: 12px;
  background: #8b5cf620;
  font-weight: 600;
  color: #8b5cf6;
  transition: all 0.3s ease;
}

.width-box:hover {
  background: #8b5cf640;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(139, 92, 246, 0.25);
}
</style>
```

:::

## 自定义偏移

使用 `offset` 自定义引导卡片的偏移量。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导</XButton>
    
    <div class="offset-demo mt-8">
      <div id="tour-offset" class="offset-box">
        自定义偏移
      </div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tourVisible = ref(false)

const steps = [
  {
    target: '#tour-offset',
    title: '自定义偏移',
    description: '这个卡片向右偏移了 50px，向下偏移了 20px',
    placement: 'bottom',
    offset: { x: 50, y: 20 }
  }
]

const startTour = () => {
  tourVisible.value = true
}
</script>

<style scoped>
.offset-demo {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.offset-box {
  padding: 40px 60px;
  border: 2px solid #ec4899;
  border-radius: 12px;
  background: #ec489920;
  font-weight: 600;
  color: #ec4899;
}
</style>
```

:::

## 可关闭遮罩

设置 `mask-closable` 允许点击遮罩关闭引导。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导（可点击遮罩关闭）</XButton>
    
    <div class="mask-demo mt-8">
      <div id="tour-mask" class="mask-box">
        点击遮罩可关闭
      </div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
      :mask-closable="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tourVisible = ref(false)

const steps = [
  {
    target: '#tour-mask',
    title: '可关闭遮罩',
    description: '试试点击遮罩区域，可以直接关闭引导',
    placement: 'bottom'
  }
]

const startTour = () => {
  tourVisible.value = true
}
</script>

<style scoped>
.mask-demo {
  display: flex;
  justify-content: center;
  padding: 40px;
}

.mask-box {
  padding: 40px 60px;
  border: 2px solid #10b981;
  border-radius: 12px;
  background: #10b98120;
  font-weight: 600;
  color: #10b981;
}
</style>
```

:::

## 生命周期钩子

使用 `beforeEnter` 和 `beforeLeave` 钩子函数。

:::demo

```vue
<template>
  <div>
    <XButton type="primary" @click="startTour">开始引导</XButton>
    
    <div class="lifecycle-demo mt-8">
      <div id="tour-lifecycle-1" class="lifecycle-box">第一步</div>
      <div id="tour-lifecycle-2" class="lifecycle-box" :class="{ highlight: isHighlight }">
        第二步（会高亮）
      </div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
      @change="handleChange"
      @finish="handleFinish"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const tourVisible = ref(false)
const isHighlight = ref(false)
const msg = xlMsg()

const steps = [
  {
    target: '#tour-lifecycle-1',
    title: '第一步',
    description: '这是第一步，进入下一步时会触发钩子函数',
    placement: 'bottom',
    beforeLeave: async () => {
      msg.info('即将进入第二步')
    }
  },
  {
    target: '#tour-lifecycle-2',
    title: '第二步',
    description: '注意这个元素已经高亮了！',
    placement: 'bottom',
    beforeEnter: async () => {
      isHighlight.value = true
      msg.success('进入第二步，元素已高亮')
    },
    beforeLeave: async () => {
      isHighlight.value = false
    }
  }
]

const startTour = () => {
  tourVisible.value = true
  isHighlight.value = false
}

const handleChange = (current) => {
  console.log('当前步骤:', current)
}

const handleFinish = () => {
  msg.success('引导完成！')
  isHighlight.value = false
}
</script>

<style scoped>
.lifecycle-demo {
  display: flex;
  gap: 40px;
  justify-content: center;
}

.lifecycle-box {
  padding: 40px 60px;
  border: 2px solid #6366f1;
  border-radius: 12px;
  background: #6366f120;
  font-weight: 600;
  color: #6366f1;
  transition: all 0.3s ease;
}

.lifecycle-box.highlight {
  background: #6366f160;
  border-color: #4f46e5;
  box-shadow: 0 0 0 4px #6366f140, 0 8px 24px rgba(99, 102, 241, 0.3);
  transform: scale(1.05);
}
</style>
```

:::

## 复杂示例

完整的产品引导示例。

:::demo

```vue
<template>
  <div>
    <div class="product-header">
      <h3>产品功能演示</h3>
      <XButton id="tour-start-btn" type="primary" @click="startTour">
        开始产品引导
      </XButton>
    </div>
    
    <div class="product-demo mt-6">
      <div class="sidebar" id="tour-sidebar">
        <div class="menu-item">菜单项 1</div>
        <div class="menu-item">菜单项 2</div>
        <div class="menu-item">菜单项 3</div>
      </div>
      
      <div class="main-content">
        <div class="toolbar" id="tour-toolbar">
          <button class="tool-btn">工具 1</button>
          <button class="tool-btn">工具 2</button>
          <button class="tool-btn">工具 3</button>
        </div>
        
        <div class="content-area" id="tour-content">
          <h4>主要内容区域</h4>
          <p>这里是主要的内容展示区域</p>
        </div>
        
        <div class="action-bar" id="tour-action">
          <XButton size="small">取消</XButton>
          <XButton size="small" type="primary">保存</XButton>
        </div>
      </div>
    </div>

    <XTour
      v-model="tourVisible"
      :steps="steps"
      @finish="handleFinish"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const tourVisible = ref(false)
const msg = xlMsg()

const steps = [
  {
    target: '#tour-start-btn',
    title: '👋 欢迎使用',
    description: '<p>欢迎来到产品引导！</p><p>让我们一起了解主要功能。</p>',
    placement: 'bottom',
    cardWidth: 380
  },
  {
    target: '#tour-sidebar',
    title: '📋 导航菜单',
    description: '<p>这是左侧导航菜单</p><p>你可以在这里切换不同的功能模块</p>',
    placement: 'right',
    cardWidth: 350
  },
  {
    target: '#tour-toolbar',
    title: '🛠 工具栏',
    description: '<p>这里是常用的工具按钮</p><p>可以快速执行常见操作</p>',
    placement: 'bottom',
    cardWidth: 350
  },
  {
    target: '#tour-content',
    title: '📄 内容区域',
    description: '<p>主要的工作区域</p><p>所有的内容都会在这里展示和编辑</p>',
    placement: 'top',
    cardWidth: 380
  },
  {
    target: '#tour-action',
    title: '✅ 操作按钮',
    description: '<p>完成编辑后</p><p>可以在这里保存或取消修改</p>',
    placement: 'top',
    cardWidth: 350
  }
]

const startTour = () => {
  tourVisible.value = true
}

const handleFinish = () => {
  msg.success('🎉 引导完成！开始使用吧')
}
</script>

<style scoped>
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea20, #764ba220);
  border-radius: 12px;
}

.product-header h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.product-demo {
  display: flex;
  gap: 20px;
  min-height: 400px;
}

.sidebar {
  width: 200px;
  padding: 20px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
}

.menu-item {
  padding: 12px 16px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #374151;
}

.menu-item:hover {
  background: #3b82f610;
  color: #3b82f6;
  transform: translateX(4px);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.toolbar {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
}

.tool-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background: #3b82f610;
  border-color: #3b82f6;
  color: #3b82f6;
}

.content-area {
  flex: 1;
  padding: 24px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
}

.content-area h4 {
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
}

.content-area p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.action-bar {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
}

@media (max-width: 768px) {
  .product-demo {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
  }
}
</style>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 是否显示引导 | `boolean` | `false` |
| steps | 引导步骤配置 | `TourStep[]` | `[]` |
| current / v-model:current | 当前步骤索引 | `number` | `0` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `false` |
| maskColor | 遮罩颜色 | `string` | `'rgba(0, 0, 0, 0.5)'` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| animated | 是否开启浮动动画 | `boolean` | `true` |
| gap | 卡片与目标元素的间距 | `number` | `12` |
| prevButtonText | 上一步按钮文本 | `string` | `'上一步'` |
| nextButtonText | 下一步按钮文本 | `string` | `'下一步'` |
| finishButtonText | 完成按钮文本 | `string` | `'完成'` |

### TourStep

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| target | 目标元素选择器或 DOM 元素 | `string \| HTMLElement` | - |
| title | 步骤标题 | `string` | - |
| description | 步骤描述（支持 HTML） | `string` | - |
| placement | 卡片位置 | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `'bottom'` |
| cardWidth | 卡片宽度 | `number \| string` | `360` |
| offset | 位置偏移 | `{ x?: number; y?: number }` | - |
| beforeEnter | 进入步骤前的回调 | `() => void \| Promise<void>` | - |
| beforeLeave | 离开步骤前的回调 | `() => void \| Promise<void>` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 显示状态改变时触发 | `(visible: boolean)` |
| update:current | 当前步骤改变时触发 | `(current: number)` |
| change | 步骤改变时触发 | `(current: number)` |
| close | 关闭引导时触发 | `()` |
| finish | 完成引导时触发 | `()` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 自定义卡片内容 | `{ step: TourStep, current: number, total: number }` |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| goToStep | 跳转到指定步骤 | `(index: number)` |
| next | 下一步 | `()` |
| prev | 上一步 | `()` |
| finish | 完成引导 | `()` |
| close | 关闭引导 | `()` |

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

