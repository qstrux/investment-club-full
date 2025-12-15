'use client';

import React, { useState, useEffect } from 'react';
import {
    List,
    Card,
    Input,
    Select,
    Tag,
    Button,
    Typography,
    Space,
    message,
    Tooltip,
    Modal,
    Form
} from 'antd';
import {
    SearchOutlined,
    CopyOutlined,
    LikeOutlined,
    PlusOutlined,
    BookOutlined
} from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

interface Script {
    id: number;
    scriptCode: string;
    category: string;
    scenario: string;
    level: string;
    contentCn: string;
    contentEn?: string;
    usageCount: number;
    successRate?: number;
    tags: string[];
}

export default function ScriptsPage() {
    const [scripts, setScripts] = useState<Script[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);
    const [scenarioFilter, setScenarioFilter] = useState<string | undefined>(undefined);

    // 新增话术模态框
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchScripts();
    }, [searchText, categoryFilter, scenarioFilter]);

    const fetchScripts = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: 1,
                pageSize: 50, // 默认加载更多
            };
            if (searchText) params.search = searchText;
            if (categoryFilter) params.category = categoryFilter;
            if (scenarioFilter) params.scenario = scenarioFilter;

            const res: any = await api.get('/scripts', { params });
            setScripts(res.data);
        } catch (error) {
            message.error('获取话术列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (content: string, id: number) => {
        navigator.clipboard.writeText(content);
        message.success('话术已复制到剪贴板');
        // 记录使用
        api.post(`/scripts/${id}/usage`, { isSuccess: true }).catch(console.error);
    };

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            await api.post('/scripts', values);
            message.success('话术创建成功');
            setIsModalVisible(false);
            form.resetFields();
            fetchScripts();
        } catch (error) {
            message.error('创建失败');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2} className="!mb-1">话术库</Title>
                    <p className="text-gray-500">标准销售话术与应答策略</p>
                </div>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    新增话术
                </Button>
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="flex flex-wrap gap-4 mb-6">
                    <Input
                        placeholder="搜索关键词..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="w-full md:w-64"
                        onPressEnter={(e: any) => setSearchText(e.target.value)}
                    />
                    <Select
                        placeholder="分类"
                        allowClear
                        className="w-full md:w-40"
                        onChange={setCategoryFilter}
                    >
                        <Option value="Opening">开场白</Option>
                        <Option value="Objection">异议处理</Option>
                        <Option value="Closing">成交缔结</Option>
                        <Option value="FollowUp">跟进维护</Option>
                    </Select>
                    <Select
                        placeholder="场景"
                        allowClear
                        className="w-full md:w-40"
                        onChange={setScenarioFilter}
                    >
                        <Option value="ColdCall">陌生拜访</Option>
                        <Option value="TrustBuilding">建立信任</Option>
                        <Option value="Deposit">入金引导</Option>
                    </Select>
                </div>

                <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={scripts}
                    loading={loading}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={<Space><BookOutlined /> {item.scenario}</Space>}
                                extra={<Tag color="blue">{item.category}</Tag>}
                                actions={[
                                    <Tooltip title="复制中文" key="copy-cn">
                                        <Button type="text" icon={<CopyOutlined />} onClick={() => handleCopy(item.contentCn, item.id)}>中文</Button>
                                    </Tooltip>,
                                    item.contentEn && (
                                        <Tooltip title="复制英文" key="copy-en">
                                            <Button type="text" icon={<CopyOutlined />} onClick={() => handleCopy(item.contentEn!, item.id)}>英文</Button>
                                        </Tooltip>
                                    ),
                                    <Tooltip title="使用次数" key="usage">
                                        <Space><LikeOutlined /> {item.usageCount}</Space>
                                    </Tooltip>
                                ]}
                                className="hover:shadow-md transition-shadow h-full"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <Text type="secondary" className="text-xs mb-1 block">中文话术</Text>
                                        <Paragraph
                                            ellipsis={{ rows: 3, expandable: true, symbol: '展开' }}
                                            className="bg-gray-50 p-3 rounded-md mb-0"
                                        >
                                            {item.contentCn}
                                        </Paragraph>
                                    </div>

                                    {item.contentEn && (
                                        <div>
                                            <Text type="secondary" className="text-xs mb-1 block">English Script</Text>
                                            <Paragraph
                                                ellipsis={{ rows: 3, expandable: true, symbol: 'More' }}
                                                className="bg-blue-50 p-3 rounded-md mb-0 text-gray-600"
                                            >
                                                {item.contentEn}
                                            </Paragraph>
                                        </div>
                                    )}

                                    <div className="flex gap-2 flex-wrap mt-2">
                                        {item.tags.map(tag => (
                                            <Tag key={tag} className="mr-0">{tag}</Tag>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>

            <Modal
                title="新增话术"
                open={isModalVisible}
                onOk={handleCreate}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="category" label="分类" rules={[{ required: true }]}>
                        <Select>
                            <Option value="Opening">开场白</Option>
                            <Option value="Objection">异议处理</Option>
                            <Option value="Closing">成交缔结</Option>
                            <Option value="FollowUp">跟进维护</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="scenario" label="场景" rules={[{ required: true }]}>
                        <Input placeholder="例如：首次入金引导" />
                    </Form.Item>
                    <Form.Item name="level" label="难度等级" initialValue="初级">
                        <Select>
                            <Option value="初级">初级</Option>
                            <Option value="中级">中级</Option>
                            <Option value="高级">高级</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="contentCn" label="中文内容" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="contentEn" label="英文内容">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="tags" label="标签">
                        <Select mode="tags" placeholder="输入标签后回车" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
