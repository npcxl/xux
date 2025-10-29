// useDateTime.ts
import dayjs, { Dayjs } from 'dayjs'
import { ref, computed } from 'vue'

// plugins
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import duration from 'dayjs/plugin/duration'
import isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter'
import isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'

// locale
import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(isSameOrAfterPlugin)
dayjs.extend(isSameOrBeforePlugin)
dayjs.extend(isBetweenPlugin)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)

export interface DateTimeOptions {
  /** 时区（默认 Asia/Shanghai） */
  timezone?: string
  /** 语言（默认 zh-cn） */
  locale?: string
  /** 默认格式 */
  defaultFormat?: string
  /** 解析是否严格（默认 false） */
  parseStrict?: boolean
  /** 周起始：0 周日；1 周一（默认跟随 locale；传入可强制） */
  weekStart?: 0 | 1
}

export interface DateRange {
  start: Dayjs | null
  end: Dayjs | null
}

export interface CalendarDate {
  date: Dayjs
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isWeekend: boolean
}

type DateInput = Dayjs | Date | string | number | null | undefined

export function useDateTime(options: DateTimeOptions = {}) {
  const {
    timezone: tz = 'Asia/Shanghai',
    locale = 'zh-cn',
    defaultFormat = 'YYYY-MM-DD HH:mm:ss',
    parseStrict = false,
    weekStart, // undefined = 跟随 locale
  } = options

  // 全局 locale（Dayjs 是全局单例，这里设一次即可）
  dayjs.locale(locale)

  /** 绑定 tz + locale 的工厂（核心入口） */
  const d = (v?: DateInput) => (v == null ? dayjs() : dayjs(v)).tz(tz).locale(locale)

  /** 归一化：接受任意输入，统一返回 Dayjs（绑定 tz） */
  const normalize = (v: DateInput, fmt?: string) => {
    if (fmt) return dayjs(v as any, fmt, parseStrict).tz(tz).locale(locale)
    return d(v)
  }

  /** 可选：UTC 与本地时区互转 */
  const toUTC = (v: DateInput) => normalize(v).utc()
  const fromUTC = (v: DateInput) => dayjs(v as any).utc().tz(tz).locale(locale)

  // ===================== 基础 =====================
  const now = ref(d())
  const updateNow = () => { now.value = d() }
  const getCurrent = () => d()

  const format = (v: DateInput, fmt: string = defaultFormat) => normalize(v).format(fmt)
  const parse = (v: string | number, fmt?: string) => normalize(v, fmt)
  const create = (v?: DateInput) => normalize(v)

  // ===================== 比较 =====================
  const isSame = (a: DateInput, b: DateInput, unit?: dayjs.OpUnitType) =>
    normalize(a).isSame(normalize(b), unit)

  const isAfter = (a: DateInput, b: DateInput, unit?: dayjs.OpUnitType) =>
    normalize(a).isAfter(normalize(b), unit)

  const isBefore = (a: DateInput, b: DateInput, unit?: dayjs.OpUnitType) =>
    normalize(a).isBefore(normalize(b), unit)

  const isSameOrAfter = (a: DateInput, b: DateInput, unit?: dayjs.OpUnitType) =>
    normalize(a).isSameOrAfter(normalize(b), unit)

  const isSameOrBefore = (a: DateInput, b: DateInput, unit?: dayjs.OpUnitType) =>
    normalize(a).isSameOrBefore(normalize(b), unit)

  /** 新：支持 inclusivity（'()' | '[]' | '[)' | '(]'），默认 '()' 同 dayjs */
  const isBetween = (
    v: DateInput, start: DateInput, end: DateInput,
    unit?: dayjs.OpUnitType, inclusivity?: '()' | '[]' | '[)' | '(]'
  ) => normalize(v).isBetween(normalize(start), normalize(end), unit, inclusivity)

  // ===================== 计算 =====================
  const add = (v: DateInput, amount: number, unit: dayjs.ManipulateType) => normalize(v).add(amount, unit)
  const subtract = (v: DateInput, amount: number, unit: dayjs.ManipulateType) => normalize(v).subtract(amount, unit)
  const diff = (a: DateInput, b: DateInput, unit?: dayjs.QUnitType, float?: boolean) =>
    normalize(a).diff(normalize(b), unit, float)

  const startOf = (v: DateInput, unit: dayjs.OpUnitType) => normalize(v).startOf(unit)
  const endOf = (v: DateInput, unit: dayjs.OpUnitType) => normalize(v).endOf(unit)

  // ===================== 相对时间 =====================
  const fromNow = (v: DateInput) => normalize(v).from(d())
  const toNow = (v: DateInput) => normalize(v).to(d())
  const from = (a: DateInput, b: DateInput) => normalize(a).from(normalize(b))
  const to = (a: DateInput, b: DateInput) => normalize(a).to(normalize(b))

  /** 新：更细粒度的人性化差值（单位可选） */
  const humanizeDiff = (a: DateInput, b: DateInput = d(), unit: dayjs.QUnitType = 'millisecond') => {
    const ms = normalize(a).diff(normalize(b), 'millisecond')
    return dayjs.duration(Math.abs(ms)).humanize()
  }

  /** 新：格式化为分解的时间部分（用于倒计时/仪表） */
  const formatParts = (ms: number) => {
    const dur = dayjs.duration(ms)
    const days = Math.floor(dur.asDays())
    const hours = dur.hours()
    const minutes = dur.minutes()
    const seconds = dur.seconds()
    return { days, hours, minutes, seconds }
  }

  // ===================== 日历 / 月份 =====================
  /**
   * 重写：遵循 locale 或指定 weekStart，保证 6×7=42 单元
   * month: 0-11
   */
  const getCalendarDates = (
    year: number,
    month: number,
    selectedDate?: DateInput,
    minDate?: DateInput,
    maxDate?: DateInput
  ): CalendarDate[] => {
    const firstDay = d().year(year).month(month).date(1)
    const monthStart = firstDay.startOf('month')
    const monthEnd = firstDay.endOf('month')

    // 确定周起始（默认跟随 locale；可强制为周一）
    const localWeekStart = typeof weekStart === 'number' ? weekStart : (dayjs.Ls[locale]?.weekStart ?? 0)
    // Dayjs 的 startOf('week') 受 locale 影响；这里手动对齐
    const start = monthStart.startOf('week').add(localWeekStart, 'day')
    const gridStart = start.isAfter(monthStart) ? start.subtract(7, 'day') : start

    const selected = selectedDate ? normalize(selectedDate) : null
    const min = minDate ? normalize(minDate).startOf('day') : null
    const max = maxDate ? normalize(maxDate).endOf('day') : null
    const today = d()

    const cells: CalendarDate[] = []
    for (let i = 0; i < 42; i++) {
      const date = gridStart.add(i, 'day')
      const isCurrentMonth = date.month() === month
      const isToday = date.isSame(today, 'day')
      const isSelected = selected ? date.isSame(selected, 'day') : false
      const wd = date.day()
      const isWeekend = wd === 0 || wd === 6

      let isDisabled = false
      if (min && date.isBefore(min, 'day')) isDisabled = true
      if (max && date.isAfter(max, 'day')) isDisabled = true

      cells.push({ date, isCurrentMonth, isToday, isSelected, isDisabled, isWeekend })
    }
    return cells
  }

  const getMonthInfo = (year: number, month: number) => {
    const first = d().year(year).month(month).date(1)
    const last = first.endOf('month')
    const daysInMonth = last.date()
    const firstWeekday = first.day() // 0 Sun - 6 Sat
    const lastWeekday = last.day()
    const weeksInMonth = Math.ceil((firstWeekday + daysInMonth) / 7)
    return { firstDay: first, lastDay: last, daysInMonth, firstWeekday, lastWeekday, weeksInMonth }
  }

  const getTimeRanges = () => {
    const today = d()
    return {
      today: { start: today.startOf('day'), end: today.endOf('day') },
      yesterday: {
        start: today.subtract(1, 'day').startOf('day'),
        end: today.subtract(1, 'day').endOf('day'),
      },
      thisWeek: { start: today.startOf('week'), end: today.endOf('week') },
      lastWeek: {
        start: today.subtract(1, 'week').startOf('week'),
        end: today.subtract(1, 'week').endOf('week'),
      },
      thisMonth: { start: today.startOf('month'), end: today.endOf('month') },
      lastMonth: {
        start: today.subtract(1, 'month').startOf('month'),
        end: today.subtract(1, 'month').endOf('month'),
      },
      thisYear: { start: today.startOf('year'), end: today.endOf('year') },
      lastYear: {
        start: today.subtract(1, 'year').startOf('year'),
        end: today.subtract(1, 'year').endOf('year'),
      },
    }
  }

  // ===================== 校验 / 取值 =====================
  const isValid = (v: DateInput, fmt?: string) =>
    fmt ? dayjs(v as any, fmt, parseStrict).isValid() : dayjs(v as any).isValid()

  const getUnit = (v: DateInput, unit: dayjs.UnitType) => normalize(v).get(unit)
  const setUnit = (v: DateInput, unit: dayjs.UnitType, value: number) => normalize(v).set(unit, value)

  const formats = {
    date: 'YYYY-MM-DD',
    time: 'HH:mm:ss',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    dateTime: 'YYYY-MM-DD HH:mm',
    month: 'YYYY-MM',
    year: 'YYYY',
    timestamp: 'X',
    iso: 'YYYY-MM-DDTHH:mm:ssZ',
  } as const

  return {
    // 基础
    now: computed(() => now.value),
    updateNow,
    getCurrent,
    format,
    parse,
    create,
    // 比较
    isSame,
    isAfter,
    isBefore,
    isSameOrAfter,
    isSameOrBefore,
    isBetween,
    // 计算
    add,
    subtract,
    diff,
    startOf,
    endOf,
    // 相对时间
    fromNow,
    toNow,
    from,
    to,
    humanizeDiff,
    formatParts,
    // 日历
    getCalendarDates,
    getMonthInfo,
    getTimeRanges,
    // 工具
    isValid,
    getUnit,
    setUnit,
    // 常量
    formats,
    // tz/locale 绑定 dayjs（高级用法）
    dayjs: (v?: DateInput) => normalize(v),
    // UTC <-> 本地
    toUTC,
    fromUTC,
  }
}

/** 时间范围选择器（修正：统一 tz） */
export function useDateRange(initialRange: DateRange = { start: null, end: null }, tz = 'Asia/Shanghai') {
  const _d = (v?: DateInput) => (v == null ? dayjs() : dayjs(v)).tz(tz)

  const range = ref<DateRange>({ start: initialRange.start ? _d(initialRange.start) : null,
                                 end: initialRange.end ? _d(initialRange.end) : null })

  const setRange = (start: DateInput, end: DateInput) => {
    range.value = { start: start ? _d(start) : null, end: end ? _d(end) : null }
  }

  const clearRange = () => { range.value = { start: null, end: null } }

  const isValidRange = computed(() => {
    const { start, end } = range.value
    if (!start || !end) return false
    return start.isBefore(end) || start.isSame(end)
  })

  /** 兼容性变更：原先返回天数，这里保留 days，同时附带 ms */
  const rangeDuration = computed(() => {
    if (!isValidRange.value) return null
    const ms = range.value.end!.diff(range.value.start!)
    return { ms, days: Math.floor(dayjs.duration(ms).asDays()) }
  })

  return {
    range: computed(() => range.value),
    setRange,
    clearRange,
    isValidRange,
    rangeDuration,
  }
}

/** 倒计时（统一 tz；新增 parts 输出） */
export function useCountdown(targetDate: DateInput, tz = 'Asia/Shanghai') {
  const _d = (v?: DateInput) => (v == null ? dayjs() : dayjs(v)).tz(tz)

  const target = ref(_d(targetDate))
  const now = ref(_d())
  const isExpired = ref(false)

  const durationObj = computed(() => {
    const diffMs = target.value.diff(now.value)
    if (diffMs <= 0) {
      isExpired.value = true
      return dayjs.duration(0)
    }
    return dayjs.duration(diffMs)
  })

  const updateNow = () => { now.value = _d() }

  const formatDuration = (format: string = 'HH:mm:ss') => {
    if (isExpired.value) return '00:00:00'
    const dur = durationObj.value
    const hours = Math.floor(dur.asHours())
    const minutes = dur.minutes()
    const seconds = dur.seconds()
    return format
      .replace('HH', String(hours).padStart(2, '0'))
      .replace('mm', String(minutes).padStart(2, '0'))
      .replace('ss', String(seconds).padStart(2, '0'))
  }

  const parts = computed(() => {
    const dur = durationObj.value
    return {
      days: Math.floor(dur.asDays()),
      hours: dur.hours(),
      minutes: dur.minutes(),
      seconds: dur.seconds(),
      milliseconds: dur.milliseconds(),
    }
  })

  return {
    target: computed(() => target.value),
    now: computed(() => now.value),
    duration: computed(() => durationObj.value),
    parts,
    isExpired: computed(() => isExpired.value),
    updateNow,
    formatDuration,
  }
}

export default useDateTime
