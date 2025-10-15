# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 基础用法

基本的抽屉用法。

:::demo

```vue
<template>
  <XButton @click="visible = true">打开抽屉</XButton>
  <XDrawer v-model="visible" title="基础抽屉">
    <p>这是抽屉的内容...</p>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
```

:::

## 不同方向

通过 `placement` 属性设置抽屉弹出方向。

:::demo

```vue
<template>
  <div class="flex gap-2 flex-wrap">
    <XButton @click="showDrawer('left')">从左侧</XButton>
    <XButton @click="showDrawer('right')">从右侧</XButton>
    <XButton @click="showDrawer('top')">从顶部</XButton>
    <XButton @click="showDrawer('bottom')">从底部</XButton>
  </div>
  
  <XDrawer v-model="visible" :title="`${placement} 抽屉`" :placement="placement">
    <p>从{{ { left: '左侧', right: '右侧', top: '顶部', bottom: '底部' }[placement] }}滑出</p>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const placement = ref('right')

const showDrawer = (pos) => {
  placement.value = pos
  visible.value = true
}
</script>
```

:::

## 自定义尺寸

使用 `size` 属性自定义抽屉宽度或高度。

:::demo

```vue
<template>
  <div class="flex gap-2">
    <XButton @click="showSize('300px')">小尺寸</XButton>
    <XButton @click="showSize('500px')">中等尺寸</XButton>
    <XButton @click="showSize('800px')">大尺寸</XButton>
  </div>
  
  <XDrawer v-model="sizeVisible" title="自定义尺寸" :size="size">
    <p>当前宽度：{{ size }}</p>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'

const sizeVisible = ref(false)
const size = ref('378px')

const showSize = (s) => {
  size.value = s
  sizeVisible.value = true
}
</script>
```

:::

## 无遮罩

设置 `mask="false"` 不显示遮罩层。

:::demo

```vue
<template>
  <XButton @click="noMaskVisible = true">无遮罩抽屉</XButton>
  <XDrawer v-model="noMaskVisible" title="无遮罩" :mask="false">
    <p>没有遮罩层，可以操作页面其他元素</p>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'
const noMaskVisible = ref(false)
</script>
```

:::

## 禁用遮罩关闭

设置 `:mask-closable="false"` 禁止点击遮罩关闭，必须点击关闭按钮才能关闭抽屉。

:::demo

```vue
<template>
  <div class="flex gap-2">
    <XButton @click="closableVisible = true">可点击遮罩关闭</XButton>
    <XButton @click="notClosableVisible = true">禁止点击遮罩关闭</XButton>
  </div>
  
  <XDrawer v-model="closableVisible" title="默认行为">
    <p>点击遮罩可以关闭抽屉</p>
  </XDrawer>
  
  <XDrawer v-model="notClosableVisible" title="禁止遮罩关闭" :mask-closable="false">
    <p>点击遮罩无法关闭，必须点击右上角关闭按钮</p>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'
const closableVisible = ref(false)
const notClosableVisible = ref(false)
</script>
```

:::

## 自定义底部

使用 `footer` 插槽自定义底部内容。

:::demo

```vue
<template>
  <XButton @click="footerVisible = true">自定义底部</XButton>
  <XDrawer v-model="footerVisible" title="提交表单">
    <XForm>
      <XFormItem label="用户名">
        <XInput v-model="form.username" />
      </XFormItem>
      <XFormItem label="邮箱">
        <XInput v-model="form.email" />
      </XFormItem>
    </XForm>
    
    <template #footer>
      <div class="flex justify-end gap-2">
        <XButton @click="footerVisible = false">取消</XButton>
        <XButton type="primary" @click="handleSubmit">提交</XButton>
      </div>
    </template>
  </XDrawer>
</template>

<script setup>
import { ref } from 'vue'
import { Msg } from '@xlui/xux-ui'

const footerVisible = ref(false)
const form = ref({
  username: '',
  email: ''
})

const handleSubmit = () => {
  Msg.success('提交成功')
  footerVisible.value = false
}
</script>
```

:::

## API

### Drawer Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 是否显示 | `boolean` | `false` |
| title | 标题 | `string` | - |
| placement | 方向 | `'left' / 'right' / 'top' / 'bottom'` | `'right'` |
| size | 宽度/高度 | `string / number` | `'378px'` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| mask-closable | 点击遮罩是否关闭 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| show-header | 是否显示头部 | `boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| open | 打开时触发 | - |
| close | 关闭时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 抽屉内容 |
| title | 自定义标题 |
| footer | 自定义底部 |
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

