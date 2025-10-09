#!/bin/bash

# 发布脚本
set -e

echo "📦 开始发布流程..."

# 1. 确保在主分支
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
  echo "❌ 请在 main 或 master 分支上发布"
  exit 1
fi

# 2. 确保工作区干净
if [ -n "$(git status --porcelain)" ]; then
  echo "❌ 工作区有未提交的更改，请先提交"
  exit 1
fi

# 3. 拉取最新代码
echo "⬇️ 拉取最新代码..."
git pull

# 4. 安装依赖
echo "📥 安装依赖..."
pnpm install

# 5. 构建 UI 库
echo "🔨 构建 UI 组件库..."
pnpm run build:ui

# 6. 运行测试（如果有）
# echo "🧪 运行测试..."
# pnpm test

# 7. 发布到 npm
echo "🚀 发布到 npm..."
cd packages/ui
npm publish --access public
cd ../..

# 8. 构建 Demo
echo "🔨 构建 Demo 应用..."
pnpm run build:demo

echo "✅ 发布完成！"
echo "📝 不要忘记创建 Git tag 和推送："
echo "   git tag v$(node -p \"require('./packages/ui/package.json').version\")"
echo "   git push --tags"

