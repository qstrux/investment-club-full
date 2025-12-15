'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Spin, message, Button } from 'antd';
import {
    UserAddOutlined,
    TeamOutlined,
    DollarOutlined,
    RiseOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined
} from '@ant-design/icons';
import api from '@/lib/api';

const { Title } = Typography;

interface DashboardStats {
    overview: {
        newCustomers: number;
        activeCustomers: number;
        todayDeposit: number;
        totalNetDeposit: number;
    };
    funnel: {
        tofu: number;
        mofu: number;
        bofu: number;
    };
}

export default function DashboardPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const data: any = await api.get('/reports/dashboard');
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            message.error('获取仪表板数据失败');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" tip="加载数据中..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="mb-6">
                <Title level={2}>仪表板</Title>
                <p className="text-gray-500">今日业务概览与核心指标</p>
            </div>

            {/* 核心指标卡片 */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="今日新增客户"
                            value={stats?.overview.newCustomers}
                            prefix={<UserAddOutlined className="text-blue-500" />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="活跃客户总数"
                            value={stats?.overview.activeCustomers}
                            prefix={<TeamOutlined className="text-indigo-500" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="今日入金 (USD)"
                            value={stats?.overview.todayDeposit}
                            precision={2}
                            prefix={<DollarOutlined className="text-green-500" />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title="总净入金 (USD)"
                            value={stats?.overview.totalNetDeposit}
                            precision={2}
                            prefix={<RiseOutlined className="text-orange-500" />}
                        />
                    </Card>
                </Col>
            </Row>

            {/* 漏斗数据展示 */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col span={24}>
                    <Card title="三层漏斗实时转化" bordered={false} className="shadow-sm">
                        <div className="flex flex-col md:flex-row justify-around items-center py-8 gap-8">
                            {/* ToFu */}
                            <div className="text-center p-6 bg-blue-50 rounded-xl w-full md:w-1/3 relative">
                                <div className="text-lg font-semibold text-blue-800 mb-2">ToFu (引流层)</div>
                                <div className="text-3xl font-bold text-blue-600">{stats?.funnel.tofu}</div>
                                <div className="text-sm text-blue-400 mt-1">Awareness / Attention</div>
                                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <ArrowDownOutlined className="text-gray-300 text-2xl rotate-270 md:rotate-0" />
                                </div>
                            </div>

                            {/* MoFu */}
                            <div className="text-center p-6 bg-purple-50 rounded-xl w-full md:w-1/3 relative">
                                <div className="text-lg font-semibold text-purple-800 mb-2">MoFu (培育层)</div>
                                <div className="text-3xl font-bold text-purple-600">{stats?.funnel.mofu}</div>
                                <div className="text-sm text-purple-400 mt-1">Trust / Engage</div>
                                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                                    <ArrowDownOutlined className="text-gray-300 text-2xl rotate-270 md:rotate-0" />
                                </div>
                            </div>

                            {/* BoFu */}
                            <div className="text-center p-6 bg-green-50 rounded-xl w-full md:w-1/3">
                                <div className="text-lg font-semibold text-green-800 mb-2">BoFu (转化层)</div>
                                <div className="text-3xl font-bold text-green-600">{stats?.funnel.bofu}</div>
                                <div className="text-sm text-green-400 mt-1">Action / Loyal</div>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 快捷入口 */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col span={24}>
                    <Card title="快捷操作" bordered={false} className="shadow-sm">
                        <div className="flex gap-4 flex-wrap">
                            <Button type="primary" size="large" icon={<UserAddOutlined />}>录入新客户</Button>
                            <Button size="large" icon={<DollarOutlined />}>录入入金</Button>
                            <Button size="large" icon={<TeamOutlined />}>分配客户</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
