# 更新日志 (Changelog)

记录 XUX UI 组件库的版本更新和功能变更。

---

## v1.5.0 (2025年11月24日)

### 组件增强

#### Input 输入框 - 新增文本域功能
- 新增 `multiline` 属性，支持多行文本输入
- 支持属性：
  - `rows`: 文本域行数（默认 3）
  - `autoResize`: 自动调整高度
  - `minRows`/`maxRows`: 自动调整高度的范围（2-10）
  - `resize`: 用户调整尺寸控制（none/both/horizontal/vertical）
- 功能特性：
  - 支持所有 Input 原有功能（清空、字数统计、状态显示等）
  - 自动高度调整算法，根据内容动态调整
  - 完整的键盘和焦点管理
  - 三种尺寸支持（small/medium/large）

#### Autocomplete 自动补全输入框 - 样式优化
- 样式与 Input 组件完全统一：
  - 采用 1.5px 边框宽度
  - 使用统一的 CSS 变量系统
  - 相同的 hover 和 focus 状态效果
  - 一致的圆角、阴影和过渡动画
  - 统一的动画曲线：`cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- 交互优化：
  - 失去焦点后自动收起建议列表
  - 延迟处理确保点击选项时能正确触发
  - 优化前缀/后缀图标位置和样式
- 过渡动画改进：
  - 入场动画：0.25s，从上方6px滑入
  - 离场动画：0.2s，快速退出
  - 使用 `cubic-bezier(0.4, 0, 0.2, 1)` 缓动函数
- 完善暗色模式支持：
  - 统一使用 CSS 变量
  - 优化暗色模式下的边框和阴影效果

### 暗色模式优化

#### Select 选择器
- 修复 Element Plus Popover 在暗色模式下的背景色问题
- 优化暗色模式配色：
  - 下拉菜单背景：`rgba(28, 28, 30, 0.98)`
  - 选项悬停：`rgba(10, 132, 255, 0.15)`
  - 边框颜色：`rgba(255, 255, 255, 0.08)`
- 支持 `.dark` 类名和系统偏好设置

#### CountrySelect 国家选择器
- 全面支持暗色模式，包括：
  - 输入框：深色背景 `rgba(30, 30, 30, 0.9)`
  - 下拉菜单：`rgba(28, 28, 30, 0.98)`
  - 搜索框和选项的暗色适配
  - 标签和图标的颜色调整
- 优化宽度一致性：
  - 输入框最小宽度：250px
  - 下拉菜单自动匹配输入框宽度
  - 响应式支持：移动端自适应 100% 宽度

#### Table 表格
- 修复条纹样式在暗色模式下的显示问题
- 优化暗色模式配色方案：
  - 表格背景：`#141414`
  - 条纹背景：`#1a1a1a`（更明显的对比）
  - 悬停背景：`#262626`
  - 选中背景：`rgba(24, 144, 255, 0.08)`
  - 边框颜色：`#303030`
- 固定列在暗色模式下的背景色修正

### 主题系统增强

#### 新增 CSS 变量
- **渐变背景变量**：
  - `--x-gradient-bg-light`: 浅色渐变背景
  - `--x-gradient-bg`: 标准渐变背景
  - `--x-gradient-primary-lighter`: 主色轻渐变
  - `--x-gradient-primary-light`: 主色浅渐变
  - `--x-gradient-primary`: 主色渐变
- **阴影变量**：
  - `--x-shadow-primary-lighter`: 主色极浅阴影
  - `--x-shadow-primary-light`: 主色浅阴影
  - `--x-shadow-primary`: 主色标准阴影
  - `--x-shadow-primary-dark`: 主色深阴影
  - `--x-shadow-focus-primary`: 主色聚焦阴影
- **表格暗色变量**（暗色模式下）：
  - `--x-table-stripe-bg`: 条纹背景
  - `--x-table-stripe-hover-bg`: 条纹悬停背景
  - `--x-table-row-selected-bg`: 选中行背景
  - `--x-table-hover-bg`: 悬停背景

### 问题修复

- 修复 Radio 组件缺失 CSS 变量的问题
- 修复 Select 组件在暗色模式下下拉菜单背景色不正确
- 修复 Table 组件条纹样式在暗色模式下几乎不可见的问题
- 修复 CountrySelect 输入框与下拉菜单宽度不一致的问题
- 修复 Autocomplete 组件失去焦点后建议列表不收起的问题
- 修复 Autocomplete 组件样式与 Input 组件不一致的问题

### 技术改进

- 统一暗色模式实现方式：使用 `.dark` 类名
- 优化组件的 CSS 变量系统，提高主题定制能力
- 改进响应式布局，更好地支持移动设备
- 统一组件间的动画时长和缓动函数
- 优化焦点管理和交互反馈

---

## v1.4.1 (2025年11月24日)

### 新增组件

#### Autocomplete 自动补全输入框

- 核心功能：
  - 动态数据获取：支持异步 `fetch-suggestions` 函数
  - 防抖搜索：可配置 `debounce` 延迟时间
  - 键盘导航：支持上下箭头选择，Enter 确认，Escape 关闭
  - 清空功能：`clearable` 属性支持一键清空
  - 自定义模板：多个插槽支持（header、footer、default、prefix、suffix、prepend、append）
  - 高亮首项：`highlight-first-item` 自动高亮第一个选项
  - 循环导航：`loop-navigation` 支持循环选择
- 视觉优化：
  - 选中项背景：`rgba(74, 144, 226, 0.08)` 淡蓝色透明背景
  - 悬停背景：`rgba(74, 144, 226, 0.04)` 更轻的悬停效果
  - 暗黑模式：完整的深色主题支持
- 性能优化：
  - 虚拟列表渲染（大数据量）
  - Teleport 到 body 避免样式污染
  - 智能定位：自动调整下拉框位置

### 样式优化

#### RegionCascader 地区级联选择器

- 选中项样式改进：
  - 移除左侧 3px 蓝色竖线装饰
  - 背景色调整：从 `#F6F9FF` 改为 `rgba(74, 144, 226, 0.08)`（8% 透明度）
  - 字体颜色优化：从淡蓝色 `#4A90E2` 改为深色 `#1C1C1E`，提升可读性
  - 暗黑模式适配：背景 `rgba(74, 144, 226, 0.15)`，文字白色
  - 左内边距恢复：从 24px 改为标准 16px

#### Autocomplete 自动补全输入框

- 统一配色方案：
  - 采用与地区级联选择器相同的选中背景色
  - 高亮选中：`rgba(74, 144, 226, 0.08)` 淡蓝色背景
  - 悬停状态：`rgba(74, 144, 226, 0.04)` 更轻的效果
  - 暗黑模式：`rgba(74, 144, 226, 0.15)` 选中背景
  - 字体加粗：选中项使用 600 字重

### 技术改进

- 组件导出：更新 `packages/ui/src/index.ts` 添加 XAutocomplete 导出
- 自定义指令：新增 `v-click-outside` 指令用于下拉框外部点击检测
- 图标组件：新增 `close-circle` 图标用于清空按钮
- 模块解析：修复 XIcon 组件导入路径问题

### 文档更新

- 新增 Autocomplete 组件完整文档
- 包含基础用法、自定义模板、远程搜索等多个示例
- 详细的 API 文档：props、events、slots、methods
- 设计特点说明：iOS 风格、性能优化、键盘支持、无障碍访问

---

## v1.4.0 (2025年11月18日)

### 样式重构

全面优化视觉设计，采用简洁高效的设计语言，提升多个核心组件的视觉效果和交互体验。

#### 主题系统

- 更新 `theme.css`，采用现代化色彩方案
- 主色调：`#007AFF` (蓝色)
- 成功色：`#34C759` (绿色)
- 警告色：`#FF9500` (橙色)
- 危险色：`#FF3B30` (红色)
- 优化字体：优先使用系统原生字体
- 调整圆角：6px/10px/14px 三级圆角系统
- 优化阴影：更柔和的双层阴影效果

#### Alert 警告提示

- 完全重构样式，采用毛玻璃效果
- 背景：半透明 + `backdrop-filter: blur(20px) saturate(180%)`
- 圆角：14px，更圆润
- 图标优化：24px大小，带淡色填充背景
- 关闭按钮：圆形按钮，带微交互动画
- 字体排版：精细化字间距 (-0.3px)
- 动画优化：350ms 流畅过渡，从上方12px滑入
- 容器：宽度400px，间距12px

#### Switch 开关

- 完全重构为简洁切换开关
- 固定尺寸：51x31px (medium)
- 激活色：`#34C759` (绿色)
- 滑块：27px圆形，带阴影
- 移除自定义颜色、文字、图标功能
- 优化禁用态：opacity 0.4
- 文档重构：采用两栏grid布局

#### Table 表格

- 移除表头深色背景，改为纯白
- 优化滚动条：8px圆角，渐进式显示
- 滚动条样式：透明边框 + `background-clip: padding-box`
- 上下留空4px，避免触碰圆角
- 新增虚拟滚动功能：
  - `virtual` 属性：开启虚拟滚动
  - `virtualRowHeight` 属性：行高度 (默认53px)
  - `virtualBuffer` 属性：缓冲区行数 (默认5)
  - 支持数万行数据流畅滚动
- 文档新增虚拟滚动示例（1k/10k/50k/100k）

#### Modal 弹窗

- 移除上下边框线，更简洁
- 紧凑间距：padding优化
- 标题：17px，font-weight 600，letter-spacing -0.4px
- 关闭按钮：32px圆形，背景色填充
- 动画优化：从上方10px滑入，350ms
- 新增拖拽功能：
  - `draggable` 属性：支持拖拽移动
  - 鼠标事件处理：`mousedown/mousemove/mouseup`
  - 拖拽中加强阴影效果
- 新增可选蒙版：
  - `showMask` 属性：控制蒙版显示
  - 无蒙版时：淡色背景 + 加强阴影
- 修复：无蒙版模式下可以正常关闭

#### Menu 菜单

- 完全重构样式，采用简洁高效的设计语言
- 容器：纯白背景，1px细边框，14px圆角
- 菜单项：
  - 悬停：填充色 `#F2F2F7` + scale(1.01)
  - 激活：主色半透明背景
  - 按下：scale(0.98)
  - 图标/文字：`#007AFF` 主色
- 徽标：
  - 危险徽标：`#FF3B30` 红色
  - 信息徽标：`#007AFF` 蓝色
  - 带白色描边阴影效果
- 滚动条：8px精致圆角，渐进式显示
- 移除悬浮延迟：去除200ms setTimeout，响应更快
- 动画：0.2s快速过渡
- 新增配置参数：
  - `path` 属性：路由路径（供用户自定义）
  - `href` 属性：外部链接
  - `target` 属性：链接打开方式
  - `action` 属性：点击行为控制

#### 其他组件优化

- Input：优化边框、阴影、动画速度
- Card：14px圆角，优化悬停效果
- Badge：20px尺寸，700字重，带白色描边
- Link：主色 `#007AFF`，优化悬停态
- Tag：圆角徽章，紧凑设计
- Divider：更细的分割线
- Accordion：紧凑间距，快速动画
- Drawer：圆形关闭按钮，无边框
- Skeleton：现代化shimmer动画
- Pagination：精细化字体和交互

### 技术改进

- 统一动画曲线：`cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- 统一动画时长：0.2s - 0.35s
- 优化代码结构：移除冗余深色模式CSS
- 性能优化：减少不必要的定时器和事件监听

### 文档更新

- 所有更新组件文档采用两栏grid布局
- 统一瀑布流布局：`display: grid; grid-template-columns: repeat(2, 1fr)`
- 新增虚拟滚动示例和说明
- 更新API文档，补充新增属性
- 侧边栏菜单：已更新组件添加"新"标记

### Bug修复

- 修复：Modal无蒙版模式下无法关闭
- 修复：Table表头背景色过深
- 修复：滚动条在圆角设计中显示异常

---

## v1.3.29 (2025年11月13日)

###  新增功能

#### Table 表格组件

- **性能优化参数 `returnSelectedRows`**
  - 新增 `return-selected-rows` 属性，用于控制 `selectionChange` 事件是否返回完整行数据
  - 默认值为 `true`（保持向后兼容）
  - 设置为 `false` 时，只返回选中的 IDs，不返回完整行数据
  - 适用场景：
    - 大数据量表格，减少内存占用
    - 跨页多选，避免缓存大量行数据
    - 只需要 IDs 的业务场景（如批量删除、批量导出等）
  - 示例：
    ```vue
    <XTable 
      row-selection
      :return-selected-rows="false"
      @selection-change="(ids, rows) => {
        console.log('IDs:', ids)  // ['1', '2', '3']
        console.log('Rows:', rows) // [] - 空数组
      }"
    />
    ```

- **完善跨页选择功能**
  - 优化了跨页选择模式下的数据缓存机制
  - 支持返回所有跨页选中的完整行数据（当 `returnSelectedRows` 为 `true` 时）
  - 改进了数据同步逻辑，确保翻页时正确维护选中状态
  - 修复了外部通过 `selectedRowKeys` 传入初始选中行时的缓存问题

#### Modal 模态框组件

- **修复多弹框叠加 ESC 键处理**
  - 修复了多个 Modal 叠加时，按 ESC 键会关闭所有弹框的问题
  - 现在每次按 ESC 键只关闭最上层（栈顶）的弹框
  - 实现方式：
    - 引入全局 Modal 实例栈管理所有打开的弹框
    - 每个 Modal 实例有唯一的 Symbol ID
    - 根据栈位置动态计算 z-index，确保层级正确
    - ESC 事件只响应栈顶的 Modal
  - 优化了 body 滚动管理：
    - 只有第一个弹框打开时才禁止 body 滚动
    - 只有所有弹框都关闭时才恢复 body 滚动
  - 使用示例：
    ```vue
    <!-- 多层弹框 -->
    <XModal v-model:visible="modal1">
      <XButton @click="modal2 = true">打开第二层</XButton>
    </XModal>
    <XModal v-model:visible="modal2">
      <XButton @click="modal3 = true">打开第三层</XButton>
    </XModal>
    <XModal v-model:visible="modal3">
      最上层弹框，按 ESC 只关闭这一个
    </XModal>
    ```

### 📝 文档更新

- 在 Table 组件文档中新增"优化性能：只返回IDs不返回行数据"示例
- 更新了 Props API 文档，添加 `returnSelectedRows` 参数说明
- 所有示例代码都包含详细的注释和使用场景说明

###  技术改进

- **Table 组件**
  - 添加了 `selectedRowsCache` Map 缓存选中行的完整数据
  - 实现了 `getAllSelectedRows()` 辅助函数统一获取选中行数据
  - 优化了所有触发 `selectionChange` 事件的位置（共7处），支持条件返回数据
  - 改进了 `watch` 监听逻辑，确保数据源变化时正确更新缓存

- **Modal 组件**
  - 使用 `Symbol` 作为 Modal 实例的唯一标识
  - 实现了响应式的栈管理系统，使用 `stackVersion` 触发更新
  - 动态计算 z-index：`BASE_Z_INDEX (1000) + 栈位置索引`
  - 改进了生命周期管理，确保组件卸载时正确清理栈和事件监听

###  Bug 修复

- 修复了 Modal 组件多层叠加时 ESC 键行为异常的问题
- 修复了 Table 组件跨页选择时数据缓存不完整的问题

---

**贡献者**: 无敌暴龙神

如有问题或建议，欢迎提交 Issue 或 Pull Request！

