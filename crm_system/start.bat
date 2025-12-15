@echo off
echo ========================================
echo 三层漏斗CRM系统 - 自动启动脚本
echo ========================================
echo.

echo [1/6] 检查Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未检测到Node.js，请先安装Node.js 20+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js已安装

echo.
echo [2/6] 进入后端目录...
cd /d "%~dp0backend"
if %errorlevel% neq 0 (
    echo ❌ 错误: 无法进入backend目录
    pause
    exit /b 1
)
echo ✅ 已进入backend目录

echo.
echo [3/6] 安装依赖（可能需要5-10分钟）...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 错误: npm install失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

echo.
echo [4/6] 检查环境变量文件...
if not exist ".env" (
    echo 📝 创建.env文件...
    copy .env.example .env
    echo.
    echo ⚠️  请编辑 backend\.env 文件，配置数据库连接
    echo    DATABASE_URL="postgresql://postgres:password@localhost:5432/crm_db?schema=public"
    echo.
    pause
)
echo ✅ 环境变量文件已存在

echo.
echo [5/6] 生成Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ❌ 错误: Prisma生成失败
    pause
    exit /b 1
)
echo ✅ Prisma Client生成完成

echo.
echo [6/6] 启动开发服务器...
echo.
echo ========================================
echo 🚀 服务即将启动...
echo 📍 API地址: http://localhost:4000/api
echo 📚 API文档: http://localhost:4000/api-docs
echo ========================================
echo.
echo 按 Ctrl+C 停止服务器
echo.

call npm run start:dev
