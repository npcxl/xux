# 特殊动画效果

提供各种炫酷的视觉特效组件。

:::tip 来源说明
本页面特效基于 [cssbuttons.io](https://cssbuttons.io) 和 [uiverse.io](https://uiverse.io) 进行封装和优化。


:::

## 烟花特效 Fireworks

点击时触发绚丽的烟花爆炸效果。

<div class='flex gap-3'>
  <XFireworks>
    <XButton type='primary'>点击烟花</XButton>
  </XFireworks>
</div>

```vue
<XFireworks>
  <button>点击我</button>
</XFireworks>
```

---

## 发光按钮 GButton

鼠标悬停时触发华丽的发光和粒子效果。

<div class='flex gap-4 flex-wrap'>
  <XGButton size="small">小号</XGButton>
  <XGButton>默认</XGButton>
  <XGButton color="#ef4444">红色</XGButton>
  <XGButton color="#10b981">绿色</XGButton>
  <XGButton color="#f59e0b">橙色</XGButton>
</div>

```vue
<!-- 基础使用 -->
<XGButton>按钮文字</XGButton>

<!-- 自定义大小 -->
<XGButton size="small">小号</XGButton>
<XGButton size="medium">中号</XGButton>
<!-- 自定义颜色 -->
<XGButton color="#ef4444">红色</XGButton>

<!-- 带点击事件 -->
<XGButton @click="handleClick">提交</XGButton>
```

**Props:**
- `size`: `'small' | 'medium' | 'large'` - 按钮大小，默认 `'medium'`
- `color`: `string` - 发光颜色（Hex格式），默认 `'#8b5cf6'`
- `text`: `string` - 按钮文字

---

<!-- 这里可以添加更多特效组件 -->

<script setup>
import { XFireworks, XGButton, XButton } from '../../../packages/ui/src/index'
</script>

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

