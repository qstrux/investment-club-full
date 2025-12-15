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
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomersDto } from './dto/query-customers.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { AddTagDto } from './dto/add-tag.dto';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Post()
    @ApiOperation({ summary: '创建客户' })
    @ApiResponse({ status: 201, description: '客户创建成功' })
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }

    @Get()
    @ApiOperation({ summary: '获取客户列表' })
    @ApiResponse({ status: 200, description: '返回客户列表' })
    findAll(@Query() query: QueryCustomersDto) {
        return this.customersService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取客户详情' })
    @ApiResponse({ status: 200, description: '返回客户详情' })
    @ApiResponse({ status: 404, description: '客户不存在' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新客户信息' })
    @ApiResponse({ status: 200, description: '客户更新成功' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customersService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除客户（软删除）' })
    @ApiResponse({ status: 200, description: '客户删除成功' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.customersService.remove(id);
    }

    @Patch(':id/stage')
    @ApiOperation({ summary: '更新客户阶段' })
    @ApiResponse({ status: 200, description: '阶段更新成功' })
    updateStage(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateStageDto: UpdateStageDto,
    ) {
        return this.customersService.updateStage(id, updateStageDto.toStage);
    }

    @Post(':id/tags')
    @ApiOperation({ summary: '添加客户标签' })
    @ApiResponse({ status: 201, description: '标签添加成功' })
    addTag(
        @Param('id', ParseIntPipe) id: number,
        @Body() addTagDto: AddTagDto,
    ) {
        return this.customersService.addTag(
            id,
            addTagDto.tagId,
            addTagDto.taggedBy,
        );
    }

    @Delete(':id/tags/:tagId')
    @ApiOperation({ summary: '移除客户标签' })
    @ApiResponse({ status: 200, description: '标签移除成功' })
    removeTag(
        @Param('id', ParseIntPipe) id: number,
        @Param('tagId', ParseIntPipe) tagId: number,
    ) {
        return this.customersService.removeTag(id, tagId);
    }
}
