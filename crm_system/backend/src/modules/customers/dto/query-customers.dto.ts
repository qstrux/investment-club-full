import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCustomersDto {
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

    @ApiPropertyOptional({ description: '搜索关键词（姓名/编号/邮箱）' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: '客户分层', enum: ['S', 'A', 'B', 'C'] })
    @IsOptional()
    @IsEnum(['S', 'A', 'B', 'C'])
    tier?: string;

    @ApiPropertyOptional({
        description: '客户阶段',
        enum: [
            'Awareness',
            'Attention',
            'Trust',
            'Engage',
            'Action',
            'Subscribe',
            'Growth',
            'Loyal',
            'Advocate',
        ],
    })
    @IsOptional()
    @IsEnum([
        'Awareness',
        'Attention',
        'Trust',
        'Engage',
        'Action',
        'Subscribe',
        'Growth',
        'Loyal',
        'Advocate',
    ])
    currentStage?: string;

    @ApiPropertyOptional({ description: '负责员工ID' })
    @IsOptional()
    @IsString()
    assignedEmployeeId?: string;

    @ApiPropertyOptional({
        description: '状态',
        enum: ['active', 'inactive', 'blacklist'],
        default: 'active',
    })
    @IsOptional()
    @IsEnum(['active', 'inactive', 'blacklist'])
    status?: string = 'active';
}
