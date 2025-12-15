import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomersDto } from './dto/query-customers.dto';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) { }

    /**
     * 创建客户
     */
    async create(createCustomerDto: CreateCustomerDto) {
        // 生成客户编号
        const customerCode = await this.generateCustomerCode();

        const customer = await this.prisma.customer.create({
            data: {
                ...createCustomerDto,
                customerCode,
                currentStage: 'Awareness',
                tier: 'C',
                intentionScore: 0,
                engagementScore: 0,
            },
        });

        return customer;
    }

    /**
     * 查询客户列表
     */
    async findAll(query: QueryCustomersDto) {
        const {
            page = 1,
            pageSize = 20,
            search,
            tier,
            currentStage,
            assignedEmployeeId,
            status = 'active',
        } = query;

        const skip = (page - 1) * pageSize;

        const where: any = {
            status,
        };

        // 搜索条件
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { customerCode: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }

        // 筛选条件
        if (tier) where.tier = tier;
        if (currentStage) where.currentStage = currentStage;
        if (assignedEmployeeId) where.assignedEmployeeId = parseInt(assignedEmployeeId);

        // 查询数据
        const [customers, total] = await Promise.all([
            this.prisma.customer.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: {
                    assignedEmployee: {
                        select: {
                            id: true,
                            name: true,
                            employeeCode: true,
                        },
                    },
                    tags: {
                        include: {
                            tag: true,
                        },
                    },
                },
            }),
            this.prisma.customer.count({ where }),
        ]);

        return {
            data: customers,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    /**
     * 获取客户详情
     */
    async findOne(id: number) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                assignedEmployee: {
                    select: {
                        id: true,
                        name: true,
                        employeeCode: true,
                    },
                },
                tags: {
                    include: {
                        tag: true,
                    },
                },
                funnelTofu: true,
                funnelMofu: true,
                funnelBofu: true,
                journey: {
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!customer) {
            throw new NotFoundException(`客户 #${id} 不存在`);
        }

        return customer;
    }

    /**
     * 更新客户
     */
    async update(id: number, updateCustomerDto: UpdateCustomerDto) {
        await this.findOne(id); // 检查是否存在

        const customer = await this.prisma.customer.update({
            where: { id },
            data: {
                ...updateCustomerDto,
                updatedAt: new Date(),
            },
        });

        return customer;
    }

    /**
     * 删除客户（软删除）
     */
    async remove(id: number) {
        await this.findOne(id);

        const customer = await this.prisma.customer.update({
            where: { id },
            data: {
                status: 'inactive',
                updatedAt: new Date(),
            },
        });

        return customer;
    }

    /**
     * 更新客户阶段
     */
    async updateStage(id: number, toStage: string) {
        const customer = await this.findOne(id);

        // 记录旅程
        await this.prisma.customerJourney.create({
            data: {
                customerId: id,
                fromStage: customer.currentStage,
                toStage,
                triggerEvent: 'manual_update',
            },
        });

        // 更新客户
        return this.prisma.customer.update({
            where: { id },
            data: {
                currentStage: toStage,
                updatedAt: new Date(),
            },
        });
    }

    /**
     * 添加标签
     */
    async addTag(customerId: number, tagId: number, taggedBy: number) {
        await this.findOne(customerId);

        return this.prisma.customerTag.create({
            data: {
                customerId,
                tagId,
                taggedBy,
                isAuto: false,
            },
        });
    }

    /**
     * 移除标签
     */
    async removeTag(customerId: number, tagId: number) {
        return this.prisma.customerTag.deleteMany({
            where: {
                customerId,
                tagId,
            },
        });
    }

    /**
     * 生成客户编号
     */
    private async generateCustomerCode(): Promise<string> {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const prefix = `CUST_${year}${month}${day}`;

        // 查询今天已有的客户数量
        const count = await this.prisma.customer.count({
            where: {
                customerCode: {
                    startsWith: prefix,
                },
            },
        });

        const sequence = String(count + 1).padStart(4, '0');
        return `${prefix}_${sequence}`;
    }
}
