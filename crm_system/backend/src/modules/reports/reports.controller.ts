import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsService } from './reports.service';

@ApiTags('reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('dashboard')
    @ApiOperation({ summary: '获取仪表板概览数据' })
    @ApiResponse({ status: 200, description: '返回仪表板数据' })
    getDashboardStats() {
        return this.reportsService.getDashboardStats();
    }

    @Get('daily')
    @ApiOperation({ summary: '获取每日报表' })
    @ApiResponse({ status: 200, description: '返回每日报表数据' })
    getDailyReport(@Query('date') date?: string) {
        return this.reportsService.getDailyReport(date);
    }

    @Get('rankings')
    @ApiOperation({ summary: '获取员工绩效排行' })
    @ApiResponse({ status: 200, description: '返回员工排行' })
    getEmployeeRankings(@Query('limit') limit?: string) {
        return this.reportsService.getEmployeeRankings(limit ? parseInt(limit) : 10);
    }

    @Get('employees/:id')
    @ApiOperation({ summary: '获取员工详细绩效趋势' })
    @ApiResponse({ status: 200, description: '返回员工绩效趋势' })
    getEmployeePerformance(
        @Param('id', ParseIntPipe) id: number,
        @Query('days') days?: string,
    ) {
        return this.reportsService.getEmployeePerformance(id, days ? parseInt(days) : 30);
    }
}
