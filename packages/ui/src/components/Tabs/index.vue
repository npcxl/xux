<template>
  <div class="x-tabs" :class="[`x-tabs--${type}`, `x-tabs--${position}`]">
    <!-- 标签头部 -->
    <div class="x-tabs__header">
      <div class="x-tabs__nav-wrap">
        <div 
          ref="navRef"
          class="x-tabs__nav"
          :class="{ 'is-scrollable': scrollable }"
        >
          <!-- 标签列表 -->
          <div
            v-for="(tab, index) in displayTabs"
            :key="tab.name"
            class="x-tabs__item"
            :class="{
              'is-active': activeKey === tab.name,
              'is-closable': tab.closable !== false && closable,
              'is-disabled': tab.disabled
            }"
            @click="handleTabClick(tab, index)"
            @mouseenter="handleTabHover(tab, index)"
          >
            <!-- 标签图标 -->
            <span v-if="tab.icon" class="x-tabs__item-icon">
              <Icon :icon="tab.icon" />
            </span>
            
            <!-- 标签标题 -->
            <span class="x-tabs__item-label">{{ tab.label }}</span>
            
            <!-- 关闭按钮 -->
            <span
              v-if="tab.closable !== false && closable"
              class="x-tabs__item-close"
              @click.stop="handleTabClose(tab, index)"
            >
              <Icon icon="mdi:close" />
            </span>
          </div>
          
          <!-- 新增按钮 -->
          <div
            v-if="addable"
            class="x-tabs__add"
            @click="handleTabAdd"
          >
            <Icon icon="mdi:plus" />
          </div>
          
          <!-- 下拉按钮 -->
          <XDropdown
            v-if="showOverflowDropdown && overflowTabs.length > 0"
            ref="dropdownRef"
            trigger="click"
            placement="bottom-end"
            :close-on-click="true"
            :max-height="400"
            :min-width="160"
          >
            <div class="x-tabs__dropdown-btn">
              <Icon icon="mdi:chevron-down" />
            </div>
            
            <template #dropdown>
              <div class="x-tabs__dropdown-menu">
                <div
                  v-for="tab in overflowTabs"
                  :key="tab.name"
                  class="x-tabs__dropdown-item"
                  :class="{
                    'is-active': activeKey === tab.name,
                    'is-disabled': tab.disabled
                  }"
                  @click="handleDropdownTabClick(tab)"
                >
                  <span v-if="tab.icon" class="x-tabs__dropdown-item-icon">
                    <Icon :icon="tab.icon" />
                  </span>
                  <span class="x-tabs__dropdown-item-label">{{ tab.label }}</span>
                  <span
                    v-if="tab.closable !== false && closable"
                    class="x-tabs__dropdown-item-close"
                    @click.stop="handleTabClose(tab, tabs.findIndex(t => t.name === tab.name))"
                  >
                    <Icon icon="mdi:close" />
                  </span>
                </div>
              </div>
            </template>
          </XDropdown>
          
          <!-- 激活指示器 -->
          <div
            v-if="type === 'line' || type === 'card'"
            ref="indicatorRef"
            class="x-tabs__indicator"
            :style="indicatorStyle"
          />
        </div>
      </div>
      
      <!-- 额外操作区 -->
      <div v-if="$slots.extra" class="x-tabs__extra">
        <slot name="extra" />
      </div>
    </div>
    
    <!-- 标签内容 -->
    <div class="x-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, provide } from 'vue'
import { Icon } from '@iconify/vue'
import XDropdown from '../Dropdown/index.vue'

export interface TabPane {
  name: string | number
  label: string
  icon?: string
  disabled?: boolean
  closable?: boolean
  content?: any
}

export interface TabsProps {
  modelValue?: string | number
  type?: 'line' | 'card' | 'border-card' | 'button' | 'segment' | 'chrome' | 'safari'
  position?: 'top' | 'bottom' | 'left' | 'right'
  closable?: boolean
  addable?: boolean
  scrollable?: boolean
  animated?: boolean
  /** 超出宽度时显示下拉菜单 */
  showOverflowDropdown?: boolean
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  type: 'line',
  position: 'top',
  closable: false,
  addable: false,
  scrollable: false,
  animated: true,
  showOverflowDropdown: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [name: string | number]
  'tab-click': [tab: TabPane, index: number]
  'tab-remove': [name: string | number]
  'tab-add': []
}>()

// 标签数据
const tabs = ref<TabPane[]>([])
const activeKey = ref(props.modelValue)
const navRef = ref<HTMLElement>()
const indicatorRef = ref<HTMLElement>()

// 下拉菜单相关
const dropdownRef = ref()
const visibleTabs = ref<TabPane[]>([])
const overflowTabs = ref<TabPane[]>([])

// 注册标签页
const registerTab = (tab: TabPane) => {
  const existingIndex = tabs.value.findIndex(t => t.name === tab.name)
  if (existingIndex > -1) {
    tabs.value[existingIndex] = tab
  } else {
    tabs.value.push(tab)
  }
}

// 注销标签页
const unregisterTab = (name: string | number) => {
  const index = tabs.value.findIndex(t => t.name === name)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

// 提供给子组件
provide('x-tabs', {
  activeKey,
  registerTab,
  unregisterTab
})

// 指示器样式
const indicatorStyle = ref({})

// 更新指示器位置
const updateIndicator = async () => {
  await nextTick()
  
  if (!navRef.value || !indicatorRef.value) return
  
  const activeTab = navRef.value.querySelector('.x-tabs__item.is-active') as HTMLElement
  if (!activeTab) return
  
  const navRect = navRef.value.getBoundingClientRect()
  const tabRect = activeTab.getBoundingClientRect()
  
  if (props.position === 'top' || props.position === 'bottom') {
    indicatorStyle.value = {
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - navRect.left}px)`
    }
  } else {
    indicatorStyle.value = {
      height: `${tabRect.height}px`,
      transform: `translateY(${tabRect.top - navRect.top}px)`
    }
  }
}

// 点击标签
const handleTabClick = (tab: TabPane, index: number) => {
  if (tab.disabled) return
  
  activeKey.value = tab.name
  emit('update:modelValue', tab.name)
  emit('change', tab.name)
  emit('tab-click', tab, index)
  
  updateIndicator()
}

// 悬停标签
const handleTabHover = (_tab: TabPane, _index: number) => {
  // 可以在这里添加悬停效果
}

// 关闭标签
const handleTabClose = (tab: TabPane, index: number) => {
  emit('tab-remove', tab.name)
  
  // 如果关闭的是当前激活的标签，自动切换到下一个
  if (activeKey.value === tab.name) {
    const nextTab = tabs.value[index + 1] || tabs.value[index - 1]
    if (nextTab) {
      activeKey.value = nextTab.name
      emit('update:modelValue', nextTab.name)
      emit('change', nextTab.name)
    }
  }
  
  unregisterTab(tab.name)
  nextTick(() => {
    updateIndicator()
  })
}

// 新增标签
const handleTabAdd = () => {
  emit('tab-add')
}

// 计算显示的标签
const displayTabs = computed(() => {
  if (!props.showOverflowDropdown) {
    return tabs.value
  }
  return visibleTabs.value
})

// 计算标签溢出
const calculateOverflow = () => {
  if (!props.showOverflowDropdown || !navRef.value || tabs.value.length === 0) {
    visibleTabs.value = tabs.value
    overflowTabs.value = []
    return
  }

  // 先暂时显示所有标签以正确测量
  visibleTabs.value = tabs.value
  overflowTabs.value = []
  
  nextTick(() => {
    if (!navRef.value) return
    
    const navWidth = navRef.value.clientWidth || 0
    const items = Array.from(navRef.value.querySelectorAll('.x-tabs__item')) as HTMLElement[]
    const addBtn = navRef.value.querySelector('.x-tabs__add') as HTMLElement
    const dropdownBtnWidth = 40 // 下拉按钮预估宽度
    
    const addBtnWidth = addBtn ? addBtn.offsetWidth + 8 : 0 // +8 for margin
    let availableWidth = navWidth - addBtnWidth - dropdownBtnWidth
    
    let totalWidth = 0
    const visible: TabPane[] = []
    const overflow: TabPane[] = []
    
    // 计算哪些标签可以显示
    for (let i = 0; i < tabs.value.length; i++) {
      const item = items[i]
      if (!item) continue
      
      const itemWidth = item.offsetWidth
      totalWidth += itemWidth
      
      if (totalWidth <= availableWidth) {
        visible.push(tabs.value[i])
      } else {
        overflow.push(tabs.value[i])
      }
    }
    
    // 如果没有溢出，增加可用宽度（不需要下拉按钮）
    if (overflow.length === 0) {
      availableWidth += dropdownBtnWidth
      totalWidth = 0
      visible.length = 0
      
      for (let i = 0; i < tabs.value.length; i++) {
        const item = items[i]
        if (!item) continue
        
        const itemWidth = item.offsetWidth
        totalWidth += itemWidth
        
        if (totalWidth <= availableWidth) {
          visible.push(tabs.value[i])
        } else {
          overflow.push(tabs.value[i])
        }
      }
    }
    
    // 确保当前激活的标签总是可见
    const activeIndex = overflow.findIndex(tab => tab.name === activeKey.value)
    if (activeIndex > -1 && visible.length > 0) {
      const activeTab = overflow.splice(activeIndex, 1)[0]
      visible.push(activeTab)
      // 移除最后一个可见标签到溢出列表（除了第一个）
      if (visible.length > 1) {
        const removed = visible.splice(visible.length - 2, 1)
        overflow.unshift(...removed)
      }
    }
    
    visibleTabs.value = visible
    overflowTabs.value = overflow
  })
}

// 处理下拉菜单标签点击
const handleDropdownTabClick = (tab: TabPane) => {
  if (tab.disabled) return
  
  const index = tabs.value.findIndex(t => t.name === tab.name)
  handleTabClick(tab, index)
}

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  activeKey.value = val
  calculateOverflow()
  updateIndicator()
})

// 监听标签变化
watch(() => tabs.value.length, () => {
  nextTick(() => {
    calculateOverflow()
    updateIndicator()
  })
})

onMounted(() => {
  calculateOverflow()
  updateIndicator()
  
  // 监听窗口大小变化
  const handleResize = () => {
    calculateOverflow()
    updateIndicator()
  }
  window.addEventListener('resize', handleResize)
})

// 暴露方法
defineExpose({
  updateIndicator,
  calculateOverflow
})
</script>

<style scoped>
.x-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* 标签头部 */
.x-tabs__header {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.x-tabs__nav-wrap {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.x-tabs__nav {
  display: flex;
  align-items: flex-end;
  position: relative;
  gap: 4px;
}

.x-tabs__nav.is-scrollable {
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

.x-tabs__nav.is-scrollable::-webkit-scrollbar {
  display: none;
}

/* 标签项 */
.x-tabs__item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  font-size: var(--x-font-size-base, 14px);
  font-weight: 500;
  color: var(--x-text-color-secondary, #666);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  white-space: nowrap;
  position: relative;
}

.x-tabs__item:hover {
  color: var(--x-color-primary, #1a1a1a);
}

.x-tabs__item.is-active {
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 600;
}

.x-tabs__item.is-disabled {
  color: var(--x-text-color-disabled, #ccc);
  cursor: not-allowed;
  opacity: 0.5;
}

.x-tabs__item.is-disabled:hover {
  color: var(--x-text-color-disabled, #ccc);
}

.x-tabs__item-icon {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.x-tabs__item-label {
  flex: 1;
}

.x-tabs__item-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 4px;
  border-radius: 50%;
  font-size: 12px;
  opacity: 0;
  transition: all 0.2s ease;
}

.x-tabs__item:hover .x-tabs__item-close,
.x-tabs__item.is-active .x-tabs__item-close {
  opacity: 0.6;
}

.x-tabs__item-close:hover {
  opacity: 1 !important;
  background: var(--x-bg-color-hover, #f5f5f5);
}

/* 新增按钮 */
.x-tabs__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  border-radius: var(--x-radius-base, 6px);
  color: var(--x-text-color-secondary, #666);
  cursor: pointer;
  transition: all 0.3s ease;
}

.x-tabs__add:hover {
  color: var(--x-color-primary, #1a1a1a);
  background: var(--x-bg-color-hover, #f5f5f5);
}

/* 下拉按钮 */
.x-tabs__dropdown-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  border-radius: var(--x-radius-base, 6px);
  color: var(--x-text-color-secondary, #666);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
}

.x-tabs__dropdown-btn:hover {
  color: var(--x-color-primary, #1a1a1a);
  background: var(--x-bg-color-hover, #f5f5f5);
}

/* 下拉菜单 */
.x-tabs__dropdown-menu {
  padding: 4px;
}

.x-tabs__dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--x-radius-sm, 4px);
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--x-text-color, #333);
  font-size: 14px;
  white-space: nowrap;
}

.x-tabs__dropdown-item:hover {
  background: var(--x-bg-color-hover, #f5f5f5);
  color: var(--x-color-primary, #1a1a1a);
}

.x-tabs__dropdown-item.is-active {
  background: var(--x-color-primary-light, rgba(26, 26, 26, 0.1));
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 600;
}

.x-tabs__dropdown-item.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  color: var(--x-text-color-disabled, #ccc);
}

.x-tabs__dropdown-item.is-disabled:hover {
  background: transparent;
  color: var(--x-text-color-disabled, #ccc);
}

.x-tabs__dropdown-item-icon {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.x-tabs__dropdown-item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-tabs__dropdown-item-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 12px;
  opacity: 0;
  transition: all 0.2s ease;
}

.x-tabs__dropdown-item:hover .x-tabs__dropdown-item-close {
  opacity: 0.6;
}

.x-tabs__dropdown-item-close:hover {
  opacity: 1 !important;
  background: var(--x-bg-color-hover, rgba(0, 0, 0, 0.1));
}

/* 指示器 */
.x-tabs__indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--x-color-primary, #1a1a1a);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

/* 额外操作区 */
.x-tabs__extra {
  flex-shrink: 0;
}

/* 内容区 */
.x-tabs__content {
  padding: 20px 0;
}

/* ============================================
   Line 类型 - 默认线条风格
   ============================================ */
.x-tabs--line .x-tabs__nav {
  border-bottom: 1px solid var(--x-border-color, #e5e7eb);
}

.x-tabs--line .x-tabs__item {
  padding-bottom: 12px;
  margin-bottom: -1px;
}

/* ============================================
   Card 类型 - 卡片风格
   ============================================ */
.x-tabs--card .x-tabs__item {
  border: 1px solid transparent;
  border-radius: var(--x-radius-base, 6px) var(--x-radius-base, 6px) 0 0;
  background: transparent;
  margin-bottom: -1px;
}

.x-tabs--card .x-tabs__item:hover {
  background: var(--x-bg-color-hover, #f5f5f5);
}

.x-tabs--card .x-tabs__item.is-active {
  background: var(--x-bg-color, white);
  border-color: var(--x-border-color, #e5e7eb);
  border-bottom-color: var(--x-bg-color, white);
}

.x-tabs--card .x-tabs__nav {
  border-bottom: 1px solid var(--x-border-color, #e5e7eb);
}

.x-tabs--card .x-tabs__indicator {
  display: none;
}

/* ============================================
   Border-Card 类型 - 边框卡片风格
   ============================================ */
.x-tabs--border-card .x-tabs__nav {
  gap: 0;
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: var(--x-radius-base, 6px);
  padding: 4px;
  background: var(--x-bg-color-secondary, #f9fafb);
}

.x-tabs--border-card .x-tabs__item {
  border-radius: var(--x-radius-sm, 4px);
  background: transparent;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-tabs--border-card .x-tabs__item:hover {
  background: var(--x-bg-color-hover, rgba(0, 0, 0, 0.04));
  color: var(--x-color-primary, #1a1a1a);
}

.x-tabs--border-card .x-tabs__item.is-active {
  background: var(--x-bg-color, white);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.05),
    0 0 0 1px var(--x-border-color-light, rgba(0, 0, 0, 0.05));
}

.x-tabs--border-card .x-tabs__indicator {
  display: none;
}

.x-tabs--border-card .x-tabs__content {
  padding: 20px 0;
}

/* ============================================
   Button 类型 - 按钮风格
   ============================================ */
.x-tabs--button .x-tabs__nav {
  gap: 8px;
  background: transparent;
}

.x-tabs--button .x-tabs__item {
  padding: 8px 20px;
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: var(--x-radius-base, 6px);
  background: var(--x-bg-color, white);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-tabs--button .x-tabs__item:hover {
  border-color: var(--x-color-primary-light, #666);
  color: var(--x-color-primary, #1a1a1a);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.x-tabs--button .x-tabs__item.is-active {
  background: var(--x-color-primary, #1a1a1a);
  border-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-white, white);
  box-shadow: 
    0 4px 8px var(--x-color-primary-alpha-30, rgba(26, 26, 26, 0.3)),
    0 2px 4px var(--x-color-primary-alpha-20, rgba(26, 26, 26, 0.2));
}

.x-tabs--button .x-tabs__item.is-active:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 12px var(--x-color-primary-alpha-40, rgba(26, 26, 26, 0.4)),
    0 3px 6px var(--x-color-primary-alpha-25, rgba(26, 26, 26, 0.25));
}

.x-tabs--button .x-tabs__indicator {
  display: none;
}

.x-tabs--button .x-tabs__content {
  padding: 20px 0;
}

/* ============================================
   Segment 类型 - 分段控制器风格
   ============================================ */
.x-tabs--segment .x-tabs__nav {
  gap: 0;
  background: var(--x-bg-color-secondary, #f5f5f5);
  padding: 3px;
  border-radius: var(--x-radius-lg, 10px);
  position: relative;
}

.x-tabs--segment .x-tabs__item {
  padding: 7px 16px;
  border-radius: var(--x-radius-base, 7px);
  background: transparent;
  transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  font-size: 13px;
}

.x-tabs--segment .x-tabs__item:hover {
  color: var(--x-color-primary, #1a1a1a);
}

.x-tabs--segment .x-tabs__item.is-active {
  color: var(--x-text-color, #1a1a1a);
}

.x-tabs--segment .x-tabs__indicator {
  height: calc(100% - 6px);
  background: var(--x-bg-color, white);
  border-radius: var(--x-radius-base, 7px);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 0 0 0.5px rgba(0, 0, 0, 0.04);
  bottom: 3px;
  z-index: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-tabs--segment .x-tabs__content {
  padding: 16px 0;
}

/* ============================================
   Chrome 类型 - Chrome 浏览器风格（圆润版）
   ============================================ */
.x-tabs--chrome .x-tabs__nav {
  gap: 4px;
  background: var(--x-bg-color-secondary, #f5f5f5);
  padding: 8px 8px 0;
  border-radius: var(--x-radius-lg, 12px) var(--x-radius-lg, 12px) 0 0;
}

.x-tabs--chrome .x-tabs__item {
  position: relative;
  padding: 10px 24px;
  min-width: 120px;
  max-width: 240px;
  background: var(--x-bg-color-tertiary, #e5e7eb);
  border-radius: var(--x-radius-lg, 12px) var(--x-radius-lg, 12px) 0 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.x-tabs--chrome .x-tabs__item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.02) 100%
  );
  border-radius: inherit;
  pointer-events: none;
}

.x-tabs--chrome .x-tabs__item:hover {
  background: var(--x-bg-color-secondary, #f5f5f5);
  z-index: 1;
  transform: translateY(-1px);
}

.x-tabs--chrome .x-tabs__item.is-active {
  background: var(--x-bg-color, white);
  z-index: 2;
  box-shadow: 
    0 -2px 12px rgba(0, 0, 0, 0.06),
    0 0 0 1px rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 0 var(--x-bg-color, white);
  transform: translateY(0);
  margin-bottom: -1px;
}

.x-tabs--chrome .x-tabs__item.is-active::before {
  background: linear-gradient(
    to bottom,
    var(--x-color-primary-alpha-10, rgba(26, 26, 26, 0.03)) 0%,
    transparent 30%
  );
}

.x-tabs--chrome .x-tabs__indicator {
  display: none;
}

.x-tabs--chrome .x-tabs__content {
  background: var(--x-bg-color, white);
  border-radius: 0 0 var(--x-radius-lg, 8px) var(--x-radius-lg, 8px);
  padding: 20px;
}

/* Chrome 风格深色模式 */
@media (prefers-color-scheme: dark) {
  .x-tabs--chrome .x-tabs__nav {
    background: var(--x-bg-color-secondary, #1f2937);
  }
  
  .x-tabs--chrome .x-tabs__item {
    background: var(--x-bg-color-tertiary, #374151);
  }
  
  .x-tabs--chrome .x-tabs__item::before {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
  
  .x-tabs--chrome .x-tabs__item:hover {
    background: var(--x-bg-color-secondary, #1f2937);
  }
  
  .x-tabs--chrome .x-tabs__item.is-active {
    background: var(--x-bg-color, #111827);
    box-shadow: 
      0 -2px 12px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 -1px 0 0 var(--x-bg-color, #111827);
  }
  
  .x-tabs--chrome .x-tabs__item.is-active::before {
    background: linear-gradient(
      to bottom,
      var(--x-color-primary-alpha-10, rgba(255, 255, 255, 0.05)) 0%,
      transparent 30%
    );
  }
  
  .x-tabs--chrome .x-tabs__content {
    background: var(--x-bg-color, #111827);
  }
}

/* ============================================
   Safari 类型 - Safari 浏览器风格
   ============================================ */
.x-tabs--safari .x-tabs__nav {
  gap: 2px;
  background: var(--x-bg-color-secondary, #f5f5f5);
  padding: 4px;
  color: var(--x-text-color, #1a1a1a);
  border-radius: var(--x-radius-lg, 12px);
}

.x-tabs--safari .x-tabs__item {
  padding: 8px 16px;
  min-width: 80px;
  border-radius: var(--x-radius-base, 8px);
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 13px;
}

.x-tabs--safari .x-tabs__item:hover {
  background: var(--x-bg-color-hover, rgba(0, 0, 0, 0.05));
}

.x-tabs--safari .x-tabs__item.is-active {
  background: var(--x-bg-color, white);
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06),
    inset 0 0 0 0.5px rgba(0, 0, 0, 0.05);
}

.x-tabs--safari .x-tabs__item-close {
  width: 14px;
  height: 14px;
  font-size: 10px;
}

.x-tabs--safari .x-tabs__indicator {
  display: none;
}

.x-tabs--safari .x-tabs__add {
  width: 28px;
  height: 28px;
  margin-left: 4px;
  border-radius: var(--x-radius-base, 8px);
}

.x-tabs--safari .x-tabs__content {
  padding: 16px 0;
}

/* Safari 风格深色模式 */
@media (prefers-color-scheme: dark) {
  .x-tabs--safari .x-tabs__nav {
    background: var(--x-bg-color-secondary, #1f2937);
    color: var(--x-text-color, #f3f4f6);
  }
  
  .x-tabs--safari .x-tabs__item:hover {
    background: var(--x-bg-color-hover, rgba(255, 255, 255, 0.08));
  }
  
  .x-tabs--safari .x-tabs__item.is-active {
    background: var(--x-bg-color, #111827);
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.3),
      0 1px 2px rgba(0, 0, 0, 0.2),
      inset 0 0 0 0.5px rgba(255, 255, 255, 0.1);
  }
}

/* ============================================
   位置变体
   ============================================ */
.x-tabs--left,
.x-tabs--right {
  flex-direction: row;
}

.x-tabs--left .x-tabs__header,
.x-tabs--right .x-tabs__header {
  flex-direction: column;
  width: 200px;
}

.x-tabs--left .x-tabs__nav,
.x-tabs--right .x-tabs__nav {
  flex-direction: column;
  align-items: stretch;
}

.x-tabs--left .x-tabs__item,
.x-tabs--right .x-tabs__item {
  width: 100%;
}

.x-tabs--left .x-tabs__indicator {
  width: 2px;
  height: 0;
  left: 0;
  top: 0;
  transform: translateY(0);
}

.x-tabs--right .x-tabs__indicator {
  width: 2px;
  height: 0;
  right: 0;
  top: 0;
  transform: translateY(0);
}

.x-tabs--left .x-tabs__content,
.x-tabs--right .x-tabs__content {
  flex: 1;
  padding: 0 20px;
}

/* ============================================
   动画效果
   ============================================ */
.x-tabs__item {
  animation: tabItemIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes tabItemIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Chrome 风格的激活动画 */
.x-tabs--chrome .x-tabs__item.is-active {
  animation: chromeTabActive 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes chromeTabActive {
  0% {
    transform: translateY(2px);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Safari 风格的激活动画 */
.x-tabs--safari .x-tabs__item.is-active {
  animation: safariTabActive 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes safariTabActive {
  0% {
    transform: scale(0.98);
    opacity: 0.6;
    box-shadow: 
      0 0 0 rgba(0, 0, 0, 0),
      0 0 0 rgba(0, 0, 0, 0),
      inset 0 0 0 0.5px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    box-shadow: 
      0 1px 3px rgba(0, 0, 0, 0.1),
      0 1px 2px rgba(0, 0, 0, 0.06),
      inset 0 0 0 0.5px rgba(0, 0, 0, 0.05);
  }
}

/* 关闭按钮动画 */
.x-tabs__item-close {
  animation: closeButtonIn 0.2s ease;
}

@keyframes closeButtonIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
}
</style>

