#!/usr/bin/env node

/**
 * 生成 sitemap.xml
 * 用于搜索引擎爬虫
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const siteUrl = 'https://xux.xlcig.cn'

/**
 * 获取所有页面路径
 */
function getAllPages() {
  const pages = [
    // 首页
    { path: '', priority: '1.0', changefreq: 'daily' },
    
    // 指南
    { path: '/guide/introduction', priority: '0.9', changefreq: 'weekly' },
    { path: '/guide/installation', priority: '0.9', changefreq: 'weekly' },
    { path: '/guide/quickstart', priority: '0.9', changefreq: 'weekly' },
    
    // 主题配置
    { path: '/components/theme-config', priority: '0.8', changefreq: 'weekly' },
    
    // 组件
    { path: '/components/button', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/tag', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/search', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/table', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/icon', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/flex', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/grid', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/card', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/divider', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/menu', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/form', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/input', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/select', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/checkboxes', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/radio', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/country-select', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/region-cascader', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/switch', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/datetime-picker', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/color', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/carousel', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/timeline', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/tree', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/accordion', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/skeleton', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/thumbnail-container', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/score', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/qrcode', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/segmented', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/badge', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/image', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/drag-sort', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/pagination', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/alert', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/modal', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/drawer', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/msg', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/tooltips', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/dropdown', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/popconfirm', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/result', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/chat', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/loading', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/dynamic-mech', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/special-effects', priority: '0.8', changefreq: 'weekly' },
    { path: '/components/datetime-functions', priority: '0.8', changefreq: 'weekly' },
    
    // API 工具
    { path: '/api/', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/validate', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/type', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/string', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/array', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/object', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/format', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/math', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/color', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/websocket', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/storage', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/url', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/function', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/tree', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/file', priority: '0.7', changefreq: 'weekly' },
    { path: '/api/dom', priority: '0.7', changefreq: 'weekly' }
  ]
  
  return pages
}

/**
 * 生成 sitemap XML
 */
function generateSitemap() {
  const pages = getAllPages()
  const now = new Date().toISOString().split('T')[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  pages.forEach(page => {
    xml += '  <url>\n'
    xml += `    <loc>${siteUrl}${page.path}</loc>\n`
    xml += `    <lastmod>${now}</lastmod>\n`
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`
    xml += `    <priority>${page.priority}</priority>\n`
    xml += '  </url>\n'
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * 主函数
 */
function main() {
  console.log('🗺️  生成 sitemap.xml...')
  
  const sitemap = generateSitemap()
  const publicDir = path.join(__dirname, '../public')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  
  // 确保 public 目录存在
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  
  // 写入 sitemap.xml
  fs.writeFileSync(sitemapPath, sitemap)
  
  console.log(`✅ Sitemap 已生成: ${sitemapPath}`)
  console.log(`📊 包含 ${getAllPages().length} 个页面`)
}

// 运行主函数
main()

