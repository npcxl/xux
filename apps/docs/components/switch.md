# Switch 开关

开关用于在两种状态之间切换，常用于设置功能的开启或关闭。

## 基础用法

基本的开关用法，通过 `v-model` 绑定开关状态。

:::demo

```vue
<template>
  <div class="flex gap-3 items-center">
    <XSwitch v-model="switchValue" />
    <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(false)
</script>
```

:::

## 默认开启

设置开关的默认状态为开启。

:::demo

```vue
<template>
  <div class="flex gap-3 items-center">
    <XSwitch v-model="switchValue" />
    <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>
```

:::

## 状态变化监听

监听开关状态的变化，执行相应的操作。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <XSwitch v-model="switchValue" @update:modelValue="handleChange" />
      <span>开关状态: {{ switchValue ? '开启' : '关闭' }}</span>
    </div>
    <div class="text-sm text-gray-600">
      状态变化次数: {{ changeCount }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(false)
const changeCount = ref(0)

const handleChange = (value) => {
  changeCount.value++
  console.log('开关状态变化:', value)
}
</script>
```

:::

## 禁用状态

通过 `disabled` 属性设置开关为禁用状态。

:::demo

```vue
<template>
  <div class="flex gap-3 items-center">
    <XSwitch v-model="switchValue1" />
    <XSwitch v-model="switchValue2" disabled />
    <XSwitch v-model="switchValue3" disabled />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue1 = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)
</script>
```

:::

## 不同尺寸

Switch 组件提供三种尺寸，可以在不同场景下使用。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" size="small" />
      <span>小尺寸</span>
    </div>
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" size="medium" />
      <span>中等尺寸</span>
    </div>
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" size="large" />
      <span>大尺寸</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>
```

:::

## 自定义颜色

通过 `color` 属性自定义开关的激活颜色。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" color="#10b981" />
      <span>绿色开关</span>
    </div>
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" color="#f59e0b" />
      <span>橙色开关</span>
    </div>
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" color="#ef4444" />
      <span>红色开关</span>
    </div>
    <div class="flex gap-3 items-center">
      <XSwitch v-model="switchValue" color="#8b5cf6" />
      <span>紫色开关</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>
```

:::

## 高级颜色自定义

可以分别自定义边框颜色、阴影颜色和滑块颜色

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">边框与阴影分离</h4>
      <div class="flex gap-3 items-center">
        <XSwitch v-model="switchValue" color="#3b82f6" shadowColor="#f59e0b" />
        <span>蓝色边框 + 橙色阴影</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">自定义滑块颜色</h4>
      <div class="flex gap-3 items-center">
        <XSwitch v-model="switchValue" color="#10b981" thumbColor="#fbbf24" />
        <span>绿色边框 + 黄色滑块</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">完全自定义</h4>
      <div class="flex gap-3 items-center">
        <XSwitch v-model="switchValue" color="#8b5cf6" shadowColor="#ec4899" thumbColor="#fbbf24" />
        <span>紫色边框 + 粉色阴影 + 黄色滑块</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">颜色调整</h4>
      <div class="flex flex-col gap-3">
        <div class="flex gap-3 items-center">
          <XSwitch v-model="switchValue" color="#10b981" />
          <span>绿色主题</span>
        </div>
        <div class="flex gap-3 items-center">
          <XSwitch v-model="switchValue" color="#f59e0b" />
          <span>橙色主题</span>
        </div>
        <div class="flex gap-3 items-center">
          <XSwitch v-model="switchValue" color="#ef4444" />
          <span>红色主题</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>
```

:::

## 带标签的开关

配合标签文字使用，提供更好的用户体验。

:::demo

```vue
<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-3">
      <XSwitch v-model="notifications" />
      <label>接收通知</label>
    </div>
    <div class="flex items-center gap-3">
      <XSwitch v-model="darkMode" />
      <label>深色模式</label>
    </div>
    <div class="flex items-center gap-3">
      <XSwitch v-model="autoSave" />
      <label>自动保存</label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref(true)
const darkMode = ref(false)
const autoSave = ref(true)
</script>
```

:::

## 设置场景示例

常见的设置页面开关使用场景。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6 p-4 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-semibold">账户设置</h3>
    
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">邮件通知</div>
          <div class="text-sm text-gray-500">接收重要邮件通知</div>
        </div>
        <XSwitch v-model="emailNotification" />
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">短信通知</div>
          <div class="text-sm text-gray-500">接收短信验证码和重要通知</div>
        </div>
        <XSwitch v-model="smsNotification" />
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">两步验证</div>
          <div class="text-sm text-gray-500">为账户添加额外的安全保护</div>
        </div>
        <XSwitch v-model="twoFactorAuth" />
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">隐私模式</div>
          <div class="text-sm text-gray-500">隐藏在线状态和个人信息</div>
        </div>
        <XSwitch v-model="privacyMode" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emailNotification = ref(true)
const smsNotification = ref(false)
const twoFactorAuth = ref(true)
const privacyMode = ref(false)
</script>
```

:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 开关状态 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 开关尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| color | 激活状态边框颜色 | `string` | `'#0974f1'` |
| shadowColor | 阴影和光晕颜色 | `string` | `'#0974f1'` |
| thumbColor | 滑块颜色 | `string` | `'#ffffff'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 开关状态改变时触发 | `(value: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| - | 无插槽 |


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
  <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
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

