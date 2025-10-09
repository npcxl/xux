import { parse } from 'vue-docgen-api'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generatePropsTable(props) {
  if (!props || props.length === 0) return '暂无'
  
  let table = '| 属性名 | 说明 | 类型 | 默认值 |\n'
  table += '| --- | --- | --- | --- |\n'
  
  props.forEach(prop => {
    const name = prop.name || '-'
    const description = prop.description || '-'
    const type = prop.type?.name || 'any'
    const defaultValue = prop.defaultValue?.value || '-'
    table += `| ${name} | ${description} | ${type} | ${defaultValue} |\n`
  })
  
  return table
}

function generateEventsTable(events) {
  if (!events || events.length === 0) return '暂无'
  
  let table = '| 事件名 | 说明 | 回调参数 |\n'
  table += '| --- | --- | --- |\n'
  
  events.forEach(event => {
    const name = event.name || '-'
    const description = event.description || '-'
    const params = event.properties?.map(p => p.name).join(', ') || '-'
    table += `| ${name} | ${description} | ${params} |\n`
  })
  
  return table
}

function generateSlotsTable(slots) {
  if (!slots || slots.length === 0) return '暂无'
  
  let table = '| 插槽名 | 说明 |\n'
  table += '| --- | --- |\n'
  
  slots.forEach(slot => {
    const name = slot.name || '-'
    const description = slot.description || '-'
    table += `| ${name} | ${description} |\n`
  })
  
  return table
}
// 扫描组件目录
function scanComponents() {
  const componentsDir = resolve(__dirname, '../../../packages/ui/src/components')
  const components = []
  
  if (!existsSync(componentsDir)) {
    console.error('❌ 组件目录不存在:', componentsDir)
    return components
  }
  
  const files = readdirSync(componentsDir)
  
  for (const file of files) {
    const componentPath = resolve(componentsDir, file)
    const stat = statSync(componentPath)
    
    if (stat.isDirectory()) {
      const vueFile = resolve(componentPath, 'index.vue')
      if (existsSync(vueFile)) {
        components.push({
          name: file,
          path: vueFile
        })
      }
    }
  }
  
  return components
}

// 生成通用组件文档
function generateComponentDoc(componentName, componentDoc) {
  const displayName = componentDoc.displayName || componentName
  const description = componentDoc.description || `${displayName} 组件`
  
  const markdown = `# ${displayName}

${description}

## 基础用法

:::demo

\`\`\`vue
<template>
  <div>
    <X${componentName}>示例</X${componentName}>
  </div>
</template>
\`\`\`

:::

## API

### Props

${generatePropsTable(componentDoc.props)}

### Events

${generateEventsTable(componentDoc.events)}

### Slots

${generateSlotsTable(componentDoc.slots)}
`

  return markdown
}

async function generateDocs() {
  try {
    console.log('📝 开始生成文档...\n')
    
    // 扫描所有组件
    const components = scanComponents()
    console.log(`📦 找到 ${components.length} 个组件:\n`)
    
    const docsDir = resolve(__dirname, '../components')
    if (!existsSync(docsDir)) {
      mkdirSync(docsDir, { recursive: true })
    }
    
    const allDocs = {}
    
    for (const component of components) {
      try {
        console.log(`🔍 处理组件: ${component.name}`)
        
        // 解析组件
        const componentDoc = await parse(component.path)
        
        console.log(`  ✨ Props: ${componentDoc.props?.length || 0}`)
        console.log(`  🎯 Events: ${componentDoc.events?.length || 0}`)
        console.log(`  🧩 Slots: ${componentDoc.slots?.length || 0}`)
        
        // 生成组件文档
        const markdown = generateComponentDoc(component.name, componentDoc)
        
        // 写入文档文件
        const docPath = resolve(docsDir, `${component.name.toLowerCase()}.md`)
        writeFileSync(docPath, markdown)
        
        console.log(`  ✅ 已生成: components/${component.name.toLowerCase()}.md\n`)
        
        // 保存到汇总
        allDocs[component.name] = componentDoc
        
      } catch (error) {
        console.error(`  ❌ 生成 ${component.name} 文档失败:`, error.message)
      }
    }
    
    // 保存所有组件的 JSON（用于调试）
    writeFileSync(
      resolve(__dirname, '../.vitepress/component-docs.json'),
      JSON.stringify(allDocs, null, 2)
    )
    
    console.log('📄 API JSON 已保存: .vitepress/component-docs.json')
    console.log('\n🎉 所有文档生成完成！')
    
  } catch (error) {
    console.error('❌ 生成文档失败:', error)
  }
}

generateDocs()

