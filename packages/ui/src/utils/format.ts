/**
 * 格式化工具函数
 */

/**
 * 格式化数字（千分位）
 * @param num 数字
 * @param decimals 小数位数
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number, decimals = 2): string {
  const parts = num.toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 格式化货币
 * @param amount 金额
 * @param currency 货币符号（默认为 ¥）
 * @param decimals 小数位数（默认为 2）
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(amount: number, currency = '¥', decimals = 2): string {
  return `${currency}${formatNumber(amount, decimals)}`
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数（默认为 2）
 * @returns 格式化后的文件大小
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
}

/**
 * 格式化日期
 * @param date 日期
 * @param format 格式（默认为 'YYYY-MM-DD HH:mm:ss'）
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss'): string {
  const d = new Date(date)
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化相对时间（多久前）
 * @param date 日期
 * @returns 相对时间字符串
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date().getTime()
  const past = new Date(date).getTime()
  const diff = now - past
  
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const year = day * 365
  
  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`
  if (diff < day) return `${Math.floor(diff / hour)}小时前`
  if (diff < day * 2) return '昨天'
  if (diff < month) return `${Math.floor(diff / day)}天前`
  if (diff < year) return `${Math.floor(diff / month)}个月前`
  return `${Math.floor(diff / year)}年前`
}

/**
 * 格式化倒计时
 * @param seconds 总秒数
 * @returns 倒计时字符串 { days, hours, minutes, seconds }
 */
export function formatCountdown(seconds: number): {
  days: number
  hours: number
  minutes: number
  seconds: number
  format: string
} {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  
  let format = ''
  if (days > 0) format += `${days}天`
  if (hours > 0) format += `${hours}小时`
  if (minutes > 0) format += `${minutes}分钟`
  format += `${secs}秒`
  
  return { days, hours, minutes, seconds: secs, format }
}

/**
 * 格式化百分比
 * @param value 值
 * @param total 总数
 * @param decimals 小数位数（默认为 2）
 * @returns 百分比字符串
 */
export function formatPercentage(value: number, total: number, decimals = 2): string {
  if (total === 0) return '0%'
  return `${((value / total) * 100).toFixed(decimals)}%`
}

/**
 * 格式化手机号（344格式）
 * @param phone 手机号
 * @returns 格式化后的手机号
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
}

/**
 * 格式化银行卡号（4位分组）
 * @param cardNo 银行卡号
 * @returns 格式化后的银行卡号
 */
export function formatBankCard(cardNo: string): string {
  return cardNo.replace(/(\d{4})(?=\d)/g, '$1 ')
}

/**
 * 格式化数字为中文
 * @param num 数字
 * @returns 中文数字
 */
export function formatChineseNumber(num: number): string {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿']
  
  if (num === 0) return '零'
  if (num < 0) return '负' + formatChineseNumber(-num)
  if (num < 10) return digits[num]
  
  let result = ''
  let unitIndex = 0
  
  while (num > 0) {
    const digit = num % 10
    if (digit !== 0) {
      result = digits[digit] + units[unitIndex] + result
    } else if (result && result[0] !== '零') {
      result = '零' + result
    }
    num = Math.floor(num / 10)
    unitIndex++
  }
  
  return result.replace(/零+$/, '').replace(/零+/g, '零')
}

/**
 * 格式化金额为大写中文
 * @param amount 金额
 * @returns 大写中文金额
 */
export function formatChineseCurrency(amount: number): string {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']
  
  if (amount === 0) return '零元整'
  
  let integer = Math.floor(amount)
  let decimal = Math.round((amount - integer) * 100)
  
  let result = ''
  let zeroCount = 0
  let unitIndex = 0
  
  // 处理整数部分
  while (integer > 0) {
    const chunk = integer % 10000
    let chunkStr = ''
    
    for (let i = 0; i < 4; i++) {
      const digit = chunk % 10
      if (digit === 0) {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chunkStr = '零' + chunkStr
          zeroCount = 0
        }
        chunkStr = digits[digit] + units[i] + chunkStr
      }
      integer = Math.floor(integer / 10)
      if (integer % 10000 === 0) break
    }
    
    if (chunkStr) {
      result = chunkStr + bigUnits[unitIndex] + result
    }
    
    integer = Math.floor(integer)
    unitIndex++
  }
  
  result += '元'
  
  // 处理小数部分
  if (decimal === 0) {
    result += '整'
  } else {
    const jiao = Math.floor(decimal / 10)
    const fen = decimal % 10
    
    if (jiao > 0) result += digits[jiao] + '角'
    if (fen > 0) result += digits[fen] + '分'
  }
  
  return result
}

/**
 * 数字补零
 * @param num 数字
 * @param length 长度
 * @returns 补零后的字符串
 */
export function padZero(num: number, length = 2): string {
  return String(num).padStart(length, '0')
}

