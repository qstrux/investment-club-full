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
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryEmployeesDto } from './dto/query-employees.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('employees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    @Roles('admin')
    @ApiOperation({ summary: '创建员工 (仅管理员)' })
    @ApiResponse({ status: 201, description: '员工创建成功' })
    @ApiResponse({ status: 409, description: '用户名或邮箱已存在' })
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeesService.create(createEmployeeDto);
    }

    @Get()
    @ApiOperation({ summary: '获取员工列表' })
    @ApiResponse({ status: 200, description: '返回员工列表' })
    findAll(@Query() query: QueryEmployeesDto) {
        return this.employeesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取员工详情' })
    @ApiResponse({ status: 200, description: '返回员工详情' })
    @ApiResponse({ status: 404, description: '员工不存在' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.employeesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '更新员工信息' })
    @ApiResponse({ status: 200, description: '员工更新成功' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEmployeeDto: UpdateEmployeeDto,
    ) {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ summary: '删除员工（软删除）' })
    @ApiResponse({ status: 200, description: '员工删除成功' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.employeesService.remove(id);
    }

    @Get(':id/kpis')
    @ApiOperation({ summary: '获取员工KPI' })
    @ApiResponse({ status: 200, description: '返回员工KPI数据' })
    getKpis(
        @Param('id', ParseIntPipe) id: number,
        @Query('date') date?: string,
    ) {
        return this.employeesService.getKpis(id, date);
    }
}
