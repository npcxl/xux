# WebSocket 工具

提供 WebSocket 连接管理、自动重连、心跳检测等功能。

## 导入

```javascript
import { XWebSocket } from '@xlui/xux-ui'
```

## 基本使用

连接公开测试服务器进行演示。

:::demo

```vue
<template>
  <div class="space-y-3">
    <div>
      <label class="text-xs text-gray-600">WebSocket 服务器</label>
      <XInput v-model="serverUrl" placeholder="wss://echo.websocket.org" />
    </div>
    <div class="grid grid-cols-3 gap-2">
      <XButton @click="connect" type="primary" :disabled="isConnected">
        {{ isConnected ? '已连接' : '连接' }}
      </XButton>
      <XButton @click="disconnect" type="danger" :disabled="!isConnected">
        断开
      </XButton>
      <XButton @click="clearLogs" type="warning">清空日志</XButton>
    </div>
    <div v-if="isConnected" class="flex gap-2">
      <XInput v-model="message" placeholder="输入消息" class="flex-1" />
      <XButton @click="send" type="success">发送</XButton>
    </div>
    <div class="p-3 bg-gray-50 rounded max-h-60 overflow-y-auto">
      <div class="text-xs text-gray-600 mb-2">连接日志：</div>
      <div v-for="(log, i) in logs" :key="i" class="text-xs mb-1" :class="log.type">
        <span class="text-gray-400">{{ log.time }}</span>
        <span class="ml-2">{{ log.message }}</span>
      </div>
      <div v-if="logs.length === 0" class="text-xs text-gray-400">暂无日志...</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XInput, XButton, XWebSocket } from '@xlui/xux-ui'

const serverUrl = ref('wss://echo.websocket.org')
const isConnected = ref(false)
const message = ref('Hello WebSocket!')
const logs = ref([])
let ws = null

const addLog = (message, type = 'text-gray-700') => {
  logs.value.push({
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
}

const connect = () => {
  ws = new XWebSocket({
    url: serverUrl.value,
    autoConnect: true,
    heartbeatInterval: 30000,
    onOpen: () => {
      isConnected.value = true
      addLog('✓ 连接成功', 'text-green-600')
    },
    onMessage: (data) => {
      addLog(`← 收到消息: ${JSON.stringify(data)}`, 'text-blue-600')
    },
    onError: () => {
      addLog('✗ 连接错误', 'text-red-600')
    },
    onClose: () => {
      isConnected.value = false
      addLog('● 连接关闭', 'text-gray-600')
    }
  })
}

const disconnect = () => {
  if (ws) {
    ws.close()
    ws = null
  }
}

const send = () => {
  if (ws && message.value) {
    ws.send(message.value)
    addLog(`→ 发送消息: ${message.value}`, 'text-purple-600')
  }
}

const clearLogs = () => {
  logs.value = []
}
</script>
```

:::

## 配置选项

完整的配置选项说明。

:::demo

```vue
<template>
  <div class="space-y-2">
    <div class="p-3 bg-blue-50 rounded text-sm">
      <div class="font-bold mb-2">配置选项：</div>
      <ul class="space-y-1 text-xs">
        <li><code>url</code>: WebSocket 服务器地址</li>
        <li><code>heartbeatInterval</code>: 心跳间隔（默认30秒）</li>
        <li><code>reconnectInterval</code>: 重连间隔（默认5秒）</li>
        <li><code>maxReconnectAttempts</code>: 最大重连次数（默认5次）</li>
        <li><code>heartbeatMessage</code>: 心跳消息（默认'ping'）</li>
        <li><code>autoConnect</code>: 是否自动连接（默认true）</li>
      </ul>
    </div>
    <div class="p-3 bg-green-50 rounded text-sm">
      <div class="font-bold mb-2">回调函数：</div>
      <ul class="space-y-1 text-xs">
        <li><code>onOpen</code>: 连接成功回调</li>
        <li><code>onMessage</code>: 接收消息回调</li>
        <li><code>onError</code>: 连接错误回调</li>
        <li><code>onClose</code>: 连接关闭回调</li>
        <li><code>onReconnect</code>: 重连回调</li>
      </ul>
    </div>
  </div>
</template>
```

:::

## 方法说明

:::demo

```vue
<template>
  <div class="space-y-2">
    <div v-for="method in methods" :key="method.name" 
      class="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
      <div class="flex items-center justify-between">
        <code class="text-sm font-bold text-blue-600">{{ method.name }}()</code>
        <span class="text-xs text-gray-600">{{ method.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const methods = [
  { name: 'connect', desc: '建立 WebSocket 连接' },
  { name: 'send', desc: '发送消息（自动JSON序列化）' },
  { name: 'close', desc: '关闭连接' },
  { name: 'reconnect', desc: '手动重连' }
]
</script>
```

:::

## 使用示例

```javascript
// 创建 WebSocket 实例
const ws = new XWebSocket({
  url: 'wss://your-server.com',
  heartbeatInterval: 30000,
  reconnectInterval: 5000,
  maxReconnectAttempts: 5,
  
  onOpen: (event) => {
    console.log('连接成功', event)
  },
  
  onMessage: (data) => {
    console.log('收到消息', data)
  },
  
  onError: (event) => {
    console.error('连接错误', event)
  },
  
  onClose: (event) => {
    console.log('连接关闭', event)
  },
  
  onReconnect: (attempt) => {
    console.log('重连中...', attempt)
  }
})

// 发送消息
ws.send({ type: 'message', content: 'Hello' })

// 关闭连接
ws.close()
```

## 公开测试服务器

以下是可用于测试的公开 WebSocket 服务器：

- **wss://echo.websocket.org** - 经典的 WebSocket echo 服务器
- **wss://demos.kaazing.com/echo** - Kaazing 的 echo 服务器

这些服务器会将收到的消息原样返回，适合用于测试。

## API

| 方法 | 说明 | 参数 |
|------|------|------|
| `new XWebSocket(options)` | 创建实例 | `options: WebSocketOptions` |
| `connect()` | 连接 | - |
| `send(data)` | 发送消息 | `data: any` |
| `close()` | 关闭连接 | - |
| `reconnect()` | 重连 | - |

