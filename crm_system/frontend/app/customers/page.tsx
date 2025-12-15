'use client';

import React, { useState, useEffect } from 'react';
import {
    Table,
    Card,
    Button,
    Input,
    Select,
    Tag,
    Space,
    Tooltip,
    Modal,
    Form,
    message,
    Typography
} from 'antd';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    FilterOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import api from '@/lib/api';

const { Title } = Typography;
const { Option } = Select;

interface Customer {
    id: number;
    customerCode: string;
    name: string;
    email?: string;
    phone?: string;
    currentStage: string;
    intentionScore: number;
    status: string;
    assignedEmployee?: {
        name: string;
    };
    createdAt: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [stageFilter, setStageFilter] = useState<string | undefined>(undefined);

    // 模态框状态
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, [currentPage, searchText, stageFilter]);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: currentPage,
                pageSize: 10,
            };
            if (searchText) params.search = searchText;
            if (stageFilter) params.stage = stageFilter;

            const res: any = await api.get('/customers', { params });
            setCustomers(res.data);
            setTotal(res.meta.total);
        } catch (error) {
            message.error('获取客户列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
        setCurrentPage(1);
    };

    const handleStageChange = (value: string) => {
        setStageFilter(value);
        setCurrentPage(1);
    };

    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: '确认删除',
            content: '确定要删除这个客户吗？此操作不可恢复。',
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                try {
                    await api.delete(`/customers/${id}`);
                    message.success('删除成功');
                    fetchCustomers();
                } catch (error) {
                    message.error('删除失败');
                }
            },
        });
    };

    const handleEdit = (record: Customer) => {
        setEditingId(record.id);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingId) {
                await api.patch(`/customers/${editingId}`, values);
                message.success('更新成功');
            } else {
                await api.post('/customers', values);
                message.success('创建成功');
            }
            setIsModalVisible(false);
            fetchCustomers();
        } catch (error) {
            message.error('操作失败，请检查表单');
        }
    };

    const columns: ColumnsType<Customer> = [
        {
            title: '客户编号',
            dataIndex: 'customerCode',
            key: 'customerCode',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium">{text}</span>,
        },
        {
            title: '阶段',
            dataIndex: 'currentStage',
            key: 'currentStage',
            render: (stage) => {
                let color = 'default';
                if (['Awareness', 'Attention'].includes(stage)) color = 'blue';
                if (['Trust', 'Engage'].includes(stage)) color = 'purple';
                if (['Action', 'Subscribe'].includes(stage)) color = 'green';
                return <Tag color={color}>{stage}</Tag>;
            },
        },
        {
            title: '意向分',
            dataIndex: 'intentionScore',
            key: 'intentionScore',
            sorter: (a, b) => a.intentionScore - b.intentionScore,
            render: (score) => (
                <span className={score > 80 ? 'text-green-600 font-bold' : ''}>{score}</span>
            ),
        },
        {
            title: '负责人',
            dataIndex: ['assignedEmployee', 'name'],
            key: 'assignedEmployee',
            render: (text) => text || <span className="text-gray-400">未分配</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="编辑">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <Tooltip title="删除">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2} className="!mb-1">客户管理</Title>
                    <p className="text-gray-500">管理所有客户资料与跟进状态</p>
                </div>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAdd}>
                    新增客户
                </Button>
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="flex flex-wrap gap-4 mb-6">
                    <Input
                        placeholder="搜索姓名、邮箱或编号"
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="w-full md:w-64"
                        onPressEnter={(e: any) => handleSearch(e.target.value)}
                    />
                    <Select
                        placeholder="选择阶段"
                        allowClear
                        className="w-full md:w-40"
                        onChange={handleStageChange}
                    >
                        <Option value="Awareness">Awareness</Option>
                        <Option value="Trust">Trust</Option>
                        <Option value="Action">Action</Option>
                    </Select>
                    <Button icon={<FilterOutlined />}>更多筛选</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={customers}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        current: currentPage,
                        total: total,
                        pageSize: 10,
                        onChange: (page) => setCurrentPage(page),
                        showTotal: (total) => `共 ${total} 条记录`,
                    }}
                />
            </Card>

            <Modal
                title={editingId ? '编辑客户' : '新增客户'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="电话">
                        <Input />
                    </Form.Item>
                    <Form.Item name="currentStage" label="当前阶段" initialValue="Awareness">
                        <Select>
                            <Option value="Awareness">Awareness (认知)</Option>
                            <Option value="Trust">Trust (信任)</Option>
                            <Option value="Action">Action (行动)</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="sourceChannel" label="来源渠道">
                        <Select>
                            <Option value="TikTok">TikTok</Option>
                            <Option value="Facebook">Facebook</Option>
                            <Option value="Referral">转介绍</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
