# DynamicMech 高级动态网格

支持任意行列配置（3×3、4×4、5×5、4×5 等），带有放大缩小悬停动画。悬停时，当前格子所在的行列会放大（2fr），其他格子变暗，相邻格子高亮发光。

## 基础用法（3×3）

::::demo
```vue
<template>
  <XDynamicMech width="500px" height="500px" />
</template>
```
::::

## 4×4 网格

::::demo
```vue
<template>
  <XDynamicMech 
    :rows="4" 
    :cols="4" 
    width="600px" 
    height="600px" 
  />
</template>
```
::::

## 5×5 网格

::::demo
```vue
<template>
  <XDynamicMech 
    :rows="5" 
    :cols="5" 
    width="700px" 
    height="700px" 
    gap="8px"
  />
</template>
```
::::

## 4×5 矩形网格

::::demo
```vue
<template>
  <XDynamicMech 
    :rows="4" 
    :cols="5" 
    width="900px" 
    height="600px" 
  />
</template>
```
::::

## 图片墙（6×4）

悬停时网格行列动态放大，图片自适应容器，效果自然流畅。

::::demo
```vue
<template>
  <XDynamicMech
    :rows="4"
    :cols="6"
    width="960px"
    height="480px"
    gap="8px"
    :disableColor="true"
    :contentFill="true"
  >
    <template #default="{ index }">
      <img :src="`https://picsum.photos/seed/dm-${index}/400/300`" />
    </template>
  </XDynamicMech>
</template>
```
::::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 行数 | `number` | `3` |
| cols | 列数 | `number` | `3` |
| width | 容器宽度 | `string` | `500px` |
| height | 容器高度 | `string` | `500px` |
| gap | 格子间距 | `string` | `10px` |
| disableColor | 关闭默认背景色（便于放图片/自定义内容） | `boolean` | `false` |
| contentFill | 让插入内容自动填充格子（img/video 等） | `boolean` | `false` |
| lockGrid | 锁定网格大小（悬停时不改变行列尺寸，只改变视觉效果，适合照片墙） | `boolean` | `false` |
| dynamic | （保留属性，向后兼容，无实际作用） | `boolean` | `false` |

## 插槽

| 名称 | 说明 |
| --- | --- |
| default | 单元格内容插槽，参数：`{ index }`（从 1 开始） |

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
  <!-- <div class="contributor-item">
    <a href="https://gitee.com/haijun-li" target="_blank" rel="noopener noreferrer">
      <img 
        src="https://p3.itc.cn/images01/20230307/e9d72e3788844ed1a9259e442899e1bd.png" 
        alt="lihaijun"
        class="contributor-avatar"
      />
      <span class="contributor-name">lihaijun</span>
    </a>
  </div> -->
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