import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class UpdateStageDto {
    @ApiProperty({
        description: '目标阶段',
        enum: [
            'Awareness',
            'Attention',
            'Trust',
            'Engage',
            'Action',
            'Subscribe',
            'Growth',
            'Loyal',
            'Advocate',
        ],
        example: 'Engage',
    })
    @IsString()
    @IsEnum([
        'Awareness',
        'Attention',
        'Trust',
        'Engage',
        'Action',
        'Subscribe',
        'Growth',
        'Loyal',
        'Advocate',
    ])
    toStage: string;
}
