import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { startOfDay, endOfDay, subDays } from 'date-fns';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    /**
     * 获取仪表板概览数据
     */
    async getDashboardStats() {
        const today = new Date();
        const startOfToday = startOfDay(today);
        const endOfToday = endOfDay(today);

        // 1. 获取今日核心指标
        const [
            newCustomers,
            activeCustomers,
            totalDeposits,
            netDeposits
        ] = await Promise.all([
            this.prisma.customer.count({
                where: { createdAt: { gte: startOfToday, lte: endOfToday } },
            }),
            this.prisma.customer.count({
                where: { status: 'active' },
            }),
            this.prisma.deposit.aggregate({
                where: { depositedAt: { gte: startOfToday, lte: endOfToday } },
                _sum: { amount: true },
            }),
            this.prisma.funnelBofu.aggregate({
                _sum: { netDeposit: true },
            }),
        ]);

        // 2. 获取漏斗转化数据 (简化版)
        const [tofuCount, mofuCount, bofuCount] = await Promise.all([
            this.prisma.customer.count({ where: { currentStage: { in: ['Awareness', 'Attention'] } } }),
            this.prisma.customer.count({ where: { currentStage: { in: ['Trust', 'Engage'] } } }),
            this.prisma.customer.count({ where: { currentStage: { in: ['Action', 'Subscribe', 'Growth', 'Loyal'] } } }),
        ]);

        return {
            overview: {
                newCustomers,
                activeCustomers,
                todayDeposit: totalDeposits._sum.amount || 0,
                totalNetDeposit: netDeposits._sum.netDeposit || 0,
            },
            funnel: {
                tofu: tofuCount,
                mofu: mofuCount,
                bofu: bofuCount,
            },
        };
    }

    /**
     * 获取每日报表
     */
    async getDailyReport(dateStr?: string) {
        const date = dateStr ? new Date(dateStr) : new Date();
        const start = startOfDay(date);
        const end = endOfDay(date);

        // 聚合员工KPI
        const kpis = await this.prisma.employeeKpi.groupBy({
            by: ['date'],
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
            _sum: {
                tofuContacts: true,
                tofuRetained: true,
                mofuQualityConversations: true,
                mofuAccountsOpened: true,
                bofuDepositsCount: true,
                bofuDepositAmount: true,
                bofuNetDeposit: true,
            },
        });

        const stats = kpis[0]?._sum || {};

        return {
            date: start,
            tofu: {
                contacts: stats.tofuContacts || 0,
                retained: stats.tofuRetained || 0,
            },
            mofu: {
                conversations: stats.mofuQualityConversations || 0,
                accounts: stats.mofuAccountsOpened || 0,
            },
            bofu: {
                deposits: stats.bofuDepositsCount || 0,
                amount: stats.bofuDepositAmount || 0,
                net: stats.bofuNetDeposit || 0,
            },
        };
    }

    /**
     * 获取员工绩效排行
     */
    async getEmployeeRankings(limit: number = 10) {
        // 按净入金排行
        const rankings = await this.prisma.employee.findMany({
            where: { status: 'active' },
            orderBy: { totalNetDeposit: 'desc' },
            take: limit,
            select: {
                id: true,
                name: true,
                avatarUrl: true,
                totalNetDeposit: true,
                totalCustomers: true,
            },
        });

        return rankings;
    }

    /**
     * 获取特定员工的详细绩效
     */
    async getEmployeePerformance(employeeId: number, days: number = 30) {
        const endDate = new Date();
        const startDate = subDays(endDate, days);

        const kpis = await this.prisma.employeeKpi.findMany({
            where: {
                employeeId: BigInt(employeeId),
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { date: 'asc' },
        });

        return kpis;
    }
}
