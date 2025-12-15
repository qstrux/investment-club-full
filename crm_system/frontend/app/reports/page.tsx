'use client';

import React, { useState, useEffect } from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Table,
    DatePicker,
    Typography,
    Avatar,
    List,
    Spin,
    message,
    Space
} from 'antd';
import {
    TrophyOutlined,
    RiseOutlined,
    UserOutlined,
    DollarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import api from '@/lib/api';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function ReportsPage() {
    const [loading, setLoading] = useState(false);
    const [rankings, setRankings] = useState<any[]>([]);
    const [dailyStats, setDailyStats] = useState<any>(null);
    const [trendData, setTrendData] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 并行获取数据
            const [rankingsRes, dailyRes] = await Promise.all([
                api.get('/reports/rankings?limit=5'),
                api.get('/reports/daily'),
            ]);

            setRankings(rankingsRes as any);
            setDailyStats(dailyRes as any);

            // 模拟趋势数据（因为后端getEmployeePerformance需要ID，这里先模拟总体趋势）
            // 实际项目中应调用聚合趋势接口
            setTrendData(generateMockTrendData());

        } catch (error) {
            console.error(error);
            message.error('获取报表数据失败');
        } finally {
            setLoading(false);
        }
    };

    const generateMockTrendData = () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
            data.push({
                date: dayjs().subtract(6 - i, 'day').format('MM-DD'),
                deposits: Math.floor(Math.random() * 5000) + 1000,
                newCustomers: Math.floor(Math.random() * 20) + 5,
            });
        }
        return data;
    };

    const getTrendOption = () => {
        return {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['入金金额', '新增客户'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: trendData.map(item => item.date),
            },
            yAxis: [
                {
                    type: 'value',
                    name: '金额',
                },
                {
                    type: 'value',
                    name: '人数',
                    position: 'right',
                },
            ],
            series: [
                {
                    name: '入金金额',
                    type: 'line',
                    smooth: true,
                    areaStyle: { opacity: 0.1 },
                    data: trendData.map(item => item.deposits),
                    itemStyle: { color: '#52c41a' },
                },
                {
                    name: '新增客户',
                    type: 'line',
                    yAxisIndex: 1,
                    smooth: true,
                    data: trendData.map(item => item.newCustomers),
                    itemStyle: { color: '#1890ff' },
                },
            ],
        };
    };

    const getFunnelOption = () => {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}%',
            },
            series: [
                {
                    name: '漏斗转化',
                    type: 'funnel',
                    left: '10%',
                    top: 60,
                    bottom: 60,
                    width: '80%',
                    min: 0,
                    max: 100,
                    minSize: '0%',
                    maxSize: '100%',
                    sort: 'descending',
                    gap: 2,
                    label: {
                        show: true,
                        position: 'inside',
                    },
                    labelLine: {
                        length: 10,
                        lineStyle: {
                            width: 1,
                            type: 'solid',
                        },
                    },
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                    emphasis: {
                        label: {
                            fontSize: 20,
                        },
                    },
                    data: [
                        { value: 100, name: 'ToFu (接触)' },
                        { value: 60, name: 'MoFu (互动)' },
                        { value: 20, name: 'BoFu (成交)' },
                    ],
                },
            ],
        };
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" tip="加载报表数据..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2} className="!mb-1">报表统计</Title>
                    <p className="text-gray-500">业务绩效分析与趋势监控</p>
                </div>
                <RangePicker />
            </div>

            {/* 核心指标 */}
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="今日入金"
                            value={dailyStats?.bofu?.amount || 0}
                            precision={2}
                            prefix={<DollarOutlined />}
                            valueStyle={{ color: '#3f8600' }}
                            suffix="USD"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="今日净入金"
                            value={dailyStats?.bofu?.net || 0}
                            precision={2}
                            prefix={<RiseOutlined />}
                            valueStyle={{ color: '#cf1322' }}
                            suffix="USD"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="今日新增客户"
                            value={dailyStats?.tofu?.contacts || 0}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#1890ff' }}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="今日有效对话"
                            value={dailyStats?.mofu?.conversations || 0}
                            prefix={<TeamOutlined />}
                            valueStyle={{ color: '#722ed1' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} className="mt-6">
                {/* 趋势图表 */}
                <Col span={16}>
                    <Card title="近7天业务趋势" bordered={false} className="shadow-sm h-full">
                        <ReactECharts option={getTrendOption()} style={{ height: '350px' }} />
                    </Card>
                </Col>

                {/* 员工排行榜 */}
                <Col span={8}>
                    <Card
                        title={<Space><TrophyOutlined className="text-yellow-500" /> 员工业绩排行 (Top 5)</Space>}
                        bordered={false}
                        className="shadow-sm h-full"
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={rankings}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <div className="relative">
                                                <Avatar src={item.avatarUrl} icon={<UserOutlined />} />
                                                {index < 3 && (
                                                    <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'
                                                        }`}>
                                                        {index + 1}
                                                    </div>
                                                )}
                                            </div>
                                        }
                                        title={<span className="font-medium">{item.name}</span>}
                                        description={`客户数: ${item.totalCustomers}`}
                                    />
                                    <div className="text-right">
                                        <div className="text-green-600 font-bold">${item.totalNetDeposit.toLocaleString()}</div>
                                        <div className="text-xs text-gray-400">净入金</div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} className="mt-6">
                <Col span={12}>
                    <Card title="漏斗转化率" bordered={false} className="shadow-sm">
                        <ReactECharts option={getFunnelOption()} style={{ height: '300px' }} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="渠道来源占比" bordered={false} className="shadow-sm">
                        {/* 占位符，后续可接入真实数据 */}
                        <div className="flex items-center justify-center h-[300px] text-gray-400">
                            暂无数据
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
