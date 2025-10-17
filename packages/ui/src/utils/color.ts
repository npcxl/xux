/**
 * 颜色处理工具
 */

export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

/**
 * HEX 转 RGB
 * @param hex HEX 颜色值
 * @returns RGB 对象
 */
export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/**
 * RGB 转 HEX
 * @param r 红色值（0-255）
 * @param g 绿色值（0-255）
 * @param b 蓝色值（0-255）
 * @returns HEX 颜色值
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * RGB 转 HSL
 * @param r 红色值（0-255）
 * @param g 绿色值（0-255）
 * @param b 蓝色值（0-255）
 * @returns HSL 对象
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * HSL 转 RGB
 * @param h 色相（0-360）
 * @param s 饱和度（0-100）
 * @param l 亮度（0-100）
 * @returns RGB 对象
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h /= 360
  s /= 100
  l /= 100

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

/**
 * 颜色混合
 * @param color1 颜色1（HEX）
 * @param color2 颜色2（HEX）
 * @param weight 权重（0-1）
 * @returns 混合后的颜色（HEX）
 */
export function mixColors(color1: string, color2: string, weight = 0.5): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return color1

  const r = Math.round(rgb1.r * (1 - weight) + rgb2.r * weight)
  const g = Math.round(rgb1.g * (1 - weight) + rgb2.g * weight)
  const b = Math.round(rgb1.b * (1 - weight) + rgb2.b * weight)

  return rgbToHex(r, g, b)
}

/**
 * 颜色变亮
 * @param color 颜色（HEX）
 * @param amount 变亮程度（0-100）
 * @returns 变亮后的颜色（HEX）
 */
export function lighten(color: string, amount: number): string {
  return mixColors(color, '#ffffff', amount / 100)
}

/**
 * 颜色变暗
 * @param color 颜色（HEX）
 * @param amount 变暗程度（0-100）
 * @returns 变暗后的颜色（HEX）
 */
export function darken(color: string, amount: number): string {
  return mixColors(color, '#000000', amount / 100)
}

/**
 * 判断颜色是否为暗色
 * @param color 颜色（HEX）
 * @returns 是否为暗色
 */
export function isDark(color: string): boolean {
  const rgb = hexToRgb(color)
  if (!rgb) return false

  // 使用 YIQ 公式计算亮度
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return yiq < 128
}

/**
 * 获取随机颜色
 * @returns 随机颜色（HEX）
 */
export function randomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

