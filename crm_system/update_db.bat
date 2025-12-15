@echo off
echo ========================================
echo 三层漏斗CRM系统 - 数据库迁移脚本
echo ========================================
echo.

cd backend

echo [1/2] 生成Prisma Client...
call npx prisma generate

echo.
echo [2/2] 运行数据库迁移...
echo 请输入迁移名称（例如: add_funnel_tables），直接回车默认为 update_schema
set /p name="迁移名称: "
if "%name%"=="" set name=update_schema

call npx prisma migrate dev --name %name%

echo.
echo ✅ 数据库迁移完成！
pause
