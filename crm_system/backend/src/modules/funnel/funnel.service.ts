import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTofuEntryDto } from './dto/create-tofu.dto';
import { UpdateMofuStatsDto } from './dto/update-mofu.dto';
import { CreateDepositDto } from './dto/create-deposit.dto';

@Injectable()
export class FunnelService {
    constructor(private prisma: PrismaService) { }

    /**
     * 记录ToFu数据（接粉）
     */
    async createTofuEntry(dto: CreateTofuEntryDto) {
        // 1. 创建ToFu记录
        const tofu = await this.prisma.funnelTofu.create({
            data: {
                customerId: dto.customerId,
                employeeId: dto.employeeId,
                contactDate: new Date(dto.contactDate),
                sourceChannel: dto.sourceChannel,
                sourceDetail: dto.sourceDetail,
                joinedGroup: dto.joinedGroup || false,
                groupName: dto.groupName,
                joinedAt: dto.joinedGroup ? new Date() : null,
            },
        });

        // 2. 更新员工KPI
        await this.updateEmployeeKpi(dto.employeeId, new Date(), {
            tofuContacts: 1,
        });

        return tofu;
    }

    /**
     * 更新MoFu数据（互动统计）
     */
    async updateMofuStats(dto: UpdateMofuStatsDto) {
        // 查找或创建MoFu记录
        let mofu = await this.prisma.funnelMofu.findFirst({
            where: { customerId: dto.customerId },
        });

        if (!mofu) {
            // 获取客户的负责人
            const customer = await this.prisma.customer.findUnique({
                where: { id: dto.customerId },
            });
            if (!customer || !customer.assignedEmployeeId) {
                throw new NotFoundException('客户未分配负责人，无法创建MoFu记录');
            }

            mofu = await this.prisma.funnelMofu.create({
                data: {
                    customerId: dto.customerId,
                    employeeId: customer.assignedEmployeeId,
                },
            });
        }

        // 更新数据
        const updateData: any = {};
        if (dto.addConversations) {
            updateData.totalConversations = { increment: dto.addConversations };
        }
        if (dto.addHighQualityConversations) {
            updateData.highQualityConversations = {
                increment: dto.addHighQualityConversations,
            };
        }
        if (dto.addCounterQuestions) {
            updateData.totalCounterQuestions = { increment: dto.addCounterQuestions };
        }
        if (dto.accountOpened !== undefined) {
            updateData.accountOpened = dto.accountOpened;
            if (dto.accountOpened) {
                updateData.openedAt = new Date();
                updateData.accountPlatform = dto.accountPlatform;
            }
        }

        const updatedMofu = await this.prisma.funnelMofu.update({
            where: { id: mofu.id },
            data: updateData,
        });

        // 更新员工KPI
        if (dto.addHighQualityConversations || dto.addCounterQuestions || dto.accountOpened) {
            const kpiUpdate: any = {};
            if (dto.addHighQualityConversations) kpiUpdate.mofuQualityConversations = dto.addHighQualityConversations;
            if (dto.addCounterQuestions) kpiUpdate.mofuCounterQuestions = dto.addCounterQuestions;
            if (dto.accountOpened) kpiUpdate.mofuAccountsOpened = 1;

            await this.updateEmployeeKpi(Number(mofu.employeeId), new Date(), kpiUpdate);
        }

        return updatedMofu;
    }

    /**
     * 记录入金（BoFu）
     */
    async createDeposit(dto: CreateDepositDto) {
        // 1. 生成入金编号
        const depositCode = `DEP_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // 2. 创建入金记录
        const deposit = await this.prisma.deposit.create({
            data: {
                depositCode,
                customerId: dto.customerId,
                employeeId: dto.employeeId,
                amount: dto.amount,
                currency: dto.currency || 'USD',
                depositType: dto.depositType,
                platform: dto.platform,
                notes: dto.notes,
                status: 'confirmed', // 简化流程，直接确认
                depositedAt: new Date(),
                confirmedAt: new Date(),
            },
        });

        // 3. 更新BoFu统计
        let bofu = await this.prisma.funnelBofu.findFirst({
            where: { customerId: dto.customerId },
        });

        if (!bofu) {
            bofu = await this.prisma.funnelBofu.create({
                data: {
                    customerId: dto.customerId,
                    employeeId: dto.employeeId,
                },
            });
        }

        const isFirstDeposit = bofu.depositCount === 0;

        await this.prisma.funnelBofu.update({
            where: { id: bofu.id },
            data: {
                totalDeposits: { increment: dto.amount },
                netDeposit: { increment: dto.amount },
                depositCount: { increment: 1 },
                firstDepositAmount: isFirstDeposit ? dto.amount : undefined,
                firstDepositAt: isFirstDeposit ? new Date() : undefined,
                maxDepositAmount: dto.amount > Number(bofu.maxDepositAmount || 0) ? dto.amount : undefined,
            },
        });

        // 4. 更新客户LTV和阶段
        await this.prisma.customer.update({
            where: { id: dto.customerId },
            data: {
                currentStage: 'Action', // 入金后进入Action阶段
                ltvPrediction: { increment: dto.amount }, // 简单预测
            },
        });

        // 5. 更新员工KPI
        await this.updateEmployeeKpi(dto.employeeId, new Date(), {
            bofuDepositsCount: 1,
            bofuDepositAmount: dto.amount,
            bofuNetDeposit: dto.amount,
        });

        return deposit;
    }

    /**
     * 查询ToFu列表
     */
    async findAllTofu(query: any) {
        const { page = 1, pageSize = 20, customerId } = query;
        const skip = (page - 1) * pageSize;
        const where: any = {};
        if (customerId) where.customerId = Number(customerId);

        const [data, total] = await Promise.all([
            this.prisma.funnelTofu.findMany({
                where,
                skip,
                take: Number(pageSize),
                orderBy: { contactDate: 'desc' },
                include: {
                    customer: { select: { name: true, customerCode: true } },
                    employee: { select: { name: true } },
                },
            }),
            this.prisma.funnelTofu.count({ where }),
        ]);

        return { data, meta: { total, page, pageSize } };
    }

    /**
     * 查询MoFu列表
     */
    async findAllMofu(query: any) {
        const { page = 1, pageSize = 20, customerId } = query;
        const skip = (page - 1) * pageSize;
        const where: any = {};
        if (customerId) where.customerId = Number(customerId);

        const [data, total] = await Promise.all([
            this.prisma.funnelMofu.findMany({
                where,
                skip,
                take: Number(pageSize),
                orderBy: { updatedAt: 'desc' },
                include: {
                    customer: { select: { name: true, customerCode: true } },
                },
            }),
            this.prisma.funnelMofu.count({ where }),
        ]);

        return { data, meta: { total, page, pageSize } };
    }

    /**
     * 查询入金列表 (BoFu)
     */
    async findAllDeposits(query: any) {
        const { page = 1, pageSize = 20, customerId } = query;
        const skip = (page - 1) * pageSize;
        const where: any = {};
        if (customerId) where.customerId = Number(customerId);

        const [data, total] = await Promise.all([
            this.prisma.deposit.findMany({
                where,
                skip,
                take: Number(pageSize),
                orderBy: { depositedAt: 'desc' },
                include: {
                    customer: { select: { name: true, customerCode: true } },
                    employee: { select: { name: true } },
                },
            }),
            this.prisma.deposit.count({ where }),
        ]);

        return { data, meta: { total, page, pageSize } };
    }

    /**
     * 辅助方法：更新员工KPI
     */
    private async updateEmployeeKpi(employeeId: number, date: Date, increments: any) {
        const dateStr = date.toISOString().split('T')[0];
        const kpiDate = new Date(dateStr);

        // 构建increment对象
        const updateData: any = {};
        for (const [key, value] of Object.entries(increments)) {
            updateData[key] = { increment: value };
        }

        // 尝试更新，如果不存在则创建
        try {
            await this.prisma.employeeKpi.upsert({
                where: {
                    employeeId_date: {
                        employeeId: BigInt(employeeId),
                        date: kpiDate,
                    },
                },
                update: updateData,
                create: {
                    employeeId: BigInt(employeeId),
                    date: kpiDate,
                    ...increments,
                },
            });
        } catch (error) {
            console.error('更新KPI失败:', error);
        }
    }
}
