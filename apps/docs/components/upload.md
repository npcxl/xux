# Upload 上传

通过点击或拖拽上传文件。

## 基础用法

通过点击按钮选择文件上传。

:::demo

```vue
<template>
  <XUpload
    action="https://jsonplaceholder.typicode.com/posts"
    :on-success="handleSuccess"
  >
    <template #tip>
      <div class="text-gray-500">支持 jpg/png 文件，且不超过 500kb</div>
    </template>
  </XUpload>
</template>

<script setup>
import { XUpload, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const handleSuccess = (response, file) => {
  msg.success(`${file.name} 上传成功！`)
}
</script>
```

:::

## 拖拽上传

设置 `drag` 属性启用拖拽上传，带有超炫的动画效果。

:::demo

```vue
<template>
  <XUpload
    action="https://jsonplaceholder.typicode.com/posts"
    drag
    multiple
    :on-success="handleSuccess"
  >
    <template #tip>
      <div class="text-gray-500">将文件拖到框内，或点击上传</div>
    </template>
  </XUpload>
</template>

<script setup>
import { XUpload, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const handleSuccess = (response, file) => {
  msg.success(`${file.name} 上传成功`)
}
</script>
```

:::

## 图片列表

设置 `listType="picture"` 显示缩略图。

:::demo

```vue
<template>
  <XUpload
    action="https://jsonplaceholder.typicode.com/posts"
    list-type="picture"
    accept="image/*"
    multiple
    :on-preview="handlePreview"
  >
    <template #tip>
      <div class="text-gray-500">只能上传图片文件</div>
    </template>
  </XUpload>
</template>

<script setup>
import { XUpload, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const handlePreview = (file) => {
  msg.info(`预览: ${file.name}`)
  if (file.url) {
    window.open(file.url)
  }
}
</script>
```

:::

## 图片卡片

设置 `listType="picture-card"` 以卡片形式展示图片。

:::demo

```vue
<template>
  <XUpload
    v-model="fileList"
    action="https://jsonplaceholder.typicode.com/posts"
    list-type="picture-card"
    accept="image/*"
    :limit="4"
    :on-exceed="handleExceed"
  >
    <template #tip>
      <div class="text-gray-500">最多上传 4 张图片</div>
    </template>
  </XUpload>
</template>

<script setup>
import { ref } from 'vue'
import { XUpload, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
const fileList = ref([])

const handleExceed = (files, fileList) => {
  msg.warning(`最多只能上传 4 张图片，当前已选择 ${files.length + fileList.length} 张`)
}
</script>
```

:::

## 自定义触发器

通过插槽自定义上传按钮。

:::demo

```vue
<template>
  <XUpload
    action="https://jsonplaceholder.typicode.com/posts"
    :show-file-list="false"
  >
    <template #trigger>
      <XButton type="primary" icon="mdi:cloud-upload">
        自定义上传按钮
      </XButton>
    </template>
    <template #tip>
      <div class="text-gray-500 ml-2 inline-block">
        点击上传文件
      </div>
    </template>
  </XUpload>
</template>

<script setup>
import { XUpload, XButton } from '@xlui/xux-ui'
</script>
```

:::

## 文件限制

通过 `accept` 属性限制文件类型，`file-size` 限制文件大小（MB）。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <p class="text-sm font-semibold mb-2">只能上传 PDF 文件：</p>
      <XUpload
        action="https://jsonplaceholder.typicode.com/posts"
        accept=".pdf"
        :before-upload="beforeUpload"
      />
    </div>
    
    <div>
      <p class="text-sm font-semibold mb-2">限制文件大小（最大 2MB）：</p>
      <XUpload
        action="https://jsonplaceholder.typicode.com/posts"
        :file-size="2"
        :before-upload="checkSize"
      />
    </div>
  </div>
</template>

<script setup>
import { XUpload, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()

const beforeUpload = (file) => {
  const isPDF = file.type === 'application/pdf'
  if (!isPDF) {
    msg.error('只能上传 PDF 文件!')
  }
  return isPDF
}

const checkSize = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    msg.error('文件大小不能超过 2MB!')
  }
  return isLt2M
}
</script>
```

:::

## 手动上传

设置 `autoUpload={false}` 禁止自动上传，通过 `submit()` 方法手动上传。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XUpload
      ref="uploadRef"
      action="https://jsonplaceholder.typicode.com/posts"
      :auto-upload="false"
      multiple
    />
    
    <div class="flex gap-2">
      <XButton @click="submitUpload" type="primary">
        开始上传
      </XButton>
      <XButton @click="clearFiles">
        清空文件
      </XButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XUpload, XButton, xlMsg } from '@xlui/xux-ui'

const msg = xlMsg()
const uploadRef = ref()

const submitUpload = () => {
  uploadRef.value?.submit()
  msg.info('开始上传...')
}

const clearFiles = () => {
  uploadRef.value?.clearFiles()
  msg.info('已清空')
}
</script>
```

:::

## 拖拽上传 + 图片卡片

组合使用拖拽和图片卡片样式。

:::demo

```vue
<template>
  <XUpload
    v-model="imageList"
    action="https://jsonplaceholder.typicode.com/posts"
    drag
    list-type="picture-card"
    accept="image/*"
    multiple
    :limit="6"
    drag-hint="支持批量上传，最多6张图片"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XUpload } from '@xlui/xux-ui'

const imageList = ref([])
</script>
```

:::

## 上传事件

监听上传的各种事件。

:::demo

```vue
<template>
  <div class="space-y-4">
    <XUpload
      action="https://jsonplaceholder.typicode.com/posts"
      list-type="picture"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
    />
    
    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="text-sm font-semibold mb-2">事件日志：</h4>
      <div class="space-y-1">
        <div v-for="(log, index) in logs" :key="index" class="text-sm text-gray-600">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XUpload } from '@xlui/xux-ui'

const logs = ref([])

const addLog = (message) => {
  logs.value.unshift(message)
  if (logs.value.length > 5) logs.value.pop()
}

const handleProgress = (file, percentage) => {
  addLog(`${file.name} 上传进度: ${percentage}%`)
}

const handleSuccess = (response, file) => {
  addLog(`✅ ${file.name} 上传成功`)
}

const handleError = (error, file) => {
  addLog(`❌ ${file.name} 上传失败`)
}

const handleRemove = (file) => {
  addLog(`🗑️ 已删除 ${file.name}`)
}
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 实际场景

在实际项目中的应用示例。

:::demo

```vue
<template>
  <div class="space-y-6">
    <!-- 头像上传 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">头像上传</h4>
      <XUpload
        action="https://jsonplaceholder.typicode.com/posts"
        list-type="picture-card"
        accept="image/*"
        :limit="1"
        :show-file-list="true"
      >
        <template #tip>
          <div class="text-xs text-gray-500">建议尺寸 200x200px，支持 jpg/png</div>
        </template>
      </XUpload>
    </div>
    
    <!-- 商品图片上传 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">商品图片上传</h4>
      <XUpload
        action="https://jsonplaceholder.typicode.com/posts"
        drag
        list-type="picture-card"
        accept="image/*"
        multiple
        :limit="9"
        drag-hint="支持批量上传，最多9张"
      />
    </div>
    
    <!-- 文件附件上传 -->
    <div class="p-4 bg-white rounded-lg shadow-sm">
      <h4 class="text-sm font-semibold mb-3 text-gray-900">文件附件上传</h4>
      <XUpload
        action="https://jsonplaceholder.typicode.com/posts"
        drag
        multiple
        drag-hint="支持 PDF、Word、Excel 等格式"
        accept=".pdf,.doc,.docx,.xls,.xlsx"
      >
        <template #tip>
          <div class="text-gray-500">支持 PDF、Word、Excel，单个文件不超过 10MB</div>
        </template>
      </XUpload>
    </div>
  </div>
</template>

<script setup>
import { XUpload } from '@xlui/xux-ui'
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 文件列表 | `UploadFile[]` | `[]` |
| action | 上传的地址 | `string` | - |
| headers | 设置上传的请求头部 | `object` | - |
| method | 上传请求方法 | `'post' \| 'put' \| 'patch'` | `'post'` |
| data | 上传时附带的额外参数 | `object` | - |
| name | 上传的文件字段名 | `string` | `'file'` |
| withCredentials | 是否携带凭证 | `boolean` | `false` |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| accept | 接受上传的文件类型 | `string` | - |
| limit | 最大允许上传个数 | `number` | `0` |
| fileSize | 文件大小限制（MB） | `number` | `0` |
| drag | 是否启用拖拽上传 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| autoUpload | 是否自动上传 | `boolean` | `true` |
| listType | 文件列表的类型 | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| showFileList | 是否显示已上传文件列表 | `boolean` | `true` |
| buttonText | 按钮文字 | `string` | `'选择文件'` |
| buttonIcon | 按钮图标 | `string` | `'mdi:upload'` |
| dragHint | 拖拽提示文字 | `string` | `'支持多文件上传'` |
| tip | 提示说明文字 | `string` | - |
| beforeUpload | 上传文件之前的钩子 | `(file: File) => boolean \| Promise<boolean>` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 文件状态改变时 | `(file: UploadFile, fileList: UploadFile[])` |
| progress | 文件上传进度 | `(file: UploadFile, percentage: number)` |
| success | 文件上传成功时 | `(response: any, file: UploadFile)` |
| error | 文件上传失败时 | `(error: any, file: UploadFile)` |
| remove | 文件移除时 | `(file: UploadFile)` |
| preview | 点击文件预览时 | `(file: UploadFile)` |
| exceed | 文件超出个数限制时 | `(files: File[], fileList: UploadFile[])` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认内容 |
| trigger | 触发器内容 |
| tip | 提示说明文字 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| submit | 手动上传文件列表 | - |
| clearFiles | 清空已上传的文件列表 | - |
| abort | 取消上传请求 | `(file?: UploadFile)` |

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

