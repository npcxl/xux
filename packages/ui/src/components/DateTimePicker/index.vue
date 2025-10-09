<template>
  <div class="x-datetime-picker" :class="[`datetime-${size}`, { 'datetime-disabled': disabled }]">
    <!-- 输入框 -->
    <div class="datetime-input-wrapper" @click="togglePicker">
      <input
        ref="inputRef"
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        readonly
        class="datetime-input"
      />
      <div class="datetime-icon">
        <Icon :icon="iconType" />
      </div>
    </div>

    <!-- 选择器面板 -->
    <div v-if="isOpen" class="datetime-panel" :class="panelPosition">
      <!-- 头部 -->
      <div class="datetime-header">
        <div class="datetime-title">{{ title }}</div>
        <XButton icon="mdi:close" size="small" @click="closePicker">
          <Icon icon="mdi:close" />
        </XButton>
      </div>

      <!-- 模式切换 -->
      <div v-if="mode === 'datetime'" class="datetime-mode-switch">
        <XButton
          size="small"
          :class="{ active: currentMode === 'date' }"
          icon="mdi:calendar"
          @click="currentMode = 'date'"
        >
          <Icon icon="mdi:calendar" />
          <span>日期</span>
        </XButton>
        <XButton
          size="small"
          icon="mdi:clock"
          :class="{ active: currentMode === 'time' }"
          @click="currentMode = 'time'"
        >
          <Icon icon="mdi:clock" />
          <span>时间</span>
        </XButton>
      </div>

      <!-- 日期选择器 -->
      <div v-if="currentMode === 'date' || mode === 'date'" class="datetime-date-picker">
        <!-- 年月导航 -->
        <div class="date-navigation">
          <XButton size="small" @click="previousMonth">
            <Icon icon="mdi:chevron-left" />
          </XButton>
          <div class="current-month">
            <span class="month-year">{{ currentYear }}年{{ currentMonth + 1 }}月</span>
          </div>
          <XButton size="small" @click="nextMonth">
            <Icon icon="mdi:chevron-right" />
          </XButton>
        </div>

        <!-- 星期标题 -->
        <div class="weekdays">
          <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
        </div>

        <!-- 日期网格 -->
        <div class="date-grid">
          <div
            v-for="calendarDate in calendarDates"
            :key="calendarDate.date.format('YYYY-MM-DD')"
            class="date-cell"
            :class="{
              'date-other-month': !calendarDate.isCurrentMonth,
              'date-today': calendarDate.isToday,
              'date-selected': calendarDate.isSelected,
              'date-disabled': calendarDate.isDisabled
            }"
            @click="selectDate(calendarDate)"
          >
            {{ calendarDate.date.date() }}
          </div>
        </div>
      </div>

      <!-- 时间选择器 -->
      <div v-if="currentMode === 'time' || mode === 'time'" class="datetime-time-picker">
        <div class="time-inputs">
          <div class="time-input-group">
            <label class="time-label">时</label>
            <input 
            :value="selectedHour" type="number" min="0" max="23" class="time-input" @change="updateTime" />
          </div>
          <div class="time-separator">:</div>
          <div class="time-input-group">
            <label class="time-label">分</label>
            <input 
            :value="selectedMinute" type="number" min="0" max="59" class="time-input" @change="updateTime" />
          </div>
          <div v-if="showSeconds" class="time-separator">:</div>
          <div v-if="showSeconds" class="time-input-group">
            <label class="time-label">秒</label>
            <input :value="selectedSecond" type="number" min="0" max="59" class="time-input" @change="updateTime" />
          </div>
        </div>

        <!-- 时间滑块 -->
        <div class="time-sliders">
          <div class="time-slider-group">
            <label class="slider-label">小时</label>
            <input :value="selectedHour" type="range" min="0" max="23" class="time-slider" @input="updateTime" />
            <span class="slider-value">{{ selectedHour.toString().padStart(2, '0') }}</span>
          </div>
          <div class="time-slider-group">
            <label class="slider-label">分钟</label>
            <input :value="selectedMinute" type="range" min="0" max="59" class="time-slider" @input="updateTime" />
            <span class="slider-value">{{ selectedMinute.toString().padStart(2, '0') }}</span>
          </div>
          <div v-if="showSeconds" class="time-slider-group">
            <label class="slider-label">秒钟</label>
            <input :value="selectedSecond" type="range" min="0" max="59" step="1" class="time-slider" @input="updateTime" />
            <span class="slider-value">{{ selectedSecond.toString().padStart(2, '0') }}</span>
          </div>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="datetime-footer">
        <XButton size="small" ghost type="danger" @click="clearValue">
          <Icon icon="mdi:delete" />
          <span>清空</span>
        </XButton>
        <XButton size="small" ghost type="primary" @click="confirmSelection">
          <Icon icon="mdi:check" />
          <span>确定</span>
        </XButton>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useDateTime } from '../../composables/DateTime'
export interface DateTimePickerProps {
      /** 当前值 */
      modelValue?: Date | string | null
      /** 选择模式 */
      mode?: 'date' | 'time' | 'datetime'
      /** 组件尺寸 */
      size?: 'small' | 'medium' | 'large'
      /** 是否禁用 */
      disabled?: boolean
      /** 占位符 */
      placeholder?: string
      /** 标题 */
      title?: string
      /** 是否显示秒 */
      showSeconds?: boolean
      /** 最小日期 */
      minDate?: Date | string
      /** 最大日期 */
      maxDate?: Date | string
      /** 日期格式 */
      dateFormat?: string
      /** 时间格式 */
      timeFormat?: '12' | '24'
      /** 是否显示今天按钮 */
      showToday?: boolean
      /** 是否显示清空按钮 */
      showClear?: boolean
      /** 语言 */
      locale?: 'zh-CN' | 'en-US'
    }
    
    const props = withDefaults(defineProps<DateTimePickerProps>(), {
      modelValue: null,
      mode: 'datetime',
      size: 'medium',
      disabled: false,
      placeholder: '请选择日期时间',
      title: '选择日期时间',
      showSeconds: false,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24',
      showToday: true,
      showClear: true,
      locale: 'zh-CN'
    })
    
    const emit = defineEmits<{
      'update:modelValue': [value: string | null]
      change: [value: string | null]
      open: []
      close: []
    }>()
    
    // 响应式数据
    const isOpen = ref(false)
    const currentMode = ref<'date' | 'time'>('date')
    const currentYear = ref(new Date().getFullYear())
    const currentMonth = ref(new Date().getMonth())
    const selectedDate = ref<Date | null>(null)
    const selectedHour = ref(0)
    const selectedMinute = ref(0)
    const selectedSecond = ref(0)
    const isMobile = ref(false)
    const panelPosition = ref('panel-bottom')
    
    // 引用
    const inputRef = ref<HTMLInputElement>()
    
    // 使用时间处理 composable
    const { 
      format, 
      create, 
      getCalendarDates,
      formats 
    } = useDateTime({
      timezone: 'Asia/Shanghai',
      locale: 'zh-cn'
    })
    
    // 星期标题
    const weekdays = computed(() => {
      return props.locale === 'zh-CN' 
        ? ['日', '一', '二', '三', '四', '五', '六']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    })
    
    // 显示值
    const displayValue = computed(() => {
      if (!selectedDate.value) return ''
      
      const date = create(selectedDate.value)
      const timeStr = props.showSeconds 
        ? `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}:${selectedSecond.value.toString().padStart(2, '0')}`
        : `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
      
      if (props.mode === 'date') {
        return format(date, formats.date)
      } else if (props.mode === 'time') {
        return timeStr
      } else {
        return `${format(date, formats.date)} ${timeStr}`
      }
    })
    
    // 图标类型
    const iconType = computed(() => {
      if (props.mode === 'date') return 'mdi:calendar'
      if (props.mode === 'time') return 'mdi:clock'
      return 'mdi:calendar-clock'
    })
    
    // 日历日期
    const calendarDates = computed(() => {
      const selected = selectedDate.value ? create(selectedDate.value) : undefined
      const min = props.minDate ? create(props.minDate) : undefined
      const max = props.maxDate ? create(props.maxDate) : undefined
      
      return getCalendarDates(
        currentYear.value,
        currentMonth.value,
        selected,
        min,
        max
      )
    })
    
    
    // 方法
    const togglePicker = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value
      if (isOpen.value) {
        calculatePanelPosition()
        emit('open')
      } else {
        emit('close')
      }
    }
    
    const closePicker = () => {
      isOpen.value = false
      emit('close')
    }
    
    const previousMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11
        currentYear.value--
      } else {
        currentMonth.value--
      }
    }
    
    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0
        currentYear.value++
      } else {
        currentMonth.value++
      }
    }
    
    const selectDate = (calendarDate: any) => {
      if (calendarDate.isDisabled) return
      
      selectedDate.value = calendarDate.date.toDate()
      
      if (props.mode === 'date') {
        confirmSelection()
      }
    }
    
    const updateTime = () => {
      // 确保时间值在有效范围内
      selectedHour.value = Math.max(0, Math.min(23, selectedHour.value))
      selectedMinute.value = Math.max(0, Math.min(59, selectedMinute.value))
      selectedSecond.value = Math.max(0, Math.min(59, selectedSecond.value))
    }
    
    const confirmSelection = () => {
      if (props.mode === 'date' && selectedDate.value) {
        const date = create(selectedDate.value)
        const formattedDate = format(date, props.dateFormat)
        emit('update:modelValue', formattedDate)
        emit('change', formattedDate)
      } else if (props.mode === 'time') {
        const timeStr = props.showSeconds 
          ? `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}:${selectedSecond.value.toString().padStart(2, '0')}`
          : `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
        emit('update:modelValue', timeStr)
        emit('change', timeStr)
      } else if (props.mode === 'datetime' && selectedDate.value) {
        const datetime = create(selectedDate.value).hour(selectedHour.value).minute(selectedMinute.value).second(selectedSecond.value).millisecond(0)
        const timeStr = props.showSeconds 
          ? `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}:${selectedSecond.value.toString().padStart(2, '0')}`
          : `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
        const formattedDateTime = `${format(datetime, props.dateFormat)} ${timeStr}`
        emit('update:modelValue', formattedDateTime)
        emit('change', formattedDateTime)
      }
      
      closePicker()
    }
    
    const clearValue = () => {
      selectedDate.value = null
      selectedHour.value = 0
      selectedMinute.value = 0
      selectedSecond.value = 0
      emit('update:modelValue', null)
      emit('change', null)
      closePicker()
    }
    
    // 检测移动端
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }
    
    // 计算面板位置
    const calculatePanelPosition = () => {
      if (!inputRef.value) return
      
      const rect = inputRef.value.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const spaceBelow = viewportHeight - rect.bottom
      const spaceAbove = rect.top
      
      // 面板高度估算（大约400px）
      const panelHeight = 400
      
      if (spaceBelow >= panelHeight || spaceBelow > spaceAbove) {
        panelPosition.value = 'panel-bottom'
      } else {
        panelPosition.value = 'panel-top'
      }
    }
    
    // 监听器
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        const date = create(newValue)
        selectedDate.value = date.toDate()
        selectedHour.value = date.hour()
        selectedMinute.value = date.minute()
        selectedSecond.value = date.second()
        
        currentYear.value = date.year()
        currentMonth.value = date.month()
      } else {
        selectedDate.value = null
        selectedHour.value = 0
        selectedMinute.value = 0
        selectedSecond.value = 0
      }
    }, { immediate: true })
    
    watch(() => props.mode, (newMode) => {
      if (newMode === 'datetime') {
        currentMode.value = 'date'
      } else {
        currentMode.value = newMode as 'date' | 'time'
      }
    }, { immediate: true })
    
    // 点击外部关闭
    const handleClickOutside = (event: Event) => {
      if (isOpen.value && !(event.target as Element)?.closest('.x-datetime-picker')) {
        closePicker()
      }
    }
    
    // 生命周期
    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('click', handleClickOutside)
    })
</script>

<style scoped>
/* 基础样式 */
.x-datetime-picker {
  position: relative;
  display: inline-block;
  width: 100%;
}

.datetime-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: #ffffff;
  transition: all 0.2s ease;
  cursor: pointer;
}

.datetime-input-wrapper:hover {
  border-color: #1a1a1a;
}

.datetime-input-wrapper:focus-within {
  border-color: #1a1a1a;
  box-shadow: 0 0 0 1px #1a1a1a;
}

.datetime-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  color: #1a1a1a;
  cursor: pointer;
}

.datetime-input::placeholder {
  color: #9ca3af;
}

.datetime-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  color: #6b7280;
  margin-right: 0.5rem;
}

/* 尺寸变体 */
.datetime-small .datetime-input {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.datetime-small .datetime-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.datetime-large .datetime-input {
  padding: 1rem 1.25rem;
  font-size: 1rem;
}

.datetime-large .datetime-icon {
  width: 2.5rem;
  height: 2.5rem;
}

/* 禁用状态 */
.datetime-disabled .datetime-input-wrapper {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f9fafb;
}

.datetime-disabled .datetime-input {
  cursor: not-allowed;
}

/* 选择器面板 */
.datetime-panel {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-height: 400px;
  overflow-y: auto;
}

.panel-bottom {
  top: 100%;
  margin-top: 0.25rem;
}

.panel-top {
  bottom: 100%;
  margin-bottom: 0.25rem;
}

/* 头部 */
.datetime-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.datetime-title {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
}

.datetime-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.datetime-close:hover {
  background-color: #e5e7eb;
  color: #1a1a1a;
}

/* 模式切换 */
.datetime-mode-switch {
  display: flex;
  padding: 0.75rem 1rem;
  background-color: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.mode-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.mode-btn.active {
  background-color: #1a1a1a;
  color: #ffffff;
}

.mode-btn:hover:not(.active) {
  background-color: #e5e7eb;
  color: #1a1a1a;
}

/* 日期选择器 */
.datetime-date-picker {
  padding: 1rem;
}

.date-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: #e5e7eb;
  color: #1a1a1a;
}

.current-month {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1rem;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.date-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  font-size: 0.875rem;
  color: #1a1a1a;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.date-cell:hover:not(.date-disabled) {
  background-color: #f3f4f6;
}

.date-other-month {
  color: #9ca3af;
}

.date-today {
  background-color: #fef3c7;
  color: #92400e;
  font-weight: 600;
}

.date-selected {
  background-color: #1a1a1a;
  color: #ffffff;
  font-weight: 600;
}

.date-disabled {
  color: #d1d5db;
  cursor: not-allowed;
}

.date-disabled:hover {
  background-color: transparent;
}

/* 时间选择器 */
.datetime-time-picker {
  padding: 1rem;
}

.time-inputs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.time-input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.time-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.time-input {
  width: 3rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  text-align: center;
  font-size: 1rem;
  color: #1a1a1a;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.time-input:focus {
  outline: none;
  border-color: #1a1a1a;
  box-shadow: 0 0 0 1px #1a1a1a;
}

.time-separator {
  font-size: 1.5rem;
  color: #1a1a1a;
  font-weight: 600;
  margin-top: 1.5rem;
}

.time-sliders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.time-slider-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.slider-label {
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 500;
}

.time-slider {
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.time-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.time-slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: #1a1a1a;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.slider-value {
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 600;
  text-align: center;
}

/* 底部操作 */
.datetime-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #6b7280;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
  color: #1a1a1a;
}

.btn-primary {
  background-color: #1a1a1a;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #000000;
}


/* 移动端适配 */
@media (max-width: 768px) {
  .datetime-panel {
    max-height: 60vh;
    width: 100vw;
    left: 0;
    right: 0;
    border-radius: 0.75rem 0.75rem 0 0;
  }
  
  .panel-bottom {
    top: 100%;
    margin-top: 0;
    border-radius: 0.75rem 0.75rem 0 0;
  }
  
  .panel-top {
    bottom: 100%;
    margin-bottom: 0;
    border-radius: 0 0 0.75rem 0.75rem;
  }
  
  .date-cell {
    height: 3rem;
    font-size: 1rem;
  }
  
  .time-input {
    width: 4rem;
    padding: 0.75rem;
    font-size: 1.25rem;
  }
  
  .time-slider {
    height: 0.75rem;
  }
  
  .time-slider::-webkit-slider-thumb {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .time-slider::-moz-range-thumb {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
