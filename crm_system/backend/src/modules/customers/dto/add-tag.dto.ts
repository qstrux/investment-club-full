import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddTagDto {
    @ApiProperty({ description: '标签ID', example: 1 })
    @IsInt()
    tagId: number;

    @ApiProperty({ description: '操作员工ID', example: 1 })
    @IsInt()
    taggedBy: number;
}
