/**
 * WebSocket 工具类
 * 提供 WebSocket 连接管理、自动重连、心跳检测等功能
 */

export interface WebSocketOptions {
  /** WebSocket 服务器地址 */
  url: string
  /** 心跳间隔（毫秒），默认 30000 */
  heartbeatInterval?: number
  /** 重连间隔（毫秒），默认 5000 */
  reconnectInterval?: number
  /** 最大重连次数，默认 5，设为 -1 表示无限重连 */
  maxReconnectAttempts?: number
  /** 心跳消息，默认 'ping' */
  heartbeatMessage?: string
  /** 是否自动连接，默认 true */
  autoConnect?: boolean
  /** 连接协议 */
  protocols?: string | string[]
  /** 连接成功回调 */
  onOpen?: (event: Event) => void
  /** 接收消息回调 */
  onMessage?: (data: any) => void
  /** 连接错误回调 */
  onError?: (event: Event) => void
  /** 连接关闭回调 */
  onClose?: (event: CloseEvent) => void
  /** 重连回调 */
  onReconnect?: (attempt: number) => void
}

export class XWebSocket {
  private ws: WebSocket | null = null
  private options: Required<Omit<WebSocketOptions, 'protocols' | 'onOpen' | 'onMessage' | 'onError' | 'onClose' | 'onReconnect'>> & Pick<WebSocketOptions, 'protocols' | 'onOpen' | 'onMessage' | 'onError' | 'onClose' | 'onReconnect'>
  private heartbeatTimer: number | null = null
  private reconnectTimer: number | null = null
  private reconnectAttempts = 0
  private isManualClose = false
  private isConnected = false

  constructor(options: WebSocketOptions) {
    this.options = {
      heartbeatInterval: 30000,
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      heartbeatMessage: 'ping',
      autoConnect: true,
      url: options.url,
      protocols: options.protocols,
      onOpen: options.onOpen,
      onMessage: options.onMessage,
      onError: options.onError,
      onClose: options.onClose,
      onReconnect: options.onReconnect,
      ...options
    }

    if (this.options.autoConnect) {
      this.connect()
    }
  }

  /**
   * 连接 WebSocket
   */
  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.warn('WebSocket 已连接')
      return
    }

    try {
      this.ws = new WebSocket(this.options.url, this.options.protocols)
      this.setupEventHandlers()
    } catch (error) {
      console.error('WebSocket 连接失败:', error)
      this.handleReconnect()
    }
  }

  /**
   * 设置事件处理器
   */
  private setupEventHandlers(): void {
    if (!this.ws) return

    this.ws.onopen = (event) => {
      this.isConnected = true
      this.reconnectAttempts = 0
      this.isManualClose = false
      console.log('WebSocket 连接成功')
      this.options.onOpen?.(event)
      this.startHeartbeat()
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.options.onMessage?.(data)
      } catch {
        this.options.onMessage?.(event.data)
      }
    }

    this.ws.onerror = (event) => {
      console.error('WebSocket 错误:', event)
      this.options.onError?.(event)
    }

    this.ws.onclose = (event) => {
      this.isConnected = false
      this.stopHeartbeat()
      console.log('WebSocket 连接关闭')
      this.options.onClose?.(event)

      if (!this.isManualClose) {
        this.handleReconnect()
      }
    }
  }

  /**
   * 发送消息
   */
  send(data: any): boolean {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket 未连接，无法发送消息')
      return false
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data)
      this.ws.send(message)
      return true
    } catch (error) {
      console.error('发送消息失败:', error)
      return false
    }
  }

  /**
   * 关闭连接
   */
  close(code = 1000, reason = 'Normal closure'): void {
    this.isManualClose = true
    this.stopHeartbeat()
    this.stopReconnect()

    if (this.ws) {
      this.ws.close(code, reason)
      this.ws = null
    }
  }

  /**
   * 重新连接
   */
  reconnect(): void {
    this.close()
    this.reconnectAttempts = 0
    this.connect()
  }

  /**
   * 开始心跳
   */
  private startHeartbeat(): void {
    this.stopHeartbeat()

    this.heartbeatTimer = window.setInterval(() => {
      if (this.isConnected) {
        this.send(this.options.heartbeatMessage)
      }
    }, this.options.heartbeatInterval)
  }

  /**
   * 停止心跳
   */
  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  /**
   * 处理重连
   */
  private handleReconnect(): void {
    if (this.isManualClose) return

    const { maxReconnectAttempts, reconnectInterval } = this.options

    if (maxReconnectAttempts !== -1 && this.reconnectAttempts >= maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连')
      return
    }

    this.reconnectAttempts++
    console.log(`尝试第 ${this.reconnectAttempts} 次重连...`)
    this.options.onReconnect?.(this.reconnectAttempts)

    this.reconnectTimer = window.setTimeout(() => {
      this.connect()
    }, reconnectInterval)
  }

  /**
   * 停止重连
   */
  private stopReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  /**
   * 获取连接状态
   */
  getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED
  }

  /**
   * 是否已连接
   */
  get connected(): boolean {
    return this.isConnected
  }

  /**
   * 获取重连次数
   */
  get reconnectCount(): number {
    return this.reconnectAttempts
  }
}

/**
 * 创建 WebSocket 实例
 */
export function createWebSocket(options: WebSocketOptions): XWebSocket {
  return new XWebSocket(options)
}

