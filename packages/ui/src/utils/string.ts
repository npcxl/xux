/**
 * 字符串处理工具函数
 */

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 首字母小写
 * @param str 字符串
 * @returns 首字母小写的字符串
 */
export function uncapitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 驼峰转下划线
 * @param str 驼峰字符串
 * @returns 下划线字符串
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '')
}

/**
 * 下划线转驼峰
 * @param str 下划线字符串
 * @returns 驼峰字符串
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 驼峰转短横线
 * @param str 驼峰字符串
 * @returns 短横线字符串
 */
export function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '')
}

/**
 * 短横线转驼峰
 * @param str 短横线字符串
 * @returns 驼峰字符串
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * 移除字符串两端空格
 * @param str 字符串
 * @returns 去除空格后的字符串
 */
export function trim(str: string): string {
  return str.trim()
}

/**
 * 移除字符串所有空格
 * @param str 字符串
 * @returns 去除所有空格后的字符串
 */
export function trimAll(str: string): string {
  return str.replace(/\s+/g, '')
}

/**
 * 截断字符串
 * @param str 字符串
 * @param maxLength 最大长度
 * @param suffix 后缀（默认为 '...'）
 * @returns 截断后的字符串
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - suffix.length) + suffix
}

/**
 * 字符串脱敏
 * @param str 字符串
 * @param start 开始位置
 * @param end 结束位置
 * @param mask 掩码字符（默认为 '*'）
 * @returns 脱敏后的字符串
 */
export function maskString(str: string, start: number, end: number, mask = '*'): string {
  if (start >= end || start >= str.length) return str
  const maskLength = Math.min(end, str.length) - start
  const maskStr = mask.repeat(maskLength)
  return str.slice(0, start) + maskStr + str.slice(Math.min(end, str.length))
}

/**
 * 手机号脱敏
 * @param phone 手机号
 * @returns 脱敏后的手机号
 */
export function maskPhone(phone: string): string {
  return maskString(phone, 3, 7)
}

/**
 * 邮箱脱敏
 * @param email 邮箱
 * @returns 脱敏后的邮箱
 */
export function maskEmail(email: string): string {
  const [name, domain] = email.split('@')
  if (!name || !domain) return email
  const visibleLength = Math.min(2, name.length)
  const maskedName = name.slice(0, visibleLength) + '***'
  return `${maskedName}@${domain}`
}

/**
 * 身份证号脱敏
 * @param idCard 身份证号
 * @returns 脱敏后的身份证号
 */
export function maskIdCard(idCard: string): string {
  return maskString(idCard, 6, 14)
}

/**
 * 银行卡号脱敏
 * @param cardNo 银行卡号
 * @returns 脱敏后的银行卡号
 */
export function maskBankCard(cardNo: string): string {
  if (cardNo.length <= 8) return cardNo
  return maskString(cardNo, 4, cardNo.length - 4)
}

/**
 * 随机生成字符串
 * @param length 长度
 * @param type 类型（number-数字，letter-字母，all-数字+字母）
 * @returns 随机字符串
 */
export function randomString(length: number, type: 'number' | 'letter' | 'all' = 'all'): string {
  const numbers = '0123456789'
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  
  let chars = ''
  if (type === 'number') chars = numbers
  else if (type === 'letter') chars = letters
  else chars = numbers + letters
  
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 字符串反转
 * @param str 字符串
 * @returns 反转后的字符串
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('')
}

/**
 * 统计字符串中某个字符出现的次数
 * @param str 字符串
 * @param char 要统计的字符
 * @returns 出现次数
 */
export function countChar(str: string, char: string): number {
  return str.split(char).length - 1
}

/**
 * 将字符串转换为 Base64
 * @param str 字符串
 * @returns Base64 字符串
 */
export function toBase64(str: string): string {
  return btoa(encodeURIComponent(str))
}

/**
 * 将 Base64 转换为字符串
 * @param base64 Base64 字符串
 * @returns 原始字符串
 */
export function fromBase64(base64: string): string {
  return decodeURIComponent(atob(base64))
}

