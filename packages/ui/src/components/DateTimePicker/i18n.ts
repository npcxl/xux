/**
 * DateTimePicker 国际化配置
 */

export interface I18nTexts {
  /** 日期 */
  date?: string
  /** 时间 */
  time?: string
  /** 年 */
  year?: string
  /** 月 */
  month?: string
  /** 今天 */
  today?: string
  /** 本周 */
  thisWeek?: string
  /** 本月 */
  thisMonth?: string
  /** 本年 */
  thisYear?: string
  /** 开始时间 */
  startTime?: string
  /** 结束时间 */
  endTime?: string
  /** 小时 */
  hour?: string
  /** 分钟 */
  minute?: string
  /** 秒钟 */
  second?: string
  /** 时（简写） */
  h?: string
  /** 分（简写） */
  m?: string
  /** 秒（简写） */
  s?: string
  /** 清空 */
  clear?: string
  /** 确定 */
  confirm?: string
  /** 星期 */
  weekdays?: string[]
}

// 默认中文翻译
export const zhCN: Required<I18nTexts> = {
  date: '日期',
  time: '时间',
  year: '年',
  month: '月',
  today: '今天',
  thisWeek: '本周',
  thisMonth: '本月',
  thisYear: '本年',
  startTime: '开始时间',
  endTime: '结束时间',
  hour: '小时',
  minute: '分钟',
  second: '秒钟',
  h: '时',
  m: '分',
  s: '秒',
  clear: '清空',
  confirm: '确定',
  weekdays: ['日', '一', '二', '三', '四', '五', '六']
}

// 英文翻译
export const enUS: Required<I18nTexts> = {
  date: 'Date',
  time: 'Time',
  year: '',
  month: '',
  today: 'Today',
  thisWeek: 'This Week',
  thisMonth: 'This Month',
  thisYear: 'This Year',
  startTime: 'Start Time',
  endTime: 'End Time',
  hour: 'Hour',
  minute: 'Minute',
  second: 'Second',
  h: 'H',
  m: 'M',
  s: 'S',
  clear: 'Clear',
  confirm: 'Confirm',
  weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

