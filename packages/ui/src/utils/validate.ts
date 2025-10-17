/**
 * 验证工具函数
 * 提供各种常用的验证功能
 */

/**
 * 手机号码正则（中国大陆）
 * 支持 13x, 14x, 15x, 16x, 17x, 18x, 19x 开头的11位手机号
 */
export const PHONE_REG = /^1[3-9]\d{9}$/

/**
 * 邮箱正则
 */
export const EMAIL_REG = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * 身份证号正则（18位）
 */
export const ID_CARD_REG = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/

/**
 * URL 正则
 */
export const URL_REG = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

/**
 * 中文正则
 */
export const CHINESE_REG = /^[\u4e00-\u9fa5]+$/

/**
 * 用户名正则（4-16位字母、数字、下划线）
 */
export const USERNAME_REG = /^[a-zA-Z0-9_]{4,16}$/

/**
 * 密码强度正则（至少8位，包含大小写字母和数字）
 */
export const STRONG_PASSWORD_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/

/**
 * IP地址正则（IPv4）
 */
export const IPV4_REG = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/

/**
 * 银行卡号正则（16-19位）
 */
export const BANK_CARD_REG = /^[1-9]\d{15,18}$/

/**
 * 邮政编码正则（中国）
 */
export const POST_CODE_REG = /^[1-9]\d{5}$/

/**
 * 验证手机号码
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export function isPhone(phone: string): boolean {
  return PHONE_REG.test(phone)
}

/**
 * 验证邮箱
 * @param email 邮箱地址
 * @returns 是否为有效邮箱
 */
export function isEmail(email: string): boolean {
  return EMAIL_REG.test(email)
}

/**
 * 验证身份证号
 * @param idCard 身份证号
 * @returns 是否为有效身份证号
 */
export function isIdCard(idCard: string): boolean {
  if (!ID_CARD_REG.test(idCard)) return false
  
  // 验证校验码
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  
  let sum = 0
  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCard[i]) * weights[i]
  }
  
  const checkCode = checkCodes[sum % 11]
  return idCard[17].toUpperCase() === checkCode
}

/**
 * 验证 URL
 * @param url URL地址
 * @returns 是否为有效URL
 */
export function isUrl(url: string): boolean {
  return URL_REG.test(url)
}

/**
 * 验证是否为纯中文
 * @param str 字符串
 * @returns 是否为纯中文
 */
export function isChinese(str: string): boolean {
  return CHINESE_REG.test(str)
}

/**
 * 验证用户名格式
 * @param username 用户名
 * @returns 是否为有效用户名
 */
export function isUsername(username: string): boolean {
  return USERNAME_REG.test(username)
}

/**
 * 验证密码强度
 * @param password 密码
 * @returns 是否为强密码
 */
export function isStrongPassword(password: string): boolean {
  return STRONG_PASSWORD_REG.test(password)
}

/**
 * 验证 IPv4 地址
 * @param ip IP地址
 * @returns 是否为有效IPv4地址
 */
export function isIPv4(ip: string): boolean {
  return IPV4_REG.test(ip)
}

/**
 * 验证银行卡号
 * @param cardNo 银行卡号
 * @returns 是否为有效银行卡号
 */
export function isBankCard(cardNo: string): boolean {
  return BANK_CARD_REG.test(cardNo)
}

/**
 * 验证邮政编码
 * @param code 邮政编码
 * @returns 是否为有效邮政编码
 */
export function isPostCode(code: string): boolean {
  return POST_CODE_REG.test(code)
}

/**
 * 获取密码强度等级
 * @param password 密码
 * @returns 强度等级 0-弱 1-中 2-强
 */
export function getPasswordStrength(password: string): 0 | 1 | 2 {
  if (password.length < 6) return 0
  
  let strength = 0
  
  // 包含小写字母
  if (/[a-z]/.test(password)) strength++
  // 包含大写字母
  if (/[A-Z]/.test(password)) strength++
  // 包含数字
  if (/\d/.test(password)) strength++
  // 包含特殊字符
  if (/[@$!%*?&]/.test(password)) strength++
  // 长度大于等于8
  if (password.length >= 8) strength++
  
  if (strength <= 2) return 0
  if (strength <= 3) return 1
  return 2
}

