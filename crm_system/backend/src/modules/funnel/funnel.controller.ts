import { Controller, Post, Body, Patch, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FunnelService } from './funnel.service';
import { CreateTofuEntryDto } from './dto/create-tofu.dto';
import { UpdateMofuStatsDto } from './dto/update-mofu.dto';
import { CreateDepositDto } from './dto/create-deposit.dto';

@ApiTags('funnel')
@ApiBearerAuth()
@Controller('funnel')
export class FunnelController {
    constructor(private readonly funnelService: FunnelService) { }

    @Get('tofu')
    @ApiOperation({ summary: '获取ToFu列表' })
    findAllTofu(@Query() query: any) {
        return this.funnelService.findAllTofu(query);
    }

    @Get('mofu')
    @ApiOperation({ summary: '获取MoFu列表' })
    findAllMofu(@Query() query: any) {
        return this.funnelService.findAllMofu(query);
    }

    @Get('deposits')
    @ApiOperation({ summary: '获取入金列表' })
    findAllDeposits(@Query() query: any) {
        return this.funnelService.findAllDeposits(query);
    }

    @Post('tofu')
    @ApiOperation({ summary: '录入ToFu数据（接粉）' })
    @ApiResponse({ status: 201, description: '记录成功' })
    createTofuEntry(@Body() dto: CreateTofuEntryDto) {
        return this.funnelService.createTofuEntry(dto);
    }

    @Patch('mofu')
    @ApiOperation({ summary: '更新MoFu数据（互动统计）' })
    @ApiResponse({ status: 200, description: '更新成功' })
    updateMofuStats(@Body() dto: UpdateMofuStatsDto) {
        return this.funnelService.updateMofuStats(dto);
    }

    @Post('deposits')
    @ApiOperation({ summary: '录入入金记录（BoFu）' })
    @ApiResponse({ status: 201, description: '入金记录成功' })
    createDeposit(@Body() dto: CreateDepositDto) {
        return this.funnelService.createDeposit(dto);
    }
}
