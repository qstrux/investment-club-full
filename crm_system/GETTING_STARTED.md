# 三层漏斗CRM系统 - 快速启动指南

## 🚀 快速开始

### 前置要求

- Node.js 20+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose (推荐)

### 方式一：使用Docker Compose（推荐）

```bash
# 1. 克隆项目
cd C:\Users\Qstrux\.gemini\antigravity\scratch\crm_system

# 2. 启动所有服务
docker-compose up -d

# 3. 查看服务状态
docker-compose ps

# 4. 查看日志
docker-compose logs -f backend

# 5. 访问应用
# 前端: http://localhost:3000
# 后端API: http://localhost:4000/api
# API文档: http://localhost:4000/api-docs
```

### 方式二：本地开发

#### 后端启动

```bash
# 1. 进入后端目录
cd backend

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入数据库连接信息

# 4. 生成Prisma Client
npx prisma generate

# 5. 运行数据库迁移
npx prisma migrate dev

# 6. 启动开发服务器
npm run start:dev

# 服务将在 http://localhost:4000 启动
# API文档: http://localhost:4000/api-docs
```

#### 前端启动

```bash
# 1. 进入前端目录
cd frontend

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 服务将在 http://localhost:3000 启动
```

## 📚 项目结构

```
crm_system/
├── backend/                    # 后端服务（NestJS）
│   ├── src/
│   │   ├── main.ts            # 应用入口
│   │   ├── app.module.ts      # 主模块
│   │   ├── prisma/            # Prisma配置
│   │   └── modules/           # 业务模块
│   │       └── customers/     # 客户管理模块（示例）
│   ├── prisma/
│   │   └── schema.prisma      # 数据库Schema
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # 前端应用（Next.js）
│   ├── src/
│   │   ├── app/               # 页面路由
│   │   ├── components/        # 组件
│   │   └── lib/               # 工具库
│   └── package.json
│
├── docs/                       # 文档
│   ├── PRD/                   # 产品需求文档
│   ├── database/              # 数据库设计
│   └── architecture/          # 技术架构
│
├── docker-compose.yml          # Docker编排配置
├── README.md                   # 项目说明
├── QUICKSTART.md              # 快速启动指南
└── SUMMARY.md                 # 开发方案总结
```

## 🔧 常用命令

### 后端

```bash
# 开发
npm run start:dev              # 启动开发服务器（热重载）
npm run build                  # 构建生产版本
npm run start:prod             # 启动生产服务器

# 数据库
npx prisma generate            # 生成Prisma Client
npx prisma migrate dev         # 运行迁移（开发环境）
npx prisma migrate deploy      # 运行迁移（生产环境）
npx prisma studio              # 打开数据库GUI

# 测试
npm run test                   # 运行单元测试
npm run test:e2e               # 运行E2E测试
npm run test:cov               # 生成测试覆盖率报告

# 代码质量
npm run lint                   # 运行ESLint
npm run format                 # 格式化代码
```

### 前端

```bash
# 开发
npm run dev                    # 启动开发服务器
npm run build                  # 构建生产版本
npm run start                  # 启动生产服务器

# 代码质量
npm run lint                   # 运行ESLint
npm run type-check             # TypeScript类型检查
npm run format                 # 格式化代码
```

### Docker

```bash
# 启动所有服务
docker-compose up -d

# 启动特定服务
docker-compose up -d postgres redis

# 查看日志
docker-compose logs -f backend
docker-compose logs -f frontend

# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 停止并删除容器和数据卷
docker-compose down -v

# 重新构建镜像
docker-compose build --no-cache
```

## 📖 API文档

启动后端服务后，访问：
- **Swagger UI**: http://localhost:4000/api-docs

主要API端点：

```
POST   /api/auth/login          # 登录
POST   /api/auth/register       # 注册

GET    /api/customers           # 获取客户列表
POST   /api/customers           # 创建客户
GET    /api/customers/:id       # 获取客户详情
PATCH  /api/customers/:id       # 更新客户
DELETE /api/customers/:id       # 删除客户
PATCH  /api/customers/:id/stage # 更新客户阶段
POST   /api/customers/:id/tags  # 添加标签

GET    /api/employees           # 获取员工列表
GET    /api/employees/:id/kpis  # 获取员工KPI

GET    /api/reports/daily       # 每日报表
GET    /api/reports/dashboard   # 仪表板数据
```

## 🔐 默认账号

```
用户名: admin
密码: admin123
```

**⚠️ 生产环境请务必修改默认密码！**

## 🐛 故障排查

### 数据库连接失败

```bash
# 检查PostgreSQL是否运行
docker-compose ps postgres

# 查看PostgreSQL日志
docker-compose logs postgres

# 重启PostgreSQL
docker-compose restart postgres
```

### 端口被占用

```bash
# Windows查看端口占用
netstat -ano | findstr :4000

# 杀死进程
taskkill /PID <进程ID> /F
```

### Prisma错误

```bash
# 重新生成Prisma Client
npx prisma generate

# 重置数据库（⚠️ 会删除所有数据）
npx prisma migrate reset
```

## 📞 获取帮助

- 查看文档：[docs/](./docs/)
- 查看API文档：http://localhost:4000/api-docs
- 查看数据库：`npx prisma studio`

## 🎯 下一步

1. 阅读[产品概述](./docs/PRD/01_产品概述.md)了解业务模型
2. 阅读[功能详细设计](./docs/PRD/02_功能详细设计.md)了解功能规格
3. 阅读[技术架构设计](./docs/architecture/技术架构设计.md)了解系统架构
4. 开始开发新功能！

---

**祝您开发愉快！** 🚀
