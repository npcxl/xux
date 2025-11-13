# 更新日志 (Changelog)

记录 XUX UI 组件库的版本更新和功能变更。

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

