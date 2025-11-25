<template>
  <ElPopover
    v-model:visible="isOpen"
    placement="bottom-start"
    trigger="click"
    :disabled="disabled"
    :width="480"
    :offset="8"
    :show-arrow="false"
    :teleported="true"
    popper-class="x-region-cascader-popper"
  >
    <template #reference>
      <div 
        :class="[
          'x-region-input',
          customClass,
          { 'is-disabled': disabled }
        ]"
        :tabindex="disabled ? -1 : 0"
      >
        <div class="x-region-input-content">
          <span v-if="displayValue" class="x-region-input-value">{{ displayValue }}</span>
          <span v-else class="x-region-input-placeholder">{{ placeholder }}</span>
        </div>
        <svg 
          :class="[
            'x-region-input-arrow',
            { 'is-open': isOpen }
          ]"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </template>

    <template #default>
      <div class="x-region-dropdown">
      <!-- 搜索框 -->
      <div v-if="searchable" class="x-region-search">
        <div class="x-region-search-wrapper">
          <input
            ref="searchInputRef"
            v-model="searchKeyword"
            type="text"
            :placeholder="searchPlaceholder"
            class="x-region-search-input"
            @input="handleSearch"
            @keydown.stop
          />
          <svg 
            class="x-region-search-icon"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <button
            v-if="searchKeyword"
            @click="clearSearch"
            class="x-region-search-clear"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <!-- 当前选择路径提示 -->
        <div v-if="currentPath" class="x-region-current-path">
          <span>当前：</span>
          <span class="x-region-current-path-label">{{ currentPath }}</span>
        </div>
      </div>

      <!-- 全局搜索结果 -->
      <div v-if="searchable && searchKeyword && searchResults.length > 0" class="x-region-search-results">
        <div class="x-region-search-header">
          找到 {{ searchResults.length }} 个结果（点击自动定位）
        </div>
        <div
          v-for="result in searchResults"
          :key="result.value"
          @click.stop="selectFromGlobalSearch(result)"
          class="x-region-search-item"
        >
          <div class="x-region-search-item-content">
            <div class="x-region-search-item-main">
              <span v-html="highlightText(result.label, searchKeyword)" class="x-region-search-item-label"></span>
              <span class="x-region-search-item-level">
                {{ ['', '省', '市', '区'][result.level || 0] }}
              </span>
            </div>
          </div>
          <div v-if="result.pathLabels && result.pathLabels.length > 1" class="x-region-search-item-path">
            {{ result.pathLabels.slice(0, -1).join(' > ') }}
          </div>
        </div>
      </div>

      <!-- 级联列表 -->
      <div v-if="!searchable || !searchKeyword || searchResults.length === 0" class="x-region-cascader-lists">
        <!-- 省份列表 -->
        <div ref="provinceListRef" class="x-region-list">
          <div
            v-for="province in filteredProvinces"
            :key="province.value"
            :ref="el => { if (selectedProvince?.value === province.value) selectedProvinceRef = el as HTMLElement }"
            @click.stop="selectProvince(province)"
            :class="[
              'x-region-list-item',
              { 'is-selected': selectedProvince?.value === province.value }
            ]"
            v-html="highlightText(province.label, searchKeyword)"
          >
          </div>
        </div>

        <!-- 城市列表 -->
        <div 
          v-if="filteredCities.length > 0"
          ref="cityListRef"
          class="x-region-list"
        >
          <div
            v-for="city in filteredCities"
            :key="city.value"
            :ref="el => { if (selectedCity?.value === city.value) selectedCityRef = el as HTMLElement }"
            @click.stop="selectCity(city)"
            :class="[
              'x-region-list-item',
              { 'is-selected': selectedCity?.value === city.value }
            ]"
            v-html="highlightText(city.label, searchKeyword)"
          >
          </div>
        </div>

        <!-- 区县列表 -->
        <div 
          v-if="filteredDistricts.length > 0"
          ref="districtListRef"
          class="x-region-list"
        >
          <div
            v-for="district in filteredDistricts"
            :key="district.value"
            :ref="el => { if (selectedDistrict?.value === district.value) selectedDistrictRef = el as HTMLElement }"
            @click.stop="selectDistrict(district)"
            :class="[
              'x-region-list-item',
              { 'is-selected': selectedDistrict?.value === district.value }
            ]"
            v-html="highlightText(district.label, searchKeyword)"
          >
          </div>
        </div>

      </div>
      
      <!-- 数据加载提示 -->
      <div v-if="!workerReady" class="x-region-loading">
        <div class="x-region-loading-text">正在初始化地区数据...</div>
        <div class="x-region-loading-desc">请稍候</div>
      </div>
      <div v-else-if="provinces.length === 0" class="x-region-empty">
        <div class="x-region-empty-text">暂无数据</div>
      </div>
      </div>
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
/**
 * RegionCascader 中国地区级联选择器（支持5级）
 * @displayName XRegionCascader
 */
import { ref, computed, watch, nextTick } from 'vue'
import { ElPopover } from 'element-plus'
import chinaAreasData from './data/china-areas.full.json'

interface AreaNode {
  value: string
  label: string
  leaf: boolean
  level?: number
  path?: string[]
  pathLabels?: string[]
}

export interface RegionCascaderProps {
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  customClass?: string
  separator?: string
  maxLevel?: 1 | 2 | 3 // 最大级别：1-省，2-省市，3-省市区
  searchable?: boolean // 是否启用搜索功能
}

const props = withDefaults(defineProps<RegionCascaderProps>(), {
  modelValue: () => [],
  placeholder: '请选择地区',
  disabled: false,
  customClass: '',
  separator: ' / ',
  maxLevel: 3,
  searchable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'change': [value: string[], labels: string[]]
}>()

// 下拉框状态
const isOpen = ref(false)
const searchInputRef = ref<HTMLInputElement>()
const provinceListRef = ref<HTMLElement>()
const cityListRef = ref<HTMLElement>()
const districtListRef = ref<HTMLElement>()
const selectedProvinceRef = ref<HTMLElement>()
const selectedCityRef = ref<HTMLElement>()
const selectedDistrictRef = ref<HTMLElement>()
const workerReady = ref(false)

// 搜索关键词
const searchKeyword = ref('')
const searchResults = ref<AreaNode[]>([])
const isSearching = ref(false)

// Worker实例
let worker: Worker | null = null

// 缓存已加载的children
const childrenCache = new Map<string, AreaNode[]>()

// 各级选中的值
const selectedProvince = ref<AreaNode | null>(null)
const selectedCity = ref<AreaNode | null>(null)
const selectedDistrict = ref<AreaNode | null>(null)

// 各级列表数据
const provinces = ref<AreaNode[]>([])
const cities = ref<AreaNode[]>([])
const districts = ref<AreaNode[]>([])

// 显示的值
const displayValue = computed(() => {
  const labels: string[] = []
  if (selectedProvince.value) labels.push(selectedProvince.value.label)
  if (selectedCity.value) labels.push(selectedCity.value.label)
  if (selectedDistrict.value) labels.push(selectedDistrict.value.label)
  return labels.length > 0 ? labels.join(props.separator) : ''
})

// 搜索占位符（全局搜索）
const searchPlaceholder = computed(() => {
  return '搜索省/市/区，支持智能定位...'
})

// 当前选择路径
const currentPath = computed(() => {
  const labels: string[] = []
  if (selectedProvince.value) labels.push(selectedProvince.value.label)
  if (selectedCity.value) labels.push(selectedCity.value.label)
  if (selectedDistrict.value) labels.push(selectedDistrict.value.label)
  return labels.length > 0 ? labels.join(' > ') : ''
})

// 过滤后的列表
const filteredProvinces = computed(() => {
  if (!searchKeyword.value.trim()) return provinces.value
  const keyword = searchKeyword.value.toLowerCase().trim()
  return provinces.value.filter(p => 
    p.label.toLowerCase().includes(keyword) || p.value.includes(keyword)
  )
})

const filteredCities = computed(() => {
  if (!searchKeyword.value.trim()) return cities.value
  const keyword = searchKeyword.value.toLowerCase().trim()
  return cities.value.filter(c => 
    c.label.toLowerCase().includes(keyword) || c.value.includes(keyword)
  )
})

const filteredDistricts = computed(() => {
  if (!searchKeyword.value.trim()) return districts.value
  const keyword = searchKeyword.value.toLowerCase().trim()
  return districts.value.filter(d => 
    d.label.toLowerCase().includes(keyword) || d.value.includes(keyword)
  )
})

// 高亮文本
function highlightText(text: string, keyword: string): string {
  if (!keyword || !keyword.trim()) return text
  
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedKeyword})`, 'gi')
  return text.replace(regex, '<span class="x-region-highlight">$1</span>')
}

// 从Worker获取子节点
function loadChildren(parentValue: string): Promise<AreaNode[]> {
  return new Promise((resolve) => {
    // 如果Worker未就绪，检查缓存
    if (!workerReady.value) {
      console.log('[RegionCascader] Worker未就绪，检查缓存:', parentValue)
      if (childrenCache.has(parentValue)) {
        resolve(childrenCache.get(parentValue)!)
        return
      }
      resolve([])
      return
    }

    // 检查缓存
    if (childrenCache.has(parentValue)) {
      resolve(childrenCache.get(parentValue)!)
      return
    }

    // 如果Worker存在，使用Worker
    if (worker) {
      const handler = (e: MessageEvent) => {
        if (e.data?.type === 'children' && e.data.parent === parentValue) {
          const list = e.data.list || []
          childrenCache.set(parentValue, list)
          resolve(list)
          worker!.removeEventListener('message', handler)
        }
      }

      worker.addEventListener('message', handler)
      worker.postMessage({ type: 'children', payload: { parent: parentValue } })

      // 超时处理
      setTimeout(() => {
        worker!.removeEventListener('message', handler)
        resolve([])
      }, 5000)
    } else {
      // 如果没有Worker，检查缓存
      if (childrenCache.has(parentValue)) {
        resolve(childrenCache.get(parentValue)!)
      } else {
        resolve([])
      }
    }
  })
}

// 加载根节点（省份）
function loadRoots(): Promise<AreaNode[]> {
  return new Promise((resolve) => {
    // 如果Worker未就绪，直接返回已加载的省份数据
    if (!workerReady.value) {
      console.log('[RegionCascader] Worker未就绪，返回已加载的省份数据:', provinces.value.length)
      resolve(provinces.value)
      return
    }

    // 如果Worker存在，使用Worker
    if (worker) {
      const handler = (e: MessageEvent) => {
        if (e.data?.type === 'roots') {
          const list = e.data.list || []
          resolve(list)
          worker!.removeEventListener('message', handler)
        }
      }

      worker.addEventListener('message', handler)
      worker.postMessage({ type: 'roots' })

      // 超时处理
      setTimeout(() => {
        worker!.removeEventListener('message', handler)
        resolve([])
      }, 5000)
    } else {
      // 如果没有Worker，返回已加载的省份数据
      resolve(provinces.value)
    }
  })
}

// 监听 isOpen 变化，当打开时加载数据
watch(isOpen, async (open) => {
  if (open) {
    // 打开时加载省份列表
    if (provinces.value.length === 0) {
      provinces.value = await loadRoots()
    }
    
    // 恢复之前的选择状态
    await restoreSelection()
    
    // 打开时聚焦搜索框（仅当启用搜索时）
    if (props.searchable) {
      setTimeout(() => {
        searchInputRef.value?.focus()
      }, 100)
    }
  } else {
    // 关闭时清除搜索
    searchKeyword.value = ''
  }
})

// 恢复选择状态（关闭再打开时）
const restoreSelection = async () => {
  // 如果有选中的省份，加载对应的城市列表
  if (selectedProvince.value && props.maxLevel >= 2) {
    const citiesList = await loadChildren(selectedProvince.value.value)
    cities.value = citiesList
    console.log('[RegionCascader] 恢复省份选择，加载城市:', citiesList.length)
    
    // 滚动到选中的省份
    await nextTick()
    scrollToSelectedProvince()
  }
  
  // 如果有选中的城市，加载对应的区县列表
  if (selectedCity.value && props.maxLevel >= 3) {
    const districtsList = await loadChildren(selectedCity.value.value)
    districts.value = districtsList
    console.log('[RegionCascader] 恢复城市选择，加载区县:', districtsList.length)
    
    // 滚动到选中的城市
    await nextTick()
    scrollToSelectedCity()
  }
  
  // 如果有选中的区县，也滚动到选中的区县
  if (selectedDistrict.value && props.maxLevel >= 3) {
    await nextTick()
    scrollToSelectedDistrict()
  }
}

// 通用滚动函数（无感滚动）
const scrollToSelected = (containerRef: HTMLElement | undefined, elementRef: HTMLElement | undefined, label: string) => {
  if (!elementRef || !containerRef) return
  
  // 计算滚动位置，让选中项居中显示
  const containerHeight = containerRef.clientHeight
  const elementTop = elementRef.offsetTop
  const elementHeight = elementRef.clientHeight
  
  const scrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2)
  
  // 使用 auto 实现瞬间滚动（无感）
  containerRef.scrollTo({
    top: Math.max(0, scrollTop),
    behavior: 'auto'
  })
  
  console.log('[RegionCascader] 滚动到:', label)
}

// 滚动到选中的省份
const scrollToSelectedProvince = () => {
  scrollToSelected(provinceListRef.value, selectedProvinceRef.value, selectedProvince.value?.label || '')
}

// 滚动到选中的城市
const scrollToSelectedCity = () => {
  scrollToSelected(cityListRef.value, selectedCityRef.value, selectedCity.value?.label || '')
}

// 滚动到选中的区县
const scrollToSelectedDistrict = () => {
  scrollToSelected(districtListRef.value, selectedDistrictRef.value, selectedDistrict.value?.label || '')
}

const closeDropdown = () => {
  isOpen.value = false
}

// 搜索处理
let searchTimeout: ReturnType<typeof setTimeout> | null = null
const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  // 防抖处理
  searchTimeout = setTimeout(() => {
    performSearch()
  }, 300)
}

// 执行搜索（全局搜索）
const performSearch = () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) {
    searchResults.value = []
    isSearching.value = false
    return
  }
  
  isSearching.value = true
  
  // 使用Worker进行全局搜索
  if (worker && workerReady.value) {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'searchResults' && e.data.keyword === keyword) {
        searchResults.value = e.data.results || []
        isSearching.value = false
        worker!.removeEventListener('message', handler)
      }
    }
    
    worker.addEventListener('message', handler)
    // 全局搜索，不指定parentValue
    worker.postMessage({ 
      type: 'search', 
      payload: { keyword, parentValue: null } 
    })
    
    // 超时处理
    setTimeout(() => {
      worker!.removeEventListener('message', handler)
      isSearching.value = false
    }, 3000)
  } else {
    isSearching.value = false
  }
}

// 清除搜索
const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
  isSearching.value = false
  searchInputRef.value?.focus()
}

// 选择省份
const selectProvince = async (province: AreaNode) => {
  console.log('[RegionCascader] 选择省份:', province.label, 'maxLevel:', props.maxLevel)
  
  selectedProvince.value = province
  selectedCity.value = null
  selectedDistrict.value = null
  
  cities.value = []
  districts.value = []
  
  // 清除搜索，准备搜索下一级
  searchKeyword.value = ''
  
  // 立即滚动到选中的省份（无感滚动）
  nextTick(() => {
    scrollToSelectedProvince()
  })
  
  // 如果maxLevel为1，直接完成
  if (props.maxLevel === 1) {
    console.log('[RegionCascader] maxLevel=1，关闭下拉框')
    emitValue()
    closeDropdown()
    return
  }
  
  // 加载下一级
  if (!province.leaf && props.maxLevel >= 2) {
    console.log('[RegionCascader] 加载城市列表...')
    const citiesList = await loadChildren(province.value)
    cities.value = citiesList
    console.log('[RegionCascader] 城市列表加载完成:', citiesList.length, '个城市')
    console.log('[RegionCascader] 下拉框状态 isOpen:', isOpen.value)
    
    // 聚焦搜索框，准备搜索城市（仅当启用搜索时）
    if (props.searchable) {
      setTimeout(() => {
        searchInputRef.value?.focus()
      }, 100)
    }
  } else {
    console.log('[RegionCascader] 省份是叶子节点或maxLevel<2，关闭下拉框')
    emitValue()
    closeDropdown()
  }
}

// 选择城市
const selectCity = async (city: AreaNode) => {
  selectedCity.value = city
  selectedDistrict.value = null
  
  districts.value = []
  
  // 清除搜索，准备搜索下一级
  searchKeyword.value = ''
  
  // 立即滚动到选中的城市（无感滚动）
  nextTick(() => {
    scrollToSelectedCity()
  })
  
  // 如果maxLevel为2，直接完成
  if (props.maxLevel === 2) {
    emitValue()
    closeDropdown()
    return
  }
  
  // 加载下一级
  if (!city.leaf && props.maxLevel >= 3) {
    districts.value = await loadChildren(city.value)
    // 聚焦搜索框，准备搜索区县（仅当启用搜索时）
    if (props.searchable) {
      setTimeout(() => {
        searchInputRef.value?.focus()
      }, 100)
    }
  } else {
    emitValue()
    closeDropdown()
  }
}

// 选择区县
const selectDistrict = (district: AreaNode) => {
  selectedDistrict.value = district
  
  // 立即滚动到选中的区县（无感滚动）
  nextTick(() => {
    scrollToSelectedDistrict()
  })
  
  // 区县是最后一级，直接完成
  emitValue()
  closeDropdown()
}

// 从全局搜索结果中选择（智能反填）
const selectFromGlobalSearch = async (result: AreaNode) => {
  if (!result.path || !result.pathLabels) return
  
  // 清除搜索
  searchKeyword.value = ''
  searchResults.value = []
  
  // 根据路径长度判断层级并智能反填
  const path = result.path
  const pathLabels = result.pathLabels
  const level = result.level || path.length
  
  // 确保provinces列表已加载
  if (provinces.value.length === 0) {
    provinces.value = await loadRoots()
  }
  
  // 根据选择的层级，调用对应的选择函数（复用现有逻辑）
  if (level === 1) {
    // 选择的是省份，调用selectProvince
    const province: AreaNode = {
      value: path[0],
      label: pathLabels[0],
      leaf: false
    }
    await selectProvince(province)
  } else if (level === 2) {
    // 选择的是城市，先设置省份，再调用selectCity
    selectedProvince.value = {
      value: path[0],
      label: pathLabels[0],
      leaf: false
    }
    cities.value = await loadChildren(path[0])
    
    const city: AreaNode = {
      value: path[1],
      label: pathLabels[1],
      leaf: false
    }
    await selectCity(city)
  } else if (level === 3) {
    // 选择的是区县，先设置省份和城市，再调用selectDistrict
    selectedProvince.value = {
      value: path[0],
      label: pathLabels[0],
      leaf: false
    }
    cities.value = await loadChildren(path[0])
    
    selectedCity.value = {
      value: path[1],
      label: pathLabels[1],
      leaf: false
    }
    districts.value = await loadChildren(path[1])
    
    const district: AreaNode = {
      value: path[2],
      label: pathLabels[2],
      leaf: true
    }
    selectDistrict(district)
  }
}

// 发送选中的值
const emitValue = () => {
  const values: string[] = []
  const labels: string[] = []
  
  if (selectedProvince.value) {
    values.push(selectedProvince.value.value)
    labels.push(selectedProvince.value.label)
  }
  if (selectedCity.value) {
    values.push(selectedCity.value.value)
    labels.push(selectedCity.value.label)
  }
  if (selectedDistrict.value) {
    values.push(selectedDistrict.value.value)
    labels.push(selectedDistrict.value.label)
  }
  
  emit('update:modelValue', values)
  emit('change', values, labels)
}

// 初始化Worker
const initWorker = () => {
  try {
    console.log('[RegionCascader] 开始初始化Worker...')
    console.log('[RegionCascader] 数据大小:', JSON.stringify(chinaAreasData).length, 'bytes')
    
    // 创建内联 Worker
    const workerCode = `
      // Worker 代码
      let indexByParent = {}
      let rootNodes = []
      let fullData = []
      let globalIndex = new Map()

      // 构建索引
      function buildIndex(tree) {
        indexByParent = {}
        globalIndex = new Map()
        
        function traverse(nodes, parentValue = '', level = 1, path = [], pathLabels = []) {
          nodes.forEach(node => {
            const currentPath = [...path, node.value]
            const currentPathLabels = [...pathLabels, node.label]
            
            const simpleNode = {
              value: node.value,
              label: node.label,
              leaf: !node.children || node.children.length === 0
            }
            
            // 构建全局索引
            const nodeWithPath = {
              value: node.value,
              label: node.label,
              leaf: simpleNode.leaf,
              level,
              path: currentPath,
              pathLabels: currentPathLabels
            }
            globalIndex.set(node.value, nodeWithPath)
            
            if (parentValue === '') {
              // 根节点（省份）
              rootNodes.push(simpleNode)
            } else {
              // 子节点
              if (!indexByParent[parentValue]) {
                indexByParent[parentValue] = []
              }
              indexByParent[parentValue].push(simpleNode)
            }
            
            // 递归处理子节点
            if (node.children && node.children.length > 0) {
              traverse(node.children, node.value, level + 1, currentPath, currentPathLabels)
            }
          })
        }
        
        traverse(tree)
      }

      // 监听主线程消息
      self.onmessage = (e) => {
        const { type, payload } = e.data || {}
        
        switch (type) {
          case 'init':
            // 初始化：接收完整数据并建立索引
            fullData = payload.root
            rootNodes = []
            buildIndex(fullData)
            console.log('[Worker] 索引构建完成，根节点数:', rootNodes.length)
            console.log('[Worker] 索引键数:', Object.keys(indexByParent).length)
            self.postMessage({ type: 'ready' })
            break
            
          case 'roots':
            // 获取根节点（省份列表）
            self.postMessage({ 
              type: 'roots', 
              list: rootNodes 
            })
            break
            
          case 'children':
            // 获取指定父节点的子节点
            const { parent } = payload
            const children = indexByParent[parent] || []
            self.postMessage({ 
              type: 'children', 
              parent, 
              list: children 
            })
            break
            
          case 'search':
            // 全局搜索功能（支持智能反填）
            const { keyword, parentValue } = payload
            if (!keyword || keyword.trim() === '') {
              self.postMessage({ 
                type: 'searchResults', 
                keyword, 
                results: [] 
              })
              break
            }
            
            const searchKeyword = keyword.toLowerCase().trim()
            const searchResults = []
            
            // 如果指定了父节点，只在该父节点的子节点中搜索
            if (parentValue) {
              const children = indexByParent[parentValue] || []
              for (const node of children) {
                if (node.label.toLowerCase().includes(searchKeyword) || 
                    node.value.includes(searchKeyword)) {
                  const nodeWithPath = globalIndex.get(node.value)
                  if (nodeWithPath) {
                    searchResults.push(nodeWithPath)
                  }
                }
              }
            } else {
              // 全局搜索：在所有节点中搜索
              for (const [code, node] of globalIndex.entries()) {
                if (node.label.toLowerCase().includes(searchKeyword) || 
                    code.includes(searchKeyword)) {
                  searchResults.push(node)
                  // 限制搜索结果数量
                  if (searchResults.length >= 100) break
                }
              }
            }
            
            // 按层级排序：省 > 市 > 区
            searchResults.sort((a, b) => a.level - b.level)
            
            self.postMessage({ 
              type: 'searchResults', 
              keyword, 
              results: searchResults 
            })
            break
            
          default:
            console.warn('[Worker] Unknown message type:', type)
        }
      }

      // 错误处理
      self.onerror = (error) => {
        console.error('[Worker] Error:', error)
        const errorMessage = error instanceof ErrorEvent ? error.message : String(error)
        self.postMessage({ 
          type: 'error', 
          error: errorMessage 
        })
      }
    `
    
    // 创建 Blob URL
    const blob = new Blob([workerCode], { type: 'application/javascript' })
    const workerUrl = URL.createObjectURL(blob)
    
    console.log('[RegionCascader] 创建内联 Worker URL:', workerUrl)
    
    // 创建Worker
    worker = new Worker(workerUrl)

    worker.onmessage = (e: MessageEvent) => {
      console.log('[RegionCascader] Worker消息:', e.data)
      if (e.data?.type === 'ready') {
        workerReady.value = true
        console.log('[RegionCascader] Worker初始化完成')
        // 清理 Blob URL
        URL.revokeObjectURL(workerUrl)
      } else if (e.data?.type === 'error') {
        console.error('[RegionCascader] Worker错误:', e.data.error)
      }
    }

    worker.onerror = (error) => {
      console.error('[RegionCascader] Worker error:', error)
      // 清理 Blob URL
      URL.revokeObjectURL(workerUrl)
    }

    // 发送初始化数据
    console.log('[RegionCascader] 发送初始化数据到Worker...')
    worker.postMessage({ 
      type: 'init', 
      payload: { root: chinaAreasData } 
    })

    // 设置超时，如果 Worker 在 5 秒内没有响应，回退到同步处理
    setTimeout(() => {
      if (!workerReady.value) {
        console.warn('[RegionCascader] Worker 初始化超时，回退到同步处理')
        URL.revokeObjectURL(workerUrl)
        fallbackToSync()
      }
    }, 5000)
  } catch (error) {
    console.error('[RegionCascader] Failed to create worker:', error)
    // Worker 创建失败时回退到同步处理
    fallbackToSync()
  }
}

// 回退到同步处理
const fallbackToSync = () => {
  console.log('[RegionCascader] 回退到同步数据处理...')
  
  // 直接处理数据
  const processData = (data: any[]) => {
    const provincesList: AreaNode[] = []
    const childrenCacheMap = new Map<string, AreaNode[]>()
    
    data.forEach(province => {
      provincesList.push({
        value: province.value,
        label: province.label,
        leaf: !province.children || province.children.length === 0
      })
      
      if (province.children) {
        childrenCacheMap.set(province.value, province.children.map((city: any) => ({
          value: city.value,
          label: city.label,
          leaf: !city.children || city.children.length === 0
        })))
        
        // 处理区县数据
        province.children.forEach((city: any) => {
          if (city.children) {
            childrenCacheMap.set(city.value, city.children.map((district: any) => ({
              value: district.value,
              label: district.label,
              leaf: true
            })))
          }
        })
      }
    })
    
    return { provincesList, childrenCacheMap }
  }
  
  const { provincesList: processedProvinces, childrenCacheMap: processedCache } = processData(chinaAreasData)
  
  // 设置数据
  provinces.value = processedProvinces
  
  // 更新缓存
  childrenCache.clear()
  processedCache.forEach((value, key) => {
    childrenCache.set(key, value)
  })
  
  workerReady.value = true
  console.log('[RegionCascader] 同步数据处理完成，省份数量:', processedProvinces.length)
}

// 初始化 Worker（立即执行）
initWorker()

// 根据 modelValue 恢复选中状态
async function restoreFromModelValue(codes: string[]) {
  if (!codes || codes.length === 0) {
    // 清空选择
    selectedProvince.value = null
    selectedCity.value = null
    selectedDistrict.value = null
    provinces.value = []
    cities.value = []
    districts.value = []
    return
  }

  console.log('[RegionCascader] 恢复选中状态:', codes)

  try {
    // 确保provinces列表已加载
    if (provinces.value.length === 0) {
      provinces.value = await loadRoots()
    }
    
    // 恢复省份
    if (codes[0]) {
      const province = provinces.value.find(p => p.value === codes[0])
      
      if (province) {
        selectedProvince.value = province
        
        // 如果有市级代码，恢复城市
        if (codes[1] && props.maxLevel >= 2) {
          cities.value = await loadChildren(codes[0])
          const city = cities.value.find(c => c.value === codes[1])
          
          if (city) {
            selectedCity.value = city
            
            // 如果有区级代码，恢复区县
            if (codes[2] && props.maxLevel >= 3) {
              districts.value = await loadChildren(codes[1])
              const district = districts.value.find(d => d.value === codes[2])
              
              if (district) {
                selectedDistrict.value = district
              }
            }
          }
        }
      } else {
        console.warn('[RegionCascader] 未找到省份代码:', codes[0])
      }
    }

    console.log('[RegionCascader] 恢复完成:', {
      province: selectedProvince.value?.label,
      city: selectedCity.value?.label,
      district: selectedDistrict.value?.label
    })
  } catch (error) {
    console.error('[RegionCascader] 恢复选中状态失败:', error)
  }
}

// 监听 modelValue 变化
watch(() => props.modelValue, async (newValue) => {
  console.log('[RegionCascader] modelValue changed:', newValue)
  await restoreFromModelValue(newValue)
}, { deep: true, immediate: false })

// 在 Worker 就绪后恢复初始值
watch(workerReady, async (ready) => {
  if (ready && props.modelValue && props.modelValue.length > 0) {
    console.log('[RegionCascader] Worker就绪，开始恢复初始值:', props.modelValue)
    await restoreFromModelValue(props.modelValue)
  }
}, { immediate: true })

// 暴露方法和数据
defineExpose({
  worker,
  workerReady,
  loadChildren,
  clearCache: () => childrenCache.clear()
})
</script>

<style scoped>
/* iOS 风格地区级联选择器 */

/* 全局样式 - 自定义 Element Plus Popover */
:global(.x-region-cascader-popper) {
  padding: 0 !important;
  border-radius: var(--x-radius-lg, 14px) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04) !important;
  border: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.04)) !important;
  animation: dropdown-fade-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

:global(.x-region-cascader-popper .el-popper__arrow) {
  display: none !important;
}

@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* iOS 输入框 */
.x-region-input {
  position: relative;
  width: 100%;
  min-height: 44px;
  padding: 12px 16px;
  border: 1px solid var(--x-border-color-light, #F0F0F5);
  border-radius: var(--x-radius, 10px);
  background-color: var(--x-bg-color, #FAFAFA);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif);
  transition: all var(--x-transition, 0.3s ease);
  outline: none;
  user-select: none;
  overflow: hidden;
}

.x-region-input::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, transparent 0%, var(--x-color-primary, #4A90E2) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.x-region-input:hover:not(.is-disabled) {
  border-color: var(--x-color-primary-light, #E6F2FF);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  background-color: var(--x-bg-color, #FFFFFF);
}

.x-region-input:hover:not(.is-disabled)::before {
  opacity: 0.01;
}

.x-region-input:focus {
  outline: none;
  border-color: var(--x-color-primary, #4A90E2);
  box-shadow: 0 0 0 2px var(--x-color-primary-opacity, rgba(74, 144, 226, 0.08));
}

.x-region-input.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: var(--x-fill-color-light, #F2F2F7);
}

/* 输入框内容 */
.x-region-input-content {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  overflow: hidden;
}

.x-region-input-value {
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-primary, #1C1C1E);
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.3px;
  animation: value-fade-in 0.3s ease-out;
}

@keyframes value-fade-in {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.x-region-input-placeholder {
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-placeholder, #8E8E93);
  letter-spacing: -0.2px;
}

/* iOS 箭头图标 */
.x-region-input-arrow {
  width: 20px;
  height: 20px;
  color: var(--x-text-color-secondary, #3C3C43);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  opacity: 0.6;
}

.x-region-input-arrow.is-open {
  transform: rotate(180deg);
  color: var(--x-color-primary, #007AFF);
  opacity: 1;
}

/* iOS 下拉框容器 */
.x-region-dropdown {
  background-color: var(--x-bg-color, #FFFFFF);
  border-radius: var(--x-radius-lg, 14px);
  min-width: 320px;
  width: max-content;
  max-width: 90vw;
  font-family: var(--x-font-family, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif);
  overflow: hidden;
}

/* iOS 搜索区域 */
.x-region-search {
  padding: 16px;
  background-color: var(--x-fill-color-lighter, #FAFAFC);
  border-bottom: 1px solid var(--x-border-color, rgba(0, 0, 0, 0.04));
  backdrop-filter: blur(20px);
  animation: search-slide-down 0.3s ease-out;
}

@keyframes search-slide-down {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.x-region-search-wrapper {
  position: relative;
}

/* iOS 搜索输入框 */
.x-region-search-input {
  width: 100%;
  padding: 10px 40px;
  font-size: var(--x-font-size, 15px);
  border: none;
  border-radius: var(--x-radius-sm, 8px);
  background-color: var(--x-bg-color-secondary, rgba(255, 255, 255, 0.8));
  backdrop-filter: blur(10px);
  transition: all var(--x-transition, 0.3s ease);
  outline: none;
  letter-spacing: -0.3px;
}

.x-region-search-input:focus {
  outline: none;
  background-color: var(--x-bg-color, #FFFFFF);
  box-shadow: 0 0 0 3px var(--x-color-primary-opacity, rgba(0, 122, 255, 0.15));
}

.x-region-search-input::placeholder {
  color: var(--x-text-color-placeholder, #8E8E93);
  letter-spacing: -0.2px;
}

/* iOS 搜索图标 */
.x-region-search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--x-text-color-secondary, #8E8E93);
  pointer-events: none;
}

/* iOS 清除按钮 */
.x-region-search-clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  color: var(--x-text-color-secondary, #8E8E93);
  cursor: pointer;
  background-color: var(--x-fill-color, #E5E5EA);
  border: none;
  border-radius: var(--x-radius-full, 50%);
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  animation: clear-scale-in 0.2s ease-out;
}

@keyframes clear-scale-in {
  from {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}

.x-region-search-clear:hover {
  background-color: var(--x-fill-color-darker, #D1D1D6);
  transform: translateY(-50%) scale(1.1);
}

.x-region-search-clear:active {
  transform: translateY(-50%) scale(0.95);
}

.x-region-search-clear svg {
  width: 14px;
  height: 14px;
}

/* 当前路径提示 */
.x-region-current-path {
  margin-top: 10px;
  padding: 8px 12px;
  font-size: 13px;
  color: var(--x-text-color-secondary, #8E8E93);
  background-color: var(--x-bg-color-secondary, rgba(0, 122, 255, 0.05));
  border-radius: var(--x-radius-sm, 8px);
  display: flex;
  align-items: center;
  gap: 6px;
  animation: path-fade-in 0.3s ease-out 0.1s both;
}

@keyframes path-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.x-region-current-path-label {
  font-weight: 600;
  color: var(--x-color-primary, #007AFF);
  letter-spacing: -0.3px;
}

/* iOS 搜索结果 */
.x-region-search-results {
  max-height: 420px;
  overflow-y: auto;
  min-width: 500px;
  background-color: var(--x-bg-color, #FFFFFF);
  animation: results-expand 0.3s ease-out;
}

@keyframes results-expand {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 420px;
  }
}

.x-region-search-header {
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--x-text-color-secondary, #8E8E93);
  background-color: var(--x-fill-color-lighter, #F9F9F9);
  position: sticky;
  top: 0;
  z-index: 10;
  letter-spacing: -0.2px;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.04));
}

/* iOS 搜索项 */
.x-region-search-item {
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.04));
  position: relative;
  overflow: hidden;
}

.x-region-search-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: var(--x-fill-color-hover, rgba(0, 122, 255, 0.04));
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.x-region-search-item:hover::before {
  transform: translateX(0);
}

.x-region-search-item:hover {
  background-color: var(--x-fill-color-light, #F2F2F7);
}

.x-region-search-item:active {
  background-color: var(--x-fill-color, #E5E5EA);
  transform: scale(0.99);
}

.x-region-search-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.x-region-search-item-main {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.x-region-search-item-label {
  font-size: var(--x-font-size, 15px);
  font-weight: 500;
  color: var(--x-text-color-primary, #1C1C1E);
  letter-spacing: -0.3px;
}

.x-region-search-item-level {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: var(--x-radius-xs, 4px);
  background-color: var(--x-fill-color, #E5E5EA);
  color: var(--x-text-color-secondary, #8E8E93);
  font-weight: 500;
}

.x-region-search-item-path {
  font-size: 13px;
  color: var(--x-text-color-secondary, #8E8E93);
  margin-top: 6px;
  letter-spacing: -0.2px;
  opacity: 0.8;
}

/* iOS 级联列表 */
.x-region-cascader-lists {
  display: flex;
  min-width: 480px;
  background-color: var(--x-bg-color, #FFFFFF);
  animation: lists-fade-in 0.3s ease-out;
}

@keyframes lists-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* iOS 列表 */
.x-region-list {
  flex: 1;
  border-right: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.08));
  max-height: 360px;
  overflow-y: auto;
  min-width: 160px;
  background-color: var(--x-bg-color, #FFFFFF);
  position: relative;
  scroll-behavior: smooth;
}

.x-region-list:last-child {
  border-right: none;
}

/* iOS 列表项 */
.x-region-list-item {
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-primary, #1C1C1E);
  position: relative;
  overflow: hidden;
  letter-spacing: -0.3px;
}

.x-region-list-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, var(--x-color-primary, #007AFF) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: scaleX(0);
}

.x-region-list-item:hover {
  background-color: var(--x-fill-color-light, #F2F2F7);
  padding-left: 20px;
}

.x-region-list-item:active {
  background-color: var(--x-fill-color, #E5E5EA);
  transform: scale(0.98);
}

.x-region-list-item.is-selected {
  background-color: rgba(74, 144, 226, 0.08);  /* 更浅的背景色 */
  color: #1C1C1E;  /* 深色文字，确保可读性 */
  font-weight: 600;
  position: relative;
  padding-left: 16px;  /* 恢复正常的左内边距 */
}

/* 注释掉左侧线条 
.x-region-list-item.is-selected::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--x-color-primary, #4A90E2);
  animation: selected-slide-in 0.3s ease-out;
} */

@keyframes selected-slide-in {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

/* iOS 加载状态 */
.x-region-loading {
  padding: 60px 24px;
  text-align: center;
  animation: loading-fade-in 0.3s ease-out;
}

@keyframes loading-fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.x-region-loading-text {
  font-size: var(--x-font-size, 15px);
  color: var(--x-text-color-secondary, #8E8E93);
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: -0.3px;
}

.x-region-loading-desc {
  font-size: 13px;
  color: var(--x-text-color-placeholder, #C7C7CC);
  letter-spacing: -0.2px;
}

/* 加载动画 */
.x-region-loading::before {
  content: '';
  display: block;
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  border: 3px solid var(--x-border-color-light, #E5E5EA);
  border-radius: 50%;
  border-top-color: var(--x-color-primary, #007AFF);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* iOS 空状态 */
.x-region-empty {
  padding: 60px 24px;
  text-align: center;
  color: var(--x-text-color-placeholder, #8E8E93);
}

.x-region-empty-text {
  font-size: var(--x-font-size, 15px);
  font-weight: 500;
  letter-spacing: -0.3px;
}

/* 高亮文本 */
.x-region-highlight {
  background-color: var(--x-color-warning-light, #FFEB3B);
  color: var(--x-text-color-primary, #1C1C1E);
  font-weight: 600;
  padding: 0 2px;
  border-radius: 2px;
  animation: highlight-pulse 0.3s ease-out;
}

@keyframes highlight-pulse {
  from {
    background-color: var(--x-color-warning, #FFC107);
  }
  to {
    background-color: var(--x-color-warning-light, #FFEB3B);
  }
}

/* iOS 风格滚动条 */
.x-region-list::-webkit-scrollbar,
.x-region-search-results::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

.x-region-list::-webkit-scrollbar-track,
.x-region-search-results::-webkit-scrollbar-track {
  background-color: transparent;
}

.x-region-list::-webkit-scrollbar-thumb,
.x-region-search-results::-webkit-scrollbar-thumb {
  background-color: var(--x-scrollbar-color, rgba(0, 0, 0, 0.2));
  border-radius: 3px;
  transition: background-color 0.2s;
}

.x-region-list:hover::-webkit-scrollbar-thumb,
.x-region-search-results:hover::-webkit-scrollbar-thumb {
  background-color: var(--x-scrollbar-hover-color, rgba(0, 0, 0, 0.3));
}

/* 响应式优化 */
@media (max-width: 768px) {
  .x-region-dropdown {
    min-width: 280px;
  }
  
  .x-region-cascader-lists {
    min-width: 280px;
    flex-direction: column;
    max-height: 400px;
  }
  
  .x-region-list {
    border-right: none;
    border-bottom: 1px solid var(--x-border-color-light, rgba(0, 0, 0, 0.08));
    max-height: 200px;
    min-width: auto;
  }
  
  .x-region-list:last-child {
    border-bottom: none;
  }
  
  .x-region-search-results {
    min-width: 280px;
  }
}

/* 深色模式支持 - 通过 .dark 类和 media query */
.dark .x-region-input,
@media (prefers-color-scheme: dark) {
  .x-region-input {
    background-color: var(--x-bg-color-dark, #1C1C1E);
    border-color: var(--x-border-color-dark, #3A3A3C);
    color: var(--x-text-color-dark, #FFFFFF);
  }
}

.dark .x-region-dropdown {
  background-color: var(--x-bg-color-dark, #1C1C1E);
}

.dark .x-region-search {
  background-color: var(--x-fill-color-dark, #2C2C2E);
}

.dark .x-region-search-input {
  background-color: var(--x-fill-color-darker, #3A3A3C);
  color: var(--x-text-color-dark, #FFFFFF);
}

.dark .x-region-list {
  background-color: var(--x-bg-color-dark, #1C1C1E);
}

.dark .x-region-list-item {
  color: var(--x-text-color-dark, #FFFFFF);
}

.dark .x-region-list-item:hover {
  background-color: var(--x-fill-color-dark, #2C2C2E);
}

.dark .x-region-list-item.is-selected {
  background-color: rgba(74, 144, 226, 0.15);  /* 暗黑模式下更浅的背景色 */
  color: #FFFFFF;  /* 白色文字确保可读性 */
}

:global(.dark .x-region-cascader-popper) {
  background-color: var(--x-bg-color-dark, #1C1C1E) !important;
  border-color: var(--x-border-color-dark, #3A3A3C) !important;
}

/* Media Query 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .x-region-input {
    background-color: var(--x-bg-color-dark, #1C1C1E);
    border-color: var(--x-border-color-dark, #3A3A3C);
    color: var(--x-text-color-dark, #FFFFFF);
  }
  
  .x-region-dropdown {
    background-color: var(--x-bg-color-dark, #1C1C1E);
  }
  
  .x-region-search {
    background-color: var(--x-fill-color-dark, #2C2C2E);
  }
  
  .x-region-search-input {
    background-color: var(--x-fill-color-darker, #3A3A3C);
    color: var(--x-text-color-dark, #FFFFFF);
  }
  
  .x-region-list {
    background-color: var(--x-bg-color-dark, #1C1C1E);
  }
  
  .x-region-list-item {
    color: var(--x-text-color-dark, #FFFFFF);
  }
  
  .x-region-list-item:hover {
    background-color: var(--x-fill-color-dark, #2C2C2E);
  }
  
  .x-region-list-item.is-selected {
    background-color: rgba(74, 144, 226, 0.15);  /* 暗黑模式下更浅的背景色 */
    color: #FFFFFF;  /* 白色文字确保可读性 */
  }
  
  :global(.x-region-cascader-popper) {
    background-color: var(--x-bg-color-dark, #1C1C1E) !important;
    border-color: var(--x-border-color-dark, #3A3A3C) !important;
  }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .x-region-list {
    scroll-behavior: auto;
  }
}
</style>
