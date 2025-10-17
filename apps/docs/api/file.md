# 文件工具 File

提供文件选择、读取、转换、压缩、验证等功能。

## 导入

```javascript
import { 
  selectFile, readFile, fileToBase64, base64ToFile,
  compressImage, getFileExtension, getFileName,
  validateFileType, validateFileSize
} from '@xlui/xux-ui'
```

## selectFile

选择文件（支持单选/多选）。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <XButton @click="selectSingle" type="primary" block>
        选择单个文件
      </XButton>
      <XButton @click="selectMultiple" type="success" block>
        选择多个文件
      </XButton>
    </div>
    <div class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">选中的文件：</div>
      <div v-if="files.length === 0" class="text-xs text-gray-400">未选择文件</div>
      <div v-for="(file, i) in files" :key="i" class="text-xs mb-1">
        <span class="text-blue-600">{{ file.name }}</span>
        <span class="text-gray-500 ml-2">({{ formatSize(file.size) }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, selectFile } from '@xlui/xux-ui'

const files = ref([])

const formatSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const selectSingle = async () => {
  const file = await selectFile({ accept: '*', multiple: false })
  if (file) files.value = [file]
}

const selectMultiple = async () => {
  const fileList = await selectFile({ accept: '*', multiple: true })
  if (fileList) files.value = fileList
}
</script>
```

:::

## readFile

读取文件内容。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="selectAndRead" type="primary" block>
      选择文本文件并读取
    </XButton>
    <div>
      <label class="text-xs text-gray-600">读取类型</label>
      <XSelect v-model="readType">
        <option value="text">文本</option>
        <option value="dataURL">DataURL</option>
      </XSelect>
    </div>
    <div class="p-3 bg-gray-50 rounded max-h-60 overflow-auto">
      <div class="text-xs text-gray-600 mb-2">文件内容：</div>
      <pre class="text-xs">{{ content || '等待读取...' }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, XSelect, selectFile, readFile } from '@xlui/xux-ui'

const readType = ref('text')
const content = ref('')

const selectAndRead = async () => {
  const file = await selectFile({ accept: '*', multiple: false })
  if (file) {
    const result = await readFile(file, readType.value)
    content.value = typeof result === 'string' 
      ? result.substring(0, 500) 
      : '二进制数据'
  }
}
</script>
```

:::

## fileToBase64 / base64ToFile

文件与Base64互转。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="selectImage" type="primary" block>
      选择图片转Base64
    </XButton>
    <div v-if="preview" class="p-3 bg-gray-50 rounded">
      <div class="text-xs text-gray-600 mb-2">图片预览：</div>
      <img :src="preview" class="max-w-full h-40 object-contain" />
    </div>
    <div v-if="base64" class="p-3 bg-blue-50 rounded max-h-40 overflow-auto">
      <div class="text-xs text-gray-600 mb-1">Base64（前100字符）：</div>
      <code class="text-xs break-all">{{ base64.substring(0, 100) }}...</code>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XButton, selectFile, fileToBase64 } from '@xlui/xux-ui'

const preview = ref('')
const base64 = ref('')

const selectImage = async () => {
  const file = await selectFile({ accept: 'image/*', multiple: false })
  if (file) {
    base64.value = await fileToBase64(file)
    preview.value = base64.value
  }
}
</script>
```

:::

## getFileExtension / getFileName

获取文件扩展名和文件名。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XInput v-model="filename" placeholder="输入完整文件名" />
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-blue-50 rounded">
        <div class="text-xs text-gray-600 mb-1">扩展名</div>
        <code class="text-blue-600">{{ getFileExtension(filename) || '-' }}</code>
      </div>
      <div class="p-3 bg-green-50 rounded">
        <div class="text-xs text-gray-600 mb-1">文件名（不含扩展名）</div>
        <code class="text-green-600">{{ getFileName(filename) || '-' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, getFileExtension, getFileName } from '@xlui/xux-ui'
const filename = ref('document.pdf')
</script>
```

:::

## validateFileType / validateFileSize

验证文件类型和大小。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="selectToValidate" type="primary" block>
      选择文件进行验证
    </XButton>
    <div>
      <label class="text-xs text-gray-600">允许类型（逗号分隔）</label>
      <XInput v-model="acceptTypes" placeholder="如：.jpg,.png,image/*" />
    </div>
    <div>
      <label class="text-xs text-gray-600">最大大小（MB）</label>
      <XInput v-model.number="maxSize" type="number" />
    </div>
    <div v-if="validateResult" class="p-3 rounded" 
      :class="validateResult.valid ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'">
      <div class="font-bold mb-1">{{ validateResult.valid ? '✓ 验证通过' : '✗ 验证失败' }}</div>
      <div class="text-xs">{{ validateResult.message }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, selectFile, validateFileType, validateFileSize } from '@xlui/xux-ui'

const acceptTypes = ref('.jpg,.png,.gif')
const maxSize = ref(5)
const validateResult = ref(null)

const selectToValidate = async () => {
  const file = await selectFile({ accept: '*', multiple: false })
  if (file) {
    const types = acceptTypes.value.split(',').map(t => t.trim())
    const typeValid = validateFileType(file, types)
    const sizeValid = validateFileSize(file, maxSize.value * 1024 * 1024)
    
    validateResult.value = {
      valid: typeValid && sizeValid,
      message: !typeValid ? '文件类型不符合' : !sizeValid ? '文件过大' : `${file.name} 符合要求`
    }
  }
}
</script>
```

:::

## compressImage

图片压缩（需要浏览器支持）。

:::demo

```vue
<template>
  <div class="space-y-3">
    <XButton @click="selectAndCompress" type="primary" block>
      选择图片并压缩
    </XButton>
    <div class="grid grid-cols-3 gap-2">
      <div>
        <label class="text-xs text-gray-600">压缩质量（0-1）</label>
        <XInput v-model.number="quality" type="number" step="0.1" min="0" max="1" />
      </div>
      <div>
        <label class="text-xs text-gray-600">最大宽度</label>
        <XInput v-model.number="maxWidth" type="number" />
      </div>
      <div>
        <label class="text-xs text-gray-600">最大高度</label>
        <XInput v-model.number="maxHeight" type="number" />
      </div>
    </div>
    <div v-if="compressResult" class="p-3 bg-blue-50 rounded">
      <div class="text-xs mb-2">
        <span class="text-gray-600">原始大小：</span>
        <span class="text-blue-600">{{ formatBytes(compressResult.original) }}</span>
      </div>
      <div class="text-xs">
        <span class="text-gray-600">压缩后：</span>
        <span class="text-green-600 font-bold">{{ formatBytes(compressResult.compressed) }}</span>
        <span class="text-gray-500 ml-2">
          ({{ ((1 - compressResult.compressed / compressResult.original) * 100).toFixed(1) }}% 压缩率)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, selectFile, compressImage } from '@xlui/xux-ui'

const quality = ref(0.8)
const maxWidth = ref(1920)
const maxHeight = ref(1080)
const compressResult = ref(null)

const formatBytes = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

const selectAndCompress = async () => {
  const file = await selectFile({ accept: 'image/*', multiple: false })
  if (file) {
    try {
      const compressed = await compressImage(file, quality.value, maxWidth.value, maxHeight.value)
      compressResult.value = {
        original: file.size,
        compressed: compressed.size
      }
    } catch (error) {
      alert('压缩失败：' + error.message)
    }
  }
}
</script>
```

:::

## API

| 函数 | 说明 | 参数 |
|------|------|------|
| `selectFile(options)` | 选择文件 | `options: {accept?: string, multiple?: boolean}` |
| `readFile(file, type?)` | 读取文件 | `file: File, type?: 'text'\|'arrayBuffer'\|'dataURL'` |
| `fileToBase64(file)` | 文件转Base64 | `file: File` |
| `base64ToFile(base64, filename)` | Base64转文件 | `base64: string, filename: string` |
| `compressImage(file, quality?, maxWidth?, maxHeight?)` | 压缩图片 | `file: File, quality?: number, maxWidth?: number, maxHeight?: number` |
| `getFileExtension(filename)` | 获取扩展名 | `filename: string` |
| `getFileName(filename)` | 获取文件名 | `filename: string` |
| `validateFileType(file, acceptTypes)` | 验证类型 | `file: File, acceptTypes: string[]` |
| `validateFileSize(file, maxSize)` | 验证大小 | `file: File, maxSize: number` |

