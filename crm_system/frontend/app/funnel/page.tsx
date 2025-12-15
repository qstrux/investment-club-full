'use client';

import React, { useState, useEffect } from 'react';
import {
    Tabs,
    Table,
    Card,
    Tag,
    Button,
    Typography,
    Statistic,
    Row,
    Col,
    Space
} from 'antd';
import {
    FunnelPlotOutlined,
    UserAddOutlined,
    CommentOutlined,
    DollarOutlined
} from '@ant-design/icons';
import api from '@/lib/api';

const { Title } = Typography;

export default function FunnelPage() {
    const [activeTab, setActiveTab] = useState('tofu');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

    useEffect(() => {
        fetchData();
    }, [activeTab, pagination.current]);

    const fetchData = async () => {
        setLoading(true);
        try {
            let endpoint = '';
            switch (activeTab) {
                case 'tofu': endpoint = '/funnel/tofu'; break;
                case 'mofu': endpoint = '/funnel/mofu'; break;
                case 'bofu': endpoint = '/funnel/deposits'; break;
            }

            const res: any = await api.get(endpoint, {
                params: {
                    page: pagination.current,
                    pageSize: pagination.pageSize,
                }
            });

            setData(res.data);
            setPagination({ ...pagination, total: res.meta.total });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const tofuColumns = [
        { title: '客户', dataIndex: ['customer', 'name'], key: 'customer' },
        { title: '接触日期', dataIndex: 'contactDate', key: 'contactDate', render: (d: string) => new Date(d).toLocaleDateString() },
        { title: '来源渠道', dataIndex: 'sourceChannel', key: 'sourceChannel' },
        { title: '是否进群', dataIndex: 'joinedGroup', key: 'joinedGroup', render: (v: boolean) => v ? <Tag color="green">是</Tag> : <Tag>否</Tag> },
        { title: '群名', dataIndex: 'groupName', key: 'groupName' },
        { title: '负责人', dataIndex: ['employee', 'name'], key: 'employee' },
    ];

    const mofuColumns = [
        { title: '客户', dataIndex: ['customer', 'name'], key: 'customer' },
        { title: '总对话数', dataIndex: 'totalConversations', key: 'totalConversations' },
        { title: '有效对话', dataIndex: 'highQualityConversations', key: 'highQualityConversations', render: (v: number) => <span className="text-blue-600 font-bold">{v}</span> },
        { title: '已开户', dataIndex: 'accountOpened', key: 'accountOpened', render: (v: boolean) => v ? <Tag color="green">已开户</Tag> : <Tag>未开户</Tag> },
        { title: '开户平台', dataIndex: 'accountPlatform', key: 'accountPlatform' },
        { title: '更新时间', dataIndex: 'updatedAt', key: 'updatedAt', render: (d: string) => new Date(d).toLocaleString() },
    ];

    const bofuColumns = [
        { title: '入金编号', dataIndex: 'depositCode', key: 'depositCode' },
        { title: '客户', dataIndex: ['customer', 'name'], key: 'customer' },
        { title: '金额', dataIndex: 'amount', key: 'amount', render: (v: number) => <span className="text-green-600 font-bold">${v}</span> },
        { title: '类型', dataIndex: 'depositType', key: 'depositType' },
        { title: '平台', dataIndex: 'platform', key: 'platform' },
        { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color="blue">{v}</Tag> },
        { title: '入金时间', dataIndex: 'depositedAt', key: 'depositedAt', render: (d: string) => new Date(d).toLocaleString() },
    ];

    const renderContent = () => {
        let columns: any[] = [];
        if (activeTab === 'tofu') columns = tofuColumns;
        else if (activeTab === 'mofu') columns = mofuColumns;
        else if (activeTab === 'bofu') columns = bofuColumns;

        return (
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={{
                    ...pagination,
                    onChange: (page) => setPagination({ ...pagination, current: page }),
                }}
            />
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2} className="!mb-1">漏斗数据</Title>
                    <p className="text-gray-500">全链路转化数据监控</p>
                </div>
                <Space>
                    <Button type="primary" icon={<UserAddOutlined />}>录入ToFu</Button>
                    <Button icon={<CommentOutlined />}>更新MoFu</Button>
                    <Button type="primary" danger icon={<DollarOutlined />}>录入入金</Button>
                </Space>
            </div>

            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <Card>
                        <Statistic title="本月引流 (ToFu)" value={128} prefix={<UserAddOutlined />} valueStyle={{ color: '#1890ff' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="本月开户 (MoFu)" value={45} prefix={<CommentOutlined />} valueStyle={{ color: '#722ed1' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="本月入金 (BoFu)" value={9300} prefix={<DollarOutlined />} precision={2} valueStyle={{ color: '#52c41a' }} />
                    </Card>
                </Col>
            </Row>

            <Card bordered={false} className="shadow-sm">
                <Tabs
                    activeKey={activeTab}
                    onChange={(key) => {
                        setActiveTab(key);
                        setPagination({ ...pagination, current: 1 });
                    }}
                    items={[
                        {
                            key: 'tofu',
                            label: (
                                <span>
                                    <UserAddOutlined />
                                    ToFu (引流)
                                </span>
                            ),
                        },
                        {
                            key: 'mofu',
                            label: (
                                <span>
                                    <CommentOutlined />
                                    MoFu (培育)
                                </span>
                            ),
                        },
                        {
                            key: 'bofu',
                            label: (
                                <span>
                                    <DollarOutlined />
                                    BoFu (转化)
                                </span>
                            ),
                        },
                    ]}
                />
                {renderContent()}
            </Card>
        </div>
    );
}
