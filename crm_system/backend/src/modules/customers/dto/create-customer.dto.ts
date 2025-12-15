import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    IsOptional,
    IsInt,
    IsEnum,
    IsObject,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty({ description: '客户姓名', example: 'Jay Shah' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @ApiPropertyOptional({ description: '头像URL' })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({ description: '性别', enum: ['男', '女', '未知'] })
    @IsOptional()
    @IsEnum(['男', '女', '未知'])
    gender?: string;

    @ApiPropertyOptional({ description: '年龄', example: 32 })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiPropertyOptional({ description: '微信ID' })
    @IsOptional()
    @IsString()
    wechatId?: string;

    @ApiPropertyOptional({ description: 'WhatsApp号码' })
    @IsOptional()
    @IsString()
    whatsapp?: string;

    @ApiPropertyOptional({ description: 'Telegram用户名' })
    @IsOptional()
    @IsString()
    telegram?: string;

    @ApiPropertyOptional({ description: '邮箱' })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({ description: '电话' })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiPropertyOptional({ description: '国家', example: '阿联酋' })
    @IsOptional()
    @IsString()
    country?: string;

    @ApiPropertyOptional({ description: '城市', example: '迪拜' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ description: '时区', example: 'UTC+4' })
    @IsOptional()
    @IsString()
    timezone?: string;

    @ApiPropertyOptional({ description: '语言', example: ['英语', '中文'] })
    @IsOptional()
    @IsObject()
    language?: any;

    @ApiPropertyOptional({ description: '职业' })
    @IsOptional()
    @IsString()
    occupation?: string;

    @ApiPropertyOptional({ description: '行业' })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiPropertyOptional({ description: '收入范围' })
    @IsOptional()
    @IsString()
    incomeRange?: string;

    @ApiPropertyOptional({ description: '投资经验', enum: ['新手', '中级', '高级'] })
    @IsOptional()
    @IsEnum(['新手', '中级', '高级'])
    investmentExperience?: string;

    @ApiPropertyOptional({ description: '风险偏好', enum: ['保守', '稳健', '激进'] })
    @IsOptional()
    @IsEnum(['保守', '稳健', '激进'])
    riskPreference?: string;

    @ApiPropertyOptional({ description: '资金范围' })
    @IsOptional()
    @IsString()
    capitalRange?: string;

    @ApiPropertyOptional({ description: '交易平台' })
    @IsOptional()
    @IsString()
    tradingPlatform?: string;

    @ApiPropertyOptional({ description: '兴趣爱好' })
    @IsOptional()
    @IsObject()
    interests?: any;

    @ApiPropertyOptional({ description: '性格特质' })
    @IsOptional()
    @IsObject()
    personalityTraits?: any;

    @ApiPropertyOptional({ description: '沟通风格' })
    @IsOptional()
    @IsString()
    communicationStyle?: string;

    @ApiPropertyOptional({ description: '决策风格' })
    @IsOptional()
    @IsString()
    decisionStyle?: string;

    @ApiPropertyOptional({ description: '客户类型', example: '愿意成长' })
    @IsOptional()
    @IsString()
    personaType?: string;

    @ApiPropertyOptional({ description: '来源渠道', example: 'TikTok' })
    @IsOptional()
    @IsString()
    sourceChannel?: string;

    @ApiPropertyOptional({ description: '推荐人ID' })
    @IsOptional()
    @IsInt()
    referrerId?: number;

    @ApiProperty({ description: '负责员工ID', example: 1 })
    @IsInt()
    assignedEmployeeId: number;
}
