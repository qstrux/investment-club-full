import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeesDto } from './dto/query-employees.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }

    /**
     * 创建员工
     */
    async create(createEmployeeDto: CreateEmployeeDto) {
        // 检查用户名或邮箱是否存在
        const existingEmployee = await this.prisma.employee.findFirst({
            where: {
                OR: [
                    { username: createEmployeeDto.username },
                    { email: createEmployeeDto.email },
                ],
            },
        });

        if (existingEmployee) {
            throw new ConflictException('用户名或邮箱已存在');
        }

        // 生成员工编号
        const employeeCode = await this.generateEmployeeCode();

        // 加密密码
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(createEmployeeDto.password, salt);

        // 移除明文密码
        const { password, ...employeeData } = createEmployeeDto;

        const employee = await this.prisma.employee.create({
            data: {
                ...employeeData,
                employeeCode,
                passwordHash,
                status: 'active',
                hiredAt: new Date(),
            },
        });

        // 返回时不包含密码哈希
        const { passwordHash: _, ...result } = employee;
        return result;
    }

    /**
     * 验证凭据 (用于登录)
     */
    async validateCredentials(username: string, pass: string): Promise<any> {
        const user = await this.prisma.employee.findUnique({
            where: { username },
        });

        if (user && user.status === 'active') {
            const isMatch = await bcrypt.compare(pass, user.passwordHash);
            if (isMatch) {
                const { passwordHash, ...result } = user;
                return result;
            }
        }
        return null;
    }

    /**
     * 查询员工列表
     */
    async findAll(query: QueryEmployeesDto) {
        const {
            page = 1,
            pageSize = 20,
            search,
            role,
            department,
            status,
        } = query;

        const skip = (page - 1) * pageSize;

        const where: any = {};

        if (status) where.status = status;
        if (role) where.role = role;
        if (department) where.department = department;

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { employeeCode: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [employees, total] = await Promise.all([
            this.prisma.employee.findMany({
                where,
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    employeeCode: true,
                    name: true,
                    avatarUrl: true,
                    email: true,
                    phone: true,
                    username: true,
                    role: true,
                    department: true,
                    level: true,
                    status: true,
                    totalCustomers: true,
                    activeCustomers: true,
                    totalNetDeposit: true,
                    hiredAt: true,
                    createdAt: true,
                    lastLoginAt: true,
                },
            }),
            this.prisma.employee.count({ where }),
        ]);

        return {
            data: employees,
            meta: {
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        };
    }

    /**
     * 获取员工详情
     */
    async findOne(id: number) {
        const employee = await this.prisma.employee.findUnique({
            where: { id },
        });

        if (!employee) {
            throw new NotFoundException(`员工 #${id} 不存在`);
        }

        const { passwordHash, ...result } = employee;
        return result;
    }

    /**
     * 更新员工
     */
    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        await this.findOne(id);

        const data: any = { ...updateEmployeeDto };

        // 如果更新密码
        if (updateEmployeeDto.password) {
            const salt = await bcrypt.genSalt();
            data.passwordHash = await bcrypt.hash(updateEmployeeDto.password, salt);
            delete data.password;
        }

        const employee = await this.prisma.employee.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
        });

        const { passwordHash, ...result } = employee;
        return result;
    }

    /**
     * 删除员工（软删除）
     */
    async remove(id: number) {
        await this.findOne(id);

        const employee = await this.prisma.employee.update({
            where: { id },
            data: {
                status: 'inactive',
                updatedAt: new Date(),
            },
        });

        const { passwordHash, ...result } = employee;
        return result;
    }

    /**
     * 获取员工KPI
     */
    async getKpis(id: number, date?: string) {
        await this.findOne(id);

        const where: any = { employeeId: id };
        if (date) {
            where.date = new Date(date);
        }

        return this.prisma.employeeKpi.findMany({
            where,
            orderBy: { date: 'desc' },
            take: 30, // 最近30天
        });
    }

    /**
     * 生成员工编号
     */
    private async generateEmployeeCode(): Promise<string> {
        const count = await this.prisma.employee.count();
        const sequence = String(count + 1).padStart(3, '0');
        return `EMP_${sequence}`;
    }
}
