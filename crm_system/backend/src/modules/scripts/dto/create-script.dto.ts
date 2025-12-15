import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsEnum,
    IsArray,
    IsObject,
} from 'class-validator';

export class CreateScriptDto {
    @ApiProperty({ description: '分类', example: '12大模型' })
    @IsString()
    category: string;

    @ApiPropertyOptional({ description: '子分类' })
    @IsOptional()
    @IsString()
    subcategory?: string;

    @ApiProperty({ description: '适用场景', example: '初次破冰' })
    @IsString()
    scenario: string;

    @ApiProperty({ description: '等级', enum: ['初级', '中级', '高级'] })
    @IsEnum(['初级', '中级', '高级'])
    level: string;

    @ApiProperty({ description: '中文内容' })
    @IsString()
    contentCn: string;

    @ApiPropertyOptional({ description: '英文内容' })
    @IsOptional()
    @IsString()
    contentEn?: string;

    @ApiPropertyOptional({ description: '话术目的' })
    @IsOptional()
    @IsString()
    purpose?: string;

    @ApiPropertyOptional({ description: '后续推荐' })
    @IsOptional()
    @IsObject()
    followUp?: any;

    @ApiPropertyOptional({ description: '标签' })
    @IsOptional()
    @IsArray()
    tags?: string[];
}
