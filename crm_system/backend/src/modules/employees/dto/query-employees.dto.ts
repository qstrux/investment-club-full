import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryEmployeesDto {
    @ApiPropertyOptional({ description: '页码', example: 1, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: '每页数量', example: 20, default: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    pageSize?: number = 20;

    @ApiPropertyOptional({ description: '搜索关键词（姓名/编号/邮箱/用户名）' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: '角色' })
    @IsOptional()
    @IsString()
    role?: string;

    @ApiPropertyOptional({ description: '部门' })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiPropertyOptional({
        description: '状态',
        enum: ['active', 'inactive', 'suspended'],
    })
    @IsOptional()
    @IsEnum(['active', 'inactive', 'suspended'])
    status?: string;
}
