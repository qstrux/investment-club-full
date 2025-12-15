import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { QueryScriptsDto } from './dto/query-scripts.dto';

@Injectable()
export class ScriptsService {
    constructor(private prisma: PrismaService) { }

    /**
     * 创建话术
     */
    async create(createScriptDto: CreateScriptDto, userId: number) {
        const scriptCode = `SCR_${Date.now()}`;

        return this.prisma.script.create({
            data: {
                ...createScriptDto,
                scriptCode,
                createdBy: userId,
                isActive: true,
            },
        });
    }

    /**
     * 查询话术列表
     */
    async findAll(query: QueryScriptsDto) {
        const { page = 1, pageSize = 20, search, category, scenario, level } = query;
        const skip = (page - 1) * pageSize;

        const where: any = { isActive: true };

        if (category) where.category = category;
        if (scenario) where.scenario = scenario;
        if (level) where.level = level;

        if (search) {
            where.OR = [
                { contentCn: { contains: search, mode: 'insensitive' } },
                { contentEn: { contains: search, mode: 'insensitive' } },
                { scenario: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [scripts, total] = await Promise.all([
            this.prisma.script.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { usageCount: 'desc' }, // 按使用次数排序
            }),
            this.prisma.script.count({ where }),
        ]);

        return {
            data: scripts,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    /**
     * 获取话术详情
     */
    async findOne(id: number) {
        const script = await this.prisma.script.findUnique({
            where: { id },
        });

        if (!script) {
            throw new NotFoundException(`话术 #${id} 不存在`);
        }

        return script;
    }

    /**
     * 更新话术
     */
    async update(id: number, updateScriptDto: UpdateScriptDto) {
        await this.findOne(id);

        return this.prisma.script.update({
            where: { id },
            data: {
                ...updateScriptDto,
                updatedAt: new Date(),
            },
        });
    }

    /**
     * 删除话术（软删除）
     */
    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.script.update({
            where: { id },
            data: {
                isActive: false,
                updatedAt: new Date(),
            },
        });
    }

    /**
     * 智能推荐话术
     */
    async recommend(scenario: string, customerStage?: string) {
        // 简单的推荐逻辑：根据场景和客户阶段匹配
        // 后续可接入AI模型
        const where: any = {
            isActive: true,
            scenario: { contains: scenario, mode: 'insensitive' },
        };

        // 如果提供了客户阶段，可以作为过滤条件（假设tags包含阶段信息）
        // 这里简化处理，只按场景推荐

        return this.prisma.script.findMany({
            where,
            orderBy: { successRate: 'desc' }, // 按成功率排序
            take: 5,
        });
    }

    /**
     * 记录话术使用
     */
    async recordUsage(id: number, isSuccess: boolean) {
        const script = await this.findOne(id);

        const updateData: any = {
            usageCount: { increment: 1 },
        };

        if (isSuccess) {
            updateData.successCount = { increment: 1 };
        }

        // 更新成功率
        // 注意：这里需要重新计算，Prisma不支持直接在update中引用当前值计算
        // 简化处理：下次查询时计算，或者使用原生SQL
        // 这里仅更新计数

        return this.prisma.script.update({
            where: { id },
            data: updateData,
        });
    }
}
