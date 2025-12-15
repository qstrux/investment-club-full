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
import { ScriptsService } from './scripts.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { UpdateScriptDto } from './dto/update-script.dto';
import { QueryScriptsDto } from './dto/query-scripts.dto';

@ApiTags('scripts')
@ApiBearerAuth()
@Controller('scripts')
export class ScriptsController {
    constructor(private readonly scriptsService: ScriptsService) { }

    @Post()
    @ApiOperation({ summary: '创建话术' })
    @ApiResponse({ status: 201, description: '话术创建成功' })
    create(@Body() createScriptDto: CreateScriptDto) {
        // 假设从请求中获取用户ID，这里暂时硬编码为1
        const userId = 1;
        return this.scriptsService.create(createScriptDto, userId);
    }

    @Get()
    @ApiOperation({ summary: '获取话术列表' })
    @ApiResponse({ status: 200, description: '返回话术列表' })
    findAll(@Query() query: QueryScriptsDto) {
        return this.scriptsService.findAll(query);
    }

    @Get('recommend')
    @ApiOperation({ summary: '推荐话术' })
    @ApiResponse({ status: 200, description: '返回推荐话术' })
    recommend(
        @Query('scenario') scenario: string,
        @Query('customerStage') customerStage?: string,
    ) {
        return this.scriptsService.recommend(scenario, customerStage);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取话术详情' })
    @ApiResponse({ status: 200, description: '返回话术详情' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.scriptsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新话术' })
    @ApiResponse({ status: 200, description: '话术更新成功' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateScriptDto: UpdateScriptDto,
    ) {
        return this.scriptsService.update(id, updateScriptDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除话术' })
    @ApiResponse({ status: 200, description: '话术删除成功' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.scriptsService.remove(id);
    }

    @Post(':id/usage')
    @ApiOperation({ summary: '记录话术使用' })
    @ApiResponse({ status: 200, description: '记录成功' })
    recordUsage(
        @Param('id', ParseIntPipe) id: number,
        @Body('isSuccess') isSuccess: boolean,
    ) {
        return this.scriptsService.recordUsage(id, isSuccess);
    }
}
