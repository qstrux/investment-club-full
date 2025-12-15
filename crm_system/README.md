# 三层漏斗CRM系统开发项目

## 项目概述

这是一个基于三层漏斗增长模型（ToFu → MoFu → BoFu）的企业级CRM运营系统，旨在将私域客户管理、员工培训、数据分析、风控管理等业务流程完全数字化。

## 核心目标

1. **数字化三层漏斗模型**：接粉 → 留群 → 粘度 → 开户 → 首金 → 入金 → 大额 → 留存
2. **全流程管理**：员工、客户、内容、SOP 全流程自动化管理
3. **可复制增长**：让每个员工都能"像高手一样工作"

## 项目结构

```
crm_system/
├── docs/                    # 文档目录
│   ├── PRD/                # 产品需求文档
│   ├── architecture/       # 系统架构设计
│   ├── database/           # 数据库设计
│   ├── api/                # API文档
│   └── workflows/          # 业务流程图
├── frontend/               # 前端代码
├── backend/                # 后端代码
├── database/               # 数据库脚本
└── deployment/             # 部署配置
```

## 技术栈

### 前端
- **框架**: React + Next.js
- **UI库**: Ant Design / Material-UI
- **状态管理**: Redux Toolkit / Zustand
- **图表**: ECharts / Recharts
- **移动端**: React Native / UniApp

### 后端
- **框架**: Node.js + Express / NestJS
- **数据库**: PostgreSQL (主库) + Redis (缓存)
- **搜索**: ElasticSearch
- **分析**: ClickHouse
- **消息队列**: RabbitMQ / Kafka

### DevOps
- **容器化**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **监控**: Prometheus + Grafana

## 开发阶段

### 第一阶段 (30天 - MVP)
- ✅ CRM客户管理
- ✅ 每日报表系统
- ✅ 素材库与话术库
- ✅ 基础仪表板

### 第二阶段 (60天 - 标准版)
- ⏳ 完整仪表板
- ⏳ 员工任务系统
- ⏳ 培训考核系统
- ⏳ 风控预警系统

### 第三阶段 (90天 - 企业版)
- ⏳ AI智能推荐
- ⏳ 客户行为预测
- ⏳ 移动端App
- ⏳ 多团队协作

## 快速开始

详细的开发文档请查看 `docs/` 目录。

## 许可证

私有项目 - 保留所有权利
