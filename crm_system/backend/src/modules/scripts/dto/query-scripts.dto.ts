import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryScriptsDto {
    @ApiPropertyOptional({ description: '页码' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: '每页数量' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    pageSize?: number = 20;

    @ApiPropertyOptional({ description: '搜索关键词' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({ description: '分类' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({ description: '场景' })
    @IsOptional()
    @IsString()
    scenario?: string;

    @ApiPropertyOptional({ description: '等级' })
    @IsOptional()
    @IsString()
    level?: string;
}
