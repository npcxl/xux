<template>
  <div class="apple-homepage" ref="homepageRef" :class="{ 'dark-mode': isDarkMode }">
    <!-- 动态背景 -->
    <div class="dynamic-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    
    <!-- Hero 场景 -->
    <section class="scene scene-hero">
      <div class="hero-content">
        <div class="hero-badge" data-scroll-speed="0.8">
          <div class="badge-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14l9 9L22 13z"/>
            </svg>
          </div>
          Vue 3 + TypeScript
        </div>
        <h1 class="hero-title" data-scroll-speed="0.9">
          <span class="title-line">现代化组件库</span>
          <span class="title-line gradient-text">为专业开发而生</span>
        </h1>
        <p class="hero-subtitle" data-scroll-speed="1">
          40+ 精心设计的组件，20+ 实用工具函数<br/>
          让你的开发效率提升 10 倍
        </p>
        
        <!-- 主题切换区域 -->
        <div class="theme-showcase" data-scroll-speed="1.05">
          <div class="theme-label">主题定制</div>
          <div class="theme-controls-inline">
            <div class="theme-switcher">
              <button 
                class="theme-btn"
                :class="{ active: !isDarkMode }"
                @click="toggleDarkMode(false)"
                title="浅色模式"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v6m0 6v6m-9-9h6m6 0h6m-7.36 7.36l4.24 4.24M4.93 4.93l4.24 4.24m0 9.9l-4.24 4.24m14.14 0l-4.24-4.24"/>
                </svg>
              </button>
              <button 
                class="theme-btn"
                :class="{ active: isDarkMode }"
                @click="toggleDarkMode(true)"
                title="深色模式"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              </button>
            </div>
            
            <div class="color-separator"></div>
            
            <div class="color-picker">
              <button
                v-for="color in themeColors"
                :key="color.name"
                class="color-btn"
                :class="{ active: currentTheme === color.name }"
                :style="{ background: color.value }"
                @click="setThemeColor(color.name)"
                :title="color.label"
              ></button>
            </div>
          </div>
        </div>
        
        <div class="hero-actions" data-scroll-speed="1.1">
          <XButton type="primary" size="large" round @click="goToStart">
            <span>开始使用</span>
            <svg class="button-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </XButton>
          <XButton size="large" round plain @click="goToDocs">
            查看组件
          </XButton>
        </div>
        
        <!-- 安装配置预览 -->
        <div class="install-preview" :class="{ 'visible': codeVisible }" data-scroll-speed="1.2">
          <div class="install-header">
            <div class="header-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <span class="install-title">快速开始</span>
            <span class="install-copy" @click="copyInstall">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              复制
            </span>
          </div>
          <div class="install-content">
            <div class="install-step">
              <span class="step-number">1</span>
              <div class="step-content">
                <p class="step-title">安装组件库</p>
                <div class="code-block-ios">
                  <pre><code><span class="code-comment"># 使用 npm</span>
npm install @xlui/xux-ui

<span class="code-comment"># 使用 pnpm</span>
pnpm add @xlui/xux-ui</code></pre>
                </div>
              </div>
            </div>
            
            <div class="install-step">
              <span class="step-number">2</span>
              <div class="step-content">
                <p class="step-title">全局注册</p>
                <div class="code-block-ios">
                  <pre><code><span class="code-comment">// main.ts</span>
<span class="code-keyword">import</span> { createApp } <span class="code-keyword">from</span> <span class="code-string">'vue'</span>
<span class="code-keyword">import</span> App <span class="code-keyword">from</span> <span class="code-string">'./App.vue'</span>
<span class="code-keyword">import</span> * <span class="code-keyword">as</span> XUXComponents <span class="code-keyword">from</span> <span class="code-string">'@xlui/xux-ui'</span>
<span class="code-keyword">import</span> <span class="code-string">'@xlui/xux-ui/dist/index.css'</span>

<span class="code-keyword">const</span> app = createApp(App)

<span class="code-comment">// 全局注册所有组件</span>
Object.<span class="code-method">entries</span>(XUXComponents).<span class="code-method">forEach</span>(([name, component]) => {
  <span class="code-keyword">if</span> (name.<span class="code-method">startsWith</span>(<span class="code-string">'X'</span>)) {
    app.<span class="code-method">component</span>(name, component)
  }
})

app.<span class="code-method">mount</span>(<span class="code-string">'#app'</span>)</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 组件跑马灯展示 -->
    <section class="components-marquee-section">
      <div class="marquee-header">
        <h2>组件展示</h2>
        <p>精心设计的组件，让开发变得简单而优雅</p>
      </div>
      
      <!-- 向上滚动的跑马灯 -->
      <div class="marquee-container marquee-up">
        <div class="marquee-content">
          <!-- 第一组 -->
          <div class="marquee-item">
            <XButton type="primary" round>主要按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="success" round>成功按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="warning" plain round>警告按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="danger" plain round>危险按钮</XButton>
          </div>
          <div class="marquee-item">
            <XTag type="primary">标签一</XTag>
          </div>
          <div class="marquee-item">
            <XTag type="success" closable>可关闭</XTag>
          </div>
          <div class="marquee-item">
            <XBadge :value="5">
              <XButton size="small">消息</XButton>
            </XBadge>
          </div>
          <div class="marquee-item">
            <XBadge :value="'New'" type="success">
              <XButton size="small">动态</XButton>
            </XBadge>
          </div>
          <div class="marquee-item">
            <XSwitch v-model="switchValue1" active-text="开" inactive-text="关" />
          </div>
          
          <!-- 复制第二组 -->
          <div class="marquee-item">
            <XButton type="primary" round>主要按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="success" round>成功按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="warning" plain round>警告按钮</XButton>
          </div>
          <div class="marquee-item">
            <XButton type="danger" plain round>危险按钮</XButton>
          </div>
          <div class="marquee-item">
            <XTag type="primary">标签一</XTag>
          </div>
          <div class="marquee-item">
            <XTag type="success" closable>可关闭</XTag>
          </div>
          <div class="marquee-item">
            <XBadge :value="5">
              <XButton size="small">消息</XButton>
            </XBadge>
          </div>
          <div class="marquee-item">
            <XBadge :value="'New'" type="success">
              <XButton size="small">动态</XButton>
            </XBadge>
          </div>
          <div class="marquee-item">
            <XSwitch v-model="switchValue1" active-text="开" inactive-text="关" />
          </div>
        </div>
      </div>
      
      <!-- 向下滚动的跑马灯 -->
      <div class="marquee-container marquee-down">
        <div class="marquee-content">
          <!-- 第一组 -->
          <div class="marquee-item">
            <XInput v-model="inputDemo" placeholder="请输入内容" size="small" />
          </div>
          <div class="marquee-item">
            <XSelect v-model="selectDemo" :options="selectOptions" placeholder="请选择" size="small" />
          </div>
          <div class="marquee-item">
            <XScore v-model="scoreDemo" />
          </div>
          <div class="marquee-item">
            <XLink type="primary">主要链接</XLink>
          </div>
          <div class="marquee-item">
            <XLink type="success">成功链接</XLink>
          </div>
          <div class="marquee-item">
            <XButton loading size="small">加载中</XButton>
          </div>
          <div class="marquee-item">
            <XTag type="warning" round>警告</XTag>
          </div>
          <div class="marquee-item">
            <XTag type="danger" round>危险</XTag>
          </div>
          <div class="marquee-item">
            <XDivider>分割线</XDivider>
          </div>
          
          <!-- 复制第二组 -->
          <div class="marquee-item">
            <XInput v-model="inputDemo" placeholder="请输入内容" size="small" />
          </div>
          <div class="marquee-item">
            <XSelect v-model="selectDemo" :options="selectOptions" placeholder="请选择" size="small" />
          </div>
          <div class="marquee-item">
            <XScore v-model="scoreDemo" />
          </div>
          <div class="marquee-item">
            <XLink type="primary">主要链接</XLink>
          </div>
          <div class="marquee-item">
            <XLink type="success">成功链接</XLink>
          </div>
          <div class="marquee-item">
            <XButton loading size="small">加载中</XButton>
          </div>
          <div class="marquee-item">
            <XTag type="warning" round>警告</XTag>
          </div>
          <div class="marquee-item">
            <XTag type="danger" round>危险</XTag>
          </div>
          <div class="marquee-item">
            <XDivider>分割线</XDivider>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Table 专门展示区 -->
    <section class="table-showcase-section" ref="tableSection">
      <div class="container">
        <div class="table-showcase">
          <div class="table-code">
            <div class="code-window">
              <div class="window-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="window-title">Table 表格组件</span>
              </div>
              <pre class="code-content"><code><span class="code-tag">&lt;template&gt;</span>
  <span class="code-tag">&lt;XTable</span> 
    <span class="code-attr">:data</span>=<span class="code-string">"tableData"</span>
    <span class="code-attr">:columns</span>=<span class="code-string">"columns"</span>
    <span class="code-attr">stripe</span>
    <span class="code-attr">@sort-change</span>=<span class="code-string">"handleSort"</span>
  <span class="code-tag">&gt;</span>
    <span class="code-comment">&lt;!-- 自定义列 --&gt;</span>
    <span class="code-tag">&lt;XTableColumn</span> 
      <span class="code-attr">prop</span>=<span class="code-string">"name"</span> 
      <span class="code-attr">label</span>=<span class="code-string">"姓名"</span> 
      <span class="code-attr">width</span>=<span class="code-string">"120"</span>
    <span class="code-tag">/&gt;</span>
    <span class="code-tag">&lt;XTableColumn</span> 
      <span class="code-attr">prop</span>=<span class="code-string">"department"</span> 
      <span class="code-attr">label</span>=<span class="code-string">"部门"</span>
      <span class="code-attr">sortable</span>
    <span class="code-tag">/&gt;</span>
    <span class="code-tag">&lt;XTableColumn</span> <span class="code-attr">label</span>=<span class="code-string">"操作"</span> <span class="code-attr">width</span>=<span class="code-string">"200"</span><span class="code-tag">&gt;</span>
      <span class="code-tag">&lt;template</span> <span class="code-attr">#default</span>=<span class="code-string">"{ row }"</span><span class="code-tag">&gt;</span>
        <span class="code-tag">&lt;XButton</span> <span class="code-attr">type</span>=<span class="code-string">"primary"</span> <span class="code-attr">size</span>=<span class="code-string">"small"</span> <span class="code-attr">text</span><span class="code-tag">&gt;</span>
          编辑
        <span class="code-tag">&lt;/XButton&gt;</span>
        <span class="code-tag">&lt;XButton</span> <span class="code-attr">type</span>=<span class="code-string">"danger"</span> <span class="code-attr">size</span>=<span class="code-string">"small"</span> <span class="code-attr">text</span><span class="code-tag">&gt;</span>
          删除
        <span class="code-tag">&lt;/XButton&gt;</span>
      <span class="code-tag">&lt;/template&gt;</span>
    <span class="code-tag">&lt;/XTableColumn&gt;</span>
  <span class="code-tag">&lt;/XTable&gt;</span>
<span class="code-tag">&lt;/template&gt;</span></code></pre>
            </div>
          </div>
          <div class="table-preview">
            <h3>Table 表格</h3>
            <p>功能强大的数据表格，支持排序、筛选、自定义列</p>
            <div class="table-demo">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>部门 <span class="sort-icon">↕</span></th>
                    <th>职位</th>
                    <th>入职时间</th>
                    <th>状态</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableData" :key="index">
                    <td>{{ row.name }}</td>
                    <td>{{ row.department }}</td>
                    <td>{{ row.position }}</td>
                    <td>{{ row.date }}</td>
                    <td>
                      <XTag :type="row.status === '在线' ? 'success' : 'info'" size="small">
                        {{ row.status }}
                      </XTag>
                    </td>
                    <td>
                      <XButton type="primary" size="small" text>编辑</XButton>
                      <XButton type="danger" size="small" text>删除</XButton>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="table-pagination">
                <span class="page-info">共 {{ tableData.length }} 条</span>
                <div class="page-btns">
                  <XButton size="small" disabled>上一页</XButton>
                  <XButton size="small" type="primary">1</XButton>
                  <XButton size="small">2</XButton>
                  <XButton size="small">3</XButton>
                  <XButton size="small">下一页</XButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 其他组件展示 -->
    <section class="other-components-section">
      <div class="container">
        <div class="section-header">
          <h2>更多组件</h2>
          <p>丰富的组件生态，满足各种业务需求</p>
        </div>
        
        <div class="components-grid">
          <!-- Card -->
          <div class="component-showcase" data-aos="fade-up">
            <XCard>
              <template #title>
                <div class="card-title">
                  <span>Card 卡片</span>
                  <XTag type="primary" size="small">常用</XTag>
                </div>
              </template>
              <template #extra>
                <XButton text size="small">更多</XButton>
              </template>
              <p>卡片容器，可承载文字、列表、图片、段落等内容</p>
              <XDivider />
              <div class="card-footer">
                <XButton size="small">确定</XButton>
                <XButton size="small" plain>取消</XButton>
              </div>
            </XCard>
          </div>
          
          <!-- Result -->
          <div class="component-showcase" data-aos="fade-up" data-aos-delay="100">
            <div class="result-demo">
              <XResult 
                status="success" 
                title="操作成功"
                subTitle="您的请求已处理完成"
              />
              <XButton type="primary" size="small">返回首页</XButton>
            </div>
          </div>
          
          <!-- Loading -->
          <div class="component-showcase" data-aos="fade-up" data-aos-delay="200">
            <div class="loading-showcase">
              <h4>Loading 加载</h4>
              <div class="loading-demos">
                <XButton @click="showLoading" type="primary">显示加载</XButton>
                <div class="loading-inline">
                  <div class="spinner"></div>
                  <span>加载中...</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Product Card -->
          <div class="component-showcase" data-aos="fade-up" data-aos-delay="300">
            <div class="product-card-showcase">
              <h4>产品卡片</h4>
              <XCard 
                type="product"
                title="手工编织棉麻抱枕套"
                description="纯手工编织，采用优质棉麻面料，触感柔软舒适，为您的家居增添一抹温馨。"
                image="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400"
                price="¥89"
                label="新品"
                :show-description="true"
                :is-liked="productLiked"
                @click="handleProductClick"
                @like="handleProductLike"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 特性展示 -->
    <section class="scene scene-features" data-scroll-fade>
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">为什么选择 XUX UI？</h2>
          <p class="section-subtitle">专业、高效、优雅的组件库解决方案</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-scroll-scale>
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3>TypeScript 支持</h3>
            <p>完整的类型定义，享受智能提示带来的开发体验</p>
          </div>
          
          <div class="feature-card" data-scroll-scale style="animation-delay: 0.1s">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>高性能</h3>
            <p>虚拟滚动、按需加载，确保应用性能始终领先</p>
          </div>
          
          <div class="feature-card" data-scroll-scale style="animation-delay: 0.2s">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
              </svg>
            </div>
            <h3>主题定制</h3>
            <p>灵活的主题系统，轻松定制符合品牌的界面</p>
          </div>
          
          <div class="feature-card" data-scroll-scale style="animation-delay: 0.3s">
            <div class="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
              </svg>
            </div>
            <h3>完善文档</h3>
            <p>详尽的文档说明和丰富的示例代码</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="scene scene-cta">
      <div class="cta-content">
        <h2 data-scroll-scale>准备好提升你的开发效率了吗？</h2>
        <p>加入 4000+ 开发者的选择</p>
        <div class="cta-actions">
          <XButton type="primary" size="large" round @click="goToStart">
            立即开始
          </XButton>
          <XButton size="large" round plain>
            GitHub
          </XButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  XButton, 
  XBadge,
  XSwitch,
  XTag,
  XScore,
  XCard,
  XDivider,
  XInput,
  XSelect,
  XLink,
  XResult,
  Msg
} from '@xlui/xux-ui'

// 主题控制
const isDarkMode = ref(false)
const currentTheme = ref('blue')

const themeColors = [
  { name: 'blue', value: '#007AFF', label: '经典蓝' },
  { name: 'purple', value: '#5856D6', label: '优雅紫' },
  { name: 'green', value: '#34C759', label: '自然绿' },
  { name: 'orange', value: '#FF9500', label: '活力橙' },
  { name: 'pink', value: '#FF2D55', label: '热情粉' },
  { name: 'teal', value: '#5AC8FA', label: '清新青' }
]

// 响应式数据
const codeVisible = ref(false)
const switchValue1 = ref(true)
const inputDemo = ref('')
const selectDemo = ref('')
const scoreDemo = ref(4)
const productLiked = ref(true)

const selectOptions = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' }
]

const tableData = [
  { name: '张三', department: '技术部', position: '前端工程师', date: '2023-01-15', status: '在线' },
  { name: '李四', department: '产品部', position: '产品经理', date: '2023-03-20', status: '离线' },
  { name: '王五', department: '设计部', position: 'UI设计师', date: '2023-02-10', status: '在线' },
  { name: '赵六', department: '技术部', position: '后端工程师', date: '2023-04-05', status: '在线' }
]

// 主题切换
const toggleDarkMode = (value) => {
  isDarkMode.value = value
  document.documentElement.classList.toggle('dark', value)
}

const setThemeColor = (themeName) => {
  currentTheme.value = themeName
  const theme = themeColors.find(c => c.name === themeName)
  if (theme) {
    document.documentElement.style.setProperty('--primary-color', theme.value)
    const rgb = hexToRgb(theme.value)
    document.documentElement.style.setProperty('--primary-color-light', `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`)
    document.documentElement.style.setProperty('--primary-color-dark', adjustColor(theme.value, -20))
  }
}

// 辅助函数
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

const adjustColor = (color, amount) => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2))
}

// 方法
const goToStart = () => {
  window.location.href = '/guide/quickstart'
}

const goToDocs = () => {
  window.location.href = '/components/button'
}

const copyInstall = () => {
  const installCode = `npm install @xlui/xux-ui

// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import * as XUXComponents from '@xlui/xux-ui'
import '@xlui/xux-ui/dist/index.css'

const app = createApp(App)

// 全局注册所有组件
Object.entries(XUXComponents).forEach(([name, component]) => {
  if (name.startsWith('X')) {
    app.component(name, component)
  }
})

app.mount('#app')`
  navigator.clipboard.writeText(installCode)
  Msg.success('安装代码已复制到剪贴板')
}

const showLoading = () => {
  const loading = Msg.loading('加载中...')
  setTimeout(() => {
    loading.close()
    Msg.success('加载完成')
  }, 2000)
}

const handleProductClick = () => {
  Msg.info('点击了产品卡片')
}

const handleProductLike = (liked) => {
  productLiked.value = liked
  if (liked) {
    Msg.success('已添加到收藏')
  } else {
    Msg.info('已取消收藏')
  }
}

// 滚动和动画
let observer
let scrollHandler

// 视差滚动
const handleParallax = () => {
  const scrolled = window.pageYOffset
  
  // 视差效果
  const elements = document.querySelectorAll('[data-scroll-speed]')
  elements.forEach(el => {
    const speed = el.dataset.scrollSpeed
    const yPos = -(scrolled * speed)
    el.style.transform = `translateY(${yPos}px)`
  })
}

onMounted(() => {
  // 初始化主题
  setThemeColor('blue')
  
  setTimeout(() => {
    codeVisible.value = true
  }, 500)

  // 设置滚动观察器
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        
        // AOS动画
        if (entry.target.dataset.aos) {
          entry.target.classList.add('aos-animate')
        }
      }
    })
  }, { 
    threshold: 0.1,
    rootMargin: '-50px'
  })

  // 观察元素
  document.querySelectorAll('[data-scroll-scale], [data-scroll-fade], [data-aos]').forEach(el => {
    observer.observe(el)
  })
  
  // 视差滚动
  scrollHandler = () => requestAnimationFrame(handleParallax)
  window.addEventListener('scroll', scrollHandler)
  handleParallax()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (scrollHandler) window.removeEventListener('scroll', scrollHandler)
})
</script>

<style scoped>
/* CSS变量 - 主题系统 */
:root {
  --primary-color: #007AFF;
  --primary-color-light: rgba(0, 122, 255, 0.1);
  --primary-color-dark: #0051D5;
  
  --bg-primary: #FFFFFF;
  --bg-secondary: #F7F7F7;
  --bg-tertiary: #FAFAFA;
  
  --text-primary: #1D1D1F;
  --text-secondary: #6B7280;
  --text-tertiary: #8E8E93;
  
  --border-color: #E5E5EA;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* 暗色模式 */
.dark-mode {
  --bg-primary: #1C1C1E;
  --bg-secondary: #2C2C2E;
  --bg-tertiary: #3A3A3C;
  
  --text-primary: #FFFFFF;
  --text-secondary: #EBEBF5;
  --text-tertiary: #C7C7CC;
  
  --border-color: #38383A;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
}

/* 基础样式 */
.apple-homepage {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding-top: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 主题展示区域 */
.theme-showcase {
  margin: 32px 0 48px;
  animation: fadeIn 0.8s ease-out 0.5s both;
}

.theme-label {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  font-weight: 600;
}

.theme-controls-inline {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dark-mode .theme-controls-inline {
  background: rgba(44, 44, 46, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.theme-switcher {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

.dark-mode .theme-switcher {
  background: rgba(255, 255, 255, 0.05);
}

.theme-btn {
  padding: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-btn:hover {
  background: var(--bg-primary);
}

.theme-btn.active {
  background: white;
  color: var(--primary-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dark-mode .theme-btn.active {
  background: rgba(255, 255, 255, 0.1);
}

.color-separator {
  width: 1px;
  height: 24px;
  background: var(--border-color);
}

.color-picker {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.active {
  border-color: var(--bg-primary);
  box-shadow: 0 0 0 3px var(--primary-color-light);
}

.color-btn.active::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* 动态背景 */
.dynamic-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: -1;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.1;
  animation: float 20s ease-in-out infinite;
  background: var(--primary-color);
}

.dark-mode .gradient-orb {
  opacity: 0.05;
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
  animation-duration: 25s;
}

.orb-2 {
  width: 800px;
  height: 800px;
  bottom: -300px;
  left: -300px;
  animation-duration: 30s;
  animation-delay: -5s;
}

.orb-3 {
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  animation-duration: 35s;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(100px, -100px) scale(1.1); }
  50% { transform: translate(-100px, 100px) scale(0.9); }
  75% { transform: translate(50px, 50px) scale(1.05); }
}

/* Hero 场景 */
.scene-hero {
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 48px 80px;
  margin-top: var(--vp-nav-height, 64px);
}

.hero-content {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  animation: slideDown 0.8s ease-out;
}

.badge-icon {
  display: flex;
  align-items: center;
}

.hero-title {
  font-size: 88px;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 32px;
  letter-spacing: -2px;
  animation: slideUp 0.8s ease-out 0.2s both;
}

.title-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 28px;
  color: var(--text-secondary);
  margin-bottom: 64px;
  line-height: 1.6;
  animation: fadeIn 0.8s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
  animation: fadeIn 0.8s ease-out 0.6s both;
}

.button-arrow {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.hero-actions button:hover .button-arrow {
  transform: translateX(4px);
}

/* 安装预览 */
.install-preview {
  width: 100%;
  max-width: 1200px;
  background: #F7F7F7;
  border-radius: 24px;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E5EA;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.dark-mode .install-preview {
  background: #2C2C2E;
  border-color: #38383A;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.install-preview.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.install-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #F7F7F7;
  border-bottom: 1px solid #E5E5EA;
}

.dark-mode .install-header {
  background: #2C2C2E;
  border-bottom-color: #38383A;
}

.header-dots {
  display: flex;
  gap: 8px;
}

.header-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #E5E5EA;
}

.header-dots .dot:first-child { background: #FF5F56; }
.header-dots .dot:nth-child(2) { background: #FFBD2E; }
.header-dots .dot:last-child { background: #27C93F; }

.install-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
}

.install-copy {
  color: var(--primary-color);
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.install-copy:hover {
  opacity: 0.7;
}

.install-content {
  padding: 40px;
  background: #FFFFFF;
}

.dark-mode .install-content {
  background: #1C1C1E;
}

.install-step {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 32px;
}

.install-step:last-child {
  margin-bottom: 0;
}

.step-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
}

.step-content {
  flex: 1;
}

.step-title {
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
}

/* iOS风格代码块 */
.code-block-ios {
  background: #F7F7F7;
  padding: 20px;
  border-radius: 12px;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  border: 1px solid #E5E5EA;
  overflow-x: auto;
  color: #1D1D1F;
}

.dark-mode .code-block-ios {
  background: #2C2C2E;
  border-color: #38383A;
  color: #FFFFFF;
}

.code-block-ios pre {
  margin: 0;
  white-space: pre;
}

.code-block-ios code {
  color: inherit;
}

/* 组件跑马灯 */
.components-marquee-section {
  padding: 120px 0;
  background: var(--bg-secondary);
  overflow: hidden;
  width: 100%;
}

.marquee-header {
  text-align: center;
  margin-bottom: 80px;
}

.marquee-header h2 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
}

.marquee-header p {
  font-size: 24px;
  color: var(--text-secondary);
}

.marquee-container {
  position: relative;
  width: 100%;
  padding: 30px 0;
  overflow: hidden;
}

.marquee-content {
  display: flex;
  gap: 60px;
  animation: marquee 30s linear infinite;
}

.marquee-up .marquee-content {
  animation-name: marquee-up;
}

.marquee-down .marquee-content {
  animation-name: marquee-down;
  animation-duration: 35s;
}

.marquee-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 16px 32px;
  background: var(--bg-primary);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transform: scale(1.1);
}

@keyframes marquee-up {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-down {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* Table 展示区 */
.table-showcase-section {
  padding: 120px 0;
  background: var(--bg-primary);
  width: 100%;
}

.table-showcase {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 100px;
  align-items: center;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 48px;
}

.table-code {
  background: #1E1E1E;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.code-window {
  height: 100%;
}

.window-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: #2D2D2D;
  border-bottom: 1px solid #1E1E1E;
}

.window-header .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.window-header .dot.red { background: #FF5F56; }
.window-header .dot.yellow { background: #FFBD2E; }
.window-header .dot.green { background: #27C93F; }

.window-title {
  margin-left: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #CCCCCC;
}

.code-content {
  padding: 32px 40px;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-size: 16px;
  line-height: 1.8;
  overflow-x: auto;
  background: #1E1E1E;
  text-align: left;
}

.code-content pre {
  margin: 0;
  text-align: left;
}

.code-content code {
  color: #D4D4D4;
  text-align: left;
  display: block;
}

.table-preview h3 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
}

.table-preview p {
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 48px;
}

.table-demo {
  background: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th {
  background: var(--bg-secondary);
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
}

.custom-table td {
  padding: 16px;
  font-size: 14px;
  border-bottom: 1px solid var(--border-color);
}

.custom-table tr:last-child td {
  border-bottom: none;
}

.custom-table tr:hover {
  background: var(--bg-tertiary);
}

.sort-icon {
  color: var(--text-tertiary);
  font-size: 12px;
  margin-left: 4px;
}

.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.page-info {
  font-size: 14px;
  color: var(--text-secondary);
}

.page-btns {
  display: flex;
  gap: 8px;
}

/* 其他组件 */
.other-components-section {
  padding: 120px 0;
  background: var(--bg-secondary);
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
}

.section-header p {
  font-size: 24px;
  color: var(--text-secondary);
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 48px;
}

.component-showcase {
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.component-showcase:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer {
  display: flex;
  gap: 12px;
}

.result-demo {
  text-align: center;
}

.loading-showcase h4 {
  font-size: 20px;
  margin-bottom: 20px;
}

.loading-demos {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.loading-inline {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 产品卡片展示 */
.product-card-showcase h4 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.product-card-showcase .x-card {
  max-width: 100%;
  transition: all 0.3s ease;
}

.product-card-showcase .x-card:hover {
  transform: translateY(-4px);
}

/* 暗黑模式下的产品卡片 */
.dark-mode .product-card-showcase .x-card {
  background: var(--bg-secondary);
  border-color: var(--border-color);
}

.dark-mode .product-card-showcase .x-card .x-card__title {
  color: var(--text-primary);
}

.dark-mode .product-card-showcase .x-card .x-card__description {
  color: var(--text-secondary);
}

.dark-mode .product-card-showcase .x-card .x-card__price {
  color: var(--primary-color);
}

/* AOS动画 */
[data-aos] {
  opacity: 0;
  transition: all 0.8s ease;
}

[data-aos="fade-up"] {
  transform: translateY(40px);
}

[data-aos].aos-animate {
  opacity: 1;
  transform: translateY(0);
}

/* 特性和其他部分 */
.scene {
  position: relative;
  padding: 120px 0;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-title {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  letter-spacing: -1.5px;
}

.section-subtitle {
  font-size: 24px;
  color: var(--text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  max-width: 1600px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 40px 24px;
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

[data-scroll-scale] {
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.8s ease-out;
}

[data-scroll-scale].visible {
  opacity: 1;
  transform: scale(1);
}

[data-scroll-fade] {
  opacity: 0;
  transition: opacity 1s ease-out;
}

[data-scroll-fade].visible {
  opacity: 1;
}

.scene-cta {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  color: white;
  text-align: center;
  padding: 140px 0;
  width: 100%;
}

.cta-content h2 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
}

.cta-content p {
  font-size: 24px;
  margin-bottom: 64px;
  opacity: 0.9;
}

.cta-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* 动画 */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 代码高亮 */
.code-comment { color: #8E8E93; }
.code-keyword { color: #9B2393; }
.code-string { color: #D12F1B; }
.code-method { color: #0F68A0; }
.code-number { color: #1C00CF; }
.code-tag { color: #0F68A0; }
.code-attr { color: #9B2393; }

/* Table代码块专用的VSCode暗色主题配色 */
.code-content .code-tag { color: #569CD6; }
.code-content .code-attr { color: #9CDCFE; }
.code-content .code-string { color: #CE9178; }
.code-content .code-comment { color: #6A9955; }

.dark-mode .code-keyword { color: #C586C0; }
.dark-mode .code-string { color: #CE9178; }
.dark-mode .code-method { color: #DCDCAA; }
.dark-mode .code-number { color: #B5CEA8; }
.dark-mode .code-tag { color: #569CD6; }
.dark-mode .code-attr { color: #9CDCFE; }

/* 响应式 */
@media (max-width: 1400px) {
  .components-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .table-showcase {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .components-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .scene-hero {
    padding-top: 60px;
  }
  
  .hero-title {
    font-size: 56px;
  }
  
  .marquee-header h2,
  .section-header h2,
  .section-title {
    font-size: 40px;
  }
  
  .hero-subtitle,
  .marquee-header p,
  .section-header p,
  .section-subtitle {
    font-size: 20px;
  }
  
  .install-preview {
    width: 100%;
  }
  
  .features-grid,
  .components-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions button {
    width: 200px;
  }
  
  .theme-showcase {
    margin: 24px 0 32px;
  }
  
  .theme-controls-inline {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  
  .color-separator {
    width: 100%;
    height: 1px;
  }
}
</style>