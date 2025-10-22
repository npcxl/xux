# Tag 标签

用于标记和分类的标签组件。

<div style="columns: 2; column-gap: 32px; margin-top: 32px; align-items: start;">

<div style="break-inside: avoid; margin-bottom: 24px;">

## 基础用法

基本的标签展示。

:::demo

```vue
<template>
  <XFlex gap="8" wrap="wrap">
    <XTag>默认标签</XTag>
    <XTag type="primary">主要标签</XTag>
    <XTag type="success">成功标签</XTag>
    <XTag type="warning">警告标签</XTag>
    <XTag type="danger">危险标签</XTag>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 不同尺寸

提供三种尺寸的标签。

:::demo

```vue
<template>
  <XFlex align="center" gap="12">
    <XTag size="small" type="primary">小号标签</XTag>
    <XTag size="medium" type="primary">中号标签</XTag>
    <XTag size="large" type="primary">大号标签</XTag>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 可关闭标签

通过 `closable` 属性设置标签可关闭。

:::demo

```vue
<template>
  <XFlex wrap="wrap" gap="8">
    <XTag 
      v-for="tag in tags" 
      :key="tag.id"
      :type="tag.type"
      closable
      @close="handleClose(tag.id)"
    >
      {{ tag.label }}
    </XTag>
  </XFlex>
</template>

<script setup>
import { ref } from 'vue'
import { XFlex, XTag } from '@xlui/xux-ui'

const tags = ref([
  { id: 1, label: 'Vue.js', type: 'primary' },
  { id: 2, label: 'React', type: 'success' },
  { id: 3, label: 'Angular', type: 'warning' },
  { id: 4, label: 'Svelte', type: 'danger' }
])

const handleClose = (id) => {
  tags.value = tags.value.filter(tag => tag.id !== id)
}
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 带边框

通过 `bordered` 属性添加边框。

:::demo

```vue
<template>
  <XFlex vertical gap="12">
    <XFlex gap="8" wrap="wrap">
      <XTag bordered>默认</XTag>
      <XTag type="primary" bordered>主要</XTag>
      <XTag type="success" bordered>成功</XTag>
      <XTag type="warning" bordered>警告</XTag>
      <XTag type="danger" bordered>危险</XTag>
    </XFlex>
    
    <XFlex gap="8" wrap="wrap">
      <XTag bordered closable>可关闭</XTag>
      <XTag type="primary" bordered closable>可关闭</XTag>
      <XTag type="success" bordered closable>可关闭</XTag>
    </XFlex>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 标签组

标签组合使用示例。

:::demo

```vue
<template>
  <XFlex vertical gap="16">
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #666">前端技术栈</div>
      <XFlex wrap="wrap" gap="8">
        <XTag type="primary">Vue 3</XTag>
        <XTag type="primary">TypeScript</XTag>
        <XTag type="primary">Vite</XTag>
        <XTag type="primary">Pinia</XTag>
      </XFlex>
    </div>
    
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #666">项目状态</div>
      <XFlex wrap="wrap" gap="8">
        <XTag type="success">已完成</XTag>
        <XTag type="warning">进行中</XTag>
        <XTag type="danger">已逾期</XTag>
        <XTag>待开始</XTag>
      </XFlex>
    </div>
    
    <div>
      <div style="font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #666">标签云</div>
      <XFlex wrap="wrap" gap="8">
        <XTag size="small">JavaScript</XTag>
        <XTag size="small" type="primary">CSS3</XTag>
        <XTag size="small" type="success">HTML5</XTag>
        <XTag size="small">Node.js</XTag>
        <XTag size="small" type="warning">Webpack</XTag>
        <XTag size="small" type="danger">Git</XTag>
        <XTag size="small">Docker</XTag>
        <XTag size="small" type="primary">MySQL</XTag>
      </XFlex>
    </div>
  </XFlex>
</template>

<script setup>
import { XFlex, XTag } from '@xlui/xux-ui'
</script>
```

:::

</div>

<div style="break-inside: avoid; margin-bottom: 24px;">

## 动态添加标签

可以动态添加和删除标签。

:::demo

```vue
<template>
  <XFlex wrap="wrap" gap="8">
    <XTag 
      v-for="tag in dynamicTags" 
      :key="tag"
      closable
      @close="removeTag(tag)"
    >
      {{ tag }}
    </XTag>
    
    <input
      v-if="inputVisible"
      ref="inputRef"
      v-model="inputValue"
      type="text"
      style="width: 96px; padding: 4px 8px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px"
      @keyup.enter="addTag"
      @blur="addTag"
    >
    
    <button
      v-else
      @click="showInput"
      style="padding: 4px 12px; font-size: 14px; border: 1px dashed #ddd; border-radius: 4px; background: white; cursor: pointer; transition: all 0.2s"
    >
      + 新标签
    </button>
  </XFlex>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { XFlex, XTag } from '@xlui/xux-ui'

const dynamicTags = ref(['标签1', '标签2', '标签3'])
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref()

const removeTag = (tag) => {
  dynamicTags.value = dynamicTags.value.filter(t => t !== tag)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const addTag = () => {
  if (inputValue.value && !dynamicTags.value.includes(inputValue.value)) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
```

:::

</div>

</div>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| type | 标签类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| size | 标签尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| closable | 是否可关闭 | `boolean` | `false` |
| bordered | 是否带边框 | `boolean` | `false` |
| cursor | 鼠标指针样式 | `string` | `'pointer'` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭标签时触发 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签内容 |

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