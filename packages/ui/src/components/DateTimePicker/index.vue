<template>
  <ElPopover
    v-model:visible="isOpen"
    placement="bottom-start"
    trigger="click"
    :disabled="disabled"
    :width="360"
    :offset="8"
    :show-arrow="false"
    :teleported="true"
    popper-class="x-datetime-picker-popper"
    @show="emit('open')"
    @hide="emit('close')"
  >
    <template #reference>
      <div class="x-datetime-picker" :class="[`datetime-${size}`, { 'datetime-disabled': disabled }]">
        <!-- 输入框 -->
        <div class="datetime-input-wrapper">
          <template v-if="range">
            <input
              ref="inputRef"
              type="text"
              :value="displayStartValue"
              :placeholder="startPlaceholder"
              :disabled="disabled"
              readonly
              class="datetime-input datetime-input-start"
            />
            <div class="datetime-separator">
              <Icon icon="mdi:arrow-right" />
            </div>
            <input
              type="text"
              :value="displayEndValue"
              :placeholder="endPlaceholder"
              :disabled="disabled"
              readonly
              class="datetime-input datetime-input-end"
            />
          </template>
          <template v-else>
            <input
              ref="inputRef"
              type="text"
              :value="displayValue"
              :placeholder="placeholder"
              :disabled="disabled"
              readonly
              class="datetime-input"
            />
          </template>
          <div class="datetime-icon">
            <Icon :icon="iconType" />
          </div>
        </div>
      </div>
    </template>

    <template #default>
      <div class="datetime-panel">
      <!-- 头部 -->
      <div class="datetime-header">
        <div class="datetime-title">{{ title }}</div>
        <XButton icon="mdi:close" size="small" @click="closePicker">
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
          <span>{{ i18n.date }}</span>
        </XButton>
        <XButton
          size="small"
          icon="mdi:clock"
          :class="{ active: currentMode === 'time' }"
          @click="currentMode = 'time'"
        >
          <span>{{ i18n.time }}</span>
        </XButton>
      </div>

      <!-- 日期选择器 -->
      <div v-if="currentMode === 'date' || mode === 'date'" class="datetime-date-picker">
        <!-- 快捷选择 -->
        <div v-if="showShortcuts && shortcuts.length" class="datetime-shortcuts">
          <button
            v-for="shortcut in shortcuts"
            :key="shortcut.text"
            class="shortcut-btn"
            @click="selectShortcut(shortcut)"
          >
            <Icon :icon="shortcut.icon || 'mdi:calendar-today'" class="shortcut-icon" />
            <span>{{ shortcut.text }}</span>
          </button>
        </div>
        
        <!-- 年月导航 -->
        <div class="date-navigation">
          <XButton size="small" @click="previousMonth">
            <Icon icon="mdi:chevron-left" />
          </XButton>
          <div class="current-month">
            <span class="month-year" v-if="locale === 'zh-CN'">{{ currentYear }}{{ i18n.year }}{{ currentMonth + 1 }}{{ i18n.month }}</span>
            <span class="month-year" v-else>{{ currentMonth + 1 }}/{{ currentYear }}</span>
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
              'date-disabled': calendarDate.isDisabled,
              'date-range-start': isRangeStart(calendarDate),
              'date-range-end': isRangeEnd(calendarDate),
              'date-in-range': isInRange(calendarDate)
            }"
            @click="selectDate(calendarDate)"
          >
            <span class="date-number">{{ calendarDate.date.date() }}</span>
          </div>
        </div>
      </div>

      <!-- 时间选择器 -->
      <div v-if="currentMode === 'time' || mode === 'time'" class="datetime-time-picker">
        <!-- 范围选择时显示开始和结束时间 -->
        <template v-if="range">
          <!-- 开始时间 -->
          <div class="time-range-section">
            <div class="time-range-title">{{ i18n.startTime }}</div>
            <div class="time-sliders">
              <div class="time-slider-group">
                <label class="slider-label">{{ i18n.hour }}: {{ selectedStartHour.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedStartHour"
                    type="range" 
                    min="0" 
                    max="23" 
                    class="time-slider"
                  />
                </div>
              </div>
              <div class="time-slider-group">
                <label class="slider-label">{{ i18n.minute }}: {{ selectedStartMinute.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedStartMinute"
                    type="range" 
                    min="0" 
                    max="59" 
                    class="time-slider"
                  />
                </div>
              </div>
              <div v-if="showSeconds" class="time-slider-group">
                <label class="slider-label">{{ i18n.second }}: {{ selectedStartSecond.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedStartSecond"
                    type="range" 
                    min="0" 
                    max="59" 
                    class="time-slider"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 结束时间 -->
          <div class="time-range-section">
            <div class="time-range-title">{{ i18n.endTime }}</div>
            <div class="time-sliders">
              <div class="time-slider-group">
                <label class="slider-label">{{ i18n.hour }}: {{ selectedEndHour.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedEndHour"
                    type="range" 
                    min="0" 
                    max="23" 
                    class="time-slider"
                  />
                </div>
              </div>
              <div class="time-slider-group">
                <label class="slider-label">{{ i18n.minute }}: {{ selectedEndMinute.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedEndMinute"
                    type="range" 
                    min="0" 
                    max="59" 
                    class="time-slider"
                  />
                </div>
              </div>
              <div v-if="showSeconds" class="time-slider-group">
                <label class="slider-label">{{ i18n.second }}: {{ selectedEndSecond.toString().padStart(2, '0') }}</label>
                <div class="slider-wrapper">
                  <input 
                    v-model.number="selectedEndSecond"
                    type="range" 
                    min="0" 
                    max="59" 
                    class="time-slider"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- 单选时显示单组时间 -->
        <template v-else>
          <div class="time-inputs">
            <div class="time-input-group">
              <label class="time-label">{{ i18n.h }}</label>
              <input 
                v-model.number="selectedHour"
                type="number" 
                min="0" 
                max="23" 
                class="time-input" 
                @input="updateTimeFromInput('hour', $event)"
              />
            </div>
            <div class="time-separator">:</div>
            <div class="time-input-group">
              <label class="time-label">{{ i18n.m }}</label>
              <input 
                v-model.number="selectedMinute"
                type="number" 
                min="0" 
                max="59" 
                class="time-input" 
                @input="updateTimeFromInput('minute', $event)"
              />
            </div>
            <div v-if="showSeconds" class="time-separator">:</div>
            <div v-if="showSeconds" class="time-input-group">
              <label class="time-label">{{ i18n.s }}</label>
              <input 
                v-model.number="selectedSecond"
                type="number" 
                min="0" 
                max="59" 
                class="time-input" 
                @input="updateTimeFromInput('second', $event)"
              />
            </div>
          </div>

          <!-- 时间滑块 -->
          <div class="time-sliders">
            <div class="time-slider-group">
              <label class="slider-label">{{ i18n.hour }}</label>
              <div class="slider-wrapper">
                <input 
                  v-model.number="selectedHour"
                  type="range" 
                  min="0" 
                  max="23" 
                  class="time-slider" 
                  @input="updateTimeFromSlider"
                />
                <div 
                  class="slider-tooltip slider-tooltip-always"
                  :style="{ left: getTooltipPosition('hour') }"
                >
                  {{ selectedHour.toString().padStart(2, '0') }}
                </div>
              </div>
            </div>
            <div class="time-slider-group">
              <label class="slider-label">{{ i18n.minute }}</label>
              <div class="slider-wrapper">
                <input 
                  v-model.number="selectedMinute"
                  type="range" 
                  min="0" 
                  max="59" 
                  class="time-slider" 
                  @input="updateTimeFromSlider"
                />
                <div 
                  class="slider-tooltip slider-tooltip-always"
                  :style="{ left: getTooltipPosition('minute') }"
                >
                  {{ selectedMinute.toString().padStart(2, '0') }}
                </div>
              </div>
            </div>
            <div v-if="showSeconds" class="time-slider-group">
              <label class="slider-label">{{ i18n.second }}</label>
              <div class="slider-wrapper">
                <input 
                  v-model.number="selectedSecond"
                  type="range" 
                  min="0" 
                  max="59" 
                  class="time-slider" 
                  @input="updateTimeFromSlider"
                />
                <div 
                  class="slider-tooltip slider-tooltip-always"
                  :style="{ left: getTooltipPosition('second') }"
                >
                  {{ selectedSecond.toString().padStart(2, '0') }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 底部操作 -->
      <div class="datetime-footer">
        <XButton size="small" ghost type="danger" @click="clearValue">
          <Icon icon="mdi:delete" />
          <span>{{ i18n.clear }}</span>
        </XButton>
        <XButton size="small" ghost type="primary" @click="confirmSelection">
          <Icon icon="mdi:check" />
          <span>{{ i18n.confirm }}</span>
        </XButton>
      </div>
      </div>
    </template>
  </ElPopover>
</template>

<script lang="ts">
/**
 * DateTimePicker 日期时间选择器
 * 
 * 国际化使用示例：
 * 
 * 1. 使用内置语言（中文/英文）：
 *    <DateTimePicker locale="zh-CN" /> // 中文（默认）
 *    <DateTimePicker locale="en-US" /> // 英文
 * 
 * 2. 自定义部分文本：
 *    <DateTimePicker 
 *      locale="zh-CN" 
 *      :i18nTexts="{ today: '现在', clear: '重置' }" 
 *    />
 * 
 * 3. 完全自定义：
 *    <DateTimePicker 
 *      :i18nTexts="{
 *        date: 'Date',
 *        time: 'Time',
 *        today: 'Today',
 *        clear: 'Clear',
 *        confirm: 'OK',
 *        ...
 *      }" 
 *    />
 */

// 重新导出 i18n 相关内容
export { zhCN, enUS, type I18nTexts } from './i18n'

export interface ShortcutOption {
  text: string
  value: () => Date | [Date, Date]
  icon?: string
}

export interface DateTimePickerProps {
      /** 当前值 */
      modelValue?: Date | string | null | [Date, Date] | [string, string]
      /** 选择模式 */
      mode?: 'date' | 'time' | 'datetime'
      /** 是否为范围选择 */
      range?: boolean
      /** 组件尺寸 */
      size?: 'small' | 'medium' | 'large'
      /** 是否禁用 */
      disabled?: boolean
      /** 占位符 */
      placeholder?: string
      /** 开始日期占位符（范围选择） */
      startPlaceholder?: string
      /** 结束日期占位符（范围选择） */
      endPlaceholder?: string
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
      /** 是否显示快捷选择 */
      showShortcuts?: boolean
      /** 自定义快捷选项 */
      shortcuts?: ShortcutOption[]
      /** 自定义国际化文本 */
      i18nTexts?: I18nTexts
    }
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { ElPopover } from 'element-plus'
import { useDateTime } from '../../composables/DateTime'
import { zhCN, enUS, type I18nTexts } from './i18n'

// ShortcutOption 和 DateTimePickerProps 已在上面的 script 标签中定义
    
    const props = withDefaults(defineProps<DateTimePickerProps>(), {
      modelValue: null,
      mode: 'datetime',
      range: false,
      size: 'medium',
      disabled: false,
      placeholder: '请选择日期时间',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      title: '选择日期时间',
      showSeconds: false,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24',
      showToday: true,
      showClear: true,
      locale: 'zh-CN',
      showShortcuts: true
    })
    
    const emit = defineEmits<{
      'update:modelValue': [value: string | null | [string, string]]
      change: [value: string | null | [string, string]]
      open: []
      close: []
    }>()
    
    // 响应式数据
    const isOpen = ref(false)
    const currentMode = ref<'date' | 'time'>('date')
    const currentYear = ref(new Date().getFullYear())
    const currentMonth = ref(new Date().getMonth())
    const selectedDate = ref<Date | null>(null)
    const selectedStartDate = ref<Date | null>(null)
    const selectedEndDate = ref<Date | null>(null)
    const rangeSelectingStart = ref(true) // 是否正在选择开始日期
    const selectedHour = ref(0)
    const selectedMinute = ref(0)
    const selectedSecond = ref(0)
    // 范围选择的时间
    const selectedStartHour = ref(0)
    const selectedStartMinute = ref(0)
    const selectedStartSecond = ref(0)
    const selectedEndHour = ref(23)
    const selectedEndMinute = ref(59)
    const selectedEndSecond = ref(59)
    
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
    
    // 国际化文本
    const i18n = computed<Required<I18nTexts>>(() => {
      const baseTexts = props.locale === 'en-US' ? enUS : zhCN
      return {
        ...baseTexts,
        ...props.i18nTexts
      } as Required<I18nTexts>
    })
    
    // 星期标题
    const weekdays = computed(() => {
      return i18n.value.weekdays
    })
    
    // 动态快捷选项
    const shortcuts = computed((): ShortcutOption[] => {
      if (props.shortcuts) {
        return props.shortcuts
      }
      
      if (props.range) {
        // 范围选择：本周、本月、本年、今天
        return [
          {
            text: i18n.value.thisWeek,
            icon: 'mdi:calendar-week',
            value: (): [Date, Date] => {
              const now = new Date()
              const day = now.getDay()
              const diff = now.getDate() - day + (day === 0 ? -6 : 1)
              const start = new Date(now.getFullYear(), now.getMonth(), diff)
              const end = new Date(start)
              end.setDate(start.getDate() + 6)
              return [start, end]
            }
          },
          {
            text: i18n.value.thisMonth,
            icon: 'mdi:calendar-month',
            value: (): [Date, Date] => {
              const now = new Date()
              const start = new Date(now.getFullYear(), now.getMonth(), 1)
              const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
              return [start, end]
            }
          },
          {
            text: i18n.value.thisYear,
            icon: 'mdi:calendar',
            value: (): [Date, Date] => {
              const now = new Date()
              const start = new Date(now.getFullYear(), 0, 1)
              const end = new Date(now.getFullYear(), 11, 31)
              return [start, end]
            }
          },
          {
            text: i18n.value.today,
            icon: 'mdi:calendar-today',
            value: (): [Date, Date] => {
              const now = new Date()
              return [now, now]
            }
          }
        ]
      } else {
        // 单选：只有今天
        return [
          {
            text: i18n.value.today,
            icon: 'mdi:calendar-today',
            value: (): Date => new Date()
          }
        ]
      }
    })
    
    // 显示值
    const displayValue = computed(() => {
      if (!selectedDate.value && props.mode !== 'time') return ''
      
      // 确保时间值是有效的数字
      const hour = Number(selectedHour.value) || 0
      const minute = Number(selectedMinute.value) || 0
      const second = Number(selectedSecond.value) || 0
      
      const timeStr = props.showSeconds 
        ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
        : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      
      if (props.mode === 'date' && selectedDate.value) {
        const date = create(selectedDate.value)
        return format(date, formats.date)
      } else if (props.mode === 'time') {
        return timeStr
      } else if (selectedDate.value) {
        const date = create(selectedDate.value)
        return `${format(date, formats.date)} ${timeStr}`
      }
      
      return ''
    })
    
    // 范围选择显示值
    const displayStartValue = computed(() => {
      if (!selectedStartDate.value) return ''
      const date = create(selectedStartDate.value)
      
      if (props.mode === 'datetime') {
        // 确保时间值是有效的数字
        const hour = Number(selectedStartHour.value) || 0
        const minute = Number(selectedStartMinute.value) || 0
        const second = Number(selectedStartSecond.value) || 0
        
        const timeStr = props.showSeconds 
          ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
          : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        return `${format(date, props.dateFormat)} ${timeStr}`
      }
      
      return format(date, props.dateFormat)
    })
    
    const displayEndValue = computed(() => {
      if (!selectedEndDate.value) return ''
      const date = create(selectedEndDate.value)
      
      if (props.mode === 'datetime') {
        // 确保时间值是有效的数字
        const hour = Number(selectedEndHour.value) || 0
        const minute = Number(selectedEndMinute.value) || 0
        const second = Number(selectedEndSecond.value) || 0
        
        const timeStr = props.showSeconds 
          ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
          : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        return `${format(date, props.dateFormat)} ${timeStr}`
      }
      
      return format(date, props.dateFormat)
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
    
    // 范围选择辅助函数
    const isRangeStart = (calendarDate: any) => {
      if (!props.range || !selectedStartDate.value) return false
      const dateStr = calendarDate.date.format('YYYY-MM-DD')
      const startStr = format(create(selectedStartDate.value), 'YYYY-MM-DD')
      return dateStr === startStr
    }
    
    const isRangeEnd = (calendarDate: any) => {
      if (!props.range || !selectedEndDate.value) return false
      const dateStr = calendarDate.date.format('YYYY-MM-DD')
      const endStr = format(create(selectedEndDate.value), 'YYYY-MM-DD')
      return dateStr === endStr
    }
    
    const isInRange = (calendarDate: any) => {
      if (!props.range || !selectedStartDate.value || !selectedEndDate.value) return false
      const date = calendarDate.date.toDate()
      return date > selectedStartDate.value && date < selectedEndDate.value
    }
    
    
    // 方法
    const closePicker = () => {
      isOpen.value = false
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
      
      if (props.range) {
        // 范围选择逻辑
        if (rangeSelectingStart.value || (!selectedStartDate.value && !selectedEndDate.value)) {
          // 选择开始日期
          selectedStartDate.value = calendarDate.date.toDate()
          selectedEndDate.value = null
          rangeSelectingStart.value = false
          // 设置默认开始时间为 00:00:00
          if (props.mode === 'datetime') {
            selectedStartHour.value = 0
            selectedStartMinute.value = 0
            selectedStartSecond.value = 0
          }
        } else {
          // 选择结束日期
          const endDate = calendarDate.date.toDate()
          if (selectedStartDate.value && endDate < selectedStartDate.value) {
            // 如果结束日期早于开始日期，交换
            selectedEndDate.value = selectedStartDate.value
            selectedStartDate.value = endDate
            // 交换时间
            if (props.mode === 'datetime') {
              const tempH = selectedStartHour.value
              const tempM = selectedStartMinute.value
              const tempS = selectedStartSecond.value
              selectedStartHour.value = selectedEndHour.value
              selectedStartMinute.value = selectedEndMinute.value
              selectedStartSecond.value = selectedEndSecond.value
              selectedEndHour.value = tempH
              selectedEndMinute.value = tempM
              selectedEndSecond.value = tempS
            }
          } else {
            selectedEndDate.value = endDate
            // 设置默认结束时间为 23:59:59
            if (props.mode === 'datetime') {
              selectedEndHour.value = 23
              selectedEndMinute.value = 59
              selectedEndSecond.value = 59
            }
          }
          rangeSelectingStart.value = true
          
          // 范围选择完成，自动确认并关闭
          if (props.mode === 'date') {
            // 仅日期模式，直接确认并关闭
            confirmSelection()
          } else if (props.mode === 'datetime') {
            // 日期时间模式，也直接确认并关闭（使用默认时间）
            confirmSelection()
          }
        }
      } else {
        // 单选逻辑
        selectedDate.value = calendarDate.date.toDate()
        
        // 设置默认时间（如果是datetime模式）
        if (props.mode === 'datetime') {
          // 使用当前时间作为默认值
          const now = new Date()
          selectedHour.value = now.getHours()
          selectedMinute.value = now.getMinutes()
          selectedSecond.value = now.getSeconds()
        }
        
        // 单选完成后自动关闭
        if (props.mode === 'date' || props.mode === 'datetime') {
          confirmSelection()
        }
      }
    }
    
    const updateTimeFromInput = (type: 'hour' | 'minute' | 'second', event: Event) => {
      const target = event.target as HTMLInputElement
      let value = parseInt(target.value) || 0
      
      // 确保时间值在有效范围内
      if (type === 'hour') {
        selectedHour.value = Math.max(0, Math.min(23, value))
      } else if (type === 'minute') {
        selectedMinute.value = Math.max(0, Math.min(59, value))
      } else if (type === 'second') {
        selectedSecond.value = Math.max(0, Math.min(59, value))
      }
    }
    
    const updateTimeFromSlider = () => {
      // 滑块值已经通过 v-model 自动更新，无需额外处理
      // 这个方法主要用于触发其他副作用（如果需要）
    }
    
    // 计算 tooltip 位置
    const getTooltipPosition = (type: 'hour' | 'minute' | 'second') => {
      let value = 0
      let max = 0
      
      if (type === 'hour') {
        value = selectedHour.value
        max = 23
      } else if (type === 'minute') {
        value = selectedMinute.value
        max = 59
      } else if (type === 'second') {
        value = selectedSecond.value
        max = 59
      }
      
      // 计算百分比位置
      // 滑块按钮宽度为 1.25rem (20px)
      // 需要考虑滑块按钮的宽度，确保 tooltip 对齐滑块按钮中心
      const percent = (value / max) * 100
      const thumbWidth = 20 // 滑块按钮宽度 (px)
      
      // 使用更精确的计算：考虑滑块按钮在两端时的偏移
      // 在 0% 时，thumb 中心在 thumbWidth/2 处
      // 在 100% 时，thumb 中心在 calc(100% - thumbWidth/2) 处
      const offset = thumbWidth / 2
      return `calc(${percent}% + ${offset}px - ${percent / 100 * thumbWidth}px)`
    }
    
    const confirmSelection = () => {
      if (props.range) {
        // 范围选择
        if (selectedStartDate.value && selectedEndDate.value) {
          const startDate = create(selectedStartDate.value)
          const endDate = create(selectedEndDate.value)
          
          if (props.mode === 'datetime') {
            // 范围选择 + 时间（开始和结束时间分别设置）
            // 确保时间值是有效的数字
            const startHour = Number(selectedStartHour.value) || 0
            const startMinute = Number(selectedStartMinute.value) || 0
            const startSecond = Number(selectedStartSecond.value) || 0
            const endHour = Number(selectedEndHour.value) || 0
            const endMinute = Number(selectedEndMinute.value) || 0
            const endSecond = Number(selectedEndSecond.value) || 0
            
            const startDateTime = startDate.hour(startHour).minute(startMinute).second(startSecond)
            const endDateTime = endDate.hour(endHour).minute(endMinute).second(endSecond)
            const startTimeStr = props.showSeconds 
              ? `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}:${startSecond.toString().padStart(2, '0')}`
              : `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`
            const endTimeStr = props.showSeconds 
              ? `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}:${endSecond.toString().padStart(2, '0')}`
              : `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`
            const formattedStart = `${format(startDateTime, props.dateFormat)} ${startTimeStr}`
            const formattedEnd = `${format(endDateTime, props.dateFormat)} ${endTimeStr}`
            emit('update:modelValue', [formattedStart, formattedEnd])
            emit('change', [formattedStart, formattedEnd])
          } else {
            // 范围选择 + 仅日期
            const formattedStart = format(startDate, props.dateFormat)
            const formattedEnd = format(endDate, props.dateFormat)
            emit('update:modelValue', [formattedStart, formattedEnd])
            emit('change', [formattedStart, formattedEnd])
          }
        }
      } else {
        // 单选
        if (props.mode === 'date' && selectedDate.value) {
          const date = create(selectedDate.value)
          const formattedDate = format(date, props.dateFormat)
          emit('update:modelValue', formattedDate)
          emit('change', formattedDate)
        } else if (props.mode === 'time') {
          // 确保时间值是有效的数字
          const hour = Number(selectedHour.value) || 0
          const minute = Number(selectedMinute.value) || 0
          const second = Number(selectedSecond.value) || 0
          
          const timeStr = props.showSeconds 
            ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
            : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          emit('update:modelValue', timeStr)
          emit('change', timeStr)
        } else if (props.mode === 'datetime' && selectedDate.value) {
          // 确保时间值是有效的数字
          const hour = Number(selectedHour.value) || 0
          const minute = Number(selectedMinute.value) || 0
          const second = Number(selectedSecond.value) || 0
          
          const datetime = create(selectedDate.value).hour(hour).minute(minute).second(second).millisecond(0)
          const timeStr = props.showSeconds 
            ? `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
            : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
          const formattedDateTime = `${format(datetime, props.dateFormat)} ${timeStr}`
          emit('update:modelValue', formattedDateTime)
          emit('change', formattedDateTime)
        }
      }
      
      closePicker()
    }
    
    const clearValue = () => {
      selectedDate.value = null
      selectedStartDate.value = null
      selectedEndDate.value = null
      selectedHour.value = 0
      selectedMinute.value = 0
      selectedSecond.value = 0
      selectedStartHour.value = 0
      selectedStartMinute.value = 0
      selectedStartSecond.value = 0
      selectedEndHour.value = 23
      selectedEndMinute.value = 59
      selectedEndSecond.value = 59
      rangeSelectingStart.value = true
      emit('update:modelValue', null)
      emit('change', null)
      closePicker()
    }
    
    const selectShortcut = (shortcut: ShortcutOption) => {
      const result = shortcut.value()
      
      if (Array.isArray(result)) {
        // 范围选择
        const [start, end] = result
        selectedStartDate.value = start
        selectedEndDate.value = end
        currentYear.value = start.getFullYear()
        currentMonth.value = start.getMonth()
        rangeSelectingStart.value = true
        
        // 设置默认时间：开始 00:00:00，结束 23:59:59
        if (props.mode === 'datetime') {
          selectedStartHour.value = 0
          selectedStartMinute.value = 0
          selectedStartSecond.value = 0
          selectedEndHour.value = 23
          selectedEndMinute.value = 59
          selectedEndSecond.value = 59
        }
        
        // 范围选择完成后自动确认并关闭
        if (props.mode === 'date' || props.mode === 'datetime') {
          confirmSelection()
        }
      } else {
        // 单选
        selectedDate.value = result
        currentYear.value = result.getFullYear()
        currentMonth.value = result.getMonth()
        
        // 设置默认时间（如果是datetime模式）
        if (props.mode === 'datetime') {
          const now = result
          selectedHour.value = now.getHours()
          selectedMinute.value = now.getMinutes()
          selectedSecond.value = now.getSeconds()
        }
        
        // 单选完成后自动确认并关闭
        if (props.mode === 'date' || props.mode === 'datetime') {
          confirmSelection()
        }
      }
    }
    
    // 监听器
    watch(() => props.modelValue, (newValue) => {
      if (Array.isArray(newValue) && newValue.length === 2) {
        // 范围选择
        const [start, end] = newValue
        const startDate = create(start)
        const endDate = create(end)
        selectedStartDate.value = startDate.toDate()
        selectedEndDate.value = endDate.toDate()
        
        // 提取时间部分
        selectedStartHour.value = startDate.hour()
        selectedStartMinute.value = startDate.minute()
        selectedStartSecond.value = startDate.second()
        selectedEndHour.value = endDate.hour()
        selectedEndMinute.value = endDate.minute()
        selectedEndSecond.value = endDate.second()
        
        currentYear.value = startDate.year()
        currentMonth.value = startDate.month()
      } else if (newValue) {
        // 单选
        const date = create(newValue)
        selectedDate.value = date.toDate()
        selectedHour.value = date.hour()
        selectedMinute.value = date.minute()
        selectedSecond.value = date.second()
        
        currentYear.value = date.year()
        currentMonth.value = date.month()
      } else {
        selectedDate.value = null
        selectedStartDate.value = null
        selectedEndDate.value = null
        selectedHour.value = 0
        selectedMinute.value = 0
        selectedSecond.value = 0
        selectedStartHour.value = 0
        selectedStartMinute.value = 0
        selectedStartSecond.value = 0
        selectedEndHour.value = 23
        selectedEndMinute.value = 59
        selectedEndSecond.value = 59
      }
    }, { immediate: true })
    
    watch(() => props.mode, (newMode) => {
      if (newMode === 'datetime') {
        currentMode.value = 'date'
      } else {
        currentMode.value = newMode as 'date' | 'time'
      }
    }, { immediate: true })
</script>

<style>
/* 全局样式 - 自定义 Element Plus Popover */
.x-datetime-picker-popper {
  padding: 0 !important;
}

.x-datetime-picker-popper .el-popper__arrow {
  display: none !important;
}
</style>

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
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: 0.5rem;
  background-color: var(--x-bg-color, #ffffff);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--x-shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.03));
}

.datetime-input-wrapper:hover {
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: var(--x-shadow-md, 0 1px 3px 0 rgba(0, 0, 0, 0.08));
}

.datetime-input-wrapper:focus-within {
  border-color: var(--x-color-primary, #1a1a1a);
  box-shadow: 0 0 0 3px var(--x-shadow-focus, rgba(26, 26, 26, 0.08));
}

.datetime-input {
  flex: 1;
  padding: 0.625rem 0.875rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;
  color: var(--x-text-color-primary, #1a1a1a);
  cursor: pointer;
  line-height: 1.5;
}

.datetime-input::placeholder {
  color: var(--x-text-color-placeholder, #9ca3af);
}

/* 范围选择输入框 */
.datetime-input-start,
.datetime-input-end {
  flex: 1;
  min-width: 120px;
  text-align: center;
}

.datetime-separator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  color: var(--x-text-color-placeholder, #9ca3af);
  font-size: 0.875rem;
}

.datetime-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  color: #6b7280;
  margin-right: 0.5rem;
  transition: color 0.15s ease;
}

.datetime-input-wrapper:hover .datetime-icon {
  color: #1a1a1a;
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
  background: var(--x-bg-color, #ffffff);
  border-radius: 0.75rem;
  overflow: hidden;
  min-width: 320px;
}

/* 头部 */
.datetime-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--x-border-color-lighter, #f3f4f6);
  background: var(--x-gradient-bg-light, linear-gradient(to bottom, #fafafa, #ffffff));
}

.datetime-title {
  font-weight: 600;
  color: var(--x-text-color-primary, #1a1a1a);
  font-size: 0.9375rem;
  letter-spacing: -0.01em;
}

.datetime-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: none;
  color: var(--x-text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.datetime-close:hover {
  background-color: var(--x-fill-color, #e5e7eb);
  color: var(--x-text-color-primary, #1a1a1a);
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
  color: var(--x-text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.mode-btn.active {
  background-color: var(--x-color-primary, #1a1a1a);
  color: var(--x-color-white, #ffffff);
}

.mode-btn:hover:not(.active) {
  background-color: var(--x-fill-color, #e5e7eb);
  color: var(--x-text-color-primary, #1a1a1a);
}

/* 日期选择器 */
.datetime-date-picker {
  padding: 1rem;
}

/* 快捷选择 */
.datetime-shortcuts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.shortcut-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--x-border-color, #e5e7eb);
  background: var(--x-bg-color, #ffffff);
  color: var(--x-text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.shortcut-btn:hover {
  border-color: var(--x-color-primary, #1a1a1a);
  background-color: var(--x-fill-color-lighter, #f9fafb);
  color: var(--x-text-color-primary, #1a1a1a);
}

.shortcut-btn:active {
  transform: scale(0.98);
}

.shortcut-icon {
  width: 0.875rem;
  height: 0.875rem;
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
  color: var(--x-text-color-secondary, #6b7280);
  cursor: pointer;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background-color: var(--x-fill-color, #e5e7eb);
  color: var(--x-text-color-primary, #1a1a1a);
}

.current-month {
  font-weight: 600;
  color: var(--x-text-color-primary, #1a1a1a);
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
  height: 2.25rem;
  font-size: 0.8125rem;
  color: var(--x-text-color-regular, #374151);
  cursor: pointer;
  border-radius: 0.25rem;
  font-weight: 500;
  position: relative;
  background-color: transparent;
  transition: color 0.2s ease, background-color 0.2s ease;
  overflow: hidden;
}

/* 日期数字 */
.date-number {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

/* Windows 10 风格 - 动画边框盒子 */
.date-cell::before,
.date-cell::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.25rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* 外层边框 */
.date-cell::before {
  border: 2px solid transparent;
  z-index: 0;
}

/* 内层背景 */
.date-cell::after {
  background-color: #f3f4f6;
  z-index: 0;
}

.date-cell:hover:not(.date-disabled):not(.date-selected)::after {
  opacity: 1;
  animation: backgroundFade 0.3s ease;
}

.date-cell:hover:not(.date-disabled):not(.date-selected) {
  color: #1a1a1a;
}

/* 边框扫入动画 */
@keyframes borderSweep {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  25% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(100% 100%, 100% 100%, 0 100%, 100% 100%);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

/* 背景淡入动画 */
@keyframes backgroundFade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.date-other-month {
  color: #d1d5db;
}

/* 今天的日期 */
.date-today {
  color:var(--x-color-primary, #3b82f6);
  font-weight: 600;
  position: relative;
}

.date-today::before {
  border: 2px solid var(--x-color-primary, #3b82f6);
  opacity: 1;
}

/* 今天的日期悬停效果 */
.date-today:hover:not(.date-selected)::before {
  border-color: var(--x-color-primary, #3b82f6);
  animation: borderSweep 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-today:hover:not(.date-selected)::after {
  background-color: var(--x-datetime-today-hover-bg, #eff6ff);
  opacity: 1;
  animation: backgroundFade 0.3s ease;
}

/* 选中的日期 - Windows 10 风格 */
.date-selected {
  color: var(--x-color-primary, #3b82f6);
  font-weight: 600;
}

.date-selected::before {
  border: 2px solid var(--x-color-white, #ffffff);
  opacity: 1;
  box-shadow: 0 0 0 1px var(--x-datetime-selected-shadow, rgba(59, 130, 246, 0.1));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-selected::after {
  background-color: var(--x-color-primary, #3b82f6);
  opacity: 1;
  box-shadow: 0 2px 4px var(--x-datetime-selected-shadow-md, rgba(59, 130, 246, 0.3));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 选中日期的悬停效果 */
.date-selected:hover::before {
  border-color: var(--x-color-primary, #3b82f6);
  transform: scale(1.05);
}

.date-selected:hover::after {
  background-color: var(--x-color-primary, #3b82f6);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.4);
}

/* 禁用状态 */
.date-disabled {
  color: var(--x-border-color, #e5e7eb);
  cursor: not-allowed;
  opacity: 0.5;
}

.date-disabled::before,
.date-disabled::after {
  display: none;
}

/* 范围选择样式 */
.date-range-start,
.date-range-end {
  color: var(--x-color-white, #ffffff);
  font-weight: 600;
}

.date-range-start::before,
.date-range-end::before {
  border: 2px solid var(--x-color-primary, #3b82f6);
  opacity: 1;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-range-start::after,
.date-range-end::after {
  background-color: var(--x-color-primary, #3b82f6);
  opacity: 1;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-in-range {
  color: #1a1a1a;
  position: relative;
}

.date-in-range::before {
  border: 2px solid transparent;
  opacity: 1;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.date-in-range::after {
  background-color: rgba(26, 26, 26, 0.08);
  opacity: 1;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 时间选择器 */
.datetime-time-picker {
  padding: 1rem;
}

/* 时间范围选择区域 */
.time-range-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--x-border-color, #e5e7eb);
}

.time-range-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.time-range-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  padding-left: 0.25rem;
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
  color: var(--x-text-color-secondary, #6b7280);
  font-weight: 500;
}

.time-input {
  width: 3rem;
  padding: 0.5rem;
  border: 1px solid var(--x-border-color, #e5e7eb);
  border-radius: 0.375rem;
  text-align: center;
  font-size: 1rem;
  color: var(--x-color-primary, #3b82f6);
  background-color: var(--x-color-white, #ffffff);
  transition: all 0.2s ease;
}

.time-input:focus {
  outline: none;
  border-color: var(--x-color-primary, #3b82f6);
  box-shadow: 0 0 0 1px #1a1a1a;
}

.time-separator {
  font-size: 1.5rem;
  color: var(--x-color-primary, #3b82f6);
  font-weight: 600;
  margin-top: 1.5rem;
}

.time-sliders {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.time-slider-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.slider-label {
  font-size: 0.875rem;
  color: #1a1a1a;
  font-weight: 500;
}

.slider-wrapper {
  position: relative;
  padding-top: 2rem;
}

.time-slider {
  width: 100%;
  height: 0.5rem;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #e5e7eb 0%, #e5e7eb 100%);
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  position: relative;
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--x-color-primary, #3b82f6);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.time-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: var(--x-color-primary, #3b82f6);
}

.time-slider::-webkit-slider-thumb:active {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.time-slider::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  background: var(--x-color-primary, #3b82f6);
  cursor: pointer;
  border: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.time-slider::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: var(--x-color-primary, #3b82f6);
}

.time-slider::-moz-range-thumb:active {
  transform: scale(1.1);
}

/* 滑块 Tooltip */
.slider-tooltip {
  position: absolute;
  top: -2rem;
  transform: translateX(-50%);
  padding: 0.25rem 0.75rem;
  background-color: #1a1a1a;
  color: var(--x-color-white, #ffffff);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.375rem;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: left 0.15s ease;
}

.slider-tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 0.25rem solid transparent;
  border-top-color: #1a1a1a;
}

/* 一直显示的 Tooltip */
.slider-tooltip-always {
  opacity: 1;
  visibility: visible;
}

/* 底部操作 */
.datetime-footer {
  display: flex;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-top: 1px solid var(--x-border-color, #e5e7eb);
  background: linear-gradient(to top, var(--x-fill-color, #f5f5f5), var(--x-color-white, #ffffff));
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
  background-color: var(--x-fill-color, #f5f5f5);
  color: var(--x-text-color-secondary, #6b7280);
}

.btn-secondary:hover {
  background-color: var(--x-border-color, #e5e7eb);
  color: var(--x-color-primary, #3b82f6);
}

.btn-primary {
  background-color: var(--x-color-primary, #3b82f6);
  color: var(--x-color-white, #ffffff); 
}

.btn-primary:hover {
  background-color: var(--x-color-primary, #3b82f6);
}


/* 移动端适配 */
@media (max-width: 768px) {
  .datetime-panel {
    max-height: 60vh;
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
    height: 0.625rem;
  }
  
  .time-slider::-webkit-slider-thumb {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .time-slider::-moz-range-thumb {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  .slider-tooltip {
    font-size: 0.875rem;
    padding: 0.375rem 1rem;
  }
}
</style>

