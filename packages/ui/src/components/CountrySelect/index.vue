<template>
    <div ref="containerRef" class="country-select-container">
      <div 
        @click="toggleDropdown"
        :class="[
          'country-select-input',
          customClass,
          { 'is-disabled': disabled },
          { 'is-multiple': multiple }
        ]"
        :tabindex="disabled ? -1 : 0"
        @keydown.enter="toggleDropdown"
        @keydown.space="toggleDropdown"
        @keydown.escape="closeDropdown"
      >
        <!-- 单选模式 -->
        <div v-if="!multiple" class="country-select-single">
          <div class="country-select-content">
          <img 
            v-if="selectedCountry"
            :src="selectedCountry.flagSvg"
            :alt="selectedCountry.name"
              class="country-flag"
            @error="handleFlagError"
          />
            <span :class="{ 'is-placeholder': !selectedCountry && placeholder }">
            {{ selectedCountry ? selectedCountry.name : (placeholder || '选择国家') }}
          </span>
        </div>
        <svg 
            class="country-select-arrow"
            :class="{ 'is-open': isOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
        </div>

        <!-- 多选模式 -->
        <div v-else class="country-select-multiple">
          <div class="country-select-tags">
            <template v-if="selectedCountries.length > 0">
              <div 
                v-for="country in selectedCountries" 
                :key="country.code"
                class="country-tag"
                @click.stop
              >
                <img 
                  :src="country.flagSvg"
                  :alt="country.name"
                  class="country-tag-flag"
                  @error="(e) => handleFlagError(e, country)"
                />
                <span>{{ country.name }}</span>
                <svg 
                  @click="removeCountry(country)"
                  class="country-tag-close"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </template>
            <span v-else class="country-select-placeholder">
              {{ placeholder || '选择国家' }}
            </span>
          </div>
          <svg 
            class="country-select-arrow"
            :class="{ 'is-open': isOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
  
      <!-- Dropdown -->
      <div 
        v-if="isOpen && !disabled"
        class="country-select-dropdown"
      >
        <!-- 搜索框 -->
        <div class="country-select-search">
          <svg class="country-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            ref="searchInputRef"
            v-model="searchKeyword"
            type="text"
            class="country-search-input"
            placeholder="搜索国家..."
            @click.stop
            @keydown.stop
          />
          <svg 
            v-if="searchKeyword"
            @click="searchKeyword = ''"
            class="country-search-clear"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        
        <!-- 多选模式：操作栏 -->
        <div v-if="multiple && selectedCountries.length > 0" class="country-select-toolbar">
          <span class="country-select-count">
            已选择 {{ selectedCountries.length }} 个国家
            <span v-if="maxSelection > 0"> / {{ maxSelection }}</span>
          </span>
          <button 
            @click.stop="clearAll"
            class="country-select-clear"
          >
            清除全部
          </button>
        </div>

        <!-- 国家列表 -->
        <div class="country-select-list">
          <template v-if="sortedCountries.length > 0">
        <div 
          v-for="country in sortedCountries" 
          :key="country.code"
          @click="selectCountry(country)"
              :class="[
                'country-select-item',
                { 'is-selected': isCountrySelected(country) },
                { 'is-disabled': multiple && maxSelection > 0 && !isCountrySelected(country) && selectedCountries.length >= maxSelection }
              ]"
            >
              <!-- 多选模式：复选框 -->
              <div v-if="multiple" class="country-checkbox-wrapper">
                <div 
                  :class="[
                    'country-checkbox',
                    { 'is-checked': isCountrySelected(country) }
                  ]"
                >
                  <svg 
                    v-if="isCountrySelected(country)"
                    class="country-checkbox-icon"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </div>

          <img 
            :src="country.flagSvg"
            :alt="country.name"
                class="country-flag"
            @error="(e) => handleFlagError(e, country)"
          />
          <span>{{ country.name }}</span>
            </div>
          </template>
          
          <!-- 空状态 -->
          <div v-else class="country-select-empty">
            <svg class="country-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div class="country-empty-text">未找到匹配的国家</div>
          </div>
        </div>
      </div>
  
      <!-- Backdrop -->
      <div 
        v-if="isOpen && !disabled"
        class="country-select-backdrop"
        @click="closeDropdown"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  /**
   * CountrySelect 国家选择器组件
   * @displayName XCountrySelect
   */
  import countriesData from './data/countries.json'
  import { ref, computed, onMounted, onUnmounted, nextTick, readonly } from 'vue'
  
  export interface Country {
    name: string
    code: string
    flagEmoji: string
    flagSvg: string
    flagPng: string
  }
  
  export interface CountrySelectProps {
    modelValue?: string | string[]
    placeholder?: string
    disabled?: boolean
    required?: boolean
    customClass?: string
    autoDetectFromIp?: boolean
    returnType?: 'name' | 'code' // 返回国家名称还是国家代码
    priorityCountries?: string[] // 优先显示的国家代码列表
    ipDetectUrl?: string // 自定义IP检测接口URL
    ipDetectMethod?: 'GET' | 'POST' // 请求方法
    ipDetectHeaders?: Record<string, string> // 自定义请求头
    ipDetectResponseParser?: (data: any) => string // 自定义响应解析函数，返回国家代码
    multiple?: boolean // 是否支持多选
    maxSelection?: number // 最大选择数量，0表示无限制
  }
  
  const props = withDefaults(defineProps<CountrySelectProps>(), {
    placeholder: '',
    disabled: false,
    required: false,
    customClass: '',
    autoDetectFromIp: true,
    returnType: 'name',
    priorityCountries: () => ['US', 'CA', 'GB', 'DE', 'FR', 'JP', 'CN', 'AU'],
    ipDetectUrl: 'https://ipinfo.io/json',
    ipDetectMethod: 'GET',
    multiple: false,
    maxSelection: 0
  })
  
  const emit = defineEmits<{
    'update:modelValue': [value: string | string[]]
    'change': [value: string | string[], country: Country | Country[]]
    'ip-detect-start': [] // IP检测开始
    'ip-detect-success': [countryCode: string] // IP检测成功
    'ip-detect-error': [error: Error] // IP检测失败
  }>()
  
  // 下拉框状态
  const isOpen = ref(false)
  
  // 搜索关键词
  const searchKeyword = ref('')
  
  // 国家数据处理
  const allCountries = ref<Country[]>(countriesData as Country[])
  
  // 当前选中的国家
  const selectedCountry = computed(() => {
    if (!props.modelValue) return null
    if (props.multiple) return null // 多选模式不使用此属性
    const value = props.modelValue as string
    return allCountries.value.find(country => 
      props.returnType === 'code' ? country.code === value : country.name === value
    )
  })

  // 多选模式下选中的国家列表
  const selectedCountries = computed(() => {
    if (!props.multiple || !props.modelValue) return []
    const values = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
    return allCountries.value.filter(country => 
      values.includes(props.returnType === 'code' ? country.code : country.name)
    )
  })

  // 检查国家是否已选中
  const isCountrySelected = (country: Country) => {
    if (!props.multiple) {
      return selectedCountry.value?.code === country.code
    }
    return selectedCountries.value.some(c => c.code === country.code)
  }
  
  // 排序后的国家列表（优先国家在前，支持搜索过滤）
  const sortedCountries = computed(() => {
    let countries = allCountries.value
    
    // 搜索过滤
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      countries = countries.filter(country => 
        country.name.toLowerCase().includes(keyword) ||
        country.code.toLowerCase().includes(keyword)
      )
    }
    
    const priority = countries.filter(country => 
      props.priorityCountries.includes(country.code)
    )
    const others = countries.filter(country => 
      !props.priorityCountries.includes(country.code)
    )
    
    // 按优先级排序，然后按字母顺序排序其他国家
    const sortedPriority = priority.sort((a, b) => {
      const aIndex = props.priorityCountries.indexOf(a.code)
      const bIndex = props.priorityCountries.indexOf(b.code)
      return aIndex - bIndex
    })
    
    const sortedOthers = others.sort((a, b) => a.name.localeCompare(b.name))
    
    return [...sortedPriority, ...sortedOthers]
  })
  
  // 搜索输入框引用
  const searchInputRef = ref<HTMLInputElement>()
  
  // 下拉框操作
  const toggleDropdown = () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        // 打开时聚焦搜索框
        nextTick(() => {
          searchInputRef.value?.focus()
        })
      }
    }
  }
  
  const closeDropdown = () => {
    isOpen.value = false
    searchKeyword.value = '' // 关闭时清空搜索
  }
  
  const selectCountry = (country: Country | null) => {
    if (!country) {
      emit('update:modelValue', props.multiple ? [] : '')
      closeDropdown()
      return
    }

    const countryValue = props.returnType === 'code' ? country.code : country.name

    if (!props.multiple) {
      // 单选模式
      emit('update:modelValue', countryValue)
      emit('change', countryValue, country)
      closeDropdown()
    } else {
      // 多选模式
      const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
      const index = currentValues.indexOf(countryValue)
      
      if (index > -1) {
        // 已选中，取消选择
        currentValues.splice(index, 1)
      } else {
        // 未选中，添加选择
        if (props.maxSelection === 0 || currentValues.length < props.maxSelection) {
          currentValues.push(countryValue)
        } else {
          // 达到最大选择数
          return
        }
      }
      
      emit('update:modelValue', currentValues)
      emit('change', currentValues, selectedCountries.value)
      // 多选模式不关闭下拉框
    }
  }

  // 清除所有选择
  const clearAll = () => {
    emit('update:modelValue', props.multiple ? [] : '')
    if (!props.multiple) {
    closeDropdown()
    }
  }

  // 移除单个已选国家
  const removeCountry = (country: Country) => {
    if (!props.multiple) return
    
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const countryValue = props.returnType === 'code' ? country.code : country.name
    const index = currentValues.indexOf(countryValue)
    
    if (index > -1) {
      currentValues.splice(index, 1)
      emit('update:modelValue', currentValues)
      emit('change', currentValues, selectedCountries.value)
    }
  }
  
  // 图片错误处理：SVG失败时切换到PNG
  const handleFlagError = (event: Event, country?: Country) => {
    const img = event.target as HTMLImageElement
    if (country && img.src === country.flagSvg) {
      img.src = country.flagPng
    } else if (selectedCountry.value && img.src === selectedCountry.value.flagSvg) {
      img.src = selectedCountry.value.flagPng
    }
  }
  
  /**
   * IP自动检测国家
   * 支持自定义后端接口，默认使用 ipinfo.io
   * 
   * @example 使用默认接口
   * <XCountrySelect auto-detect-from-ip />
   * 
   * @example 使用自定义后端接口
   * <XCountrySelect 
   *   auto-detect-from-ip 
   *   ip-detect-url="https://api.example.com/ip/location"
   *   :ip-detect-response-parser="(data) => data.countryCode"
   * />
   */
  const detectCountryFromIp = async () => {
    if (!props.autoDetectFromIp || props.modelValue) return
    
    emit('ip-detect-start')
    
    try {
      // 构建请求配置
      const fetchOptions: RequestInit = {
        method: props.ipDetectMethod,
        headers: {
          'Content-Type': 'application/json',
          ...props.ipDetectHeaders
        }
      }
      
      // 发起请求
      const response = await fetch(props.ipDetectUrl, fetchOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // 解析国家代码
      let detectedCountryCode: string
      
      if (props.ipDetectResponseParser) {
        // 使用自定义解析函数
        detectedCountryCode = props.ipDetectResponseParser(data)
      } else {
        // 默认解析逻辑（适配 ipinfo.io 和常见后端格式）
        detectedCountryCode = data.country || data.countryCode || data.country_code || ''
      }
      
      detectedCountryCode = detectedCountryCode.toUpperCase()
      
      if (!detectedCountryCode) {
        throw new Error('Country code not found in response')
      }
      
      console.log('Auto-detected country from IP:', detectedCountryCode)
      emit('ip-detect-success', detectedCountryCode)
      
      // 查找对应的国家
      const detectedCountry = allCountries.value.find(country => 
        country.code === detectedCountryCode
      )
      
      if (detectedCountry) {
        const valueToEmit = props.returnType === 'code' ? detectedCountry.code : detectedCountry.name
        emit('update:modelValue', valueToEmit)
        emit('change', valueToEmit, detectedCountry)
      } else {
        console.warn('Detected country code not found in country list:', detectedCountryCode)
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      console.warn('Failed to detect country from IP:', err)
      emit('ip-detect-error', err)
      
      // 如果检测失败且没有初始值，可选择默认国家（默认不自动设置）
      // 取消注释以下代码可启用默认国家逻辑
      /*
      const defaultCountry = allCountries.value.find(country => country.code === 'US')
      if (defaultCountry && !props.modelValue) {
        const valueToEmit = props.returnType === 'code' ? defaultCountry.code : defaultCountry.name
        emit('update:modelValue', valueToEmit)
        emit('change', valueToEmit, defaultCountry)
      }
      */
    }
  }
  
  // 点击外部关闭下拉框
  const containerRef = ref<HTMLElement>()
  
  // 生命周期
  onMounted(async () => {
    await nextTick()
    
    // 如果启用IP检测且没有初始值，尝试自动检测
    if (props.autoDetectFromIp && !props.modelValue) {
      await detectCountryFromIp()
    }
    
    // 设置点击外部关闭下拉框
    const handleClickOutside = (event: Event) => {
      if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        closeDropdown()
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
  })
  
  // 暴露方法给父组件
  defineExpose({
    detectCountryFromIp,
    clearAll,
    allCountries: readonly(allCountries),
    sortedCountries: readonly(sortedCountries),
    selectedCountries: readonly(selectedCountries)
  })
  </script>
  
  <style scoped>
  /* 容器 */
  .country-select-container {
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  
  /* 输入框 */
  .country-select-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
    outline: none;
  }
  
  .country-select-input:focus {
    border-color: #1a1a1a;
    box-shadow: 0 0 0 2px rgba(26, 26, 26, 0.1);
  }
  
  .country-select-input.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .country-select-input.is-multiple {
    min-height: 40px;
  }
  
  /* 单选模式 */
  .country-select-single {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .country-select-content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }
  
  /* 多选模式 */
  .country-select-multiple {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  
  .country-select-tags {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    min-height: 24px;
  }
  
  /* 标签 */
  .country-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 9999px;
    border: 1px solid;
    background-color: var(--x-bg-color, #fff);
    color: var(--x-text-color-primary, #1a1a1a);
    border-color: var(--x-border-color-dark, rgba(26, 26, 26, 0.2));
  }
  
  .country-tag-flag {
    width: 16px;
    height: 12px;
    min-width: 16px;
    min-height: 12px;
    max-width: 16px;
    max-height: 12px;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
  }
  
  .country-tag-close {
    border-radius: 9999px;
    padding: 2px;
    transition: all 0.15s;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
  
  .country-tag-close:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  /* 占位符 */
  .country-select-placeholder,
  .is-placeholder {
    color: #9ca3af;
    align-self: center;
  }
  
  /* 箭头 */
  .country-select-arrow {
    width: 20px;
    height: 20px;
    color: #9ca3af;
    flex-shrink: 0;
    transition: transform 0.2s;
  }
  
  .country-select-arrow.is-open {
    transform: rotate(180deg);
  }
  
  /* 国旗 */
  .country-flag {
    width: 20px;
    height: 16px;
    min-width: 20px;
    min-height: 16px;
    max-width: 20px;
    max-height: 16px;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
  }
  
  /* 下拉菜单 */
  .country-select-dropdown {
    position: absolute;
    z-index: 9999;
    width: max-content;
    min-width: 100%;
    max-width: 320px;
    margin-top: 4px;
    background-color: #fff;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  /* 搜索框 */
  .country-select-search {
    position: relative;
    padding: 8px 12px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .country-search-icon {
    width: 16px;
    height: 16px;
    color: #9ca3af;
    flex-shrink: 0;
  }
  
  .country-search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 14px;
    padding: 0;
    background: transparent;
    color: #374151;
  }
  
  .country-search-input::placeholder {
    color: #9ca3af;
  }
  
  .country-search-clear {
    width: 16px;
    height: 16px;
    color: #9ca3af;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.2s;
  }
  
  .country-search-clear:hover {
    color: #6b7280;
  }
  
  /* 工具栏 */
  .country-select-toolbar {
    padding: 8px 12px;
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .country-select-count {
    font-size: 12px;
    color: #6b7280;
  }
  
  .country-select-clear {
    font-size: 12px;
    color: #ef4444;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }
  
  .country-select-clear:hover {
    color: #dc2626;
  }
  
  /* 国家列表 */
  .country-select-list {
    max-height: 240px;
    overflow-y: auto;
  }
  
  .country-select-item {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .country-select-item:hover {
    background-color: #f9fafb;
  }
  
  .country-select-item.is-selected {
    background-color: #eff6ff;
  }
  
  .country-select-item.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .country-select-item > span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* 复选框 */
  .country-checkbox-wrapper {
    display: flex;
    align-items: center;
    width: 16px;
    flex-shrink: 0;
  }
  
  .country-checkbox {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }
  
  .country-checkbox.is-checked {
    border-color: #1a1a1a;
    background-color: transparent;
  }
  
  .country-checkbox:not(.is-checked) {
    border-color: #d1d5db;
    background-color: #fff;
  }
  
  .country-checkbox-icon {
    color: #1a1a1a;
    font-size: 12px;
    font-weight: bold;
  }
  
  /* 背景遮罩 */
  .country-select-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9998;
  }
  
  /* 空状态 */
  .country-select-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: #9ca3af;
  }
  
  .country-empty-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 12px;
    color: #d1d5db;
  }
  
  .country-empty-text {
    font-size: 14px;
    color: #6b7280;
  }
  </style> 