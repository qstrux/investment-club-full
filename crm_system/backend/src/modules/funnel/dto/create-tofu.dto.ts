import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsInt,
    IsDateString,
    IsString,
    IsOptional,
    IsBoolean,
} from 'class-validator';

export class CreateTofuEntryDto {
    @ApiProperty({ description: '客户ID', example: 1 })
    @IsInt()
    customerId: number;

    @ApiProperty({ description: '员工ID', example: 1 })
    @IsInt()
    employeeId: number;

    @ApiProperty({ description: '接触日期', example: '2025-11-30' })
    @IsDateString()
    contactDate: string;

    @ApiProperty({ description: '来源渠道', example: 'TikTok' })
    @IsString()
    sourceChannel: string;

    @ApiPropertyOptional({ description: '来源详情' })
    @IsOptional()
    @IsString()
    sourceDetail?: string;

    @ApiPropertyOptional({ description: '是否进群' })
    @IsOptional()
    @IsBoolean()
    joinedGroup?: boolean;

    @ApiPropertyOptional({ description: '群名称' })
    @IsOptional()
    @IsString()
    groupName?: string;
}
