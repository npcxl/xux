# Modal 模态框

模态框组件，用于在当前页面打开浮层，承载相关操作或信息。

## 基础用法

最基本的模态框用法。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
    >
      打开模态框
    </XButton>
    
    <XModal v-model:visible="visible" title="基础模态框">
      <p>这是模态框的内容</p>
      <p>可以放置任何内容</p>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 自定义尺寸

通过 `size` 或 `width` 属性设置模态框大小。

:::demo

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <XButton 
      @click="visibleSmall = true"
      type="primary"
    >
      小尺寸
    </XButton>
    <button 
      @click="visibleMedium = true"
      v
    >
      中等尺寸
    </button>
    <button 
      @click="visibleLarge = true"
     type="primary"
    >
      大尺寸
    </button>
    <button 
      @click="visibleCustom = true"
      type="primary"
    >
      自定义宽度
    </button>
  </div>
  
  <XModal v-model:visible="visibleSmall" title="小尺寸模态框" size="small">
    <p>这是一个小尺寸的模态框（400px）</p>
  </XModal>
  
  <XModal v-model:visible="visibleMedium" title="中等尺寸模态框" size="medium">
    <p>这是一个中等尺寸的模态框（600px）</p>
  </XModal>
  
  <XModal v-model:visible="visibleLarge" title="大尺寸模态框" size="large">
    <p>这是一个大尺寸的模态框（800px）</p>
  </XModal>
  
  <XModal v-model:visible="visibleCustom" title="自定义宽度" width="1000px">
    <p>这是一个自定义宽度的模态框（1000px）</p>
  </XModal>
</template>

<script setup>
import { ref } from 'vue'

const visibleSmall = ref(false)
const visibleMedium = ref(false)
const visibleLarge = ref(false)
const visibleCustom = ref(false)
</script>
```

:::

## 全屏模态框

设置 `fullscreen` 属性显示全屏模态框。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      全屏模态框
    </XButton>
    
    <XModal v-model:visible="visible" title="全屏模态框" fullscreen>
      <div class="space-y-4">
        <p>这是一个全屏显示的模态框</p>
        <p>适合需要大量内容展示的场景</p>
        <p>比如：详细表单、图片查看、数据展示等</p>
      </div>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 可拖拽模态框

设置 `draggable` 属性使模态框可以通过标题栏拖拽移动。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      可拖拽模态框
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="拖拽我试试" 
      draggable
    >
      <div class="space-y-2">
        <p> 1 点击标题栏并拖拽可以移动窗口位置</p>
        <p> 2 拖拽时会有视觉反馈效果</p>
        <p> 3 重新打开会恢复到中心位置</p>
      </div>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 无蒙版模态框

设置 `:show-mask="false"` 隐藏蒙版，仅用淡淡的暗色背景来区分层级。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      无蒙版模态框
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="无蒙版模态框" 
      :show-mask="false"
    >
      <div class="space-y-2">
        <p> 1 没有深色蒙版遮罩</p>
        <p> 2 使用加强的阴影来区分层级</p>
        <p> 3 适合不想完全遮挡背景的场景</p>
      </div>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 拖拽 + 无蒙版组合

结合拖拽和无蒙版功能，实现更灵活的交互。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      拖拽 + 无蒙版
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="自由模态框" 
      draggable
      :show-mask="false"
    >
      <div class="space-y-2">
        <p> 1 可以拖拽移动位置</p>
        <p> 2 没有蒙版遮挡背景</p>
        <p> 3 更像一个独立的浮动窗口</p>
        <p> 4 适合多窗口操作场景</p>
      </div>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 自定义按钮文本

自定义确认和取消按钮的文本。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
    type="danger"
    >
      删除操作
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="确认删除"
      confirm-text="删除"
      cancel-text="我再想想"
      @confirm="handleDelete"
      @cancel="handleCancel"
    >
      <p>您确定要删除这个项目吗？</p>
      <p class="text-red-600 text-sm mt-2">此操作无法撤销！</p>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const visible = ref(false)
const msg = xlMsg()

const handleDelete = () => {
  msg.success('删除成功')
  visible.value = false
}

const handleCancel = () => {
  msg.info('已取消删除')
}
</script>
```

:::

## 异步关闭

通过 `confirm-loading` 属性控制确认按钮的加载状态。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      提交表单
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="提交数据"
      :confirm-loading="loading"
      @confirm="handleSubmit"
    >
      <p>点击确定后将模拟异步提交...</p>
      <p class="text-sm text-gray-500 mt-2">（2秒后自动关闭）</p>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const visible = ref(false)
const loading = ref(false)
const msg = xlMsg()

const handleSubmit = () => {
  loading.value = true
  
  setTimeout(() => {
    loading.value = false
    visible.value = false
    msg.success('提交成功')
  }, 2000)
}
</script>
```

:::

## 隐藏头部或底部

通过 `show-header` 和 `show-footer` 控制显示。

:::demo

```vue
<template>
  <div class="flex gap-2">
    <XButton 
      @click="visibleNoHeader = true"
     type="primary"
    >
      无头部
    </XButton>
    <XButton 
      @click="visibleNoFooter = true"
     type="primary"
    >
      无底部
    </XButton>
    <XButton 
      @click="visibleContentOnly = true"
    type="primary"
    >
      仅内容
    </XButton>
  </div>
  
  <XModal v-model:visible="visibleNoHeader" :show-header="false">
    <p>这是一个没有头部的模态框</p>
  </XModal>
  
  <XModal v-model:visible="visibleNoFooter" title="无底部" :show-footer="false">
    <p>这是一个没有底部的模态框</p>
  </XModal>
  
  <XModal 
    v-model:visible="visibleContentOnly" 
    :show-header="false" 
    :show-footer="false"
    :show-close="false"
  >
    <div class="text-center py-8">
      <p class="text-lg mb-4">仅展示内容</p>
      <XButton 
        @click="visibleContentOnly = false"
       type="primary"
      >
        关闭
      </XButton>
    </div>
  </XModal>
</template>

<script setup>
import { ref } from 'vue'

const visibleNoHeader = ref(false)
const visibleNoFooter = ref(false)
const visibleContentOnly = ref(false)
</script>
```

:::

## 自定义插槽

使用插槽自定义头部和底部内容。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      自定义插槽
    </XButton>
    
    <XModal v-model:visible="visible">
      <template #header>
        <div class="flex items-center gap-2">
          <span class="text-xl">🎉</span>
          <h3 class="text-lg font-semibold">自定义头部</h3>
        </div>
      </template>
      
      <div class="space-y-3">
        <p>这是自定义的头部和底部内容</p>
        <p>可以放置任何组件和元素</p>
      </div>
      
      <template #footer>
        <div class="flex items-center justify-between w-full">
          <span class="text-sm text-gray-500">提示信息</span>
          <div class="flex gap-2">
            <button 
              @click="visible = false"
              class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
            >
              稍后再说
            </button>
            <button 
              @click="handleSave"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
            >
              保存设置
            </button>
          </div>
        </div>
      </template>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { xlMsg } from '@xlui/xux-ui'

const visible = ref(false)
const msg = xlMsg()

const handleSave = () => {
  msg.success('保存成功')
  visible.value = false
}
</script>
```

:::

## 禁用遮罩关闭

设置 `:mask-closable="false"` 禁止点击遮罩关闭。

:::demo

```vue
<template>
  <div>
    <XButton 
      @click="visible = true"
      type="primary"
    >
      禁用遮罩关闭
    </XButton>
    
    <XModal 
      v-model:visible="visible" 
      title="重要提示"
      :mask-closable="false"
      :esc-closable="false"
    >
      <p>此模态框无法通过点击遮罩或按 ESC 键关闭</p>
      <p class="text-sm text-gray-500 mt-2">必须点击按钮才能关闭</p>
    </XModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible / v-model:visible | 是否显示模态框 | `boolean` | `false` |
| title | 模态框标题 | `string` | `'提示'` |
| width | 模态框宽度 | `string` | - |
| size | 预设尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| fullscreen | 是否全屏显示 | `boolean` | `false` |
| showHeader | 是否显示头部 | `boolean` | `true` |
| showFooter | 是否显示底部 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| showConfirm | 是否显示确认按钮 | `boolean` | `true` |
| cancelText | 取消按钮文本 | `string` | `'取消'` |
| confirmText | 确认按钮文本 | `string` | `'确定'` |
| confirmLoading | 确认按钮加载状态 | `boolean` | `false` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| escClosable | 按 ESC 键是否关闭 | `boolean` | `true` |
| draggable | 是否可拖拽移动 | `boolean` | `false` |
| showMask | 是否显示蒙版 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态改变时触发 | `(visible: boolean)` |
| close | 关闭时触发 | `()` |
| cancel | 点击取消按钮时触发 | `()` |
| confirm | 点击确认按钮时触发 | `()` |
| opened | 完全打开后触发 | `()` |
| closed | 完全关闭后触发 | `()` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 模态框内容 |
| header | 自定义头部内容 |
| footer | 自定义底部内容 |

### Exposed Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 关闭模态框 | `()` |


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
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
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