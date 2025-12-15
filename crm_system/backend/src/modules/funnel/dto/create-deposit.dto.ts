import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsInt,
    IsNumber,
    IsString,
    IsOptional,
    IsEnum,
    Min,
} from 'class-validator';

export class CreateDepositDto {
    @ApiProperty({ description: '客户ID', example: 1 })
    @IsInt()
    customerId: number;

    @ApiProperty({ description: '员工ID', example: 1 })
    @IsInt()
    employeeId: number;

    @ApiProperty({ description: '金额', example: 1000.0 })
    @IsNumber()
    @Min(0)
    amount: number;

    @ApiPropertyOptional({ description: '货币', default: 'USD' })
    @IsOptional()
    @IsString()
    currency?: string;

    @ApiProperty({
        description: '入金类型',
        enum: ['首金', '复入金', '大额入金'],
    })
    @IsEnum(['首金', '复入金', '大额入金'])
    depositType: string;

    @ApiPropertyOptional({ description: '平台' })
    @IsOptional()
    @IsString()
    platform?: string;

    @ApiPropertyOptional({ description: '备注' })
    @IsOptional()
    @IsString()
    notes?: string;
}
