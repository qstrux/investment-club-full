import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: '用户登录' })
    @ApiResponse({ status: 200, description: '登录成功，返回Token' })
    @ApiResponse({ status: 401, description: '用户名或密码错误' })
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('用户名或密码错误');
        }
        return this.authService.login(user);
    }
}
