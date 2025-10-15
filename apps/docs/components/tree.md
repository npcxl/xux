# Tree 树形控件

文件夹、组织架构、生物分类等层级结构展示。

## 基础用法

基本的树形结构展示。

:::demo

```vue
<template>
  <XTree :data="treeData" @select="handleSelect" />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  {
    key: '1',
    title: '父节点 1',
    children: [
      { key: '1-1', title: '子节点 1-1' },
      { key: '1-2', title: '子节点 1-2' }
    ]
  },
  {
    key: '2',
    title: '父节点 2',
    children: [
      {
        key: '2-1',
        title: '子节点 2-1',
        children: [
          { key: '2-1-1', title: '孙节点 2-1-1' },
          { key: '2-1-2', title: '孙节点 2-1-2' }
        ]
      }
    ]
  }
])

const handleSelect = (keys, node) => {
  console.log('选中:', node.title)
}
</script>
```

:::

## 可勾选

添加 `checkable` 属性后可勾选节点。

:::demo

```vue
<template>
  <XTree :data="checkableData" checkable @check="handleCheck" />
</template>

<script setup>
import { ref } from 'vue'

const checkableData = ref([
  {
    key: '1',
    title: '全选/反选',
    children: [
      { key: '1-1', title: '选项 1' },
      { key: '1-2', title: '选项 2' },
      { key: '1-3', title: '选项 3' }
    ]
  }
])

const handleCheck = (keys, node) => {
  console.log('已选:', keys)
}
</script>
```

:::

## 自定义图标

使用 `icon` 字段或插槽自定义图标。

:::demo

```vue
<template>
  <XTree :data="iconData" />
</template>

<script setup>
import { ref } from 'vue'

const iconData = ref([
  {
    key: '1',
    title: '文件夹',
    icon: 'material-symbols:folder',
    children: [
      { key: '1-1', title: 'index.vue', icon: 'vscode-icons:file-type-vue' },
      { key: '1-2', title: 'App.vue', icon: 'vscode-icons:file-type-vue' }
    ]
  },
  {
    key: '2',
    title: 'src',
    icon: 'material-symbols:folder',
    children: [
      { key: '2-1', title: 'main.ts', icon: 'vscode-icons:file-type-typescript' },
      { key: '2-2', title: 'style.css', icon: 'vscode-icons:file-type-css' }
    ]
  }
])
</script>
```

:::

## 默认展开

使用 `default-expand-all` 或 `default-expanded-keys` 控制展开。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <h4 class="mb-2 text-sm font-600">全部展开</h4>
      <XTree :data="expandData" default-expand-all />
    </div>
    <div class="flex-1">
      <h4 class="mb-2 text-sm font-600">部分展开</h4>
      <XTree :data="expandData" :default-expanded-keys="['1']" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const expandData = ref([
  {
    key: '1',
    title: '节点 1',
    children: [
      { key: '1-1', title: '节点 1-1' }
    ]
  },
  {
    key: '2',
    title: '节点 2',
    children: [
      { key: '2-1', title: '节点 2-1' }
    ]
  }
])
</script>
```

:::

## 异步加载

支持异步加载子节点数据，加载时显示loading图标。

:::demo

```vue
<template>
  <XTree :data="lazyData" lazy :load-data="loadChildNodes" checkable />
</template>

<script setup>
import { ref } from 'vue'

const lazyData = ref([
  { key: '1', title: '节点1' },
  { key: '2', title: '节点2' },
  { key: '3', title: '叶子节点（不可展开）', isLeaf: true }
])

const loadChildNodes = async (node) => {
  // 模拟异步加载（延迟1秒）
  return new Promise((resolve) => {
    setTimeout(() => {
      const children = [
        { key: `${node.key}-1`, title: `${node.title}-子节点1` },
        { key: `${node.key}-2`, title: `${node.title}-子节点2`, isLeaf: true }
      ]
      resolve(children)
    }, 1000)
  })
}
</script>
```

:::

## 级联选择

默认情况下，选中父节点会自动选中所有子节点，反之亦然。可以通过 `check-strictly` 禁用级联。

:::demo

```vue
<template>
  <div class="flex gap-4">
    <div class="flex-1">
      <h4 class="mb-2 text-sm font-600">级联选择（默认）</h4>
      <XTree ref="tree1" :data="cascadeData" checkable @check="handleCheck1" />
      <div class="mt-2 text-xs text-gray-600">
        <div>已选: {{ checked1.join(', ') }}</div>
        <div>半选: {{ halfChecked1.join(', ') }}</div>
      </div>
    </div>
    <div class="flex-1">
      <h4 class="mb-2 text-sm font-600">独立选择</h4>
      <XTree :data="cascadeData" checkable check-strictly @check="handleCheck2" />
      <div class="mt-2 text-xs text-gray-600">
        已选: {{ checked2.join(', ') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tree1 = ref()
const checked1 = ref([])
const halfChecked1 = ref([])
const checked2 = ref([])

const cascadeData = ref([
  {
    key: '1',
    title: '父节点',
    children: [
      { 
        key: '1-1', 
        title: '子节点1',
        children: [
          { key: '1-1-1', title: '孙节点1' },
          { key: '1-1-2', title: '孙节点2' }
        ]
      },
      { key: '1-2', title: '子节点2' }
    ]
  }
])

const handleCheck1 = (keys, halfKeys) => {
  checked1.value = keys
  halfChecked1.value = halfKeys
}

const handleCheck2 = (keys, halfKeys) => {
  checked2.value = keys
}
</script>
```

:::

## API

### Tree Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 树形数据 | `TreeNodeData[]` | `[]` |
| checkable | 是否可勾选 | `boolean` | `false` |
| default-expand-all | 是否默认展开所有 | `boolean` | `false` |
| default-selected-keys | 默认选中的节点 | `string[]` | `[]` |
| default-checked-keys | 默认勾选的节点 | `string[]` | `[]` |
| default-expanded-keys | 默认展开的节点 | `string[]` | `[]` |
| lazy | 是否懒加载 | `boolean` | `false` |
| load-data | 异步加载数据的方法 | `(node: TreeNodeData) => Promise<TreeNodeData[]>` | - |
| check-strictly | 是否禁用级联选择 | `boolean` | `false` |

### TreeNodeData

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| title | 标题 | `string` |
| icon | 图标（iconify） | `string` |
| children | 子节点 | `TreeNodeData[]` |
| disabled | 是否禁用 | `boolean` |
| isLeaf | 是否为叶子节点（懒加载时使用，标记节点不可展开） | `boolean` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击节点时触发 | `(keys: string[], node: TreeNodeData)` |
| check | 勾选节点时触发 | `(keys: string[], halfCheckedKeys: string[], node: TreeNodeData)` |
| expand | 展开节点时触发 | `(keys: string[], node: TreeNodeData)` |
| load | 异步加载完成时触发 | `(node: TreeNodeData, children: TreeNodeData[])` |

### Slots

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| icon | 自定义图标 | `{ node }` |
| title | 自定义标题 | `{ node }` |

### Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getSelectedKeys | 获取选中的节点 | `() => string[]` |
| getCheckedKeys | 获取勾选的节点 | `() => { checked: string[], halfChecked: string[] }` |
| getExpandedKeys | 获取展开的节点 | `() => string[]` |
| setCheckedKeys | 设置勾选的节点 | `(keys: string[]) => void` |
| setExpandedKeys | 设置展开的节点 | `(keys: string[]) => void` |

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

