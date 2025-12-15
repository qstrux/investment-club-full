import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { QueryMaterialsDto } from './dto/query-materials.dto';

@ApiTags('materials')
@ApiBearerAuth()
@Controller('materials')
export class MaterialsController {
    constructor(private readonly materialsService: MaterialsService) { }

    @Post()
    @ApiOperation({ summary: '创建素材' })
    @ApiResponse({ status: 201, description: '素材创建成功' })
    create(@Body() createMaterialDto: CreateMaterialDto) {
        // 假设从请求中获取用户ID
        const userId = 1;
        return this.materialsService.create(createMaterialDto, userId);
    }

    @Get()
    @ApiOperation({ summary: '获取素材列表' })
    @ApiResponse({ status: 200, description: '返回素材列表' })
    findAll(@Query() query: QueryMaterialsDto) {
        return this.materialsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取素材详情' })
    @ApiResponse({ status: 200, description: '返回素材详情' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.materialsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新素材' })
    @ApiResponse({ status: 200, description: '素材更新成功' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateMaterialDto: UpdateMaterialDto,
    ) {
        return this.materialsService.update(id, updateMaterialDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除素材' })
    @ApiResponse({ status: 200, description: '素材删除成功' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.materialsService.remove(id);
    }

    @Post(':id/publish')
    @ApiOperation({ summary: '记录素材发布' })
    @ApiResponse({ status: 200, description: '记录成功' })
    recordPublish(@Param('id', ParseIntPipe) id: number) {
        return this.materialsService.recordPublish(id);
    }
}
