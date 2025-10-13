# Form 表单

用于数据录入和校验，支持多种验证规则和流畅的交互动画。

## 基础用法

最简单的表单示例，展示基本的表单项组合。

底部按钮在表单中自动横向填充完，所以需要做样式调整。此次改动并不影响原先按钮的块级样式。

:::demo

```vue
<template>
  <XForm :model="form" style="max-width: 600px;">
    <XFormItem label="用户名">
      <XInput v-model="form.username" placeholder="请输入用户名" />
    </XFormItem>
    <XFormItem label="邮箱">
      <XInput v-model="form.email" type="email" placeholder="请输入邮箱" />
    </XFormItem>
    <XFormItem label="密码">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    
    <template #footer>
      <XButton type="primary" @click="handleSubmit">提交</XButton>
    </template>
  </XForm>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  console.log('表单数据:', form)
  xlMsg.success('提交成功')
}
</script>
```

:::

## 表单验证

通过 `rules` 属性定义验证规则，支持必填、正则、长度等多种验证。

:::demo

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    style="max-width: 600px;"
    @submit="handleSubmit"
  >
    <XFormItem label="用户名" prop="username">
      <XInput v-model="form.username" placeholder="请输入用户名" />
    </XFormItem>
    <XFormItem label="邮箱" prop="email">
      <XInput v-model="form.email" type="email" placeholder="请输入邮箱" />
    </XFormItem>
    <XFormItem label="密码" prop="password">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    <XFormItem label="确认密码" prop="confirmPassword">
      <XInput v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
    </XFormItem>
    
    <template #footer>
      <div style="display: flex; gap: 12px;">
        <XButton type="primary">提交表单</XButton>
        <XButton type="danger" ghost @click="handleReset">重置</XButton>
      </div>
    </template>
  </XForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于 6 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { 
      validator: (value) => value === form.password, 
      message: '两次输入的密码不一致', 
      trigger: 'blur' 
    }
  ]
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    xlMsg.success('验证通过，提交成功！')
    console.log('表单数据:', form)
  } else {
    xlMsg.error('验证失败，请检查表单')
  }
}

const handleReset = () => {
  formRef.value.resetFields()
  xlMsg.info('表单已重置')
}
</script>
```

:::

## 必填项标记

通过 `required` 属性标记必填字段，显示红色星号。

:::demo

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    style="max-width: 600px;"
  >
    <XFormItem label="姓名" prop="name" required>
      <XInput v-model="form.name" placeholder="请输入姓名" />
    </XFormItem>
    <XFormItem label="手机号" prop="phone" required>
      <XInput v-model="form.phone" placeholder="请输入手机号" />
    </XFormItem>
    <XFormItem label="备注" prop="remark">
      <XInput v-model="form.remark" placeholder="选填项" />
    </XFormItem>
    
    <template #footer>
      <div style="display: flex; justify-content: center;">
        <XButton type="primary" @click="handleSubmit">提交</XButton>
      </div>
    </template>
  </XForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  name: '',
  phone: '',
  remark: ''
})

const rules = {
  name: { required: true, message: '请输入姓名' },
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
  ]
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    xlMsg.success('提交成功！')
  }
}
</script>
```

:::

## 标签位置

通过 `labelPosition` 属性设置标签位置，支持 `left`、`right`、`top` 三种方式。

:::demo

```vue
<template>
  <div>
    <XSegmented 
      v-model="labelPosition" 
      :options="[
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
        { label: '顶部', value: 'top' }
      ]"
      direction="horizontal"
      style="margin-bottom: 20px;"
    />
    
    <XForm 
      :model="form" 
      :label-position="labelPosition"
      label-width="100px"
      style="max-width: 600px;"
    >
      <XFormItem label="用户名" prop="username">
        <XInput v-model="form.username" placeholder="请输入用户名" />
      </XFormItem>
      <XFormItem label="邮箱" prop="email">
        <XInput v-model="form.email" placeholder="请输入邮箱" />
      </XFormItem>
      <XFormItem label="备注" prop="remark">
        <XInput v-model="form.remark" placeholder="请输入备注" />
      </XFormItem>
    </XForm>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const form = reactive({
  username: '',
  email: '',
  remark: ''
})
</script>
```

:::

## 行内表单

通过设置 `inline` 属性为 `true` 可以让表单项在一行内显示。

:::demo

```vue
<template>
  <XForm :model="form" inline>
    <XFormItem label="用户名">
      <XInput v-model="form.username" placeholder="用户名" style="width: 180px;" />
    </XFormItem>
    <XFormItem label="邮箱">
      <XInput v-model="form.email" placeholder="邮箱" style="width: 200px;" />
    </XFormItem>
    <XFormItem>
      <XButton type="primary" @click="handleSearch">搜索</XButton>
    </XFormItem>
  </XForm>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  username: '',
  email: ''
})

const handleSearch = () => {
  xlMsg.info('搜索中...')
  console.log('搜索条件:', form)
}
</script>
```

:::

## 单选框表单

结合单选框组件实现单选题型表单。

:::demo

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    style="max-width: 600px;"
  >
    <XFormItem label="性别" prop="gender" required>
      <XRadio 
        v-model="form.gender"
        :options="[
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
          { label: '其他', value: 'other' }
        ]"
      />
    </XFormItem>
    <XFormItem label="学历" prop="education" required>
      <XRadio 
        v-model="form.education"
        :options="[
          { label: '高中', value: 'high' },
          { label: '本科', value: 'bachelor' },
          { label: '硕士', value: 'master' },
          { label: '博士', value: 'doctor' }
        ]"
      />
    </XFormItem>
    
    <template #footer>
      <XButton type="primary" @click="handleSubmit">提交</XButton>
    </template>
  </XForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  gender: '',
  education: ''
})

const rules = {
  gender: { required: true, message: '请选择性别' },
  education: { required: true, message: '请选择学历' }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    xlMsg.success('提交成功！')
    console.log('表单数据:', form)
  }
}
</script>
```

:::

## 多选框表单

结合多选框组件实现多选题型表单。

:::demo

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    style="max-width: 600px;"
  >
    <XFormItem label="兴趣爱好" prop="hobbies" required>
      <XCheckboxes 
        v-model="form.hobbies"
        :options="[
          { label: '阅读', value: 'reading' },
          { label: '运动', value: 'sports' },
          { label: '旅游', value: 'travel' },
          { label: '音乐', value: 'music' },
          { label: '电影', value: 'movie' }
        ]"
      />
    </XFormItem>
    <XFormItem label="技能" prop="skills" required>
      <XCheckboxes 
        v-model="form.skills"
        :options="[
          { label: 'JavaScript', value: 'js' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Node.js', value: 'node' }
        ]"
      />
    </XFormItem>
    
    <template #footer>
      <XButton type="primary" @click="handleSubmit">提交</XButton>
    </template>
  </XForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  hobbies: [],
  skills: []
})

const rules = {
  hobbies: { 
    required: true, 
    message: '请至少选择一个兴趣爱好',
    validator: (value) => value.length > 0
  },
  skills: { 
    required: true, 
    message: '请至少选择一项技能',
    validator: (value) => value.length > 0
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    xlMsg.success('提交成功！')
    console.log('表单数据:', form)
  }
}
</script>
```

:::

## 完整注册表单

一个真实的用户注册表单，包含多种字段类型和验证规则。

:::demo

```vue
<template>
  <XForm 
    ref="formRef"
    :model="form" 
    :rules="rules" 
    label-width="120px"
    style="max-width: 700px;"
    @submit="handleSubmit"
  >
    <XFormItem label="用户名" prop="username">
      <XInput v-model="form.username" placeholder="请输入用户名" clearable />
    </XFormItem>
    
    <XFormItem label="邮箱" prop="email">
      <XInput v-model="form.email" type="email" placeholder="请输入邮箱" clearable />
    </XFormItem>
    
    <XFormItem label="密码" prop="password">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    
    <XFormItem label="确认密码" prop="confirmPassword">
      <XInput v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
    </XFormItem>
    
    <XFormItem label="性别" prop="gender">
      <XRadio 
        v-model="form.gender"
        :options="[
          { label: '男', value: 'male' },
          { label: '女', value: 'female' }
        ]"
      />
    </XFormItem>
    
    <XFormItem label="兴趣" prop="interests">
      <XCheckboxes 
        v-model="form.interests"
        :options="[
          { label: '前端开发', value: 'frontend' },
          { label: '后端开发', value: 'backend' },
          { label: 'UI设计', value: 'design' },
          { label: '产品经理', value: 'pm' }
        ]"
      />
    </XFormItem>
    
    <XFormItem label="简介" prop="bio">
      <XInput v-model="form.bio" placeholder="请输入个人简介" />
    </XFormItem>
    
    <XFormItem label="同意协议" prop="agree">
      <XCheckboxes 
        v-model="form.agree"
        :options="[
          { label: '我已阅读并同意用户协议', value: 'agreed' }
        ]"
      />
    </XFormItem>
    
    <template #footer>
      <div style="display: flex; gap: 12px; justify-content: center;">
        <XButton type="primary">注册</XButton>
        <XButton type="danger" ghost @click="handleReset">重置</XButton>
      </div>
    </template>
  </XForm>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  interests: [],
  bio: '',
  agree: []
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: '密码必须包含大小写字母和数字', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { 
      validator: (value) => value === form.password, 
      message: '两次输入的密码不一致', 
      trigger: 'blur' 
    }
  ],
  gender: { required: true, message: '请选择性别' },
  interests: { 
    required: true, 
    message: '请至少选择一项兴趣',
    validator: (value) => value.length > 0
  },
  agree: { 
    required: true, 
    message: '请阅读并同意用户协议',
    validator: (value) => value.includes('agreed')
  }
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) {
    xlMsg.success('注册成功！')
    console.log('表单数据:', form)
  } else {
    xlMsg.error('验证失败，请检查表单')
  }
}

const handleReset = () => {
  formRef.value.resetFields()
  xlMsg.info('表单已重置')
}
</script>
```

:::

## API

### Form Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, any>` | - |
| rules | 表单验证规则 | `FormRules` | - |
| labelPosition | 标签位置 | `'left' \| 'right' \| 'top'` | `'right'` |
| labelWidth | 标签宽度 | `string` | `'100px'` |
| inline | 是否行内表单 | `boolean` | `false` |
| disabled | 是否禁用表单所有组件 | `boolean` | `false` |

### Form Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 表单提交事件 | `(model: Record<string, any>) => void` |
| validate | 表单验证完成 | `(valid: boolean, errors: Record<string, string>) => void` |

### Form Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对整个表单进行验证 | `() => Promise<boolean>` |
| validateField | 对部分表单字段进行验证 | `(prop: string) => Promise<boolean>` |
| resetFields | 重置表单 | `() => void` |
| clearValidate | 清除验证信息 | `(props?: string \| string[]) => void` |

### Form Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 表单项内容 |
| footer | 表单底部操作区，通常放置提交、重置等按钮 |

**Footer 插槽使用示例：**

```vue
<XForm :model="form">
  <XFormItem label="用户名">
    <XInput v-model="form.username" />
  </XFormItem>
  
  <template #footer>
    <div style="display: flex; justify-content: flex-end; gap: 12px;">
      <XButton type="submit">提交</XButton>
      <XButton>取消</XButton>
    </div>
  </template>
</XForm>
```

### FormItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 表单域 model 字段名 | `string` | - |
| required | 是否必填（显示红色星号） | `boolean` | `false` |
| rules | 表单验证规则 | `FormRule \| FormRule[]` | - |

### FormRule

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| required | 是否必填 | `boolean` | `false` |
| message | 验证失败提示信息 | `string` | - |
| pattern | 正则表达式验证 | `RegExp` | - |
| min | 最小长度 | `number` | - |
| max | 最大长度 | `number` | - |
| validator | 自定义验证函数 | `(value: any) => boolean \| Promise<boolean>` | - |
| trigger | 验证触发时机 | `'blur' \| 'change' \| 'submit'` | `'blur'` |

## 动画效果说明

表单组件内置了流畅的交互动画：

- **必填项标记**：红色星号标记，简洁明了
- **验证错误提示**：错误信息平滑滑入，带有缩放效果，输入框边框平滑过渡为红色
- **聚焦状态**：输入框聚焦时显示淡色阴影，视觉反馈明确
- **验证中状态**：输入框边框变为蓝色，提示用户正在验证

所有动画使用 `cubic-bezier` 缓动函数，确保视觉体验流畅自然。

## 注意事项

1. **prop 属性**：FormItem 的 `prop` 属性必须与 Form 的 `model` 中的字段名对应
2. **验证规则**：规则可以定义在 Form 的 `rules` 属性中，也可以定义在 FormItem 的 `rules` 属性中
3. **必填标记**：设置 `required` 属性或在规则中定义 `required: true` 都会显示必填标记
4. **触发时机**：默认在 `blur` 时触发验证，可通过 `trigger` 属性自定义
5. **响应式**：表单在移动端会自动切换为垂直布局
6. **性能**：验证采用异步方式，支持 Promise，不会阻塞 UI

