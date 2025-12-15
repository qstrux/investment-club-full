import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    IsEnum,
    MinLength,
    MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
    @ApiProperty({ description: '员工姓名', example: '张三' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ description: '头像URL' })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiProperty({ description: '邮箱', example: 'zhangsan@example.com' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: '电话' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: '用户名', example: 'zhangsan' })
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    username: string;

    @ApiProperty({ description: '密码', example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: '角色',
        enum: ['admin', 'manager', 'employee', 'trainer'],
        example: 'employee',
    })
    @IsEnum(['admin', 'manager', 'employee', 'trainer'])
    role: string;

    @ApiPropertyOptional({ description: '部门', example: 'ToFu' })
    @IsOptional()
    @IsString()
    department?: string;

    @ApiPropertyOptional({
        description: '等级',
        enum: ['新人', '组员', 'A级执行者', '精英', '高手', '主管'],
        default: '新人',
    })
    @IsOptional()
    @IsEnum(['新人', '组员', 'A级执行者', '精英', '高手', '主管'])
    level?: string;
}
