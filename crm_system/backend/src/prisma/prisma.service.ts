import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect();
        console.log('✅ 数据库连接成功');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('👋 数据库连接已断开');
    }

    /**
     * 清理数据库（仅用于测试环境）
     */
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('不能在生产环境清理数据库！');
        }

        // 按依赖顺序删除
        const models = [
            'conversationEvent',
            'conversation',
            'withdrawal',
            'deposit',
            'funnelBofu',
            'funnelMofu',
            'funnelTofu',
            'customerJourney',
            'customerTag',
            'customer',
            'employeeKpi',
            'employee',
            'script',
            'material',
            'tag',
        ];

        for (const model of models) {
            await this[model].deleteMany();
        }

        console.log('🧹 数据库已清理');
    }
}
