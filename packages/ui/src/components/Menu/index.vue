<template>
  <div :class="['x-menu', { 'x-menu-collapsed': collapsed }]" :style="{ width: menuWidth, height: props.height }">
    <div class="x-menu-items">
      <template v-for="item in menuItems" :key="item.key">
        <!-- 单层菜单项（无子菜单） -->
        <div
          v-if="!item.children || item.children.length === 0"
          :class="[
            'x-menu-item',
            {
              'x-menu-item-active': activeKey === item.key,
              'x-menu-item-disabled': item.disabled
            }
          ]"
          @click="handleMenuClick(item)"
        >
          <div class="x-menu-item-content">
            <!-- 图标 -->
            <span v-if="item.icon || item.xicon || item.customIcon" class="x-menu-item-icon">
              <slot v-if="item.customIcon" :name="`icon-${item.key}`">
                <XIcon v-if="item.xicon" :name="item.xicon" />
                <Icon v-else-if="item.icon" :icon="item.icon" />
              </slot>
              <XIcon v-else-if="item.xicon" :name="item.xicon" />
              <Icon v-else-if="item.icon" :icon="item.icon" />
            </span>
            
            <!-- 标题 -->
            <span v-if="!collapsed" class="x-menu-item-title">{{ item.label }}</span>
            
            <!-- 徽标 -->
            <span v-if="item.badge && !collapsed" class="x-menu-item-badge">{{ item.badge }}</span>
          </div>
        </div>

        <!-- 两层菜单项（有子菜单） -->
        <div
          v-else
          :class="[
            'x-menu-group',
            {
              'x-menu-group-open': openKeys.includes(item.key),
              'x-menu-group-disabled': item.disabled
            }
          ]"
          :ref="el => setGroupRef(el, item.key)"
          @mouseenter="collapsed ? handleGroupHover(item.key) : null"
          @mouseleave="collapsed ? handleGroupLeave() : null"
        >
          <!-- 父级标题 -->
          <div 
            :class="['x-menu-group-title', { 'x-menu-group-title--category': !collapsible }]"
            @click="collapsible ? handleGroupClick(item) : null"
            :style="{ cursor: collapsible ? 'pointer' : 'default' }"
          >
            <div class="x-menu-item-content">
              <!-- 图标 -->
              <span v-if="item.icon || item.xicon || item.customIcon" class="x-menu-item-icon">

                <slot v-if="item.customIcon" :name="`icon-${item.key}`">
                  <XIcon v-if="item.xicon" :name="item.xicon" />
                  <Icon v-else-if="item.icon" :icon="item.icon" />
                </slot>
                <XIcon v-else-if="item.xicon" :name="item.xicon" />
                <Icon v-else-if="item.icon" :icon="item.icon" />
              </span>
              
              <!-- 标题 -->
              <span v-if="!collapsed" class="x-menu-item-title">{{ item.label }}</span>
              
              <!-- 徽标 -->
              <span v-if="item.badge && !collapsed" class="x-menu-item-badge">{{ item.badge }}</span>
              <!-- 展开箭头（仅在可折叠模式显示） -->
              <span v-if="!collapsed && collapsible" class="x-menu-group-arrow">
                <XIcon name="chevron-down" />
              </span>
            </div>
          </div>

          <!-- 子菜单列表（展开模式） -->
          <transition name="x-menu-collapse">
            <div v-show="(collapsible ? openKeys.includes(item.key) : true) && !collapsed" class="x-menu-submenu">
              
              <div
                v-for="subItem in item.children"
                :key="subItem.key"
                :class="[
                  'x-menu-subitem',
                  {
                    'x-menu-subitem-active': activeKey === subItem.key,
                    'x-menu-subitem-disabled': subItem.disabled
                  }
                ]"
                @click="handleSubMenuClick(item, subItem)"
              >
                <div class="x-menu-subitem-content">
                  <!-- 子项图标 -->
                  <span v-if="subItem.icon || subItem.xicon || subItem.customIcon" class="x-menu-subitem-icon">
                    <slot v-if="subItem.customIcon" :name="`icon-${subItem.key}`">
                      <XIcon v-if="subItem.xicon" :name="subItem.xicon" />
                      <Icon v-else-if="subItem.icon" :icon="subItem.icon" />
                    </slot>
                    <XIcon v-else-if="subItem.xicon" :name="subItem.xicon" />
                    <Icon v-else-if="subItem.icon" :icon="subItem.icon" />
                  </span>
                  
                  <!-- 子项标题 -->
                  <span class="x-menu-subitem-title">{{ subItem.label }}</span>
                  
                  <!-- 子项徽标 -->
                  <span v-if="subItem.badge" class="x-menu-subitem-badge">{{ subItem.badge }}</span>
                </div>
              </div>
            </div>
          </transition>

          <!-- 悬浮子菜单（折叠模式） - 使用 Teleport 传送到 body -->
          <Teleport to="body">
            <transition name="x-menu-popup">
              <div 
                v-if="collapsed && hoveredGroup === item.key"
                class="x-menu-popup"
                :style="{ position: 'fixed', top: popupPosition.top + 'px', left: popupPosition.left + 'px' }"
                @mouseenter="handlePopupEnter"
                @mouseleave="handlePopupLeave"
              >
                <div class="x-menu-popup-title">{{ item.label }}</div>
                <div class="x-menu-popup-items">
                  <div
                    v-for="subItem in item.children"
                    :key="subItem.key"
                    :class="[
                      'x-menu-popup-item',
                      {
                        'x-menu-popup-item-active': activeKey === subItem.key,
                        'x-menu-popup-item-disabled': subItem.disabled
                      }
                    ]"
                    @click="handleSubMenuClick(item, subItem)"
                  >
                    <span v-if="subItem.icon || subItem.xicon || subItem.customIcon" class="x-menu-popup-item-icon">
                      <slot v-if="subItem.customIcon" :name="`icon-${subItem.key}`">
                        <XIcon v-if="subItem.xicon" :name="subItem.xicon" />
                        <Icon v-else-if="subItem.icon" :icon="subItem.icon" />
                      </slot>
                      <XIcon v-else-if="subItem.xicon" :name="subItem.xicon" />
                      <Icon v-else-if="subItem.icon" :icon="subItem.icon" />
                    </span>
                    <span class="x-menu-popup-item-title">{{ subItem.label }}</span>
                    <span v-if="subItem.badge" class="x-menu-popup-item-badge">{{ subItem.badge }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </Teleport>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import XIcon from '../Icon/index.vue'

/**
 * Menu 菜单列表组件 - 支持两层结构
 * @displayName XMenu
 */

export interface MenuItem {
  /** 唯一标识 */
  key: string
  /** 菜单标题 */
  label: string
  /** iconify图标名称（如：mdi:home） */
  icon?: string
  /** XIcon图标名称（如：home、settings） */
  xicon?: string
  /** 是否使用自定义图标（使用slot） */
  customIcon?: boolean
  /** 徽标 */
  badge?: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单 */
  children?: MenuItem[]
  /** 其他自定义数据 */
  [key: string]: any
}

export interface MenuProps {
  /** 菜单数据 */
  items?: MenuItem[]
  /** 当前激活的菜单项 */
  activeKey?: string
  /** 默认展开的菜单组 */
  defaultOpenKeys?: string[]
  /** 是否折叠菜单 */
  collapsed?: boolean
  /** 菜单宽度 */
  width?: string
  /** 菜单高度（超出自动滚动） */
  height?: string
  /** 手风琴模式（只展开一个） */
  accordion?: boolean
  /** 是否可折叠（是否显示箭头和折叠功能） */
  collapsible?: boolean
}

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => [],
  activeKey: '',
  defaultOpenKeys: () => [],
  collapsed: false,
  width: '280px',
  height: '',
  accordion: false,
  collapsible: true
})

const emit = defineEmits<{
  'update:activeKey': [key: string]
  'select': [item: MenuItem, parentItem?: MenuItem]
  'openChange': [openKeys: string[]]
}>()

// 菜单项数据
const menuItems = computed(() => props.items)

// 展开的菜单组
const openKeys = ref<string[]>([...props.defaultOpenKeys])

// 悬浮的菜单组（折叠模式）
const hoveredGroup = ref<string | null>(null)
const groupRefs = ref<Record<string, HTMLElement>>({})
const popupPosition = ref({ top: 0, left: 0 })
let hoverTimer: ReturnType<typeof setTimeout> | null = null

// 设置菜单组引用
const setGroupRef = (el: any, key: string) => {
  if (el) {
    groupRefs.value[key] = el
  }
}

// 菜单宽度
const menuWidth = computed(() => props.collapsed ? '64px' : props.width)

// 处理菜单项点击
const handleMenuClick = (item: MenuItem) => {
  if (item.disabled) return
  emit('update:activeKey', item.key)
  emit('select', item)
}

// 处理分组点击
const handleGroupClick = (item: MenuItem) => {
  if (item.disabled) return
  
  const index = openKeys.value.indexOf(item.key)
  
  if (props.accordion) {
    // 手风琴模式：只展开一个
    if (index > -1) {
      openKeys.value = []
    } else {
      openKeys.value = [item.key]
    }
  } else {
    // 普通模式：可展开多个
    if (index > -1) {
      openKeys.value.splice(index, 1)
    } else {
      openKeys.value.push(item.key)
    }
  }
  
  emit('openChange', openKeys.value)
}

// 处理子菜单点击
const handleSubMenuClick = (parentItem: MenuItem, subItem: MenuItem) => {
  if (subItem.disabled) return
  emit('update:activeKey', subItem.key)
  emit('select', subItem, parentItem)
}

// 更新悬浮菜单位置
const updatePopupPosition = (key: string) => {
  const groupEl = groupRefs.value[key]
  if (groupEl) {
    const rect = groupEl.getBoundingClientRect()
    popupPosition.value = {
      top: rect.top,
      left: rect.right + 8
    }
  }
}

// 处理菜单组悬浮（折叠模式）
const handleGroupHover = (key: string) => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = setTimeout(() => {
    hoveredGroup.value = key
    updatePopupPosition(key)
  }, 200) // 200ms延迟，避免误触
}

// 处理菜单组离开
const handleGroupLeave = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
  hoverTimer = setTimeout(() => {
    hoveredGroup.value = null
  }, 200)
}

// 处理悬浮面板进入
const handlePopupEnter = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
  }
}

// 处理悬浮面板离开
const handlePopupLeave = () => {
  hoveredGroup.value = null
}

// 滚动处理 - 滚动时隐藏悬浮菜单
const handleScroll = () => {
  if (hoveredGroup.value) {
    hoveredGroup.value = null
  }
}

// 监听折叠状态变化
watch(() => props.collapsed, (newVal) => {
  if (newVal) {
    // 折叠时关闭所有子菜单
    openKeys.value = []
    hoveredGroup.value = null
  }
})

// 监听悬浮菜单显示/隐藏，添加/移除滚动监听
watch(hoveredGroup, (newVal) => {
  if (newVal) {
    window.addEventListener('scroll', handleScroll, true)
  } else {
    window.removeEventListener('scroll', handleScroll, true)
  }
})

// 组件卸载时清理
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<style scoped>
.x-menu {
  font-family: var(--x-font-family, 'Segoe UI', sans-serif);
  background: linear-gradient(135deg, 
    var(--x-bg-color, #ffffff) 0%, 
    var(--x-bg-color-secondary, #f8f9fa) 100%
  );
  border-radius: var(--x-radius-lg, 12px);
  padding: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px var(--x-shadow-color, rgba(0, 0, 0, 0.08));
  overflow-y: auto;
  overflow-x: hidden;
}

/* 滚动条样式美化 */
.x-menu::-webkit-scrollbar {
  width: 6px;
}

.x-menu::-webkit-scrollbar-track {
  background: var(--x-scrollbar-track-color, rgba(0, 0, 0, 0.05));
  border-radius: 3px;
}

.x-menu::-webkit-scrollbar-thumb {
  background: var(--x-scrollbar-thumb-color, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
  transition: background 0.3s;
}

.x-menu::-webkit-scrollbar-thumb:hover {
  background: var(--x-scrollbar-thumb-hover-color, rgba(0, 0, 0, 0.3));
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu {
    background: linear-gradient(135deg, 
      var(--x-bg-color, #1f2937) 0%, 
      var(--x-bg-color-secondary, #111827) 100%
    );
    box-shadow: 0 4px 20px var(--x-shadow-color, rgba(0, 0, 0, 0.3));
  }
  
  .x-menu::-webkit-scrollbar-track {
    background: var(--x-scrollbar-track-color, rgba(255, 255, 255, 0.05));
  }
  
  .x-menu::-webkit-scrollbar-thumb {
    background: var(--x-scrollbar-thumb-color, rgba(255, 255, 255, 0.2));
  }
  
  .x-menu::-webkit-scrollbar-thumb:hover {
    background: var(--x-scrollbar-thumb-hover-color, rgba(255, 255, 255, 0.3));
  }
}

.x-menu-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* 菜单项 */
.x-menu-item {
  position: relative;
  cursor: pointer;
  border-radius: var(--x-radius-md, 10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.x-menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--x-color-primary, #1a1a1a);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-menu-item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  position: relative;
  z-index: 1;
}

.x-menu-item:hover {
  background: linear-gradient(135deg, 
    var(--x-menu-hover-bg-start, rgba(26, 26, 26, 0.06)) 0%, 
    var(--x-menu-hover-bg-end, rgba(26, 26, 26, 0.03)) 100%
  );
  transform: translateX(4px);
}

.x-menu-item:hover::before {
  transform: scaleY(1);
}

.x-menu-item-active {
  background: linear-gradient(135deg, 
    var(--x-menu-active-bg-start, rgba(26, 26, 26, 0.1)) 0%, 
    var(--x-menu-active-bg-end, rgba(26, 26, 26, 0.05)) 100%
  );
}

.x-menu-item-active::before {
  transform: scaleY(1);
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-item:hover {
    background: linear-gradient(135deg, 
      var(--x-menu-hover-bg-start, rgba(255, 255, 255, 0.08)) 0%, 
      var(--x-menu-hover-bg-end, rgba(255, 255, 255, 0.04)) 100%
    );
  }
  
  .x-menu-item-active {
    background: linear-gradient(135deg, 
      var(--x-menu-active-bg-start, rgba(255, 255, 255, 0.12)) 0%, 
      var(--x-menu-active-bg-end, rgba(255, 255, 255, 0.06)) 100%
    );
  }
}

.x-menu-item-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-menu-item-disabled:hover {
  background: transparent;
  transform: none;
}

.x-menu-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--x-color-gray-700, #374151);
  transition: all 0.3s;
  min-width: 20px;
}

.x-menu-item:hover .x-menu-item-icon,
.x-menu-item-active .x-menu-item-icon {
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.1);
}

.x-menu-item-title {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: var(--x-color-gray-800, #1f2937);
  transition: color 0.3s;
  white-space: nowrap;
}

.x-menu-item:hover .x-menu-item-title,
.x-menu-item-active .x-menu-item-title {
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 600;
}

.x-menu-item-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

/* 菜单分组 */
.x-menu-group {
  position: relative;
  border-radius: var(--x-radius-md, 10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-menu-group-title {
  position: relative;
  border-radius: var(--x-radius-md, 10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-menu-group-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: var(--x-color-primary, #1a1a1a);
  transform: scaleY(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-menu-group-title[style*="cursor: pointer"]:hover {
  background: linear-gradient(135deg, 
    var(--x-menu-hover-bg-start, rgba(26, 26, 26, 0.06)) 0%, 
    var(--x-menu-hover-bg-end, rgba(26, 26, 26, 0.03)) 100%
  );
}

.x-menu-group-title[style*="cursor: pointer"]:hover::before {
  transform: scaleY(1);
}

.x-menu-group-open .x-menu-group-title {
  background: linear-gradient(135deg, 
    var(--x-menu-open-bg-start, rgba(26, 26, 26, 0.08)) 0%, 
    var(--x-menu-open-bg-end, rgba(26, 26, 26, 0.04)) 100%
  );
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-group-title[style*="cursor: pointer"]:hover {
    background: linear-gradient(135deg, 
      var(--x-menu-hover-bg-start, rgba(255, 255, 255, 0.08)) 0%, 
      var(--x-menu-hover-bg-end, rgba(255, 255, 255, 0.04)) 100%
    );
  }
  
  .x-menu-group-open .x-menu-group-title {
    background: linear-gradient(135deg, 
      var(--x-menu-open-bg-start, rgba(255, 255, 255, 0.1)) 0%, 
      var(--x-menu-open-bg-end, rgba(255, 255, 255, 0.05)) 100%
    );
  }
}

.x-menu-group-disabled .x-menu-group-title {
  cursor: not-allowed;
  opacity: 0.5;
}


.x-menu-group-title--category .x-menu-item-icon {
  font-size: 14px;
  opacity: 0.6;
}

.x-menu-group-title--category .x-menu-item-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--x-color-gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.x-menu-group-title--category .x-menu-item-badge {
  opacity: 0.7;
  transform: scale(0.85);
}

.x-menu-group-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--x-color-gray-500, #6b7280);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: auto;
}

.x-menu-group-open .x-menu-group-arrow {
  transform: rotate(180deg);
}

/* 子菜单 */
.x-menu-submenu {
  padding: 6px 0 6px 12px;
  margin-top: 4px;
}

/* 分组目录模式下的子菜单 */
.x-menu-group-title--category + .x-menu-submenu,
.x-menu-group-title--category ~ * .x-menu-submenu {
  margin-top: 2px;
  padding-top: 2px;
}

.x-menu-subitem {
  position: relative;
  cursor: pointer;
  border-radius: var(--x-radius-sm, 8px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 4px;
}

.x-menu-subitem::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid var(--x-color-primary, #1a1a1a);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  opacity: 0;
  transition: all 0.3s;
}

.x-menu-subitem-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  padding-left: 20px;
  position: relative;
}

.x-menu-subitem:hover {
  background: var(--x-menu-subitem-hover-bg, rgba(26, 26, 26, 0.05));
  transform: translateX(6px);
}

.x-menu-subitem:hover::before {
  opacity: 1;
  left: 6px;
}

.x-menu-subitem-active {
  background: var(--x-menu-subitem-active-bg, rgba(26, 26, 26, 0.08));
}

.x-menu-subitem-active::before {
  opacity: 1;
  left: 6px;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-subitem:hover {
    background: var(--x-menu-subitem-hover-bg, rgba(255, 255, 255, 0.06));
  }
  
  .x-menu-subitem-active {
    background: var(--x-menu-subitem-active-bg, rgba(255, 255, 255, 0.1));
  }
}

.x-menu-subitem-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-menu-subitem-disabled:hover {
  background: transparent;
  transform: none;
}

.x-menu-subitem-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--x-color-gray-600, #4b5563);
  transition: all 0.3s;
  min-width: 16px;
}

.x-menu-subitem:hover .x-menu-subitem-icon,
.x-menu-subitem-active .x-menu-subitem-icon {
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.1);
}

.x-menu-subitem-title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--x-color-gray-700, #374151);
  transition: color 0.3s;
}

.x-menu-subitem:hover .x-menu-subitem-title,
.x-menu-subitem-active .x-menu-subitem-title {
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 600;
}

.x-menu-subitem-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 9px;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

/* 折叠状态 */
.x-menu-collapsed {
  width: 64px !important;
}

.x-menu-collapsed .x-menu-item-content {
  justify-content: center;
  padding: 14px 12px;
}

.x-menu-collapsed .x-menu-group-title .x-menu-item-content {
  justify-content: center;
  padding: 14px 12px;
}

.x-menu-collapsed .x-menu-item-icon {
  font-size: 22px;
}

/* 展开/折叠动画 */
.x-menu-collapse-enter-active,
.x-menu-collapse-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.x-menu-collapse-enter-from,
.x-menu-collapse-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
  max-height: 0;
}

.x-menu-collapse-enter-to,
.x-menu-collapse-leave-from {
  opacity: 1;
  transform: scaleY(1);
  max-height: 500px;
}

/* 悬浮子菜单（折叠模式） */
.x-menu-popup {
  /* position 和 top/left 由内联样式动态设置 */
  min-width: 200px;
  background: linear-gradient(135deg, 
    var(--x-bg-color, #ffffff) 0%, 
    var(--x-bg-color-secondary, #f8f9fa) 100%
  );
  border-radius: var(--x-radius-lg, 12px);
  box-shadow: 0 8px 24px var(--x-shadow-lg, rgba(0, 0, 0, 0.15));
  z-index: 9999;
  overflow: hidden;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-popup {
    background: linear-gradient(135deg, 
      var(--x-bg-color, #1f2937) 0%, 
      var(--x-bg-color-secondary, #111827) 100%
    );
    box-shadow: 0 8px 24px var(--x-shadow-lg, rgba(0, 0, 0, 0.5));
  }
}

.x-menu-popup-title {
  padding: 12px 16px 8px 16px;
  font-size: 12px;
  font-weight: 600;
  color: var(--x-color-gray-500, #6b7280);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.06));
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-popup-title {
    border-bottom: 1px solid var(--x-border-color-light, rgba(255, 255, 255, 0.1));
  }
}

.x-menu-popup-items {
  padding: 8px;
}

.x-menu-popup-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--x-radius-sm, 8px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.x-menu-popup-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid var(--x-color-primary, #1a1a1a);
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  opacity: 0;
  transition: all 0.3s;
}

.x-menu-popup-item:hover {
  background: var(--x-menu-popup-hover-bg, rgba(26, 26, 26, 0.05));
  transform: translateX(4px);
}

.x-menu-popup-item:hover::before {
  opacity: 1;
  left: 4px;
}

.x-menu-popup-item-active {
  background: var(--x-menu-popup-active-bg, rgba(26, 26, 26, 0.08));
}

.x-menu-popup-item-active::before {
  opacity: 1;
  left: 4px;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .x-menu-popup-item:hover {
    background: var(--x-menu-popup-hover-bg, rgba(255, 255, 255, 0.06));
  }
  
  .x-menu-popup-item-active {
    background: var(--x-menu-popup-active-bg, rgba(255, 255, 255, 0.1));
  }
}

.x-menu-popup-item-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.x-menu-popup-item-disabled:hover {
  background: transparent;
  transform: none;
}

.x-menu-popup-item-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: var(--x-color-gray-600, #4b5563);
  transition: all 0.3s;
  min-width: 16px;
}

.x-menu-popup-item:hover .x-menu-popup-item-icon,
.x-menu-popup-item-active .x-menu-popup-item-icon {
  color: var(--x-color-primary, #1a1a1a);
  transform: scale(1.1);
}

.x-menu-popup-item-title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: var(--x-color-gray-700, #374151);
  transition: color 0.3s;
  white-space: nowrap;
}

.x-menu-popup-item:hover .x-menu-popup-item-title,
.x-menu-popup-item-active .x-menu-popup-item-title {
  color: var(--x-color-primary, #1a1a1a);
  font-weight: 600;
}

.x-menu-popup-item-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 10px;
  font-weight: 600;
  border-radius: 9px;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
}

/* 悬浮面板动画 */
.x-menu-popup-enter-active,
.x-menu-popup-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.x-menu-popup-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}

.x-menu-popup-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>

