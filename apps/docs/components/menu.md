# Menu 菜单

大气的两层菜单组件，支持图标、徽标和多种交互效果。

## 基础用法

最简单的用法，展示基本的菜单结构。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:view-dashboard'
  },
  {
    key: 'settings',
    label: '设置',
    icon: 'mdi:cog'
  }
])

const handleSelect = (item) => {
  console.log('选中菜单:', item)
}
</script>
```

:::

## 两层菜单

支持父级目录和子级列表的两层结构。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
    :defaultOpenKeys="['system']"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('user-list')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      },
      {
        key: 'role-list',
        label: '角色管理',
        icon: 'mdi:shield-account'
      },
      {
        key: 'permission',
        label: '权限管理',
        icon: 'mdi:lock'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'mdi:file-document-multiple',
    children: [
      {
        key: 'article',
        label: '文章列表',
        icon: 'mdi:text-box'
      },
      {
        key: 'category',
        label: '分类管理',
        icon: 'mdi:folder'
      }
    ]
  }
])

const handleSelect = (item, parentItem) => {
  console.log('选中菜单:', item)
  if (parentItem) {
    console.log('所属分组:', parentItem)
  }
}
</script>
```

:::

## 徽标提示

菜单项可以显示徽标，用于提醒未读消息等。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'message',
    label: '消息中心',
    icon: 'mdi:bell',
    badge: '99+'
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    badge: 3,
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple',
        badge: 2
      },
      {
        key: 'role-list',
        label: '角色管理',
        icon: 'mdi:shield-account',
        badge: 1
      }
    ]
  }
])
</script>
```

:::

## 禁用状态

菜单项可以设置为禁用状态。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'disabled',
    label: '已禁用',
    icon: 'mdi:block-helper',
    disabled: true
  },
  {
    key: 'system',
    label: '系统管理（禁用）',
    icon: 'mdi:cog-outline',
    disabled: true,
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      }
    ]
  }
])
</script>
```

:::

## 使用 XIcon 图标

除了使用 iconify 图标，还支持使用 XIcon 组件的内置图标（通过 `xicon` 属性）。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    xicon: 'home'  // 使用 XIcon 内置图标
  },
  {
    key: 'settings',
    label: '设置',
    xicon: 'settings'  // 使用 XIcon 内置图标
  },
  {
    key: 'user',
    label: '用户中心',
    xicon: 'user',
    children: [
      {
        key: 'profile',
        label: '个人资料',
        xicon: 'user-check'
      },
      {
        key: 'security',
        label: '安全设置',
        xicon: 'shield'
      }
    ]
  }
])
</script>
```

:::

## 混合使用图标

可以同时使用 iconify 图标和 XIcon 图标。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    xicon: 'home'  // XIcon 图标
  },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:view-dashboard'  // iconify 图标
  },
  {
    key: 'system',
    label: '系统管理',
    xicon: 'settings',  // XIcon 图标
    children: [
      {
        key: 'users',
        label: '用户管理',
        xicon: 'users'  // XIcon 图标
      },
      {
        key: 'roles',
        label: '角色管理',
        icon: 'mdi:shield-account'  // iconify 图标
      }
    ]
  }
])
</script>
```

:::

## 自定义图标

使用插槽自定义图标。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
  >
    <template #icon-custom1>
      <div style="width: 20px; height: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px;"></div>
    </template>
    <template #icon-custom2>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
      </svg>
    </template>
  </XMenu>
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('custom1')

const menuItems = ref([
  {
    key: 'custom1',
    label: '自定义图标1',
    customIcon: true
  },
  {
    key: 'custom2',
    label: '自定义图标2',
    customIcon: true
  },
  {
    key: 'normal',
    label: 'XIcon图标',
    xicon: 'home'
  }
])
</script>
```

:::

## 不可折叠模式（分组目录）

设置 `collapsible` 为 `false`，子菜单始终展开，不显示下拉箭头。父级标题会以小字号、淡颜色显示，作为分组目录。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
    :collapsible="false"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('user-list')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    xicon: 'home'
  },
  {
    key: 'system',
    label: '系统管理',  // 以小字号、淡色显示的分组标题
    xicon: 'settings',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        xicon: 'users'
      },
      {
        key: 'role-list',
        label: '角色管理',
        xicon: 'shield'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',  // 以小字号、淡色显示的分组标题
    xicon: 'file',
    children: [
      {
        key: 'article',
        label: '文章列表',
        xicon: 'file-text'
      },
      {
        key: 'category',
        label: '分类管理',
        xicon: 'folder'
      }
    ]
  }
])
</script>
```

:::

## 手风琴模式

开启手风琴模式后，同时只能展开一个菜单分组。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
    accordion
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('user-list')

const menuItems = ref([
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      },
      {
        key: 'role-list',
        label: '角色管理',
        icon: 'mdi:shield-account'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'mdi:file-document-multiple',
    children: [
      {
        key: 'article',
        label: '文章列表',
        icon: 'mdi:text-box'
      },
      {
        key: 'category',
        label: '分类管理',
        icon: 'mdi:folder'
      }
    ]
  },
  {
    key: 'data',
    label: '数据分析',
    icon: 'mdi:chart-bar',
    children: [
      {
        key: 'report',
        label: '数据报表',
        icon: 'mdi:file-chart'
      },
      {
        key: 'statistics',
        label: '统计分析',
        icon: 'mdi:chart-line'
      }
    ]
  }
])
</script>
```

:::

## 折叠菜单

菜单可以折叠，只显示图标。**折叠时鼠标悬浮在有子菜单的项上会显示悬浮面板，方便访问子菜单。**

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; align-items: flex-start;">
    <XMenu 
      :items="menuItems" 
      v-model:activeKey="activeKey"
      :collapsed="collapsed"
    />
    
    <XButton @click="collapsed = !collapsed">
      {{ collapsed ? '展开' : '折叠' }}
    </XButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')
const collapsed = ref(false)

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:view-dashboard'
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      },
      {
        key: 'role-list',
        label: '角色管理',
        icon: 'mdi:shield-account'
      }
    ]
  }
])
</script>
```

:::

## 折叠 + 不可折叠模式

不可折叠模式（分组目录）也支持菜单折叠，折叠时同样会显示悬浮面板。

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; align-items: flex-start;">
    <XMenu 
      :items="menuItems" 
      v-model:activeKey="activeKey"
      :collapsed="collapsed"
      :collapsible="false"
    />
    
    <XButton @click="collapsed = !collapsed">
      {{ collapsed ? '展开' : '折叠' }}
    </XButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('user-list')
const collapsed = ref(false)

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    xicon: 'home'
  },
  {
    key: 'system',
    label: '系统管理',
    xicon: 'settings',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        xicon: 'users'
      },
      {
        key: 'role-list',
        label: '角色管理',
        xicon: 'shield'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',
    xicon: 'file',
    children: [
      {
        key: 'article',
        label: '文章列表',
        xicon: 'file-text'
      },
      {
        key: 'category',
        label: '分类管理',
        xicon: 'folder'
      }
    ]
  }
])
</script>
```

:::

## 自定义宽度

可以自定义菜单的宽度。

:::demo

```vue
<template>
  <XMenu 
    :items="menuItems" 
    v-model:activeKey="activeKey"
    width="320px"
  />
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:view-dashboard'
  },
  {
    key: 'settings',
    label: '设置中心',
    icon: 'mdi:cog',
    children: [
      {
        key: 'profile',
        label: '个人资料',
        icon: 'mdi:account'
      },
      {
        key: 'security',
        label: '安全设置',
        icon: 'mdi:shield-lock'
      }
    ]
  }
])
</script>
```

:::

## 固定高度与滚动

设置 `height` 属性后，菜单会限制高度并支持滚动，适合在固定高度容器中展示大量菜单项。

:::demo

```vue
<template>
  <div class="space-y-4">
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">固定高度 500px</h4>
      <XMenu 
        :items="menuItems" 
        v-model:activeKey="activeKey"
        height="500px"
      />
    </div>
    
    <div>
      <h4 class="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">固定高度 300px + 默认展开</h4>
      <XMenu 
        :items="menuItems" 
        v-model:activeKey="activeKey2"
        height="300px"
        :defaultOpenKeys="['system', 'content', 'data']"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')
const activeKey2 = ref('article')

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: 'mdi:view-dashboard'
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      },
      {
        key: 'role-list',
        label: '角色管理',
        icon: 'mdi:shield-account'
      },
      {
        key: 'permission',
        label: '权限管理',
        icon: 'mdi:lock'
      },
      {
        key: 'menu-config',
        label: '菜单配置',
        icon: 'mdi:menu'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'mdi:file-document-multiple',
    children: [
      {
        key: 'article',
        label: '文章列表',
        icon: 'mdi:text-box'
      },
      {
        key: 'category',
        label: '分类管理',
        icon: 'mdi:folder'
      },
      {
        key: 'tag',
        label: '标签管理',
        icon: 'mdi:tag'
      },
      {
        key: 'comment',
        label: '评论管理',
        icon: 'mdi:comment-multiple'
      }
    ]
  },
  {
    key: 'data',
    label: '数据分析',
    icon: 'mdi:chart-bar',
    children: [
      {
        key: 'report',
        label: '数据报表',
        icon: 'mdi:file-chart'
      },
      {
        key: 'statistics',
        label: '统计分析',
        icon: 'mdi:chart-line'
      },
      {
        key: 'export',
        label: '数据导出',
        icon: 'mdi:download'
      }
    ]
  },
  {
    key: 'finance',
    label: '财务管理',
    icon: 'mdi:currency-usd',
    children: [
      {
        key: 'order',
        label: '订单管理',
        icon: 'mdi:clipboard-list'
      },
      {
        key: 'payment',
        label: '支付记录',
        icon: 'mdi:credit-card'
      },
      {
        key: 'refund',
        label: '退款处理',
        icon: 'mdi:cash-refund'
      }
    ]
  },
  {
    key: 'settings',
    label: '系统设置',
    icon: 'mdi:cog',
    children: [
      {
        key: 'basic',
        label: '基础设置',
        icon: 'mdi:cog-outline'
      },
      {
        key: 'email',
        label: '邮件设置',
        icon: 'mdi:email'
      },
      {
        key: 'sms',
        label: '短信设置',
        icon: 'mdi:message-text'
      }
    ]
  }
])
</script>

<style scoped>
h4 {
  margin: 0;
}
</style>
```

:::

## 监听展开变化

可以监听菜单分组的展开/折叠状态。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
      当前展开的菜单组: {{ openKeys.length > 0 ? openKeys.join(', ') : '无' }}
    </div>
    
    <XMenu 
      :items="menuItems" 
      v-model:activeKey="activeKey"
      @openChange="handleOpenChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeKey = ref('home')
const openKeys = ref([])

const menuItems = ref([
  {
    key: 'home',
    label: '首页',
    icon: 'mdi:home'
  },
  {
    key: 'system',
    label: '系统管理',
    icon: 'mdi:cog-outline',
    children: [
      {
        key: 'user-list',
        label: '用户管理',
        icon: 'mdi:account-multiple'
      }
    ]
  },
  {
    key: 'content',
    label: '内容管理',
    icon: 'mdi:file-document-multiple',
    children: [
      {
        key: 'article',
        label: '文章列表',
        icon: 'mdi:text-box'
      }
    ]
  }
])

const handleOpenChange = (keys) => {
  openKeys.value = keys
  console.log('当前展开的菜单组:', keys)
}
</script>
```

:::

## API

### Menu Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单数据 | `MenuItem[]` | `[]` |
| activeKey | 当前激活的菜单项（支持 v-model） | `string` | `''` |
| defaultOpenKeys | 默认展开的菜单组 | `string[]` | `[]` |
| collapsed | 是否折叠菜单 | `boolean` | `false` |
| width | 菜单宽度 | `string` | `'280px'` |
| height | 菜单高度（超出自动滚动） | `string` | - |
| accordion | 手风琴模式（只展开一个） | `boolean` | `false` |
| collapsible | 是否可折叠（false时父级变为分组目录样式：小字号、淡颜色、无箭头、子菜单始终展开） | `boolean` | `true` |

### MenuItem 类型

```typescript
interface MenuItem {
  /** 唯一标识 */
  key: string
  /** 菜单标题 */
  label: string
  /** iconify图标名称（如：mdi:home） */
  icon?: string
  /** XIcon图标名称（如：home、settings） */
  xicon?: string
  /** 是否使用自定义图标（使用slot） */
  customIcon?: boolean
  /** 徽标 */
  badge?: string | number
  /** 是否禁用 */
  disabled?: boolean
  /** 子菜单 */
  children?: MenuItem[]
}
```

### Menu Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:activeKey | 激活菜单项变化时触发 | `(key: string)` |
| select | 点击菜单项时触发 | `(item: MenuItem, parentItem?: MenuItem)` |
| openChange | 展开/折叠菜单组时触发 | `(openKeys: string[])` |

### Menu Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| icon-{key} | 自定义图标，key 为菜单项的 key | - |

## 样式变量

组件使用以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

```css
:root {
  --x-font-family: 'Segoe UI', sans-serif;
  --x-color-primary: #1a1a1a;
  --x-color-gray-500: #6b7280;
  --x-color-gray-600: #4b5563;
  --x-color-gray-700: #374151;
  --x-color-gray-800: #1f2937;
  --x-radius-sm: 8px;
  --x-radius-md: 10px;
  --x-radius-lg: 12px;
}
```

## 设计说明

- **大气简洁** - 采用现代化设计风格，渐变背景和阴影效果让菜单更具质感
- **流畅动画** - 所有交互都配有平滑的过渡动画，提升用户体验
- **清晰层级** - 通过视觉效果区分父子菜单，层级关系一目了然
  - 可折叠模式：父级可点击，有下拉箭头
  - 分组目录模式：父级小字号、淡颜色，仅作为分组标题
- **图标支持** - 灵活支持三种图标方式：
  - `icon` 属性：使用 iconify 海量图标库（如：`mdi:home`）
  - `xicon` 属性：使用 XIcon 内置图标（如：`home`、`settings`）
  - `customIcon` + 插槽：使用自定义图标
- **响应式设计** - 支持折叠模式，适应不同屏幕尺寸
- **状态反馈** - 鼠标悬浮、激活、禁用等状态都有明确的视觉反馈
