import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { QueryMaterialsDto } from './dto/query-materials.dto';

@Injectable()
export class MaterialsService {
    constructor(private prisma: PrismaService) { }

    /**
     * 创建素材
     */
    async create(createMaterialDto: CreateMaterialDto, userId: number) {
        const materialCode = `MAT_${Date.now()}`;

        return this.prisma.material.create({
            data: {
                ...createMaterialDto,
                materialCode,
                createdBy: userId,
                isActive: true,
            },
        });
    }

    /**
     * 查询素材列表
     */
    async findAll(query: QueryMaterialsDto) {
        const { page = 1, pageSize = 20, search, type, category, stage } = query;
        const skip = (page - 1) * pageSize;

        const where: any = { isActive: true };

        if (type) where.type = type;
        if (category) where.category = category;

        // 阶段筛选需要特殊处理，因为是JSON数组
        // Prisma目前对JSON数组的包含查询支持有限，这里简化处理
        // 实际生产中可能需要使用Raw SQL或改进Schema设计

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { caption: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [materials, total] = await Promise.all([
            this.prisma.material.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.material.count({ where }),
        ]);

        return {
            data: materials,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    /**
     * 获取素材详情
     */
    async findOne(id: number) {
        const material = await this.prisma.material.findUnique({
            where: { id },
        });

        if (!material) {
            throw new NotFoundException(`素材 #${id} 不存在`);
        }

        return material;
    }

    /**
     * 更新素材
     */
    async update(id: number, updateMaterialDto: UpdateMaterialDto) {
        await this.findOne(id);

        return this.prisma.material.update({
            where: { id },
            data: updateMaterialDto,
        });
    }

    /**
     * 删除素材（软删除）
     */
    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.material.update({
            where: { id },
            data: {
                isActive: false,
            },
        });
    }

    /**
     * 记录发布
     */
    async recordPublish(id: number) {
        await this.findOne(id);

        return this.prisma.material.update({
            where: { id },
            data: {
                publishedCount: { increment: 1 },
            },
        });
    }
}
