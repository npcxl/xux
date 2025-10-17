/**
 * 类型判断工具函数
 * 提供各种数据类型的判断方法
 */

/**
 * 获取数据的准确类型
 * @param value 任意值
 * @returns 类型字符串
 */
export function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

/**
 * 判断是否为对象
 * @param value 任意值
 * @returns 是否为对象
 */
export function isObject(value: any): value is Record<string, any> {
  return getType(value) === 'object'
}

/**
 * 判断是否为数组
 * @param value 任意值
 * @returns 是否为数组
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 判断是否为字符串
 * @param value 任意值
 * @returns 是否为字符串
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * 判断是否为数字
 * @param value 任意值
 * @returns 是否为数字
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 判断是否为布尔值
 * @param value 任意值
 * @returns 是否为布尔值
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 判断是否为函数
 * @param value 任意值
 * @returns 是否为函数
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

/**
 * 判断是否为 null
 * @param value 任意值
 * @returns 是否为 null
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * 判断是否为 undefined
 * @param value 任意值
 * @returns 是否为 undefined
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}

/**
 * 判断是否为 null 或 undefined
 * @param value 任意值
 * @returns 是否为 null 或 undefined
 */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined
}

/**
 * 判断是否为 Date 对象
 * @param value 任意值
 * @returns 是否为 Date 对象
 */
export function isDate(value: any): value is Date {
  return getType(value) === 'date'
}

/**
 * 判断是否为正则表达式
 * @param value 任意值
 * @returns 是否为正则表达式
 */
export function isRegExp(value: any): value is RegExp {
  return getType(value) === 'regexp'
}

/**
 * 判断是否为 Promise
 * @param value 任意值
 * @returns 是否为 Promise
 */
export function isPromise(value: any): value is Promise<any> {
  return getType(value) === 'promise'
}

/**
 * 判断是否为 Symbol
 * @param value 任意值
 * @returns 是否为 Symbol
 */
export function isSymbol(value: any): value is symbol {
  return typeof value === 'symbol'
}

/**
 * 判断是否为空对象
 * @param value 对象
 * @returns 是否为空对象
 */
export function isEmptyObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0
}

/**
 * 判断是否为空数组
 * @param value 数组
 * @returns 是否为空数组
 */
export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0
}

/**
 * 判断是否为空字符串
 * @param value 字符串
 * @returns 是否为空字符串
 */
export function isEmptyString(value: any): boolean {
  return isString(value) && value.trim() === ''
}

/**
 * 判断是否为空值（null、undefined、空字符串、空数组、空对象）
 * @param value 任意值
 * @returns 是否为空值
 */
export function isEmpty(value: any): boolean {
  if (isNil(value)) return true
  if (isEmptyString(value)) return true
  if (isEmptyArray(value)) return true
  if (isEmptyObject(value)) return true
  return false
}

/**
 * 判断是否为纯对象（通过 {} 或 new Object 创建）
 * @param value 任意值
 * @returns 是否为纯对象
 */
export function isPlainObject(value: any): boolean {
  if (!isObject(value)) return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 判断是否为 Map
 * @param value 任意值
 * @returns 是否为 Map
 */
export function isMap(value: any): value is Map<any, any> {
  return getType(value) === 'map'
}

/**
 * 判断是否为 Set
 * @param value 任意值
 * @returns 是否为 Set
 */
export function isSet(value: any): value is Set<any> {
  return getType(value) === 'set'
}

/**
 * 判断是否为 WeakMap
 * @param value 任意值
 * @returns 是否为 WeakMap
 */
export function isWeakMap(value: any): value is WeakMap<any, any> {
  return getType(value) === 'weakmap'
}

/**
 * 判断是否为 WeakSet
 * @param value 任意值
 * @returns 是否为 WeakSet
 */
export function isWeakSet(value: any): value is WeakSet<any> {
  return getType(value) === 'weakset'
}

/**
 * 判断是否为整数
 * @param value 数字
 * @returns 是否为整数
 */
export function isInteger(value: any): boolean {
  return isNumber(value) && Number.isInteger(value)
}

/**
 * 判断是否为浮点数
 * @param value 数字
 * @returns 是否为浮点数
 */
export function isFloat(value: any): boolean {
  return isNumber(value) && !Number.isInteger(value)
}

