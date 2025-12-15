import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsBoolean, IsString } from 'class-validator';

export class UpdateMofuStatsDto {
    @ApiProperty({ description: '客户ID', example: 1 })
    @IsInt()
    customerId: number;

    @ApiPropertyOptional({ description: '增加对话数' })
    @IsOptional()
    @IsInt()
    addConversations?: number;

    @ApiPropertyOptional({ description: '增加高质量对话数' })
    @IsOptional()
    @IsInt()
    addHighQualityConversations?: number;

    @ApiPropertyOptional({ description: '增加反问数' })
    @IsOptional()
    @IsInt()
    addCounterQuestions?: number;

    @ApiPropertyOptional({ description: '是否开户' })
    @IsOptional()
    @IsBoolean()
    accountOpened?: boolean;

    @ApiPropertyOptional({ description: '开户平台' })
    @IsOptional()
    @IsString()
    accountPlatform?: string;
}
