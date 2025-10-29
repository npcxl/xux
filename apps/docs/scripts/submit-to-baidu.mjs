#!/usr/bin/env node

/**
 * 百度搜索引擎 URL 提交脚本
 * 用于自动提交网站 URL 到百度收录
 */

import http from 'http'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置信息
const config = {
  site: 'https://www.xlcig.cn',
  token: 'sCeFCNH8SKbgQMeH',
  apiUrl: 'http://data.zz.baidu.com/urls',
  siteUrl: 'https://xux.xlcig.cn' // 实际网站地址
}

/**
 * 获取所有需要提交的 URL
 */
function getAllUrls() {
  const urls = []
  const baseUrl = config.siteUrl

  // 首页
  urls.push(baseUrl)

  // 指南页面
  const guidePages = [
    '/guide/introduction',
    '/guide/installation',
    '/guide/quickstart'
  ]
  guidePages.forEach(page => urls.push(`${baseUrl}${page}`))

  // 组件页面
  const componentPages = [
    '/components/theme-config',
    '/components/button',
    '/components/tag',
    '/components/search',
    '/components/table',
    '/components/icon',
    '/components/flex',
    '/components/grid',
    '/components/card',
    '/components/divider',
    '/components/menu',
    '/components/form',
    '/components/input',
    '/components/select',
    '/components/checkboxes',
    '/components/radio',
    '/components/country-select',
    '/components/region-cascader',
    '/components/switch',
    '/components/datetime-picker',
    '/components/color',
    '/components/carousel',
    '/components/timeline',
    '/components/tree',
    '/components/accordion',
    '/components/skeleton',
    '/components/thumbnail-container',
    '/components/score',
    '/components/qrcode',
    '/components/segmented',
    '/components/badge',
    '/components/image',
    '/components/drag-sort',
    '/components/pagination',
    '/components/alert',
    '/components/modal',
    '/components/drawer',
    '/components/msg',
    '/components/tooltips',
    '/components/dropdown',
    '/components/popconfirm',
    '/components/result',
    '/components/chat',
    '/components/loading',
    '/components/dynamic-mech',
    '/components/special-effects',
    '/components/datetime-functions'
  ]
  componentPages.forEach(page => urls.push(`${baseUrl}${page}`))

  // API 工具页面
  const apiPages = [
    '/api/',
    '/api/validate',
    '/api/type',
    '/api/string',
    '/api/array',
    '/api/object',
    '/api/format',
    '/api/math',
    '/api/color',
    '/api/websocket',
    '/api/storage',
    '/api/url',
    '/api/function',
    '/api/tree',
    '/api/file',
    '/api/dom'
  ]
  apiPages.forEach(page => urls.push(`${baseUrl}${page}`))

  return urls
}

/**
 * 提交 URL 到百度
 */
function submitToBaidu(urls) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${config.apiUrl}?site=${encodeURIComponent(config.site)}&token=${config.token}`
    const urlData = urls.join('\n')

    console.log('📤 准备提交 URL 到百度...')
    console.log(`   API: ${apiUrl}`)
    console.log(`   URL 数量: ${urls.length}`)
    console.log('---')

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(urlData)
      }
    }

    const req = http.request(apiUrl, options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result)
        } catch (error) {
          reject(new Error(`解析响应失败: ${data}`))
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(urlData)
    req.end()
  })
}

/**
 * 分批提交 URL（百度限制每次最多 2000 条）
 */
async function submitInBatches(urls, batchSize = 2000) {
  const batches = []
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize))
  }

  console.log(`📊 共 ${urls.length} 个 URL，分 ${batches.length} 批提交\n`)

  const results = []
  for (let i = 0; i < batches.length; i++) {
    console.log(`🚀 正在提交第 ${i + 1}/${batches.length} 批 (${batches[i].length} 个 URL)...`)
    try {
      const result = await submitToBaidu(batches[i])
      results.push(result)
      
      console.log('✅ 提交成功:')
      console.log(`   今日剩余: ${result.remain || 'N/A'}`)
      console.log(`   成功收录: ${result.success || 'N/A'}`)
      if (result.not_same_site && result.not_same_site.length > 0) {
        console.log(`   ⚠️  非本站 URL: ${result.not_same_site.length}`)
      }
      if (result.not_valid && result.not_valid.length > 0) {
        console.log(`   ⚠️  无效 URL: ${result.not_valid.length}`)
      }
      console.log('---')
      
      // 避免请求过快，等待一小段时间
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error(`❌ 第 ${i + 1} 批提交失败:`, error.message)
      console.log('---')
    }
  }

  return results
}

/**
 * 保存提交记录
 */
function saveSubmitLog(urls, results) {
  const logDir = path.join(__dirname, '../.baidu-submit-logs')
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const logFile = path.join(logDir, `submit-${timestamp}.json`)

  const logData = {
    timestamp: new Date().toISOString(),
    totalUrls: urls.length,
    results: results,
    urls: urls
  }

  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2))
  console.log(`\n💾 提交记录已保存: ${logFile}`)
}

/**
 * 主函数
 */
async function main() {
  console.log('🔍 百度收录 URL 提交工具')
  console.log('='.repeat(50))
  console.log('')

  try {
    // 获取所有 URL
    const urls = getAllUrls()
    
    console.log('📋 已生成 URL 列表:')
    urls.slice(0, 5).forEach(url => console.log(`   - ${url}`))
    if (urls.length > 5) {
      console.log(`   ... 还有 ${urls.length - 5} 个`)
    }
    console.log('')

    // 提交到百度
    const results = await submitInBatches(urls)

    // 保存提交记录
    saveSubmitLog(urls, results)

    console.log('\n✨ 全部提交完成！')
    
    // 统计总结
    const totalSuccess = results.reduce((sum, r) => sum + (r.success || 0), 0)
    console.log(`\n📈 提交统计:`)
    console.log(`   总共提交: ${urls.length} 个 URL`)
    console.log(`   成功收录: ${totalSuccess} 个`)
    
  } catch (error) {
    console.error('\n❌ 提交过程中出现错误:', error.message)
    process.exit(1)
  }
}

// 运行主函数
main()

