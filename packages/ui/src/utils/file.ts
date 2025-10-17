/**
 * 文件处理工具
 */

/**
 * 文件转 Base64
 * @param file 文件对象
 * @returns Base64 字符串
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Base64 转 File
 * @param base64 Base64 字符串
 * @param filename 文件名
 * @returns File 对象
 */
export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

/**
 * 图片压缩
 * @param file 图片文件
 * @param quality 压缩质量（0-1）
 * @param maxWidth 最大宽度
 * @param maxHeight 最大高度
 * @returns 压缩后的 File 对象
 */
export function compressImage(
  file: File,
  quality = 0.8,
  maxWidth = 1920,
  maxHeight = 1080
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = e => {
      const img = new Image()
      img.src = e.target!.result as string

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')!

        let { width, height } = img

        // 计算缩放比例
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          blob => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              })
              resolve(compressedFile)
            } else {
              reject(new Error('压缩失败'))
            }
          },
          file.type,
          quality
        )
      }

      img.onerror = reject
    }

    reader.onerror = reject
  })
}

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 扩展名
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

/**
 * 获取文件名（不含扩展名）
 * @param filename 文件名
 * @returns 文件名
 */
export function getFileName(filename: string): string {
  return filename.replace(/\.[^/.]+$/, '')
}

/**
 * 验证文件类型
 * @param file 文件对象
 * @param acceptTypes 允许的类型数组
 * @returns 是否符合类型
 */
export function validateFileType(file: File, acceptTypes: string[]): boolean {
  return acceptTypes.some(type => {
    if (type.startsWith('.')) {
      return file.name.toLowerCase().endsWith(type.toLowerCase())
    }
    if (type.endsWith('/*')) {
      return file.type.startsWith(type.replace('/*', ''))
    }
    return file.type === type
  })
}

/**
 * 验证文件大小
 * @param file 文件对象
 * @param maxSize 最大大小（字节）
 * @returns 是否符合大小限制
 */
export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

/**
 * 选择文件
 * @param options 选项
 * @returns 选择的文件
 */
export function selectFile(options: {
  accept?: string
  multiple?: boolean
}): Promise<File | File[] | null> {
  return new Promise(resolve => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = options.accept || '*'
    input.multiple = options.multiple || false

    input.onchange = (e: Event) => {
      const files = (e.target as HTMLInputElement).files
      if (!files || files.length === 0) {
        resolve(null)
        return
      }

      if (options.multiple) {
        resolve(Array.from(files))
      } else {
        resolve(files[0])
      }
    }

    input.click()
  })
}

/**
 * 读取文件内容
 * @param file 文件对象
 * @param type 读取类型
 * @returns 文件内容
 */
export function readFile(
  file: File,
  type: 'text' | 'arrayBuffer' | 'dataURL' = 'text'
): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result!)
    reader.onerror = reject

    switch (type) {
      case 'text':
        reader.readAsText(file)
        break
      case 'arrayBuffer':
        reader.readAsArrayBuffer(file)
        break
      case 'dataURL':
        reader.readAsDataURL(file)
        break
    }
  })
}

