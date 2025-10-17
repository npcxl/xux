<template>
    <div ref="containerRef" class="country-select-container relative">
      <div 
        @click="toggleDropdown"
        :class="[
          'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-[#1a1a1a] transition-colors duration-200 cursor-pointer bg-white',
          customClass,
          { 'opacity-60 cursor-not-allowed': disabled },
          multiple ? 'min-h-[2.5rem]' : ''
        ]"
        :tabindex="disabled ? -1 : 0"
        @keydown.enter="toggleDropdown"
        @keydown.space="toggleDropdown"
        @keydown.escape="closeDropdown"
      >
        <!-- 单选模式 -->
        <div v-if="!multiple" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img 
              v-if="selectedCountry"
              :src="selectedCountry.flagSvg"
              :alt="selectedCountry.name"
              class="w-5 h-4 object-cover rounded-sm"
              @error="handleFlagError"
            />
            <span :class="{ 'text-gray-500': !selectedCountry && placeholder }">
              {{ selectedCountry ? selectedCountry.name : (placeholder || '选择国家') }}
            </span>
          </div>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-180': isOpen }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        <!-- 多选模式 -->
        <div v-else class="flex items-start justify-between gap-2">
          <div class="flex-1 flex flex-wrap gap-1.5 min-h-[1.5rem]">
            <template v-if="selectedCountries.length > 0">
              <div 
                v-for="country in selectedCountries" 
                :key="country.code"
                class="inline-flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
                @click.stop
              >
                <img 
                  :src="country.flagSvg"
                  :alt="country.name"
                  class="w-4 h-3 object-cover rounded-sm"
                  @error="(e) => handleFlagError(e, country)"
                />
                <span>{{ country.name }}</span>
                <svg 
                  @click="removeCountry(country)"
                  class="w-3.5 h-3.5 text-gray-500 hover:text-gray-700 cursor-pointer"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
            </template>
            <span v-else class="text-gray-500 self-center">
              {{ placeholder || '选择国家' }}
            </span>
          </div>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 mt-0.5"
            :class="{ 'rotate-180': isOpen }"
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
        class="absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg overflow-hidden"
        style="position: absolute;"
      >
        <!-- 多选模式：操作栏 -->
        <div v-if="multiple && selectedCountries.length > 0" class="px-3 py-2 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span class="text-xs text-gray-600">
            已选择 {{ selectedCountries.length }} 个国家
            <span v-if="maxSelection > 0"> / {{ maxSelection }}</span>
          </span>
          <button 
            @click.stop="clearAll"
            class="text-xs text-red-500 hover:text-red-700 transition-colors"
          >
            清除全部
          </button>
        </div>

        <!-- 国家列表 -->
        <div class="max-h-60 overflow-y-auto">
          <div 
            v-for="country in sortedCountries" 
            :key="country.code"
            @click="selectCountry(country)"
            class="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors"
            :class="{ 
              'bg-blue-50': isCountrySelected(country),
              'opacity-50 cursor-not-allowed': multiple && maxSelection > 0 && !isCountrySelected(country) && selectedCountries.length >= maxSelection
            }"
          >
            <!-- 多选模式：复选框 -->
            <div v-if="multiple" class="flex items-center">
              <div 
                class="w-4 h-4 border-2 rounded flex items-center justify-center transition-all"
                :class="isCountrySelected(country) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'"
              >
                <svg 
                  v-if="isCountrySelected(country)"
                  class="w-3 h-3 text-white"
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
              class="w-5 h-4 object-cover rounded-sm flex-shrink-0"
              @error="(e) => handleFlagError(e, country)"
            />
            <span>{{ country.name }}</span>
          </div>
        </div>
      </div>
  
      <!-- Backdrop -->
      <div 
        v-if="isOpen && !disabled"
        class="fixed inset-0 z-[9998]"
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
  
  // 排序后的国家列表（优先国家在前）
  const sortedCountries = computed(() => {
    const priority = allCountries.value.filter(country => 
      props.priorityCountries.includes(country.code)
    )
    const others = allCountries.value.filter(country => 
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
  
  // 下拉框操作
  const toggleDropdown = () => {
    if (!props.disabled) {
      isOpen.value = !isOpen.value
    }
  }
  
  const closeDropdown = () => {
    isOpen.value = false
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
  .country-select-container {
    position: relative;
  }
  
  .country-select-container img {
    flex-shrink: 0;
  }
  </style> 