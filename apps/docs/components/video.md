# Video 视频

支持清晰度切换、进度条控制、上一个/下一个视频切换，以及根据系统配置（网络速度、设备性能）自适应加载视频清晰度。

## 基础用法

最简单的视频播放，支持播放/暂停、进度条、音量控制等基础功能。

::::demo
```vue
<template>
  <XVideo
    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    poster="https://picsum.photos/seed/video1/400/300"
    width="600px"
    height="auto"
    radius="8px"
  />
</template>

<script setup>
import { XVideo } from '@xlui/xux-ui'
</script>
```
::::

## 多清晰度切换

支持多个清晰度选项，用户可以根据网络情况手动切换清晰度。

::::demo
```vue
<template>
  <XVideo
    :src="videoQualities"
    poster="https://picsum.photos/seed/video2/400/300"
    width="600px"
    height="auto"
    radius="8px"
    :adaptive="false"
    default-quality="720p"
  />
</template>

<script setup>
import { XVideo } from '@xlui/xux-ui'

const videoQualities = [
  { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 5000 },
  { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 3000 },
  { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 1500 },
  { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', bitrate: 0 }
]
</script>
```
::::

## 自适应清晰度

根据系统配置（网络速度、设备内存、CPU核心数）自动选择最合适的清晰度。网络慢或设备性能低时自动选择低清晰度，网络快且设备性能好时选择高清晰度。


**网络速度检测**：
   - 使用 `navigator.connection` API 检测网络连接类型和速度
   - 网络速度 < 2 Mbps → 选择最低清晰度
   - 网络速度 2-10 Mbps → 选择中等清晰度
   - 网络速度 > 10 Mbps → 选择最高清晰度

::::demo
```vue
<template>
  <XVideo
    :src="videoQualities"
    poster="https://picsum.photos/seed/video3/400/300"
    width="600px"
    height="auto"
    radius="8px"
    :adaptive="true"
  />
</template>

<script setup>
import { XVideo } from '@xlui/xux-ui'

const videoQualities = [
  { label: '1080P', value: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 5000 },
  { label: '720P', value: '720p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 3000 },
  { label: '480P', value: '480p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 1500 },
  { label: '自动', value: 'auto', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', bitrate: 0 }
]
</script>
```
::::

## 视频列表（上一个/下一个）

支持视频列表功能，可以切换到上一个或下一个视频。当视频播放结束时，可以自动播放下一个视频。

::::demo
```vue
<template>
  <XVideo
    :src="videoList[0].src"
    :poster="videoList[0].poster"
    :video-list="videoList"
    :current-index="currentIndex"
    width="600px"
    height="auto"
    radius="8px"
    :autoplay="false"
    @change="handleVideoChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { XVideo } from '@xlui/xux-ui'

const currentIndex = ref(0)

const videoList = [
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://picsum.photos/seed/v1/400/300',
    title: '视频 1'
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://picsum.photos/seed/v2/400/300',
    title: '视频 2'
  },
  {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://picsum.photos/seed/v3/400/300',
    title: '视频 3'
  }
]

const handleVideoChange = (index) => {
  currentIndex.value = index
  console.log('切换到视频:', index, videoList[index].title)
}
</script>
```
::::

## 自动播放

设置 `autoplay` 为 `true` 时，视频加载完成后自动播放。

:::

::::demo
```vue
<template>
  <XVideo
    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    poster="https://picsum.photos/seed/video4/400/300"
    width="600px"
    height="auto"
    radius="8px"
    :autoplay="true"
    :muted="true"
  />
</template>

<script setup>
import { XVideo } from '@xlui/xux-ui'
</script>
```
::::

## 自定义加载和错误状态

通过插槽自定义加载状态和错误状态的显示。

::::demo
```vue
<template>
  <XVideo
    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
    poster="https://picsum.photos/seed/video5/400/300"
    width="600px"
    height="auto"
    radius="8px"
  >
    <template #loading>
      <div style="color: #fff; font-size: 14px;">加载中...</div>
    </template>
    <template #error>
      <div style="color: #fff; font-size: 14px;">视频加载失败，请稍后重试</div>
    </template>
  </XVideo>
</template>

<script setup>
import { XVideo } from '@xlui/xux-ui'
</script>
```
::::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 视频地址或清晰度数组 | `string \| VideoQuality[]` | - |
| poster | 视频封面图 | `string` | `''` |
| width | 宽度 | `string` | `100%` |
| height | 高度 | `string` | `auto` |
| radius | 圆角 | `string` | `8px` |
| autoplay | 自动播放 | `boolean` | `false` |
| loop | 循环播放 | `boolean` | `false` |
| muted | 静音 | `boolean` | `false` |
| controls | 显示控制栏 | `boolean` | `true` |
| videoList | 视频列表（用于上一个/下一个功能） | `Array<{ src: string \| VideoQuality[], poster?: string, title?: string }>` | `[]` |
| currentIndex | 当前视频索引 | `number` | `0` |
| adaptive | 是否根据系统配置自适应选择清晰度 | `boolean` | `true` |
| defaultQuality | 默认清晰度（当adaptive为false时使用） | `string` | `auto` |

## VideoQuality 类型

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 清晰度标签（如：1080P、720P） | `string` | - |
| value | 清晰度值（如：1080p、720p） | `string` | - |
| src | 视频地址 | `string` | - |
| bitrate | 码率（用于自适应选择，单位：Mbps） | `number` | - |

## Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| play | 视频开始播放 | `()` |
| pause | 视频暂停 | `()` |
| ended | 视频播放结束 | `()` |
| timeupdate | 播放时间更新 | `(time: number)` |
| error | 视频加载失败 | `(ev: Event)` |
| qualitychange | 清晰度切换 | `(quality: string)` |
| prev | 切换到上一个视频 | `()` |
| next | 切换到下一个视频 | `()` |
| change | 视频切换（视频列表） | `(index: number)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| loading | 自定义加载状态 |
| error | 自定义错误状态 |

## 浏览器自动播放策略

由于浏览器的安全策略，视频自动播放有以下限制：

### 自动播放要求

1. **用户交互触发**：
   - 视频的 `play()` 方法必须由用户交互事件（如点击、触摸）直接调用
   - 不能通过定时器、Promise 回调等异步方式触发
   - 必须在用户交互的事件处理函数中同步调用

2. **静音要求**：
   - Chrome、Firefox、Safari 等浏览器通常只允许静音视频自动播放
   - 建议同时设置 `autoplay` 和 `muted` 为 `true`

3. **媒体参与度**：
   - 如果用户之前与网站有交互（播放过视频），浏览器可能会允许自动播放
   - 新用户首次访问时，自动播放通常会被阻止

### 处理自动播放失败

如果自动播放失败，组件会：
- 显示视频封面图（poster）
- 显示播放按钮，等待用户点击
- 不会抛出错误，用户体验不受影响

### 最佳实践

```vue
<template>
  <!-- 推荐：静音自动播放 -->
  <XVideo
    :src="videoSrc"
    :poster="poster"
    :autoplay="true"
    :muted="true"
  />
</template>

<script setup>
// 如果需要自动播放，建议：
// 1. 设置 autoplay="true"
// 2. 设置 muted="true"  
// 3. 在用户交互事件（如按钮点击）后调用 play()
</script>
```

### 注意事项

- **无法绕过**：浏览器的自动播放策略无法通过代码绕过，这是安全特性
- **用户控制**：用户可以在浏览器设置中允许特定网站的自动播放
- **降级处理**：组件会自动处理自动播放失败的情况，显示播放按钮供用户手动播放

