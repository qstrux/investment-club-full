import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ description: '用户名或邮箱', example: 'admin' })
    @IsString()
    @MinLength(3)
    username: string;

    @ApiProperty({ description: '密码', example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;
}
