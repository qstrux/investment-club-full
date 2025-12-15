@echo off
echo ========================================
echo 三层漏斗CRM系统 - 前端初始化脚本
echo ========================================
echo.

echo [1/3] 检查Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未检测到Node.js，请先安装Node.js 20+
    pause
    exit /b 1
)

echo.
echo [2/3] 初始化Next.js项目...
echo 正在创建 frontend 目录...
call npx create-next-app@latest frontend --typescript --tailwind --eslint --no-src-dir --import-alias "@/*" --use-npm
if %errorlevel% neq 0 (
    echo ❌ 错误: 前端初始化失败
    pause
    exit /b 1
)

echo.
echo [3/3] 安装额外依赖...
cd frontend
call npm install antd @ant-design/nextjs-registry @ant-design/cssinjs axios zustand date-fns lucide-react
if %errorlevel% neq 0 (
    echo ❌ 错误: 依赖安装失败
    pause
    exit /b 1
)

echo.
echo ✅ 前端项目初始化完成！
echo.
echo 启动方式:
echo cd frontend
echo npm run dev
echo.
pause
