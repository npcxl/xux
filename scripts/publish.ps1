# PowerShell 发布脚本
$ErrorActionPreference = "Stop"

Write-Host "📦 开始发布流程..." -ForegroundColor Cyan

# 1. 确保在主分支
$branch = git branch --show-current
if ($branch -ne "main" -and $branch -ne "master") {
    Write-Host "❌ 请在 main 或 master 分支上发布" -ForegroundColor Red
    exit 1
}

# 2. 确保工作区干净
$status = git status --porcelain
if ($status) {
    Write-Host "❌ 工作区有未提交的更改，请先提交" -ForegroundColor Red
    exit 1
}

# 3. 拉取最新代码
Write-Host "⬇️ 拉取最新代码..." -ForegroundColor Yellow
git pull

# 4. 安装依赖
Write-Host "📥 安装依赖..." -ForegroundColor Yellow
pnpm install

# 5. 构建 UI 库
Write-Host "🔨 构建 UI 组件库..." -ForegroundColor Yellow
pnpm run build:ui

# 6. 发布到 npm
Write-Host "🚀 发布到 npm..." -ForegroundColor Yellow
Set-Location packages\ui
npm publish --access public
Set-Location ..\..

# 7. 构建 Demo
Write-Host "🔨 构建 Demo 应用..." -ForegroundColor Yellow
pnpm run build:demo

Write-Host "✅ 发布完成！" -ForegroundColor Green
Write-Host "📝 不要忘记创建 Git tag 和推送：" -ForegroundColor Cyan

$version = (Get-Content packages\ui\package.json | ConvertFrom-Json).version
Write-Host "   git tag v$version" -ForegroundColor White
Write-Host "   git push --tags" -ForegroundColor White

