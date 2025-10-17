/**
 * 数学计算工具
 * 解决 JavaScript 浮点数计算精度问题
 */

/**
 * 精确加法
 * @param num1 加数1
 * @param num2 加数2
 * @returns 和
 */
export function add(num1: number, num2: number): number {
  const num1Digits = getDigits(num1)
  const num2Digits = getDigits(num2)
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  return (num1 * baseNum + num2 * baseNum) / baseNum
}

/**
 * 精确减法
 * @param num1 被减数
 * @param num2 减数
 * @returns 差
 */
export function subtract(num1: number, num2: number): number {
  const num1Digits = getDigits(num1)
  const num2Digits = getDigits(num2)
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits))
  return (num1 * baseNum - num2 * baseNum) / baseNum
}

/**
 * 精确乘法
 * @param num1 乘数1
 * @param num2 乘数2
 * @returns 积
 */
export function multiply(num1: number, num2: number): number {
  const num1Digits = getDigits(num1)
  const num2Digits = getDigits(num2)
  const baseNum = Math.pow(10, num1Digits + num2Digits)
  return (num1 * Math.pow(10, num1Digits) * num2 * Math.pow(10, num2Digits)) / baseNum
}

/**
 * 精确除法
 * @param num1 被除数
 * @param num2 除数
 * @returns 商
 */
export function divide(num1: number, num2: number): number {
  const num1Digits = getDigits(num1)
  const num2Digits = getDigits(num2)
  return (num1 * Math.pow(10, num2Digits)) / (num2 * Math.pow(10, num1Digits)) * Math.pow(10, num1Digits - num2Digits)
}

/**
 * 获取数字小数位数
 * @param num 数字
 * @returns 小数位数
 */
function getDigits(num: number): number {
  const str = num.toString()
  const index = str.indexOf('.')
  return index === -1 ? 0 : str.length - index - 1
}

/**
 * 四舍五入
 * @param num 数字
 * @param decimals 保留小数位数
 * @returns 四舍五入后的数字
 */
export function round(num: number, decimals = 2): number {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * 向上取整
 * @param num 数字
 * @param decimals 保留小数位数
 * @returns 向上取整后的数字
 */
export function ceil(num: number, decimals = 2): number {
  return Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * 向下取整
 * @param num 数字
 * @param decimals 保留小数位数
 * @returns 向下取整后的数字
 */
export function floor(num: number, decimals = 2): number {
  return Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

/**
 * 限制数字范围
 * @param num 数字
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数字
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @param decimals 小数位数
 * @returns 随机数
 */
export function random(min: number, max: number, decimals = 0): number {
  const num = Math.random() * (max - min) + min
  return decimals > 0 ? round(num, decimals) : Math.floor(num)
}

/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 数字映射
 * @param num 数字
 * @param inMin 输入最小值
 * @param inMax 输入最大值
 * @param outMin 输出最小值
 * @param outMax 输出最大值
 * @returns 映射后的数字
 */
export function mapRange(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

/**
 * 判断是否在范围内
 * @param num 数字
 * @param min 最小值
 * @param max 最大值
 * @param inclusive 是否包含边界
 * @returns 是否在范围内
 */
export function inRange(num: number, min: number, max: number, inclusive = true): boolean {
  return inclusive ? num >= min && num <= max : num > min && num < max
}

/**
 * 求平均值
 * @param nums 数字数组
 * @returns 平均值
 */
export function mean(...nums: number[]): number {
  return nums.reduce((sum, num) => sum + num, 0) / nums.length
}

/**
 * 求中位数
 * @param nums 数字数组
 * @returns 中位数
 */
export function median(...nums: number[]): number {
  const sorted = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

/**
 * 百分比计算
 * @param value 值
 * @param total 总数
 * @param decimals 小数位数
 * @returns 百分比
 */
export function percentage(value: number, total: number, decimals = 2): number {
  return total === 0 ? 0 : round((value / total) * 100, decimals)
}

