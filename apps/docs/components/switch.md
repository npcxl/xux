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

## 异步状态

Switch 组件支持异步操作，适用于需要网络请求或耗时操作的场景。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">基础异步用法</h4>
      <div class="flex items-center gap-3">
        <XSwitch 
          v-model="asyncValue" 
          :loading="isLoading"
          @change="handleAsyncChange"
        />
        <span>异步开关状态: {{ asyncValue ? '开启' : '关闭' }}</span>
        <span v-if="isLoading" class="text-sm text-blue-500">处理中...</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">模拟网络请求</h4>
      <div class="flex items-center gap-3">
        <XSwitch 
          v-model="networkValue" 
          :loading="networkLoading"
          @change="handleNetworkChange"
        />
        <span>网络设置: {{ networkValue ? '开启' : '关闭' }}</span>
        <span v-if="networkLoading" class="text-sm text-orange-500">同步中...</span>
      </div>
    </div>
    
    <div class="flex flex-col gap-4">
      <h4 class="font-medium">带错误处理的异步</h4>
      <div class="flex items-center gap-3">
        <XSwitch 
          v-model="errorValue" 
          :loading="errorLoading"
          @change="handleErrorChange"
        />
        <span>可能失败的操作: {{ errorValue ? '开启' : '关闭' }}</span>
        <span v-if="errorLoading" class="text-sm text-red-500">处理中...</span>
        <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const asyncValue = ref(false)
const isLoading = ref(false)

const networkValue = ref(true)
const networkLoading = ref(false)

const errorValue = ref(false)
const errorLoading = ref(false)
const errorMessage = ref('')

const handleAsyncChange = async (value) => {
  isLoading.value = true
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 异步操作成功后才更新状态
    asyncValue.value = value
  } catch (error) {
    console.error('操作失败:', error)
    // 失败时恢复原状态
    asyncValue.value = !value
  } finally {
    isLoading.value = false
  }
}

const handleNetworkChange = async (value) => {
  networkLoading.value = true
  
  try {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 2000))
    // 异步操作成功后才更新状态
    networkValue.value = value
  } catch (error) {
    console.error('网络请求失败:', error)
    // 失败时恢复原状态
    networkValue.value = !value
  } finally {
    networkLoading.value = false
  }
}

const handleErrorChange = async (value) => {
  errorLoading.value = true
  errorMessage.value = ''
  
  try {
    // 模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟随机失败
    if (Math.random() > 0.5) {
      throw new Error('网络请求失败')
    }
    
    // 异步操作成功后才更新状态
    errorValue.value = value
  } catch (error) {
    errorMessage.value = error.message
    // 失败时恢复原状态
    errorValue.value = !value
  } finally {
    errorLoading.value = false
  }
}
</script>
```

:::

## 异步设置场景

在实际应用中，异步开关常用于需要与服务器同步的设置项。

:::demo

```vue
<template>
  <div class="flex flex-col gap-6 p-4 bg-gray-50 rounded-lg">
    <h3 class="text-lg font-semibold">云端设置同步</h3>
    
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">自动备份</div>
          <div class="text-sm text-gray-500">每日自动备份数据到云端</div>
        </div>
        <XSwitch 
          v-model="autoBackup" 
          :loading="backupLoading"
          @change="handleBackupChange"
        />
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">实时同步</div>
          <div class="text-sm text-gray-500">实时同步设置到所有设备</div>
        </div>
        <XSwitch 
          v-model="realTimeSync" 
          :loading="syncLoading"
          @change="handleSyncChange"
        />
      </div>
      
      <div class="flex items-center justify-between">
        <div>
          <div class="font-medium">智能推荐</div>
          <div class="text-sm text-gray-500">基于使用习惯推荐内容</div>
        </div>
        <XSwitch 
          v-model="smartRecommend" 
          :loading="recommendLoading"
          @change="handleRecommendChange"
        />
      </div>
    </div>
    
    <div v-if="lastSyncTime" class="text-sm text-gray-500">
      最后同步时间: {{ lastSyncTime }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const autoBackup = ref(true)
const backupLoading = ref(false)

const realTimeSync = ref(false)
const syncLoading = ref(false)

const smartRecommend = ref(true)
const recommendLoading = ref(false)

const lastSyncTime = ref('')

const simulateApiCall = async (setting, value) => {
  // 模拟API调用
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
  
  // 模拟偶尔的失败
  if (Math.random() < 0.1) {
    throw new Error('网络连接失败')
  }
  
  return { success: true, timestamp: new Date().toLocaleString() }
}

const handleBackupChange = async (value) => {
  backupLoading.value = true
  try {
    await simulateApiCall('autoBackup', value)
    // 异步操作成功后才更新状态
    autoBackup.value = value
    lastSyncTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('备份设置更新失败:', error)
    // 失败时恢复原状态
    autoBackup.value = !value
  } finally {
    backupLoading.value = false
  }
}

const handleSyncChange = async (value) => {
  syncLoading.value = true
  try {
    await simulateApiCall('realTimeSync', value)
    // 异步操作成功后才更新状态
    realTimeSync.value = value
    lastSyncTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('同步设置更新失败:', error)
    // 失败时恢复原状态
    realTimeSync.value = !value
  } finally {
    syncLoading.value = false
  }
}

const handleRecommendChange = async (value) => {
  recommendLoading.value = true
  try {
    await simulateApiCall('smartRecommend', value)
    // 异步操作成功后才更新状态
    smartRecommend.value = value
    lastSyncTime.value = new Date().toLocaleString()
  } catch (error) {
    console.error('推荐设置更新失败:', error)
    // 失败时恢复原状态
    smartRecommend.value = !value
  } finally {
    recommendLoading.value = false
  }
}
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
| color | 激活状态边框颜色 | `string` | `'#1a1a1a'` |
| shadowColor | 阴影和光晕颜色 | `string` | `'#1a1a1a'` |
| thumbColor | 滑块颜色 | `string` | `'#ffffff'` |
| loading | 是否处于加载状态 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 开关状态改变时触发 | `(value: boolean)` |
| change | 开关状态改变时触发，可用于异步处理 | `(value: boolean)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| - | 无插槽 |

## 异步模式说明

### 基础用法（同步模式）
默认情况下，开关状态会立即更新，适用于本地状态管理：

```vue
<XSwitch v-model="value" />
```

### 异步模式
当需要处理异步操作时，监听 `change` 事件并设置 `loading` 状态。**关键点：在异步失败时需要恢复原状态。**

```vue
<template>
  <XSwitch 
    v-model="value" 
    :loading="isLoading"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
const isLoading = ref(false)

const handleChange = async (newValue) => {
  isLoading.value = true
  try {
    // 执行异步操作
    await updateSetting(newValue)
    // 成功后更新状态
    value.value = newValue
  } catch (error) {
    console.error('操作失败:', error)
    // 失败时恢复原状态（重要！）
    value.value = !newValue
  } finally {
    isLoading.value = false
  }
}
</script>
```

### 异步工作流程

1. 用户点击开关
2. 组件同时发出 `update:modelValue` 和 `change` 事件，**开关状态立即改变**
3. 父组件在 `change` 事件中立即设置 `loading: true`
4. 父组件执行异步操作（如API调用）
5. **成功时**：更新 `modelValue` 为新值（保持已改变的状态）
6. **失败时**：恢复 `modelValue` 为原值（开关回到原来的状态）
7. 无论成功失败，都要设置 `loading: false`

### 优化要点

- **简化使用**：移除了 `async` prop，通过监听 `change` 事件自动启用异步模式
- **loading状态由父组件管理**：组件只负责展示loading状态
- **立即反馈+异步确认**：点击时立即改变状态（提供即时反馈），异步失败时再恢复原状态
- **失败时恢复原状态**：在 catch 块中使用 `value.value = !newValue` 恢复原状态
- **finally块确保loading取消**：无论成功失败都要取消loading状态

### UI优化

- **流畅的加载动画**：改进的spinner设计，更清晰的视觉反馈
- **精致的过渡效果**：优化了切换动画，使用更自然的缓动函数
- **增强的交互反馈**：点击时的拉伸效果，提升用户体验
- **完善的状态显示**：加载状态下的特殊样式和光标

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

