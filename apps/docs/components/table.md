# Table 表格

企业级表格组件，提供强大且灵活的数据展示能力。支持固定表头、固定列、排序、行选择等功能，并具备优秀的无障碍支持和性能优化。

## 宽度自适应说明

**表格宽度：** 表格容器默认为 **100% 宽度**，会自动填满父容器。

**列宽度策略：**
- **设置了 `width` 的列**：保持固定宽度，不会伸缩
- **未设置 `width` 的列**：自动平分剩余空间，实现响应式布局
- **混合使用**：固定关键列宽度（如ID、操作列），让内容列自适应

## 设计理念

本表格组件使用 CSS Grid 列式布局而非传统的 `<table>` 标签，这是基于以下考虑：

**优势：**
- **更灵活的布局** - 使用 CSS Grid 实现，表头和表体列宽自动对齐
- **更好的性能** - 固定列使用 `position: sticky`，性能更优
- **响应式友好** - 可以使用 CSS Grid、媒体查询等现代技术
- **样式控制** - 更容易实现复杂的样式需求（渐变、阴影、动画等）

**权衡：**
- **语义性** - 失去了部分 HTML 语义，但通过 ARIA 属性补充
- **兼容性** - 需要支持现代浏览器（但我们的目标就是现代化）

使用 CSS Grid 列式布局的优势：
- 表头和表体共享相同的列定义，宽度完全一致
- 表头通过 `position: sticky` 固定，自然跟随横向滚动
- 固定列实现更简单，性能更好
- 更容易实现复杂的交互效果和动画

## 基础用法

基础的表格展示。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="dataSource"
    @row-click="handleRowClick"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'address', title: '地址', dataIndex: 'address' },  // 不设置宽度，自动铺满
  { key: 'email', title: '邮箱', dataIndex: 'email' },  // 不设置宽度，自动铺满
  { key: 'phone', title: '电话', dataIndex: 'phone', width: '130px' }
])

const dataSource = ref([
  {
    id: '1',
    name: '张三',
    age: 28,
    address: '北京市朝阳区',
    email: 'zhangsan@example.com',
    phone: '13800138000'
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    address: '上海市浦东新区',
    email: 'lisi@example.com',
    phone: '13800138001'
  },
  {
    id: '3',
    name: '王五',
    age: 25,
    address: '广州市天河区',
    email: 'wangwu@example.com',
    phone: '13800138002'
  },
  {
    id: '4',
    name: '赵六',
    age: 30,
    address: '深圳市南山区',
    email: 'zhaoliu@example.com',
    phone: '13800138003'
  },
  {
    id: '5',
    name: '钱七',
    age: 27,
    address: '杭州市西湖区',
    email: 'qianqi@example.com',
    phone: '13800138004'
  }
])

const handleRowClick = (record, index) => {
  console.log('点击行:', record, index)
}
</script>
```

:::

## 固定表头

设置 `height` 后表头会自动固定。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="longDataSource"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '60px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'department', title: '部门', dataIndex: 'department' },  // 自动铺满
  { key: 'position', title: '职位', dataIndex: 'position' },  // 自动铺满
  { key: 'salary', title: '薪资', dataIndex: 'salary', width: '100px' }
])

const longDataSource = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: `员工${i + 1}`,
    department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    position: ['工程师', '产品经理', '设计师', '运营专员'][i % 4],
    salary: `¥${(10 + i) * 1000}`
  }))
)
</script>
```

:::

## 固定左侧列

通过设置列的 `fixed: 'left'` 来固定左侧列。

:::demo

```vue
<template>
  <XTable 
    :columns="fixedLeftColumns" 
    :dataSource="dataSource"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'

const fixedLeftColumns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px', fixed: 'left' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'address', title: '地址', dataIndex: 'address' },  // 自动铺满
  { key: 'company', title: '公司', dataIndex: 'company' },  // 自动铺满
  { key: 'email', title: '邮箱', dataIndex: 'email' },  // 自动铺满
  { key: 'phone', title: '电话', dataIndex: 'phone', width: '130px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '100px' }
])

const dataSource = ref([
  {
    id: '1',
    name: '张三',
    age: 28,
    address: '北京市朝阳区建国路123号',
    company: '科技有限公司',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    department: '技术部'
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    address: '上海市浦东新区世纪大道456号',
    company: '互联网公司',
    email: 'lisi@example.com',
    phone: '13800138001',
    department: '产品部'
  },
  {
    id: '3',
    name: '王五',
    age: 25,
    address: '广州市天河区珠江新城789号',
    company: '设计工作室',
    email: 'wangwu@example.com',
    phone: '13800138002',
    department: '设计部'
  },
  {
    id: '4',
    name: '赵六',
    age: 30,
    address: '深圳市南山区科技园101号',
    company: '金融科技公司',
    email: 'zhaoliu@example.com',
    phone: '13800138003',
    department: '运营部'
  },
  {
    id: '5',
    name: '钱七',
    age: 27,
    address: '杭州市西湖区文三路202号',
    company: '电商平台',
    email: 'qianqi@example.com',
    phone: '13800138004',
    department: '市场部'
  }
])
</script>
```

:::

## 固定右侧列

通过设置列的 `fixed: 'right'` 来固定右侧列。

:::demo

```vue
<template>
  <XTable 
    :columns="fixedRightColumns" 
    :dataSource="dataSource"
    height="400px"
  >
    <template #action="{ record }">
      <div style="display: flex; gap: 8px;">
        <XButton size="small" type="text" @click="handleEdit(record)">编辑</XButton>
        <XButton size="small" type="text" @click="handleDelete(record)">删除</XButton>
      </div>
    </template>
  </XTable>
</template>

<script setup>
import { ref } from 'vue'

const fixedRightColumns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'address', title: '地址', dataIndex: 'address' },  // 自动铺满
  { key: 'company', title: '公司', dataIndex: 'company' },  // 自动铺满
  { key: 'email', title: '邮箱', dataIndex: 'email' },  // 自动铺满
  { key: 'phone', title: '电话', dataIndex: 'phone', width: '130px' },
  { key: 'action', title: '操作', dataIndex: 'action', width: '120px', fixed: 'right', slot: 'action' }
])

const dataSource = ref([
  {
    id: '1',
    name: '张三',
    age: 28,
    address: '北京市朝阳区建国路123号',
    company: '科技有限公司',
    email: 'zhangsan@example.com',
    phone: '13800138000'
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    address: '上海市浦东新区世纪大道456号',
    company: '互联网公司',
    email: 'lisi@example.com',
    phone: '13800138001'
  },
  {
    id: '3',
    name: '王五',
    age: 25,
    address: '广州市天河区珠江新城789号',
    company: '设计工作室',
    email: 'wangwu@example.com',
    phone: '13800138002'
  }
])

const handleEdit = (record) => {
  console.log('编辑:', record)
}

const handleDelete = (record) => {
  console.log('删除:', record)
}
</script>
```

:::

## 固定左右列

同时固定左右两侧的列。

:::demo

```vue
<template>
  <XTable 
    :columns="fixedBothColumns" 
    :dataSource="dataSource"
    height="400px"
  >
    <template #status="{ value }">
      <span 
        :style="{
          padding: '2px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          background: value === 'active' ? '#e8f5e9' : value === 'inactive' ? '#ffebee' : '#fff3e0',
          color: value === 'active' ? '#2e7d32' : value === 'inactive' ? '#c62828' : '#ef6c00'
        }"
      >
        {{ value === 'active' ? '在职' : value === 'inactive' ? '离职' : '待入职' }}
      </span>
    </template>

    <template #action="{ record }">
      <div style="display: flex; gap: 6px;">
        <XButton size="small" type="text" @click="handleView(record)">查看</XButton>
        <XButton size="small" type="text" @click="handleEdit(record)">编辑</XButton>
      </div>
    </template>
  </XTable>
</template>

<script setup>
import { ref } from 'vue'

const fixedBothColumns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '60px', fixed: 'left' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px', fixed: 'left' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '100px' },
  { key: 'address', title: '地址', dataIndex: 'address' },  // 自动铺满
  { key: 'company', title: '公司', dataIndex: 'company' },  // 自动铺满
  { key: 'email', title: '邮箱', dataIndex: 'email' },  // 自动铺满
  { key: 'phone', title: '电话', dataIndex: 'phone', width: '130px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '100px' },
  { key: 'status', title: '状态', dataIndex: 'status', width: '80px', fixed: 'right', slot: 'status' },
  { key: 'action', title: '操作', dataIndex: 'action', width: '220px', fixed: 'right', slot: 'action' }
])

const dataSource = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    name: `员工${i + 1}`,
    age: 25 + (i % 10),
    address: ['北京市朝阳区', '上海市浦东新区', '广州市天河区', '深圳市南山区'][i % 4] + '某某街道123号',
    company: ['科技公司', '互联网公司', '金融公司', '设计公司'][i % 4],
    email: `user${i + 1}@example.com`,
    phone: `138001380${String(i).padStart(2, '0')}`,
    department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    status: i % 3 === 0 ? 'active' : i % 3 === 1 ? 'inactive' : 'pending'
  }))
)

const handleView = (record) => {
  console.log('查看:', record)
}

const handleEdit = (record) => {
  console.log('编辑:', record)
}
</script>
```

:::

## 加载状态

显示加载状态的表格。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <XButton @click="toggleLoading">切换加载状态</XButton>
    </div>
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      :loading="loading"
      loadingText="数据加载中..."
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'address', title: '地址', dataIndex: 'address' },  // 自动铺满
  { key: 'email', title: '邮箱', dataIndex: 'email' }  // 自动铺满
])

const dataSource = ref([
  {
    id: '1',
    name: '张三',
    age: 28,
    address: '北京市朝阳区',
    email: 'zhangsan@example.com'
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    address: '上海市浦东新区',
    email: 'lisi@example.com'
  }
])

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
```

:::

## 空状态

没有数据时显示的空状态。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="[]"
    emptyText="暂无数据"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'address', title: '地址', dataIndex: 'address' }  // 自动铺满
])
</script>
```

:::

## 自定义单元格

通过插槽自定义单元格内容。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="dataSource"
  >
    <template #avatar="{ record }">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div 
          :style="{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600'
          }"
        >
          {{ record.name.charAt(0) }}
        </div>
        <span style="font-weight: 500;">{{ record.name }}</span>
      </div>
    </template>

    <template #progress="{ value }">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div 
          :style="{
            flex: 1,
            height: '6px',
            background: '#f0f0f0',
            borderRadius: '3px',
            overflow: 'hidden'
          }"
        >
          <div 
            :style="{
              width: value + '%',
              height: '100%',
              background: 'linear-gradient(90deg, #007aff 0%, #0051d5 100%)',
              transition: 'width 0.3s ease',
              borderRadius: '3px'
            }"
          ></div>
        </div>
        <span style="fontSize: '12px'; color: #666; minWidth: '35px;">{{ value }}%</span>
      </div>
    </template>

    <template #tags="{ value }">
      <div style="display: flex; gap: 4px; flexWrap: 'wrap';">
        <span 
          v-for="tag in value" 
          :key="tag"
          :style="{
            padding: '2px 8px',
            fontSize: '12px',
            borderRadius: '4px',
            background: '#f0f0f0',
            color: '#333'
          }"
        >
          {{ tag }}
        </span>
      </div>
    </template>
  </XTable>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '成员', dataIndex: 'name', width: '150px', slot: 'avatar' },
  { key: 'progress', title: '进度', dataIndex: 'progress', slot: 'progress' },  // 自动铺满
  { key: 'tags', title: '标签', dataIndex: 'tags', slot: 'tags' },  // 自动铺满
  { key: 'status', title: '状态', dataIndex: 'status', width: '100px' }
])

const dataSource = ref([
  {
    id: '1',
    name: '张三',
    progress: 85,
    tags: ['前端', 'React', 'Vue'],
    status: '进行中'
  },
  {
    id: '2',
    name: '李四',
    progress: 60,
    tags: ['后端', 'Node.js', 'Python'],
    status: '进行中'
  },
  {
    id: '3',
    name: '王五',
    progress: 95,
    tags: ['设计', 'UI', 'UX'],
    status: '已完成'
  },
  {
    id: '4',
    name: '赵六',
    progress: 40,
    tags: ['测试', '自动化'],
    status: '进行中'
  }
])
</script>
```

:::

## 可编辑单元格

双击单元格进行编辑，按回车保存或按ESC取消。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="dataSource"
    @cell-edit="handleCellEdit"
    height="400px"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', editable: true, width: '120px' },
  { key: 'age', title: '年龄', dataIndex: 'age', editable: true, width: '100px' },
  { key: 'email', title: '邮箱', dataIndex: 'email', editable: true, width: '200px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '120px' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, email: 'zhangsan@example.com', department: '技术部' },
  { id: '2', name: '李四', age: 32, email: 'lisi@example.com', department: '产品部' },
  { id: '3', name: '王五', age: 25, email: 'wangwu@example.com', department: '设计部' },
  { id: '4', name: '赵六', age: 30, email: 'zhaoliu@example.com', department: '技术部' },
  { id: '5', name: '钱七', age: 27, email: 'qianqi@example.com', department: '产品部' }
])

const handleCellEdit = (record, column, value) => {
  // 更新数据
  record[column.dataIndex] = value
  console.log('编辑完成:', { record, column: column.dataIndex, value })
  xlMsg.success(`已更新 ${column.title} 为: ${value}`)
}
</script>
```

:::

## API数据加载

使用公开API加载真实数据，展示loading状态。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <XButton type="primary" @click="loadData" :loading="loading">
        {{ loading ? '加载中...' : '加载数据' }}
      </XButton>
      <XButton @click="clearData" style="margin-left: 8px;">清空数据</XButton>
    </div>
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      :loading="loading"
      loading-text="正在加载用户数据..."
      height="500px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', width: '120px' },
  { key: 'email', title: '邮箱', dataIndex: 'email', width: '200px', editable: true },
  { key: 'phone', title: '电话', dataIndex: 'phone', width: '150px' },
  { key: 'company', title: '公司', dataIndex: 'company', width: '180px' },
  { key: 'city', title: '城市', dataIndex: 'city', width: '120px' }
])

const dataSource = ref([])
const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    // 使用 JSONPlaceholder 公开API
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    
    // 转换数据格式
    dataSource.value = users.map(user => ({
      id: String(user.id),
      name: user.name,
      email: user.email,
      phone: user.phone,
      company: user.company.name,
      city: user.address.city
    }))
    
    xlMsg.success(`成功加载 ${users.length} 条数据`)
  } catch (error) {
    console.error('加载失败:', error)
    xlMsg.error('数据加载失败')
  } finally {
    loading.value = false
  }
}

const clearData = () => {
  dataSource.value = []
  xlMsg.info('已清空数据')
}

// 自动加载数据
loadData()
</script>
```

:::

## 表格尺寸

通过 `size` 属性设置表格尺寸，支持 `large`、`default`、`small` 三种尺寸。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4>Large 大号</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        size="large"
        height="300px"
      />
    </div>
    
    <div>
      <h4>Default 默认</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        size="default"
        height="300px"
      />
    </div>
    
    <div>
      <h4>Small 紧凑</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        size="small"
        height="300px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age' },
  { key: 'address', title: '地址', dataIndex: 'address' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 32, address: '上海市浦东新区' },
  { id: '3', name: '王五', age: 25, address: '广州市天河区' }
])
</script>
```

:::

## 条纹表格

设置 `stripe` 属性可以创建斑马纹表格，提升可读性。可以通过 CSS 变量自定义斑马纹颜色。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- 默认斑马纹 -->
    <div>
      <h4>默认斑马纹</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        stripe
        height="300px"
      />
    </div>
    
    <!-- 自定义斑马纹颜色 -->
    <div>
      <h4>自定义斑马纹颜色</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        stripe
        height="300px"
        style="--x-table-stripe-bg: #f0f9ff; --x-table-stripe-hover-bg: #e0f2fe;"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'department', title: '部门', dataIndex: 'department' },  // 自适应宽度
  { key: 'position', title: '职位', dataIndex: 'position' },  // 自适应宽度
  { key: 'salary', title: '薪资', dataIndex: 'salary', width: '120px' }
])

const dataSource = ref(
  Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    name: `员工${i + 1}`,
    department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
    position: ['工程师', '产品经理', '设计师', '运营专员'][i % 4],
    salary: `${(10 + i) * 1000}元`
  }))
)
</script>
```

:::

## 列对齐方式

通过列配置的 `align` 属性设置对齐方式，支持 `left`、`center`、`right`。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="dataSource"
    height="350px"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { 
    key: 'id', 
    title: 'ID', 
    dataIndex: 'id', 
    width: '80px',
    align: 'center'  // 居中对齐
  },
  { 
    key: 'name', 
    title: '姓名', 
    dataIndex: 'name', 
    width: '100px',
    align: 'left'  // 左对齐（默认）
  },
  { 
    key: 'department', 
    title: '部门', 
    dataIndex: 'department',
    align: 'left'  // 左对齐
  },
  { 
    key: 'salary', 
    title: '薪资', 
    dataIndex: 'salary', 
    width: '120px',
    align: 'right'  // 右对齐（适合数字）
  },
  { 
    key: 'status', 
    title: '状态', 
    dataIndex: 'status', 
    width: '100px',
    align: 'center'  // 居中对齐
  }
])

const dataSource = ref([
  { id: '1', name: '张三', department: '技术部', salary: '15000', status: '在职' },
  { id: '2', name: '李四', department: '产品部', salary: '18000', status: '在职' },
  { id: '3', name: '王五', department: '设计部', salary: '12000', status: '离职' },
  { id: '4', name: '赵六', department: '运营部', salary: '14000', status: '在职' },
  { id: '5', name: '钱七', department: '技术部', salary: '20000', status: '在职' },
  { id: '6', name: '孙八', department: '市场部', salary: '16000', status: '在职' },
  { id: '7', name: '周九', department: '人力资源部', salary: '13000', status: '在职' }
])
</script>
```

:::

## 边框样式

通过 `border` 属性设置边框样式，支持 `none`、`horizontal`、`vertical`、`all`。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h4>Horizontal 横向边框（默认）</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        border="horizontal"
      />
    </div>
    
    <div>
      <h4>Vertical 纵向边框</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        border="vertical"
      />
    </div>
    
    <div>
      <h4>All 全边框</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        border="all"
      />
    </div>
    
    <div>
      <h4>None 无边框</h4>
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        border="none"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age' },
  { key: 'address', title: '地址', dataIndex: 'address' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, address: '北京市朝阳区' },
  { id: '2', name: '李四', age: 32, address: '上海市浦东新区' }
])
</script>
```

:::

## 行选择

通过 `row-selection` 属性启用行选择功能。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      已选择: {{ selectedRowKeys.length }} 项
      <XButton 
        v-if="selectedRowKeys.length > 0" 
        size="small" 
        type="text" 
        @click="handleClearSelection"
        style="margin-left: 8px;"
      >
        清空选择
      </XButton>
    </div>
    
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      @selection-change="handleSelectionChange"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'age', title: '年龄', dataIndex: 'age' },
  { key: 'department', title: '部门', dataIndex: 'department' },
  { key: 'email', title: '邮箱', dataIndex: 'email' }
])

const dataSource = ref(
  Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    name: `员工${i + 1}`,
    age: 25 + i,
    department: ['技术部', '产品部', '设计部'][i % 3],
    email: `user${i + 1}@example.com`
  }))
)

const selectedRowKeys = ref([])

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  console.log('选中的行:', rows)
}

const handleClearSelection = () => {
  selectedRowKeys.value = []
}
</script>
```

:::

## 跨页选择

启用 `preserve-selected-row-keys` 属性后，在分页场景下可以保留不同页面的选择状态。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
      <div>
        <strong>当前页已选:</strong> {{ currentPageSelected.length }} 项
      </div>
      <div>
        <strong>其他页已选:</strong> {{ otherPageSelected.length }} 项
      </div>
      <div>
        <strong>总共已选:</strong> {{ selectedRowKeys.length }} 项
      </div>
      <XButton 
        v-if="selectedRowKeys.length > 0" 
        size="small" 
        type="text" 
        @click="handleClearAll"
      >
        清空所有选择
      </XButton>
    </div>
    
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <XButton size="small" @click="handlePrevPage" :disabled="currentPage === 1">
        上一页
      </XButton>
      <span style="padding: 0 16px; line-height: 28px;">
        第 {{ currentPage }} / {{ totalPages }} 页
      </span>
      <XButton size="small" @click="handleNextPage" :disabled="currentPage === totalPages">
        下一页
      </XButton>
      <div style="margin-left: auto; display: flex; gap: 8px;">
        <XButton size="small" @click="handleSelectCurrentPage">全选当前页</XButton>
        <XButton size="small" @click="handleClearCurrentPage">清空当前页</XButton>
      </div>
    </div>
    
    <XTable 
      ref="tableRef"
      :columns="columns" 
      :dataSource="currentPageData"
      row-selection
      preserve-selected-row-keys
      :selected-row-keys="selectedRowKeys"
      @selection-change="handleSelectionChange"
      height="400px"
    />
    
    <div v-if="selectedRowKeys.length > 0" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
      <div style="font-weight: 600; margin-bottom: 8px;">已选择的ID：</div>
      <div style="display: flex; gap: 4px; flex-wrap: wrap;">
        <span 
          v-for="id in selectedRowKeys" 
          :key="id"
          style="padding: 2px 8px; background: white; border-radius: 4px; font-size: 12px;"
        >
          {{ id }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tableRef = ref()
const currentPage = ref(1)
const pageSize = 10

// 模拟总数据
const allData = Array.from({ length: 35 }, (_, i) => ({
  id: `${i + 1}`,
  name: `员工${i + 1}`,
  age: 25 + (i % 15),
  department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
  email: `user${i + 1}@example.com`
}))

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'department', title: '部门', dataIndex: 'department' },
  { key: 'email', title: '邮箱', dataIndex: 'email' }
])

// 当前页数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allData.slice(start, end)
})

const totalPages = computed(() => Math.ceil(allData.length / pageSize))

const selectedRowKeys = ref(['2', '5', '12', '18', '25'])

// 当前页选中的行
const currentPageSelected = computed(() => {
  return tableRef.value?.getCurrentPageSelectedRowKeys() || []
})

// 其他页选中的行
const otherPageSelected = computed(() => {
  return tableRef.value?.getOtherPageSelectedRowKeys() || []
})

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  console.log('选中变化:', { 
    总数: keys.length, 
    当前页: currentPageSelected.value.length,
    其他页: otherPageSelected.value.length
  })
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const handleClearAll = () => {
  tableRef.value?.clearSelection()
}

const handleSelectCurrentPage = () => {
  tableRef.value?.selectCurrentPage()
}

const handleClearCurrentPage = () => {
  tableRef.value?.clearCurrentPageSelection()
}
</script>
```

:::

## 禁用行选择

通过 `get-checkbox-props` 函数可以设置某些行不可选择,适用于需要根据业务逻辑禁用特定行的场景。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae7ff;">
        <div style="font-weight: 600; margin-bottom: 8px; color: #1890ff;">💡 说明：</div>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>状态为"已锁定"的行不可选择</li>
          <li>禁用的行显示灰色复选框，不响应点击</li>
          <li>全选操作会自动跳过禁用的行</li>
        </ul>
      </div>
    </div>
    
    <div style="margin-bottom: 16px;">
      已选择: <strong style="color: #1890ff;">{{ selectedRowKeys.length }}</strong> 项
      <XButton 
        v-if="selectedRowKeys.length > 0" 
        size="small" 
        type="text" 
        @click="handleClearSelection"
        style="margin-left: 8px;"
      >
        清空选择
      </XButton>
    </div>
    
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      :get-checkbox-props="getCheckboxProps"
      @selection-change="handleSelectionChange"
      height="450px"
    />
    
    <div v-if="selectedRowKeys.length > 0" style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 8px;">
      <div style="font-weight: 600; margin-bottom: 8px;">已选择的员工：</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span 
          v-for="key in selectedRowKeys" 
          :key="key"
          style="padding: 4px 12px; background: white; border-radius: 4px; font-size: 14px; border: 1px solid #d9d9d9;"
        >
          {{ dataSource.find(d => d.id === key)?.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '120px' },
  { key: 'status', title: '状态', dataIndex: 'status', width: '100px' },
  { key: 'email', title: '邮箱', dataIndex: 'email' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, department: '技术部', status: '正常', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', age: 32, department: '产品部', status: '已锁定', email: 'lisi@example.com' },
  { id: '3', name: '王五', age: 25, department: '设计部', status: '正常', email: 'wangwu@example.com' },
  { id: '4', name: '赵六', age: 30, department: '技术部', status: '正常', email: 'zhaoliu@example.com' },
  { id: '5', name: '钱七', age: 27, department: '产品部', status: '已锁定', email: 'qianqi@example.com' },
  { id: '6', name: '孙八', age: 29, department: '设计部', status: '正常', email: 'sunba@example.com' },
  { id: '7', name: '周九', age: 31, department: '运营部', status: '正常', email: 'zhoujiu@example.com' },
  { id: '8', name: '吴十', age: 26, department: '技术部', status: '已锁定', email: 'wushi@example.com' },
  { id: '9', name: '郑十一', age: 33, department: '市场部', status: '正常', email: 'zhengshiyi@example.com' },
  { id: '10', name: '王十二', age: 28, department: '设计部', status: '正常', email: 'wangshier@example.com' }
])

const selectedRowKeys = ref(['1', '3'])

// 设置 checkbox 属性，禁用状态为"已锁定"的行
const getCheckboxProps = (record) => {
  return {
    disabled: record.status === '已锁定'
  }
}

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  console.log('选中的行:', rows)
}

const handleClearSelection = () => {
  selectedRowKeys.value = []
}
</script>
```

:::

## 根据 ID 禁用特定行

通过 `get-checkbox-props` 函数可以根据 ID 或其他条件禁用特定行的选择。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; align-items: center; gap: 16px;">
      <span>已选择: <strong style="color: #1890ff;">{{ selectedRowKeys.length }}</strong> 项</span>
      <XButton 
        v-if="selectedRowKeys.length > 0" 
        size="small" 
        type="text" 
        @click="selectedRowKeys = []"
      >
        清空选择
      </XButton>
    </div>
    
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      :get-checkbox-props="getCheckboxProps"
      @selection-change="handleSelectionChange"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '120px' },
  { key: 'email', title: '邮箱', dataIndex: 'email' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, department: '技术部', email: 'zhangsan@example.com' },
  { id: '2', name: '李四', age: 32, department: '产品部', email: 'lisi@example.com' },
  { id: '3', name: '王五', age: 25, department: '设计部', email: 'wangwu@example.com' },
  { id: '4', name: '赵六', age: 30, department: '技术部', email: 'zhaoliu@example.com' },
  { id: '5', name: '钱七', age: 27, department: '产品部', email: 'qianqi@example.com' },
  { id: '6', name: '孙八', age: 29, department: '设计部', email: 'sunba@example.com' },
  { id: '7', name: '周九', age: 31, department: '运营部', email: 'zhoujiu@example.com' },
  { id: '8', name: '吴十', age: 26, department: '技术部', email: 'wushi@example.com' },
  { id: '9', name: '郑十一', age: 33, department: '市场部', email: 'zhengshiyi@example.com' },
  { id: '10', name: '王十二', age: 28, department: '设计部', email: 'wangshier@example.com' }
])

const selectedRowKeys = ref(['1', '3'])

// 禁用指定 ID 的行
const disabledIds = ['2', '5', '8']
const getCheckboxProps = (record) => {
  return {
    disabled: disabledIds.includes(record.id)
  }
}

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  console.log('选中的行:', rows)
}
</script>
```

:::

## 根据多个条件禁用

根据业务逻辑组合多个条件来禁用行选择。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px;">
      <div style="padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae7ff;">
        <div style="font-weight: 600; margin-bottom: 8px; color: #1890ff;">💡 禁用规则：</div>
        <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>状态为"已离职"的员工不可选择</li>
          <li>余额低于 100 的不可选择</li>
          <li>满足任一条件即禁用</li>
        </ul>
      </div>
    </div>
    
    <div style="margin-bottom: 16px;">
      已选择: <strong style="color: #1890ff;">{{ selectedRowKeys.length }}</strong> 项
    </div>
    
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      :get-checkbox-props="getCheckboxProps"
      @selection-change="(keys) => selectedRowKeys = keys"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'status', title: '状态', dataIndex: 'status', width: '100px' },
  { key: 'balance', title: '余额', dataIndex: 'balance', width: '100px' },
  { key: 'department', title: '部门', dataIndex: 'department' }
])

const dataSource = ref([
  { id: '1', name: '张三', status: '在职', balance: 500, department: '技术部' },
  { id: '2', name: '李四', status: '已离职', balance: 200, department: '产品部' },
  { id: '3', name: '王五', status: '在职', balance: 50, department: '设计部' },
  { id: '4', name: '赵六', status: '在职', balance: 300, department: '技术部' },
  { id: '5', name: '钱七', status: '已离职', balance: 150, department: '产品部' },
  { id: '6', name: '孙八', status: '在职', balance: 80, department: '设计部' },
  { id: '7', name: '周九', status: '在职', balance: 600, department: '运营部' },
  { id: '8', name: '吴十', status: '在职', balance: 250, department: '技术部' }
])

const selectedRowKeys = ref(['1', '4'])

// 根据多个条件禁用：已离职 或 余额不足
const getCheckboxProps = (record) => {
  return {
    disabled: record.status === '已离职' || record.balance < 100
  }
}
</script>
```

:::

## 优化性能：只返回IDs不返回行数据

在某些场景下，你可能只需要选中行的 ID 集合，不需要完整的行数据。可以通过设置 `return-selected-rows` 为 `false` 来优化性能，特别是在数据量大或跨页选择时。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; padding: 12px; background: #f0f9ff; border-radius: 8px; border: 1px solid #bae7ff;">
      <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
        <li><code>return-selected-rows="false"</code>: selectionChange 事件只返回 IDs，rows 为空数组 []</li>
        <li><code>return-selected-rows="true"</code> (默认): 返回完整的行数据（支持跨页）</li>
        <li>当只需要 IDs 时，设置为 false 可以避免不必要的数据处理和内存占用</li>
      </ul>
    </div>
    
    <div style="margin-bottom: 16px; display: flex; gap: 12px; align-items: center;">
      <XButton 
        :type="returnRows ? 'default' : 'primary'"
        @click="returnRows = false"
        size="small"
      >
        只返回IDs（优化性能）
      </XButton>
      <XButton 
        :type="returnRows ? 'primary' : 'default'"
        @click="returnRows = true"
        size="small"
      >
        返回完整行数据（默认）
      </XButton>
    </div>
    
    <div style="margin-bottom: 16px; padding: 12px; background: #f6ffed; border-radius: 8px; border: 1px solid #b7eb8f;">
      <div style="font-weight: 600; color: #52c41a; margin-bottom: 8px;">
        当前模式: {{ returnRows ? '返回完整行数据' : '只返回IDs' }}
      </div>
      <div style="font-size: 13px; color: #666;">
        已选择: <strong style="color: #1890ff;">{{ selectedRowKeys.length }}</strong> 项
      </div>
    </div>
    
    <div style="margin-bottom: 16px; display: flex; gap: 8px;">
      <XButton size="small" @click="handlePrevPage" :disabled="currentPage === 1">
        上一页
      </XButton>
      <span style="padding: 0 16px; line-height: 28px;">
        第 {{ currentPage }} / {{ totalPages }} 页
      </span>
      <XButton size="small" @click="handleNextPage" :disabled="currentPage === totalPages">
        下一页
      </XButton>
    </div>
    
    <XTable 
      ref="tableRef"
      :columns="columns" 
      :dataSource="currentPageData"
      row-selection
      preserve-selected-row-keys
      :selected-row-keys="selectedRowKeys"
      :return-selected-rows="returnRows"
      @selection-change="handleSelectionChange"
      height="400px"
    />
    
    <div v-if="lastEventData" style="margin-top: 16px; padding: 12px; background: #fff7e6; border-radius: 8px; border: 1px solid #ffd591;">
      <div style="font-weight: 600; margin-bottom: 8px; color: #fa8c16;">最后一次 selectionChange 事件数据：</div>
      <div style="font-size: 13px; font-family: monospace; white-space: pre-wrap; color: #333;">{{ lastEventData }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tableRef = ref()
const currentPage = ref(1)
const pageSize = 10
const returnRows = ref(false) // 默认为 false 展示性能优化模式

// 模拟大量数据
const allData = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `员工${i + 1}`,
  age: 25 + (i % 15),
  department: ['技术部', '产品部', '设计部', '运营部'][i % 4],
  email: `user${i + 1}@example.com`
}))

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'age', title: '年龄', dataIndex: 'age', width: '80px' },
  { key: 'department', title: '部门', dataIndex: 'department' },
  { key: 'email', title: '邮箱', dataIndex: 'email' }
])

// 当前页数据
const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allData.slice(start, end)
})

const totalPages = computed(() => Math.ceil(allData.length / pageSize))

const selectedRowKeys = ref(['2', '5', '15', '28', '35'])
const lastEventData = ref(null)

const handleSelectionChange = (keys, rows) => {
  selectedRowKeys.value = keys
  
  // 展示事件返回的数据
  lastEventData.value = `IDs (${keys.length}个): [${keys.slice(0, 5).join(', ')}${keys.length > 5 ? '...' : ''}]\n\nRows (${rows.length}个): ${returnRows.value ? JSON.stringify(rows.slice(0, 2), null, 2) : '[]'}`
  
  console.log('选中的IDs:', keys)
  console.log('选中的行数据:', rows)
}

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
```

:::

## 动态禁用规则

通过响应式变量动态控制禁用规则，实现可切换的禁用逻辑。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
      <XButton 
        :type="disableMode === 'none' ? 'primary' : 'default'"
        @click="disableMode = 'none'"
        size="small"
      >
        不禁用
      </XButton>
      <XButton 
        :type="disableMode === 'even' ? 'primary' : 'default'"
        @click="disableMode = 'even'"
        size="small"
      >
        禁用偶数ID
      </XButton>
      <XButton 
        :type="disableMode === 'odd' ? 'primary' : 'default'"
        @click="disableMode = 'odd'"
        size="small"
      >
        禁用奇数ID
      </XButton>
      <XButton 
        :type="disableMode === 'tech' ? 'primary' : 'default'"
        @click="disableMode = 'tech'"
        size="small"
      >
        禁用技术部
      </XButton>
    </div>
    
    <div style="margin-bottom: 16px; padding: 12px; background: #f6ffed; border-radius: 8px; border: 1px solid #b7eb8f;">
      <div style="font-weight: 600; color: #52c41a;">
        当前模式: {{ modeText }}
      </div>
    </div>
    
    <div style="margin-bottom: 16px;">
      已选择: <strong style="color: #1890ff;">{{ selectedRowKeys.length }}</strong> 项
    </div>
    
    <XTable 
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      :get-checkbox-props="getCheckboxProps"
      @selection-change="(keys) => selectedRowKeys = keys"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const disableMode = ref('none')

const modeText = computed(() => {
  const map = {
    none: '不禁用任何行',
    even: '禁用偶数ID的行 (2, 4, 6, 8, 10)',
    odd: '禁用奇数ID的行 (1, 3, 5, 7, 9)',
    tech: '禁用技术部的所有员工'
  }
  return map[disableMode.value]
})

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '100px' },
  { key: 'department', title: '部门', dataIndex: 'department', width: '120px' },
  { key: 'position', title: '职位', dataIndex: 'position' }
])

const dataSource = ref([
  { id: '1', name: '张三', department: '技术部', position: '前端工程师' },
  { id: '2', name: '李四', department: '产品部', position: '产品经理' },
  { id: '3', name: '王五', department: '设计部', position: 'UI设计师' },
  { id: '4', name: '赵六', department: '技术部', position: '后端工程师' },
  { id: '5', name: '钱七', department: '产品部', position: '产品助理' },
  { id: '6', name: '孙八', department: '设计部', position: 'UX设计师' },
  { id: '7', name: '周九', department: '运营部', position: '运营专员' },
  { id: '8', name: '吴十', department: '技术部', position: '测试工程师' },
  { id: '9', name: '郑十一', department: '市场部', position: '市场专员' },
  { id: '10', name: '王十二', department: '设计部', position: '平面设计师' }
])

const selectedRowKeys = ref([])

// 动态禁用规则
const getCheckboxProps = (record) => {
  if (disableMode.value === 'none') {
    return { disabled: false }
  }
  
  if (disableMode.value === 'even') {
    return { disabled: parseInt(record.id) % 2 === 0 }
  }
  
  if (disableMode.value === 'odd') {
    return { disabled: parseInt(record.id) % 2 === 1 }
  }
  
  if (disableMode.value === 'tech') {
    return { disabled: record.department === '技术部' }
  }
  
  return { disabled: false }
}
</script>
```

:::


## 排序功能

在列配置中设置 `sortable: true` 启用排序功能。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="sortedData"
    @sort-change="handleSortChange"
    height="400px"
  />
</template>

<script setup>
import { ref, computed } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
  { key: 'age', title: '年龄', dataIndex: 'age', sortable: true },
  { key: 'score', title: '分数', dataIndex: 'score', sortable: true },
  { key: 'department', title: '部门', dataIndex: 'department' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, score: 85, department: '技术部' },
  { id: '2', name: '李四', age: 32, score: 92, department: '产品部' },
  { id: '3', name: '王五', age: 25, score: 78, department: '设计部' },
  { id: '4', name: '赵六', age: 30, score: 88, department: '技术部' },
  { id: '5', name: '钱七', age: 27, score: 95, department: '产品部' },
  { id: '6', name: '孙八', age: 29, score: 82, department: '设计部' }
])

const sortState = ref({ column: null, order: null })

const sortedData = computed(() => {
  if (!sortState.value.column || !sortState.value.order) {
    return dataSource.value
  }
  
  const { column, order } = sortState.value
  const sorted = [...dataSource.value].sort((a, b) => {
    const aVal = a[column.dataIndex]
    const bVal = b[column.dataIndex]
    
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return order === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    return order === 'asc' 
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })
  
  return sorted
})

const handleSortChange = (column, order) => {
  sortState.value = { column, order }
  console.log('排序:', column.title, order)
}
</script>
```

:::

## 对齐方式

通过列配置的 `align` 属性设置列的对齐方式。

:::demo

```vue
<template>
  <XTable 
    :columns="columns" 
    :dataSource="dataSource"
  />
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name', align: 'left' },
  { key: 'age', title: '年龄', dataIndex: 'age', align: 'center' },
  { key: 'score', title: '分数', dataIndex: 'score', align: 'center' },
  { key: 'salary', title: '薪资', dataIndex: 'salary', align: 'right' }
])

const dataSource = ref([
  { id: '1', name: '张三', age: 28, score: 85, salary: '¥10,000' },
  { id: '2', name: '李四', age: 32, score: 92, salary: '¥15,000' },
  { id: '3', name: '王五', age: 25, score: 78, salary: '¥8,000' }
])
</script>
```

:::

## 无障碍支持

表格组件完全支持无障碍访问，包括色盲模式和高对比度模式。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px;">
      <XButton 
        size="small" 
        :type="colorblindMode === null ? 'primary' : 'default'"
        @click="colorblindMode = null"
      >
        正常模式
      </XButton>
      <XButton 
        size="small" 
        :type="colorblindMode === 'protanopia' ? 'primary' : 'default'"
        @click="colorblindMode = 'protanopia'"
      >
        红色盲
      </XButton>
      <XButton 
        size="small" 
        :type="colorblindMode === 'deuteranopia' ? 'primary' : 'default'"
        @click="colorblindMode = 'deuteranopia'"
      >
        绿色盲
      </XButton>
      <XButton 
        size="small" 
        :type="colorblindMode === 'tritanopia' ? 'primary' : 'default'"
        @click="colorblindMode = 'tritanopia'"
      >
        蓝黄色盲
      </XButton>
      <XButton 
        size="small" 
        :type="contrastMode === 'high' ? 'primary' : 'default'"
        @click="contrastMode = contrastMode === 'high' ? null : 'high'"
      >
        高对比度
      </XButton>
    </div>
    
    <div 
      :data-colorblind="colorblindMode"
      :data-contrast="contrastMode"
    >
      <XTable 
        :columns="columns" 
        :dataSource="dataSource"
        row-selection
        :selected-row-keys="selectedRowKeys"
        @selection-change="(keys) => selectedRowKeys = keys"
        height="400px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colorblindMode = ref(null)
const contrastMode = ref(null)
const selectedRowKeys = ref(['1', '3'])

const columns = ref([
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'status', title: '状态', dataIndex: 'status' },
  { key: 'score', title: '分数', dataIndex: 'score' }
])

const dataSource = ref([
  { id: '1', name: '张三', status: '活跃', score: 85 },
  { id: '2', name: '李四', status: '正常', score: 92 },
  { id: '3', name: '王五', status: '活跃', score: 78 },
  { id: '4', name: '赵六', status: '正常', score: 88 }
])
</script>
```

:::

## 实例方法

通过 ref 可以访问表格实例方法，进行更灵活的控制。

:::demo

```vue
<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 12px;">
      <XButton size="small" @click="handleClearSelection">清空选择</XButton>
      <XButton size="small" @click="handleSelectFirst">选中前3项</XButton>
      <XButton size="small" @click="handleScrollToTop">滚动到顶部</XButton>
      <XButton size="small" @click="handleScrollToBottom">滚动到底部</XButton>
      <XButton size="small" @click="handleRefresh">刷新表格</XButton>
    </div>
    
    <XTable 
      ref="tableRef"
      :columns="columns" 
      :dataSource="dataSource"
      row-selection
      :selected-row-keys="selectedRowKeys"
      @selection-change="(keys) => selectedRowKeys = keys"
      height="400px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableRef = ref()
const selectedRowKeys = ref([])

const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: '姓名', dataIndex: 'name' },
  { key: 'department', title: '部门', dataIndex: 'department' }
])

const dataSource = ref(
  Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: `员工${i + 1}`,
    department: ['技术部', '产品部', '设计部'][i % 3]
  }))
)

const handleClearSelection = () => {
  tableRef.value?.clearSelection()
}

const handleSelectFirst = () => {
  tableRef.value?.setSelectedRows(['1', '2', '3'])
}

const handleScrollToTop = () => {
  tableRef.value?.scrollToTop()
}

const handleScrollToBottom = () => {
  tableRef.value?.scrollToBottom()
}

const handleRefresh = () => {
  tableRef.value?.refresh()
}
</script>
```

:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | `Column[]` | `[]` |
| dataSource | 数据源 | `any[]` | `[]` |
| rowKey | 行唯一键 | `string` | `'id'` |
| height | 表格高度 | `string` | `'600px'` |
| loading | 加载状态 | `boolean` | `false` |
| loadingText | 加载提示文字 | `string` | `'加载中...'` |
| emptyText | 空数据提示文字 | `string` | `'暂无数据'` |
| size | 表格尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| stripe | 是否显示斑马纹 | `boolean` | `false` |
| border | 边框样式 | `'none' \| 'horizontal' \| 'vertical' \| 'all'` | `'horizontal'` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| rowSelection | 是否可选择行 | `boolean` | `false` |
| selectedRowKeys | 已选择的行键 | `(string \| number)[]` | `[]` |
| highlightHoverRow | 悬停行高亮 | `boolean` | `true` |
| preserveSelectedRowKeys | 跨页选择（保留其他页的选择状态） | `boolean` | `false` |
| getCheckboxProps | 获取checkbox属性的函数，可设置禁用状态 | `(record: any) => { disabled?: boolean }` | - |
| returnSelectedRows | selectionChange 事件是否返回完整行数据。设为 false 可优化性能，只返回 IDs | `boolean` | `true` |

### Column 配置

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 列标识（必填） | `string` | - |
| title | 列标题（必填） | `string` | - |
| dataIndex | 数据字段名（必填） | `string` | - |
| width | 列宽度。**设置后固定宽度不伸缩；不设置则自动平分剩余空间** | `string` | - |
| minWidth | 最小列宽（仅在未设置width时生效） | `string` | `'100px'` |
| fixed | 固定列 | `'left' \| 'right'` | - |
| slot | 自定义插槽名称 | `string` | - |
| headerClass | 表头自定义类名 | `string` | - |
| cellClass | 单元格自定义类名 | `string` | - |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| sortable | 是否可排序 | `boolean` | `false` |
| editable | 是否可编辑（双击单元格编辑） | `boolean` | `false` |
| visible | 列是否可见 | `boolean` | `true` |
| tooltip | 列提示信息 | `string` | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| row-click | 行点击事件 | `(record: any, index: number)` |
| selection-change | 行选择变化事件 | `(selectedRowKeys: (string\|number)[], selectedRows: any[])` |
| sort-change | 排序变化事件 | `(column: Column, order: 'asc'\|'desc'\|null)` |
| select-all | 全选/取消全选事件 | `(selected: boolean)` |
| cell-edit | 单元格编辑事件 | `(record: any, column: Column, value: any)` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| [columnSlot] | 自定义单元格内容 | `{ record, index, value }` |

### 实例方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| clearSelection | 清空所有选择 | - | `void` |
| setSelectedRows | 设置选中的行 | `keys: (string\|number)[]` | `void` |
| scrollTo | 滚动到指定位置 | `options: { top?: number; left?: number; behavior?: ScrollBehavior }` | `void` |
| scrollToTop | 滚动到顶部 | - | `void` |
| scrollToBottom | 滚动到底部 | - | `void` |
| getSelectedRowKeys | 获取当前选中的行键 | - | `(string\|number)[]` |
| getSelectedRows | 获取当前选中的行数据 | - | `any[]` |
| refresh | 刷新表格布局 | - | `void` |
| getCurrentPageSelectedRowKeys | 获取当前页的选中行键（跨页选择） | - | `(string\|number)[]` |
| getCurrentPageSelectedRows | 获取当前页的选中行数据（跨页选择） | - | `any[]` |
| getOtherPageSelectedRowKeys | 获取其他页的选中行键（跨页选择） | - | `(string\|number)[]` |
| clearCurrentPageSelection | 清空当前页的选择（跨页选择） | - | `void` |
| selectCurrentPage | 全选当前页（跨页选择） | - | `void` |


## 最佳实践

### 1. 性能优化

**大数据场景**
```vue
<template>
  <!-- 使用固定高度 -->
  <XTable 
    :columns="columns" 
    :dataSource="largeDataSource"
    height="600px"
  />
</template>
```

**避免在 dataSource 中使用复杂对象**
```javascript
// ❌ 不推荐
const dataSource = ref([
  { id: 1, user: { profile: { name: 'John' } } }
])

// ✅ 推荐 - 扁平化数据
const dataSource = ref([
  { id: 1, userName: 'John' }
])
```

### 2. 列宽设置

**设置固定宽度以获得最佳性能**
```javascript
const columns = ref([
  { key: 'id', title: 'ID', dataIndex: 'id', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '120px' },
  // 最后一列可以不设置宽度，自动填充
  { key: 'address', title: '地址', dataIndex: 'address' }
])
```

### 3. 自定义单元格

**使用插槽自定义单元格内容**
```vue
<template>
  <XTable :columns="columns" :dataSource="dataSource">
    <template #status="{ value, record }">
      <span :style="{ color: record.online ? '#52c41a' : '#999' }">
        {{ value }}
      </span>
    </template>
  </XTable>
</template>
```

### 4. 行选择最佳实践

**使用 v-model 简化选择逻辑**
```vue
<script setup>
const selectedKeys = ref([])

// 监听选择变化
watch(selectedKeys, (keys) => {
  console.log('当前选中:', keys)
})
</script>

<template>
  <XTable 
    row-selection
    :selected-row-keys="selectedKeys"
    @selection-change="(keys) => selectedKeys = keys"
  />
</template>
```



### 5. 固定列使用建议

```javascript
// ✅ 推荐 - 固定列必须设置宽度
const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', fixed: 'left', width: '80px' },
  { key: 'name', title: '姓名', dataIndex: 'name', width: '120px' },
  { key: 'action', title: '操作', dataIndex: 'action', fixed: 'right', width: '150px' }
]
```

## 常见问题 FAQ

### 1. 表格宽度如何控制？

**Q: 表格总是占满容器宽度？**

A: 表格宽度由列宽度决定：
- 如果所有列都设置了 `width`，表格宽度 = 所有列宽度之和
- 如果部分列没有设置 `width`，这些列会根据内容自动计算宽度
- 表格会使用 `inline-flex` 布局，只占据内容所需的宽度

### 2. 固定列显示不正确？

**Q: 固定列位置错乱或不显示？**

A: 请检查：
1. 固定列必须设置 `width` 属性
2. 确保使用了 `height` 属性（固定功能需要在滚动场景下）
3. 检查是否有 CSS 冲突

```javascript
// ✅ 正确
{ key: 'id', fixed: 'left', width: '80px' }

// ❌ 错误 - 缺少 width
{ key: 'id', fixed: 'left' }
```

### 3. 如何实现单选？

**Q: 表格只支持多选吗？**

A: 可以通过监听选择事件实现单选：

```vue
<script setup>
const selectedKeys = ref([])

const handleSelectionChange = (keys) => {
  // 只保留最后一个选中项
  selectedKeys.value = keys.slice(-1)
}
</script>

<template>
  <XTable 
    row-selection
    :selected-row-keys="selectedKeys"
    @selection-change="handleSelectionChange"
  />
</template>
```

### 4. 表格滚动卡顿？

**Q: 大数据量时滚动不流畅？**

A: 优化建议：
1. 使用分页，避免一次渲染过多行
2. 设置固定列宽，避免动态计算
3. 减少自定义插槽的复杂度
4. 考虑使用虚拟滚动（需要自行实现）

### 5. 如何实现展开行？

**Q: 支持展开行功能吗？**

A: 可以通过自定义单元格实现：

```vue
<template>
  <XTable :columns="columns" :dataSource="dataSource">
    <template #expand="{ record }">
      <div v-if="expandedRows.includes(record.id)" style="padding: 12px; background: #fafafa;">
        {{ record.detail }}
      </div>
    </template>
  </XTable>
</template>
```

### 6. 排序如何实现？

**Q: 点击排序后数据没有变化？**

A: 排序需要自己处理数据：

```vue
<script setup>
const handleSortChange = (column, order) => {
  if (!order) {
    // 取消排序，恢复原始数据
    dataSource.value = originalData
  } else {
    // 排序数据
    dataSource.value = [...dataSource.value].sort((a, b) => {
      return order === 'asc' 
        ? a[column.dataIndex] - b[column.dataIndex]
        : b[column.dataIndex] - a[column.dataIndex]
    })
  }
}
</script>
```

### 7. 如何自定义空状态？

**Q: 空状态可以自定义吗？**

A: 使用 `emptyText` 属性：

```vue
<XTable 
  :dataSource="[]"
  emptyText="没有找到匹配的数据"
/>
```

### 8. 表格高度自适应？

**Q: 如何让表格高度自适应容器？**

A: 使用 CSS 变量或计算属性：

```vue
<script setup>
const tableHeight = computed(() => `${window.innerHeight - 200}px`)
</script>

<template>
  <XTable :height="tableHeight" />
</template>
```

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
