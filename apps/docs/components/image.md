# Image 图片

支持悬停略放大，点击预览，大图预览支持上一张/下一张、Esc 关闭、键盘左右键切换。

:::tip 提示
示例中使用的是 Picsum Photos 随机图片服务，如果图片加载缓慢或失败，可能是网络问题。组件支持加载状态显示和错误处理。
:::

## 基础用法（悬停略放大，默认不预览）

:::::demo
```vue
<template>
  <XGrid :cols="3" gap="12px" :items="imgs">
    <template #item="{ item }">
      <XImage :src="item" width="100%" height="160px" radius="8px" />
    </template>
  </XGrid>
</template>

<script setup>
const imgs = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/img-${i+1}/400/300`)
</script>
```
:::::

## 画廊预览（上一张/下一张，需显式开启预览）

:::::demo
```vue
<template>
  <XGrid :cols="4" gap="10px" :items="list">
    <template #item="{ item, index }">
      <XImage :src="item" :preview="true" :preview-list="list" :preview-index="index"
        width="100%" height="140px" radius="8px" />
    </template>
  </XGrid>
</template>

<script setup>
const list = [
  'https://picsum.photos/seed/a/800/600',
  'https://picsum.photos/seed/b/800/600',
  'https://picsum.photos/seed/c/800/600',
  'https://picsum.photos/seed/d/800/600',
  'https://picsum.photos/seed/e/800/600',
  'https://picsum.photos/seed/f/800/600',
]
</script>
```
:::::

## 禁用悬停缩放（且不开启预览）

:::::demo
```vue
<template>
  <XImage src="https://picsum.photos/seed/nozoom/600/400" :hover-zoom="false"  width="400px" height="260px" />
  
</template>
```
:::::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | `''` |
| width | 宽度 | `string` | `100%` |
| height | 高度 | `string` | `200px` |
| radius | 圆角 | `string` | `8px` |
| fit | 对齐方式（object-fit） | `'cover'\|'contain'\|'fill'\|'none'\|'scale-down'` | `cover` |
| hoverZoom | 悬停略放大 | `boolean` | `true` |
| preview | 是否启用点击预览 | `boolean` | `false` |
| previewList | 预览列表（开启后支持上下切换） | `string[]` | `[]` |
| previewIndex | 当前索引（配合 previewList 使用） | `number` | `0` |

## Events

| 事件 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 图片加载完成 | `(ev: Event)` |
| error | 图片加载失败 | `(ev: Event)` |
| open | 打开预览 | `(index: number)` |
| close | 关闭预览 | `()` |
| change | 预览切换 | `(index: number)` |


## 贡献者

<div class="contributors">
  <div class="contributor-item">
    <a href="https://gitee.com/leheya" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1751620424517657404/10604783_leheya_1751620424.png!avatar200" 
        alt="leheya"
        class="contributor-avatar"
      />
      <span class="contributor-name">无敌暴龙神</span>
    </a>
  </div>
  <div class="contributor-item">
    <a href="https://gitee.com/T_ly" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://foruda.gitee.com/avatar/1677108466743165805/8033741_t_ly_1599548910.png!avatar200" 
        alt="tly"
        class="contributor-avatar"
      />
      <span class="contributor-name">tly</span>
    </a>
  </div>
</div>

<style scoped>
.contributors {
  display: flex;
  gap: 24px;
  margin: 24px 0;
  flex-wrap: wrap;
}

.contributor-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.contributor-item a:hover {
  transform: translateY(-2px);
}

.contributor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--vp-c-border);
  transition: border-color 0.2s ease;
  object-fit: cover;
}

.contributor-item a:hover .contributor-avatar {
  border-color: var(--vp-c-brand-1);
}

.contributor-name {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease;
}

.contributor-item a:hover .contributor-name {
  color: var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .contributors {
    gap: 16px;
  }
  
  .contributor-avatar {
    width: 60px;
    height: 60px;
  }
  
  .contributor-name {
    font-size: 12px;
  }
}
</style>

