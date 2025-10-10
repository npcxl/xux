#!/usr/bin/env node
/**
 * Build China Cascader JSON (Advanced: 4/5 levels + Incremental + Pinyin)
 * ----------------------------------------------------------------------
 * 输出：Cascader 结构 [{ value, label, pinyin, abbr, aliases, search, children: [...] }]
 *
 * 依赖：axios, glob, pinyin
 *
 * CLI:
 *  --levels=3|4|5
 *  --out=china-areas.json
 *  --prev=previous.json                # 增量基准（可选）
 *  --pca=./pca-code.json               # 本地 pca-code.json（可选，传了就不走网络）
 *  --townDir=./dist/town               # 4级目录（必传于 levels>=4）
 *  --villageDir=./dist/village         # 5级目录（必传于 levels>=5）
 *  --excludeHKTW                       # 过滤港澳台
 *  --gzip                              # 额外输出 .gz
 *  --timeout=20000 --retries=3
 */

 import fs from 'node:fs'
 import zlib from 'node:zlib'
 import axios from 'axios'
 import { glob } from 'glob'
 import pinyin from 'pinyin'
 
 // ---------------- CLI ----------------
 const args = process.argv.slice(2)
 const getArg = (name, def = undefined) => {
   const hit = args.find(a => a === `--${name}` || a.startsWith(`--${name}=`))
   if (!hit) return def
   const parts = hit.split('=')
   return parts.length > 1 ? parts.slice(1).join('=') : true
 }
 
 const LEVELS       = Number(getArg('levels', 3))
 const OUT          = getArg('out', 'china-areas.full.json')
 const PREV         = getArg('prev')
 const PCA_LOCAL    = getArg('pca') // 本地 pca-code.json
 const TOWN_DIR     = getArg('townDir')
 const VILLAGE_DIR  = getArg('villageDir')
 const INCLUDE_HKTW = getArg('includeHKTW', true) && !getArg('excludeHKTW', false)
 const TIMEOUT      = Number(getArg('timeout', 20000))
 const RETRIES      = Number(getArg('retries', 3))
 const DO_GZIP      = !!getArg('gzip', false)
 
 const PCA_URL = 'https://raw.githubusercontent.com/modood/Administrative-divisions-of-China/master/dist/pca-code.json'
 
 // --------------- Utils ---------------
 const sleep = ms => new Promise(r => setTimeout(r, ms))
 
 async function httpGetJson(url, { timeout = TIMEOUT, retries = RETRIES } = {}) {
   let lastErr
   for (let i = 0; i <= retries; i++) {
     try {
       const { data } = await axios.get(url, { timeout, responseType: 'json' })
       return data
     } catch (err) {
       lastErr = err
       const delay = 500 * (i + 1)
       console.warn(`⚠️ GET ${url} 失败（第 ${i + 1}/${retries + 1} 次），${delay}ms 后重试…`)
       await sleep(delay)
     }
   }
   throw lastErr
 }
 
 function readJson(file) {
   return JSON.parse(fs.readFileSync(file, 'utf8'))
 }
 
 function sortTree(arr) {
   return arr
     .map(n => ({
       ...n,
       children: Array.isArray(n.children) ? sortTree(n.children) : undefined
     }))
     .sort((a, b) => a.label.localeCompare(b.label, 'zh-Hans-CN'))
 }
 
 function dedupe(arr) {
   const seen = new Set()
   const out = []
   for (const n of arr) {
     const k = String(n.value)
     if (!seen.has(k)) {
       seen.add(k)
       out.push(n)
     }
   }
   return out
 }
 
 function filterHKTW(provinces) {
   return provinces.filter(p => !/^71|^81|^82/.test(String(p.value)))
 }
 
 async function readAllJsonFiles(dir) {
   const files = await glob('**/*.json', { cwd: dir, absolute: true })
   const results = []
   for (const fp of files) {
     try {
       const raw = fs.readFileSync(fp, 'utf8')
       const data = JSON.parse(raw)
       results.push({ file: fp, data })
     } catch (e) {
       console.warn(`⚠️ 读取 ${fp} 失败：${e.message}`)
     }
   }
   return results
 }
 
 function bucketByPrefix(list, prefixLen) {
   const map = new Map()
   for (const item of list) {
     const code = String(item.code || item.value)
     const key = code.slice(0, prefixLen)
     if (!map.has(key)) map.set(key, [])
     map.get(key).push(item)
   }
   return map
 }
 
 // ------ Pinyin / Aliases Enhance ------
 function toPinyinWords(han) {
   const arr = pinyin(han, { style: pinyin.STYLE_NORMAL })
   return arr.map(syls => syls[0] || '')
 }
 
 function buildEnhanceFields(label) {
   const words = toPinyinWords(label)
   const full = words.join(' ')                      // "bei jing shi"
   const abbr = words.map(w => w[0] || '').join('')  // "bjs"
 
   const weakTerms = ['市辖区','市辖县','自治区直辖县级行政区划','省直辖县级行政区划']
   const aliases = []
   // 简化别名：去掉末尾常见后缀（便于检索）
   const simplified = label.replace(/[市县区盟旗]$/u, '')
   if (simplified && simplified !== label && !weakTerms.includes(label)) {
     aliases.push(simplified)
   }
 
   const search = [label, full, abbr, ...aliases].join(' ').trim()
   return { pinyin: full, abbr, aliases, search }
 }
 
 // -------- Incremental Merge ----------
 function indexOldTree(oldRootArr) {
   const map = new Map()
   const dfs = (node) => {
     map.set(String(node.value), node)
     if (Array.isArray(node.children)) {
       for (const c of node.children) dfs(c)
     }
   }
   for (const n of oldRootArr || []) dfs(n)
   return map
 }
 
 function isStructurallySame(newNode, oldNode) {
   if (!oldNode) return false
   if (newNode.label !== oldNode.label) return false
 
   const nc = newNode.children || []
   const oc = oldNode.children || []
   if (nc.length !== oc.length) return false
 
   const setNew = new Set(nc.map(n => String(n.value)))
   for (const c of oc) {
     if (!setNew.has(String(c.value))) return false
   }
   return true
 }
 
 function mergeNodeWithOld(newNode, oldIndex) {
   const oldNode = oldIndex.get(String(newNode.value))
   let merged = { ...newNode }
 
   if (isStructurallySame(newNode, oldNode)) {
     merged = {
       ...merged,
       pinyin: oldNode.pinyin,
       abbr: oldNode.abbr,
       aliases: oldNode.aliases,
       search: oldNode.search
     }
   } else {
     Object.assign(merged, buildEnhanceFields(merged.label))
   }
 
   if (Array.isArray(newNode.children) && newNode.children.length) {
     merged.children = newNode.children.map(c => mergeNodeWithOld(c, oldIndex))
   }
 
   return merged
 }
 
 // ---------------- Main ----------------
 ;(async function main() {
   console.log(`\n== 构建中国级联（4/5 级 + 增量 + 拼音）==`)
   console.log(`- levels: ${LEVELS}`)
   console.log(`- out: ${OUT}`)
   if (PREV) console.log(`- prev: ${PREV}`)
   if (PCA_LOCAL) console.log(`- pca(local): ${PCA_LOCAL}`)
   if (TOWN_DIR) console.log(`- townDir: ${TOWN_DIR}`)
   if (VILLAGE_DIR) console.log(`- villageDir: ${VILLAGE_DIR}`)
   console.log(`- includeHKTW: ${INCLUDE_HKTW}`)
   console.log(`- gzip: ${DO_GZIP}\n`)
 
   // 旧树索引
   let oldIndex = new Map()
   if (PREV && fs.existsSync(PREV)) {
     try {
       const old = readJson(PREV)
       oldIndex = indexOldTree(old)
       console.log(`🗂️ 载入旧文件 ${PREV}，节点数：${oldIndex.size}`)
     } catch (e) {
       console.warn(`⚠️ 读取 prev 失败：${e.message}`)
     }
   }
 
   // 1) 3级：省/市/区
   let pca
   if (PCA_LOCAL) {
     console.log(`📖 使用本地 pca-code.json：${PCA_LOCAL}`)
     pca = readJson(PCA_LOCAL)
   } else {
     console.log(`📥 下载省/市/区：${PCA_URL}`)
     pca = await httpGetJson(PCA_URL)
   }
 
   const mapNode3 = (node) => ({
     value: String(node.code),
     label: String(node.name),
     children: Array.isArray(node.children) ? node.children.map(mapNode3) : undefined
   })
 
   let cascader = sortTree(pca.map(mapNode3))
   cascader = dedupe(cascader)
   if (!INCLUDE_HKTW) cascader = filterHKTW(cascader)
 
   // 2) 4级：乡镇（9位）
   if (LEVELS >= 4) {
     if (!TOWN_DIR) {
       console.error('❌ levels>=4 需要 --townDir 指定乡镇目录')
       process.exit(2)
     }
     console.log(`🧩 拼接乡镇/街道（9 位码） from ${TOWN_DIR}`)
     const townFiles = await readAllJsonFiles(TOWN_DIR)
 
     const towns = []
     for (const { data } of townFiles) {
       if (Array.isArray(data)) {
         for (const t of data) {
           const code = String(t.code ?? t.value ?? '')
           const name = String(t.name ?? t.label ?? '')
           if (/^\d{9}$/.test(code)) towns.push({ code, name })
         }
       } else if (data && typeof data === 'object') {
         for (const key of Object.keys(data)) {
           const arr = data[key]
           if (Array.isArray(arr)) {
             for (const t of arr) {
               const code = String(t.code ?? t.value ?? '')
               const name = String(t.name ?? t.label ?? '')
               if (/^\d{9}$/.test(code)) towns.push({ code, name })
             }
           }
         }
       }
     }
 
     const townBuckets = bucketByPrefix(towns, 6)
     let attached = 0
     for (const prov of cascader) {
       if (!prov.children) continue
       for (const city of prov.children) {
         if (!city.children) continue
         for (const dist of city.children) {
           const k6 = String(dist.value).slice(0, 6)
           const arr = townBuckets.get(k6)
           if (arr && arr.length) {
             const children = arr.map(t => ({ value: t.code, label: t.name }))
             dist.children = sortTree(dedupe([...(dist.children || []), ...children]))
             attached += arr.length
           }
         }
       }
     }
     console.log(`✅ 乡镇/街道已挂接：${attached} 条`)
   }
 
   // 3) 5级：村（12位）
   if (LEVELS >= 5) {
     if (!VILLAGE_DIR) {
       console.error('❌ levels>=5 需要 --villageDir 指定村目录')
       process.exit(3)
     }
     console.log(`🧩 拼接村/居（12 位码） from ${VILLAGE_DIR}`)
     const villageFiles = await readAllJsonFiles(VILLAGE_DIR)
 
     const villages = []
     for (const { data } of villageFiles) {
       if (Array.isArray(data)) {
         for (const v of data) {
           const code = String(v.code ?? v.value ?? '')
           const name = String(v.name ?? v.label ?? '')
           if (/^\d{12}$/.test(code)) villages.push({ code, name })
         }
       } else if (data && typeof data === 'object') {
         for (const key of Object.keys(data)) {
           const arr = data[key]
           if (Array.isArray(arr)) {
             for (const v of arr) {
               const code = String(v.code ?? v.value ?? '')
               const name = String(v.name ?? v.label ?? '')
               if (/^\d{12}$/.test(code)) villages.push({ code, name })
             }
           }
         }
       }
     }
 
     const villageBuckets = bucketByPrefix(villages, 9)
     let attached = 0
 
     for (const prov of cascader) {
       if (!prov.children) continue
       for (const city of prov.children) {
         if (!city.children) continue
         for (const dist of city.children) {
           if (!dist.children) continue
           for (const town of dist.children) {
             const k9 = String(town.value).slice(0, 9)
             const arr = villageBuckets.get(k9)
             if (arr && arr.length) {
               const children = arr.map(v => ({ value: v.code, label: v.name }))
               town.children = sortTree(dedupe([...(town.children || []), ...children]))
               attached += arr.length
             }
           }
         }
       }
     }
     console.log(`✅ 村/居 已挂接：${attached} 条`)
   }
 
   // 4) 增量合并 + 拼音增强
   const oldIndex = PREV && fs.existsSync(PREV) ? indexOldTree(readJson(PREV)) : new Map()
   const enhanceRecursively = (node) => {
     // 保底：如果没有增量参照，也要生成拼音增强
     if (!('pinyin' in node)) Object.assign(node, buildEnhanceFields(node.label))
     if (Array.isArray(node.children)) node.children.forEach(enhanceRecursively)
   }
 
   let merged = cascader.map(n => mergeNodeWithOld(n, oldIndex))
   // 对没有 prev 的场景，确保增强字段存在
   merged.forEach(enhanceRecursively)
 
   // 5) 写出
   merged = sortTree(merged)
   fs.writeFileSync(OUT, JSON.stringify(merged, null, 2), 'utf8')
   const sizeKB = (fs.statSync(OUT).size / 1024).toFixed(1)
   console.log(`\n🎉 完成！输出 -> ${OUT}（约 ${sizeKB} KB）`)
 
   if (DO_GZIP) {
     const gz = zlib.gzipSync(fs.readFileSync(OUT))
     fs.writeFileSync(`${OUT}.gz`, gz)
     const gk = (gz.length / 1024).toFixed(1)
     console.log(`🗜️ 同步输出 -> ${OUT}.gz（约 ${gk} KB）`)
   }
   console.log('')
 })().catch(err => {
   console.error('❌ 发生错误：', err?.message || err)
   process.exit(1)
 })
 