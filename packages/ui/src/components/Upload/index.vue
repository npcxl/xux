<template>
  <div class="x-upload" :class="[`x-upload--${listType}`]">
    <!-- 上传区域 -->
    <div
      v-if="listType !== 'picture-card' || fileList.length < limit"
      class="x-upload__trigger"
      :class="{
        'is-drag': drag,
        'is-dragover': isDragOver,
        'is-disabled': disabled
      }"
      @drop.prevent="handleDrop"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
    >
      <input
        ref="inputRef"
        type="file"
        class="x-upload__input"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleFileChange"
      />
      
      <!-- 默认触发器 -->
      <div 
        v-if="!$slots.trigger && !$slots.default" 
        class="x-upload__default"
        @click="handleClick"
      >
        <template v-if="drag">
          <!-- 拖拽上传 -->
          <div class="x-upload__dragger">
            <Icon icon="mdi:cloud-upload" class="x-upload__dragger-icon" />
            <p class="x-upload__dragger-text">
              {{ isDragOver ? '释放文件' : '将文件拖到此处，或点击上传' }}
            </p>
            <p class="x-upload__dragger-hint">{{ dragHint }}</p>
          </div>
        </template>
        <template v-else-if="listType === 'picture-card'">
          <!-- 图片卡片上传 -->
          <div class="x-upload__picture-card">
            <Icon icon="mdi:plus" class="x-upload__picture-card-icon" />
            <span class="x-upload__picture-card-text">上传图片</span>
          </div>
        </template>
        <template v-else>
          <!-- 默认按钮 -->
          <XButton :disabled="disabled" :icon="buttonIcon">
            {{ buttonText }}
          </XButton>
        </template>
      </div>
      
      <!-- 自定义触发器 -->
      <div v-if="$slots.trigger || $slots.default" @click="handleClick">
        <slot name="trigger" />
        <slot />
      </div>
    </div>
    
    <!-- 提示文字 -->
    <div v-if="$slots.tip || tip" class="x-upload__tip">
      <slot name="tip">{{ tip }}</slot>
    </div>
    
    <!-- 文件列表 -->
    <transition-group
      v-if="showFileList && fileList.length > 0"
      name="upload-list"
      tag="ul"
      class="x-upload__list"
      :class="[`x-upload__list--${listType}`]"
    >
      <li
        v-for="file in fileList"
        :key="file.uid"
        class="x-upload__item"
        :class="{
          'is-success': file.status === 'success',
          'is-uploading': file.status === 'uploading',
          'is-error': file.status === 'error'
        }"
      >
        <!-- 图片卡片样式 -->
        <template v-if="listType === 'picture-card'">
          <div class="x-upload__item-thumbnail">
            <XImage v-if="file.url" :src="file.url" :alt="file.name" fit="cover" />
            <div v-else class="x-upload__item-placeholder">
              <Icon icon="mdi:file-image" />
            </div>
            
            <!-- 遮罩层 -->
            <div class="x-upload__item-actions">
              <Icon
                v-if="file.url"
                icon="mdi:eye"
                class="x-upload__item-action"
                @click="handlePreview(file)"
              />
              <Icon
                icon="mdi:download"
                class="x-upload__item-action"
                @click="handleDownload(file)"
              />
              <Icon
                icon="mdi:delete"
                class="x-upload__item-action"
                @click="handleRemove(file)"
              />
            </div>
            
            <!-- 上传进度 -->
            <div v-if="file.status === 'uploading'" class="x-upload__item-progress">
              <div class="x-upload__progress-bar">
                <div 
                  class="x-upload__progress-inner" 
                  :style="{ width: (file.percentage || 0) + '%' }"
                />
              </div>
            </div>
          </div>
          <div class="x-upload__item-name">{{ file.name }}</div>
        </template>
        
        <!-- 文本/图片样式 -->
        <template v-else>
          <div class="x-upload__item-info">
            <!-- 图片缩略图 -->
            <XImage
              v-if="listType === 'picture' && file.url"
              :src="file.url"
              :alt="file.name"
              class="x-upload__item-thumbnail"
              fit="cover"
            />
            
            <!-- 文件图标 -->
            <Icon
              v-else
              :icon="getFileIcon(file)"
              class="x-upload__item-icon"
            />
            
            <!-- 文件名 -->
            <span class="x-upload__item-name">{{ file.name }}</span>
            
            <!-- 状态图标 -->
            <Icon
              v-if="file.status === 'success'"
              icon="mdi:check-circle"
              class="x-upload__item-status is-success"
            />
            <Icon
              v-else-if="file.status === 'error'"
              icon="mdi:close-circle"
              class="x-upload__item-status is-error"
            />
          </div>
          
          <!-- 进度条 -->
          <div v-if="file.status === 'uploading'" class="x-upload__item-progress">
            <div class="x-upload__progress-bar">
              <div 
                class="x-upload__progress-inner" 
                :style="{ width: (file.percentage || 0) + '%' }"
              />
            </div>
          </div>
          
          <!-- 操作按钮 -->
          <div class="x-upload__item-actions">
            <Icon
              v-if="file.url && listType === 'picture'"
              icon="mdi:eye"
              class="x-upload__item-action"
              @click="handlePreview(file)"
            />
            <Icon
              icon="mdi:delete"
              class="x-upload__item-action"
              @click="handleRemove(file)"
            />
          </div>
        </template>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import XButton from '../Button/index.vue'
import XImage from '../Image/index.vue'

export interface UploadFile {
  uid: string | number
  name: string
  url?: string
  status?: 'ready' | 'uploading' | 'success' | 'error'
  percentage?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  modelValue?: UploadFile[]
  action?: string
  headers?: Record<string, string>
  method?: 'post' | 'put' | 'patch'
  data?: Record<string, any>
  name?: string
  withCredentials?: boolean
  multiple?: boolean
  accept?: string
  limit?: number
  fileSize?: number
  drag?: boolean
  disabled?: boolean
  autoUpload?: boolean
  listType?: 'text' | 'picture' | 'picture-card'
  showFileList?: boolean
  buttonText?: string
  buttonIcon?: string
  dragHint?: string
  tip?: string
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  onProgress?: (file: UploadFile, percentage: number) => void
  onSuccess?: (response: any, file: UploadFile) => void
  onError?: (error: any, file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
  onPreview?: (file: UploadFile) => void
  onExceed?: (files: File[], fileList: UploadFile[]) => void
}

const props = withDefaults(defineProps<UploadProps>(), {
  method: 'post',
  name: 'file',
  multiple: false,
  limit: 0,
  fileSize: 0,
  drag: false,
  disabled: false,
  autoUpload: true,
  listType: 'text',
  showFileList: true,
  buttonText: '选择文件',
  buttonIcon: 'mdi:upload',
  dragHint: '支持多文件上传'
})

const emit = defineEmits<{
  'update:modelValue': [files: UploadFile[]]
  'change': [file: UploadFile, fileList: UploadFile[]]
}>()

const inputRef = ref<HTMLInputElement>()
const fileList = ref<UploadFile[]>(props.modelValue || [])
const isDragOver = ref(false)

let fileId = 0

// 生成唯一ID
const generateId = () => {
  return Date.now() + fileId++
}

// 获取文件图标
const getFileIcon = (file: UploadFile) => {
  const name = file.name.toLowerCase()
  if (name.endsWith('.pdf')) return 'mdi:file-pdf-box'
  if (name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'mdi:file-image'
  if (name.match(/\.(doc|docx)$/)) return 'mdi:file-word'
  if (name.match(/\.(xls|xlsx)$/)) return 'mdi:file-excel'
  if (name.match(/\.(zip|rar|7z)$/)) return 'mdi:folder-zip'
  if (name.match(/\.(mp4|avi|mov)$/)) return 'mdi:file-video'
  if (name.match(/\.(mp3|wav|flac)$/)) return 'mdi:file-music'
  return 'mdi:file-document'
}

// 点击上传
const handleClick = () => {
  if (props.disabled) return
  inputRef.value?.click()
}

// 文件选择变化
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  if (files.length === 0) return
  
  handleFiles(files)
  
  // 清空input，允许重复上传同一文件
  target.value = ''
}

// 拖拽相关
const handleDragOver = () => {
  if (props.disabled) return
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  if (props.disabled) return
  isDragOver.value = false
  
  const files = Array.from(e.dataTransfer?.files || [])
  handleFiles(files)
}

// 处理文件
const handleFiles = async (files: File[]) => {
  // 检查数量限制
  if (props.limit > 0 && fileList.value.length + files.length > props.limit) {
    props.onExceed?.(files, fileList.value)
    return
  }
  
  // 如果不支持多选，只取第一个文件
  const selectedFiles = props.multiple ? files : files.slice(0, 1)
  
  for (const rawFile of selectedFiles) {
    // 检查文件大小
    if (props.fileSize > 0 && rawFile.size > props.fileSize * 1024 * 1024) {
      console.warn(`文件 ${rawFile.name} 超过大小限制`)
      continue
    }
    
    // 执行 beforeUpload 钩子
    if (props.beforeUpload) {
      const result = await props.beforeUpload(rawFile)
      if (result === false) continue
    }
    
    const file: UploadFile = {
      uid: generateId(),
      name: rawFile.name,
      status: 'ready',
      percentage: 0,
      raw: rawFile
    }
    
    // 如果是图片，生成预览
    if (rawFile.type.startsWith('image/')) {
      file.url = URL.createObjectURL(rawFile)
    }
    
    fileList.value.push(file)
    emit('change', file, fileList.value)
    
    // 自动上传
    if (props.autoUpload && props.action) {
      uploadFile(file)
    }
  }
  
  emit('update:modelValue', fileList.value)
}

// 上传文件
const uploadFile = async (file: UploadFile) => {
  const formData = new FormData()
  formData.append(props.name, file.raw!)
  
  // 添加额外数据
  if (props.data) {
    Object.keys(props.data).forEach(key => {
      formData.append(key, props.data![key])
    })
  }
  
  file.status = 'uploading'
  
  try {
    const xhr = new XMLHttpRequest()
    
    // 上传进度
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentage = Math.round((e.loaded / e.total) * 100)
        file.percentage = percentage
        props.onProgress?.(file, percentage)
      }
    })
    
    // 上传完成
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        file.status = 'success'
        file.percentage = 100
        try {
          file.response = JSON.parse(xhr.responseText)
        } catch {
          file.response = xhr.responseText
        }
        props.onSuccess?.(file.response, file)
        emit('change', file, fileList.value)
      } else {
        handleUploadError(file, new Error(`上传失败: ${xhr.statusText}`))
      }
    })
    
    // 上传错误
    xhr.addEventListener('error', () => {
      handleUploadError(file, new Error('上传失败'))
    })
    
    // 上传中止
    xhr.addEventListener('abort', () => {
      handleUploadError(file, new Error('上传已中止'))
    })
    
    xhr.open(props.method.toUpperCase(), props.action!)
    
    // 设置请求头
    if (props.headers) {
      Object.keys(props.headers).forEach(key => {
        xhr.setRequestHeader(key, props.headers![key])
      })
    }
    
    // 是否携带凭证
    xhr.withCredentials = props.withCredentials || false
    
    xhr.send(formData)
  } catch (error) {
    handleUploadError(file, error)
  }
}

// 处理上传错误
const handleUploadError = (file: UploadFile, error: any) => {
  file.status = 'error'
  file.error = error
  props.onError?.(error, file)
  emit('change', file, fileList.value)
}

// 移除文件
const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex(f => f.uid === file.uid)
  if (index > -1) {
    fileList.value.splice(index, 1)
    props.onRemove?.(file)
    emit('update:modelValue', fileList.value)
    emit('change', file, fileList.value)
  }
}

// 预览文件
const handlePreview = (file: UploadFile) => {
  props.onPreview?.(file)
}

// 下载文件
const handleDownload = (file: UploadFile) => {
  if (file.url) {
    const a = document.createElement('a')
    a.href = file.url
    a.download = file.name
    a.click()
  }
}

// 手动上传
const submit = () => {
  fileList.value
    .filter(file => file.status === 'ready')
    .forEach(file => {
      if (props.action) {
        uploadFile(file)
      }
    })
}

// 清空文件列表
const clearFiles = () => {
  fileList.value = []
  emit('update:modelValue', [])
}

// 中止上传
const abort = () => {
  // TODO: 实现中止上传
}

defineExpose({
  submit,
  clearFiles,
  abort
})
</script>

<style scoped>
.x-upload {
  display: inline-block;
  width: 100%;
}

.x-upload__input {
  display: none;
}

.x-upload__trigger {
  cursor: pointer;
  outline: none;
}

.x-upload__trigger.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* ============================================
   默认样式
   ============================================ */
.x-upload__default {
  display: inline-block;
}

/* ============================================
   拖拽上传
   ============================================ */
.x-upload__trigger.is-drag {
  width: 100%;
}

.x-upload__dragger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border: 2px dashed var(--x-border-color, #ddd);
  border-radius: var(--x-radius-lg, 12px);
  background: var(--x-bg-color, white);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px;
}

.x-upload__dragger:hover {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-bg-color-hover, #fafafa);
}

.x-upload__trigger.is-dragover .x-upload__dragger {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-color-primary-alpha-10, rgba(26, 26, 26, 0.05));
  transform: scale(1.02);
  box-shadow: 0 8px 24px var(--x-color-primary-alpha-20, rgba(26, 26, 26, 0.15));
}

.x-upload__dragger-icon {
  font-size: 64px;
  color: var(--x-color-primary, #1a1a1a);
  margin-bottom: 16px;
}

@keyframes uploadIconBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.x-upload__trigger.is-dragover .x-upload__dragger-icon {
  animation: uploadIconSpin 0.6s ease-in-out;
}

@keyframes uploadIconSpin {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.x-upload__dragger-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--x-text-color, #333);
  margin-bottom: 8px;
}

.x-upload__dragger-hint {
  font-size: 14px;
  color: var(--x-text-color-secondary, #666);
}

/* ============================================
   图片卡片上传
   ============================================ */
.x-upload--picture-card {
  display: inline-block;
}

.x-upload__picture-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 148px;
  border: 2px dashed var(--x-border-color, #ddd);
  border-radius: var(--x-radius-base, 8px);
  background: var(--x-bg-color-secondary, #fafafa);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-upload__picture-card:hover {
  border-color: var(--x-color-primary, #1a1a1a);
  background: var(--x-bg-color-hover, #f5f5f5);
}

.x-upload__picture-card-icon {
  font-size: 32px;
  color: var(--x-text-color-secondary, #999);
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.x-upload__picture-card:hover .x-upload__picture-card-icon {
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.1) rotate(90deg);
}

.x-upload__picture-card-text {
  font-size: 14px;
  color: var(--x-text-color-secondary, #666);
}

/* ============================================
   提示文字
   ============================================ */
.x-upload__tip {
  margin-top: 8px;
  font-size: 12px;
  color: var(--x-text-color-secondary, #999);
  line-height: 1.5;
}

/* ============================================
   文件列表
   ============================================ */
.x-upload__list {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

/* 文本列表 */
.x-upload__list--text .x-upload__item,
.x-upload__list--picture .x-upload__item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: var(--x-radius-base, 6px);
  background: var(--x-bg-color-secondary, #fafafa);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.x-upload__list--text .x-upload__item:hover,
.x-upload__list--picture .x-upload__item:hover {
  background: var(--x-bg-color-hover, #f5f5f5);
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.x-upload__item-info {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 12px;
  overflow: hidden;
}

.x-upload__list--picture .x-upload__item-thumbnail {
  width: 48px;
  height: 48px;
  border-radius: var(--x-radius-sm, 4px);
  flex-shrink: 0;
  overflow: hidden;
}

.x-upload__list--picture .x-upload__item-thumbnail :deep(.x-image) {
  width: 100%;
  height: 100%;
}

.x-upload__list--picture .x-upload__item-thumbnail :deep(.x-image__inner) {
  width: 100%;
  height: 100%;
}

.x-upload__item-icon {
  font-size: 24px;
  color: var(--x-color-primary, #1a1a1a);
  flex-shrink: 0;
}

.x-upload__item-name {
  flex: 1;
  font-size: 14px;
  color: var(--x-text-color, #333);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-upload__item-status {
  font-size: 20px;
  margin: 0 8px;
}

.x-upload__item-status.is-success {
  color: #10b981;
}

.x-upload__item-status.is-error {
  color: #ef4444;
}

.x-upload__list--text .x-upload__item-progress,
.x-upload__list--picture .x-upload__item-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.x-upload__item-actions {
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.x-upload__item:hover .x-upload__item-actions {
  opacity: 1;
}

.x-upload__item-action {
  font-size: 18px;
  color: var(--x-text-color-secondary, #666);
  cursor: pointer;
  transition: all 0.3s ease;
}

.x-upload__item-action:hover {
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.2);
}

/* 图片卡片列表 */
.x-upload__list--picture-card {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.x-upload__list--picture-card .x-upload__item {
  display: inline-block;
  width: 148px;
  border-radius: var(--x-radius-base, 8px);
  overflow: hidden;
  position: relative;
  background: var(--x-bg-color-secondary, #fafafa);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-upload__list--picture-card .x-upload__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.x-upload__list--picture-card .x-upload__item-thumbnail {
  width: 148px;
  height: 148px;
  position: relative;
}

.x-upload__list--picture-card .x-upload__item-thumbnail :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.x-upload__list--picture-card .x-upload__item-thumbnail :deep(.x-image) {
  width: 100%;
  height: 100%;
}

.x-upload__list--picture-card .x-upload__item-thumbnail :deep(.x-image__inner) {
  width: 100%;
  height: 100%;
}

.x-upload__list--picture-card .x-upload__item-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: var(--x-text-color-placeholder, #ccc);
  background: var(--x-bg-color-secondary, #fafafa);
}

.x-upload__list--picture-card .x-upload__item-actions {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-upload__list--picture-card .x-upload__item:hover .x-upload__item-actions {
  opacity: 1;
}

.x-upload__list--picture-card .x-upload__item-action {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.x-upload__list--picture-card .x-upload__item-action:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.x-upload__list--picture-card .x-upload__item-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 8px 8px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
}

/* 进度条样式 */
.x-upload__progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.x-upload__progress-inner {
  height: 100%;
  background: linear-gradient(90deg, var(--x-color-primary, #1a1a1a), var(--x-color-primary-light, #666));
  border-radius: 2px;
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.x-upload__progress-inner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: progressShine 1.5s ease-in-out infinite;
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.x-upload__list--text .x-upload__item-progress,
.x-upload__list--picture .x-upload__item-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
}

.x-upload__list--text .x-upload__progress-bar,
.x-upload__list--picture .x-upload__progress-bar {
  height: 2px;
  border-radius: 0;
}

.x-upload__list--picture-card .x-upload__item-name {
  padding: 8px;
  font-size: 12px;
  text-align: center;
  color: var(--x-text-color, #333);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ============================================
   列表动画
   ============================================ */
.upload-list-enter-active {
  animation: uploadListIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.upload-list-leave-active {
  animation: uploadListOut 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

@keyframes uploadListIn {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes uploadListOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9) translateX(20px);
  }
}
</style>

