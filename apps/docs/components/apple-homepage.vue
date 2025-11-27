<template>
  <div class="xux-homepage">
    <!-- Hero 区域 - iOS风格设计 -->
    <section class="hero-section">
      <!-- iOS 风格背景 -->
      <div class="hero-background">
        <div class="ios-gradient"></div>
        <div class="ios-blur-shape shape-1"></div>
        <div class="ios-blur-shape shape-2"></div>
        <div class="ios-blur-shape shape-3"></div>
    </div>
    
      <div class="hero-container">
        <!-- 顶部内容区 -->
        <div class="hero-header">
          <!-- 版本标签 -->
          <div class="version-badge" data-aos="fade-down">
            <span class="version-dot"></span>
            Version 1.5.4
          </div>
          
          <h1 class="hero-title" data-aos="fade-up">
            XUX UI
            <span class="title-gradient">组件库</span>
          </h1>
          
          <p class="hero-description" data-aos="fade-up" data-aos-delay="100">
            基于 Vue 3 + TypeScript 的现代化组件库
            <br>为企业级应用提供优雅、高效的解决方案
          </p>
          
          <div class="hero-buttons" data-aos="fade-up" data-aos-delay="200">
            <XButton type="primary" size="large" round>
              开始使用
            </XButton>
            <XButton size="large" round plain>
              查看文档
            </XButton>
          </div>
        
          <!-- 快速安装 -->
          <div class="install-command" data-aos="fade-up" data-aos-delay="300">
            <div class="command-label">快速安装</div>
            <div class="command-box">
              <code>npm install @xlui/xux-ui</code>
              <button class="copy-btn" @click="copyInstall">
                <XIcon name="copy" :size="16" />
              </button>
            </div>
          </div>
          
          <!-- 特性标签 -->
          <div class="feature-tags" data-aos="fade-up" data-aos-delay="400">
            <div class="feature-tag">
              <XIcon name="check" :size="14" />
              40+ 组件
            </div>
            <div class="feature-tag">
              <XIcon name="check" :size="14" />
              TypeScript
            </div>
            <div class="feature-tag">
              <XIcon name="check" :size="14" />
              主题定制
            </div>
            <div class="feature-tag">
              <XIcon name="check" :size="14" />
              按需加载
            </div>
          </div>
        </div>
        
          <!-- 表格展示区 -->
          <div class="showcase-section" data-aos="fade-up" data-aos-delay="500">
            <!-- 组件展示卡片 -->
          <div class="demo-card">
              <div class="demo-preview">
              <XTable 
                :columns="tableColumns" 
                :dataSource="tableData"
                rowKey="id"
                hover
                height="450px"
                class="modern-table"
               
              >
                <template #status="{ record }">
                  <span :style="getStatusStyle(record.status)">
                    {{ getStatusText(record.status) }}
                  </span>
                </template>
              </XTable>
            </div>
          </div>
          
          <!-- 代码展示 -->
          <div class="code-card">
            <div class="code-header">
              <div class="code-lang">Vue</div>
              <button class="copy-btn" @click="copyCode" title="复制代码">
                <XIcon name="copy" :size="14" />
              </button>
            </div>
            <div class="code-content">
              <pre><code class="code-text"><span class="hl-bracket">&lt;</span><span class="hl-tag">XTable</span> 
  <span class="hl-attr">:columns</span>=<span class="hl-string">"columns"</span> 
  <span class="hl-attr">:dataSource</span>=<span class="hl-string">"data"</span>
  <span class="hl-attr">rowKey</span>=<span class="hl-string">"id"</span>
  <span class="hl-attr">stripe</span>
  <span class="hl-attr">hover</span>
  <span class="hl-attr">height</span>=<span class="hl-string">"450px"</span>
<span class="hl-bracket">/&gt;</span>

<span class="hl-comment">// 列配置示例</span>
<span class="hl-keyword">const</span> <span class="hl-var">columns</span> = [
  { <span class="hl-attr">key</span>: <span class="hl-string">'name'</span>, <span class="hl-attr">title</span>: <span class="hl-string">'技术栈'</span>, <span class="hl-attr">dataIndex</span>: <span class="hl-string">'name'</span>, <span class="hl-attr">width</span>: <span class="hl-string">'180px'</span> },
  { <span class="hl-attr">key</span>: <span class="hl-string">'version'</span>, <span class="hl-attr">title</span>: <span class="hl-string">'版本号'</span>, <span class="hl-attr">dataIndex</span>: <span class="hl-string">'version'</span>, <span class="hl-attr">width</span>: <span class="hl-string">'120px'</span> },
  { <span class="hl-attr">key</span>: <span class="hl-string">'status'</span>, <span class="hl-attr">title</span>: <span class="hl-string">'状态'</span>, <span class="hl-attr">dataIndex</span>: <span class="hl-string">'status'</span>, <span class="hl-attr">width</span>: <span class="hl-string">'100px'</span> },
  { <span class="hl-attr">key</span>: <span class="hl-string">'description'</span>, <span class="hl-attr">title</span>: <span class="hl-string">'描述'</span>, <span class="hl-attr">dataIndex</span>: <span class="hl-string">'description'</span> }
]</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, reactive } from 'vue'
import { 
  XTable, 
  XIcon,
  Msg
} from '@xlui/xux-ui'

const copied = ref(false)

// 响应式主题状态
const themeState = reactive({
  isDark: false
})

// 监听主题变化
const observeTheme = () => {
  themeState.isDark = document.documentElement.classList.contains('dark')
  
  const observer = new MutationObserver(() => {
    themeState.isDark = document.documentElement.classList.contains('dark')
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  return observer
}

// 获取状态样式
const getStatusStyle = (status) => {
  const statusMap = {
    'Active': { 
      color: themeState.isDark ? '#6ee7b7' : '#52c41a', 
      bg: themeState.isDark ? 'rgba(110, 231, 183, 0.1)' : '#f6ffed' 
    },
    'Stable': { 
      color: themeState.isDark ? '#64d2ff' : '#1890ff', 
      bg: themeState.isDark ? 'rgba(100, 210, 255, 0.1)' : '#e6f7ff' 
    },
    'Latest': { 
      color: themeState.isDark ? '#a78bfa' : '#722ed1', 
      bg: themeState.isDark ? 'rgba(167, 139, 250, 0.1)' : '#f9f0ff' 
    },
    'LTS': { 
      color: themeState.isDark ? '#fbbf24' : '#fa8c16', 
      bg: themeState.isDark ? 'rgba(251, 191, 36, 0.1)' : '#fff7e6' 
    }
  }
  const style = statusMap[status] || { 
    color: themeState.isDark ? '#9ca3af' : '#666', 
    bg: themeState.isDark ? 'rgba(156, 163, 175, 0.1)' : '#f5f5f5' 
  }
  return {
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    color: style.color,
    background: style.bg,
    display: 'inline-block',
    border: `1px solid ${style.color}30`
  }
}

// 获取状态文本
const getStatusText = (status) => {
  const textMap = {
    'Active': '活跃',
    'Stable': '稳定',
    'Latest': '最新',
    'LTS': 'LTS'
  }
  return textMap[status] || status
}

// 表格列配置
const tableColumns = [
  {
    key: 'name',
    title: '技术栈',
    dataIndex: 'name',
    width: '200px',
    align: 'left'
  },
  {
    key: 'version',
    title: '版本号',
    dataIndex: 'version',
    width: '150px',
    align: 'center'
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: '120px',
    slot: 'status',
    align: 'center'
  },
  {
    key: 'description',
    title: '描述',
    dataIndex: 'description',
    align: 'left'
  }
]

// 表格数据
const tableData = [
  { 
    id: 1,
    name: 'Vue 3',
    version: '3.4.0',
    status: 'Stable',
    description: '渐进式 JavaScript 框架，提供响应式数据绑定和组合式 API'
  },
  {
    id: 2,
    name: 'TypeScript',
    version: '5.3.3',
    status: 'Latest',
    description: 'JavaScript 的超集，添加了静态类型支持和现代化特性'
  },
  {
    id: 3,
    name: 'Vite',
    version: '5.0.0',
    status: 'Active',
    description: '下一代前端构建工具，提供极速的冷启动和热模块替换'
  },
  {
    id: 4,
    name: 'Pinia',
    version: '2.1.7',
    status: 'Stable',
    description: 'Vue 3 的官方状态管理库，类型安全且易于使用'
  },
  {
    id: 5,
    name: 'Vue Router',
    version: '4.2.5',
    status: 'Stable',
    description: 'Vue.js 的官方路由管理器，支持嵌套路由和导航守卫'
  },
  {
    id: 6,
    name: 'Element Plus',
    version: '2.4.3',
    status: 'Active',
    description: '基于 Vue 3 的组件库，提供丰富的企业级UI组件'
  },
  {
    id: 7,
    name: 'Node.js',
    version: '20.10.0',
    status: 'LTS',
    description: '基于 Chrome V8 引擎的 JavaScript 运行时环境'
  }
]

// 复制安装命令
const copyInstall = () => {
  navigator.clipboard.writeText('npm install @xlui/xux-ui')
  Msg.success('安装命令已复制到剪贴板')
}

// 复制代码
const copyCode = async () => {
  try {
    const code = `<XTable 
  :columns="columns" 
  :dataSource="data"
  rowKey="id"
  stripe
  hover
  height="450px"
/>

// 列配置
const columns = [
  { key: 'name', title: '技术栈', dataIndex: 'name', width: '180px' },
  { key: 'version', title: '版本号', dataIndex: 'version', width: '120px' },
  { key: 'status', title: '状态', dataIndex: 'status', width: '100px' },
  { key: 'description', title: '描述', dataIndex: 'description' }
]

// 表格数据
const data = [
  { id: 1, name: 'Vue 3', version: '3.4.0', status: 'Stable', description: '渐进式 JavaScript 框架' },
  { id: 2, name: 'TypeScript', version: '5.3.3', status: 'Latest', description: 'JavaScript 的超集' },
  // ...更多数据
]`
    await navigator.clipboard.writeText(code)
    copied.value = true
    Msg.success('代码已复制')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    Msg.error('复制失败')
  }
}

// 初始化 AOS 动画
let observer = null
let themeObserver = null

const initScrollAnimations = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate')
      }
    })
  }, { 
    threshold: 0.1
  })

  // 观察所有带有 data-aos 的元素
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el)
  })
}

onMounted(() => {
  nextTick(() => {
    initScrollAnimations()
    // 初始化主题观察器
    themeObserver = observeTheme()
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  if (themeObserver) {
    themeObserver.disconnect()
  }
})
</script>

<style scoped>
/* 全局样式 */
.xux-homepage {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  color: #1d1d1f;
  background: #f5f5f7;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Hero 区域 */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
}

/* iOS 风格背景 */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
}

.ios-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    #f5f5f7 0%,
    rgba(245, 245, 247, 0.8) 50%,
    #f5f5f7 100%
  );
}

.ios-blur-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.6;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #007aff 0%, transparent 70%);
  top: -200px;
  right: -200px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #5856d6 0%, transparent 70%);
  bottom: -150px;
  left: -150px;
  animation: float 25s ease-in-out infinite reverse;
}

.shape-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ff2d55 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float 30s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
  }
  33% { 
    transform: translate(30px, -30px) scale(1.1);
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* 内容容器 */
.hero-container {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* 顶部内容区域 */
.hero-header {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 40px;
}

/* 版本标签 */
.version-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 122, 255, 0.1);
  color: #007aff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.version-dot {
  width: 8px;
  height: 8px;
  background: #007aff;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.5;
    transform: scale(1.2);
  }
}

/* 标题 */
.hero-title {
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;
  color: #1d1d1f;
  transition: color 0.3s ease;
}

.title-gradient {
  background: linear-gradient(135deg, #007aff 0%, #5856d6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 描述 */
.hero-description {
  font-size: 24px;
  line-height: 1.5;
  color: #86868b;
  margin-bottom: 48px;
  transition: color 0.3s ease;
}

/* 按钮组 */
.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 48px;
  justify-content: center;
}

/* 安装命令 */
.install-command {
  margin-bottom: 48px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.command-label {
  font-size: 14px;
  color: #86868b;
  margin-bottom: 12px;
  text-align: center;
  transition: color 0.3s ease;
}

.command-box {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #d2d2d7;
  border-radius: 12px;
  padding: 16px 20px;
  max-width: 400px;
  margin: 0 auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.command-box code {
  flex: 1;
  font-family: 'SF Mono', Monaco, Consolas, monospace;
  font-size: 16px;
  color: #1d1d1f;
  transition: color 0.3s ease;
}

.copy-btn {
  background: none;
  border: none;
  color: #007aff;
  cursor: pointer;
  padding: 4px;
  margin-left: 12px;
  transition: opacity 0.3s ease;
}

.copy-btn:hover {
  opacity: 0.7;
}

/* 特性标签 */
.feature-tags {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #1d1d1f;
  transition: color 0.3s ease;
}

.feature-tag .x-icon {
  color: #34c759;
}

/* 组件展示卡片 */
.demo-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafafa 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.05),
    0 10px 30px rgba(0, 0, 0, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.demo-card::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 122, 255, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* 展示区域 */
.showcase-section {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: stretch;
  min-height: 600px;
}



.demo-preview {
  padding: 40px 30px;
  position: relative;
  z-index: 1;
}

/* 现代化表格样式 */
.modern-table {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.demo-preview :deep(.x-table) {
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif;
}

.demo-preview :deep(.x-table-header) {
  background: rgba(249, 250, 251, 0.8);
  backdrop-filter: blur(10px);
}

.demo-preview :deep(.x-table th) {
  background: transparent;
  font-weight: 600;
  color: #1d1d1f;
  font-size: 13px;
  padding: 18px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.demo-preview :deep(.x-table td) {
  font-size: 14px;
  padding: 16px;
  color: #333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.demo-preview :deep(.x-table tr) {
  transition: all 0.2s ease;
}

.demo-preview :deep(.x-table tbody tr:hover) {
  background: rgba(0, 122, 255, 0.03);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.08);
}

.demo-preview :deep(.x-table-stripe tr:nth-child(even)) {
  background: rgba(0, 0, 0, 0.015);
}

/* 表格单元格内容样式 */
.demo-preview :deep(.x-table td:first-child) {
  font-weight: 600;
  color: #1d1d1f;
}

/* 代码展示卡片 */
.code-card {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 10px 30px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.code-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%);
  pointer-events: none;
}

.code-header {
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code-lang {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.code-header .copy-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.code-header .copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.code-content {
  padding: 32px 28px;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}

/* 自定义滚动条 */
.code-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.code-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
}

.code-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}

.code-content pre {
  margin: 0;
  font-family: 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 15px;
  line-height: 1.8;
  letter-spacing: 0.5px;
}

.code-content code {
  background: none;
  padding: 0;
  font-size: inherit;
  color: #d4d4d4;
}

.code-text {
  display: block;
  animation: fadeInCode 0.8s ease;
}

@keyframes fadeInCode {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 代码高亮样式 */
.hl-tag { 
  color: #7dd3fc;
  font-weight: 500;
}
.hl-attr { 
  color: #a78bfa;
  font-style: italic;
}
.hl-string { 
  color: #86efac;
}
.hl-bracket { 
  color: #64748b;
  font-weight: 600;
}
.hl-comment {
  color: #6b7280;
  font-style: italic;
}
.hl-keyword {
  color: #f472b6;
  font-weight: 500;
}
.hl-var {
  color: #fbbf24;
}
.hl-number {
  color: #f59e0b;
}









/* 动画效果 */
[data-aos] {
  opacity: 0;
  transition: all 0.8s ease;
}

[data-aos="fade-up"] {
  transform: translateY(30px);
}

[data-aos="fade-down"] {
  transform: translateY(-30px);
}

[data-aos="fade-left"] {
  transform: translateX(30px);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

/* 响应式 */
@media (max-width: 1024px) {
  .hero-container {
    gap: 48px;
    padding: 0 40px;
  }
  
  .showcase-section {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  
  .demo-preview {
    padding: 30px 20px;
    overflow-x: auto;
  }
  
  .modern-table {
    min-width: 700px;
  }
}

@media (max-width: 768px) {
  .hero-container {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 48px;
  }
  
  .hero-description {
    font-size: 20px;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .x-button {
    width: 200px;
  }
  
  .showcase-section {
    gap: 20px;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-description {
    font-size: 18px;
  }
  
  .feature-tag {
    font-size: 12px;
  }
}

/* 暗黑模式支持 */
.dark .xux-homepage {
  background: #000000;
  color: #f5f5f7;
}

.dark .hero-background .ios-gradient {
  background: linear-gradient(
    180deg,
    #000000 0%,
    rgba(0, 0, 0, 0.8) 50%,
    #000000 100%
  );
}

.dark .ios-blur-shape {
  opacity: 0.3;
}

.dark .shape-1 {
  background: radial-gradient(circle, #0051d5 0%, transparent 70%);
}

.dark .shape-2 {
  background: radial-gradient(circle, #32306e 0%, transparent 70%);
}

.dark .shape-3 {
  background: radial-gradient(circle, #8b1538 0%, transparent 70%);
}

.dark .version-badge {
  background: rgba(100, 210, 255, 0.15);
  color: #64d2ff;
}

.dark .version-dot {
  background: #64d2ff;
}

.dark .hero-title {
  color: #f5f5f7;
}

.dark .title-gradient {
  background: linear-gradient(135deg, #64d2ff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .hero-description {
  color: #a1a1a6;
}

.dark .command-box {
  background: #1c1c1e;
  border-color: #2c2c2e;
}

.dark .command-box code {
  color: #f5f5f7;
}

.dark .command-label {
  color: #a1a1a6;
}

.dark .feature-tag {
  color: #f5f5f7;
}

.dark .feature-tag .x-icon {
  color: #30d158;
}

/* 暗黑模式 - 表格卡片 */
.dark .demo-card {
  background: linear-gradient(145deg, #1c1c1e 0%, #2c2c2e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 10px 30px rgba(0, 0, 0, 0.6),
    inset 0 1px 2px rgba(255, 255, 255, 0.05);
}

.dark .demo-card::before {
  background: radial-gradient(circle, rgba(100, 210, 255, 0.08) 0%, transparent 70%);
}

.dark .modern-table {
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .demo-preview :deep(.x-table) {
  background: transparent;
}

.dark .demo-preview :deep(.x-table-header) {
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(10px);
}

.dark .demo-preview :deep(.x-table th) {
  color: #f5f5f7;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.dark .demo-preview :deep(.x-table td) {
  color: #d1d1d6;
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.dark .demo-preview :deep(.x-table tbody tr:hover) {
  background: rgba(100, 210, 255, 0.05);
  box-shadow: 0 2px 8px rgba(100, 210, 255, 0.1);
}

.dark .demo-preview :deep(.x-table-stripe tr:nth-child(even)) {
  background: rgba(255, 255, 255, 0.02);
}

.dark .demo-preview :deep(.x-table td:first-child) {
  color: #f5f5f7;
}

/* 暗黑模式 - 代码卡片 */
.dark .code-card {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 10px 30px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.02);
}

.dark .code-card::before {
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(100, 210, 255, 0.05) 50%,
    transparent 100%);
}

.dark .code-header {
  background: rgba(255, 255, 255, 0.02);
  border-bottom-color: rgba(255, 255, 255, 0.06);
}

.dark .code-lang {
  color: rgba(255, 255, 255, 0.6);
}

.dark .code-header .copy-btn {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}

.dark .code-header .copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .code-content ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.dark .code-content ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
}

.dark .code-content ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}

/* 暗黑模式 - 按钮 */
.dark .copy-btn {
  color: rgba(255, 255, 255, 0.7);
  border-color: rgba(255, 255, 255, 0.2);
}

.dark .copy-btn:hover {
  color: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

/* 暗黑模式 - 代码高亮 */
.dark .hl-tag { 
  color: #7dd3fc;
}
.dark .hl-attr { 
  color: #a78bfa;
}
.dark .hl-string { 
  color: #86efac;
}
.dark .hl-bracket { 
  color: #94a3b8;
}
.dark .hl-comment {
  color: #64748b;
}
.dark .hl-keyword {
  color: #f472b6;
}
.dark .hl-var {
  color: #fbbf24;
}
.dark .hl-number {
  color: #f59e0b;
}

/* 暗黑模式 - 滚动条 */
.dark ::-webkit-scrollbar {
  background: #1c1c1e;
}

.dark ::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>