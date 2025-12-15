import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    IsUrl,
} from 'class-validator';

export class CreateMaterialDto {
    @ApiProperty({ description: '类型', enum: ['image', 'video', 'text', 'mixed'] })
    @IsEnum(['image', 'video', 'text', 'mixed'])
    type: string;

    @ApiProperty({ description: '分类', example: '生活自律' })
    @IsString()
    category: string;

    @ApiPropertyOptional({ description: '子分类' })
    @IsOptional()
    @IsString()
    subcategory?: string;

    @ApiPropertyOptional({ description: '标题' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional({ description: '内容' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({ description: '媒体URL' })
    @IsOptional()
    @IsUrl()
    mediaUrl?: string;

    @ApiPropertyOptional({ description: '缩略图URL' })
    @IsOptional()
    @IsUrl()
    thumbnailUrl?: string;

    @ApiPropertyOptional({ description: '配文' })
    @IsOptional()
    @IsString()
    caption?: string;

    @ApiPropertyOptional({ description: '标签' })
    @IsOptional()
    @IsArray()
    tags?: string[];

    @ApiPropertyOptional({ description: '适用阶段', example: ['ToFu', 'MoFu'] })
    @IsOptional()
    @IsArray()
    suitableStages?: string[];
}
