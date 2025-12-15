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
    Form,
    Image,
    Upload
} from 'antd';
import {
    SearchOutlined,
    DownloadOutlined,
    EyeOutlined,
    PlusOutlined,
    FileImageOutlined,
    VideoCameraOutlined,
    FileTextOutlined,
    UploadOutlined
} from '@ant-design/icons';
import api from '@/lib/api';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Material {
    id: number;
    materialCode: string;
    type: string;
    category: string;
    title: string;
    caption?: string;
    url: string;
    thumbnailUrl?: string;
    publishedCount: number;
    applicableStages: string[];
}

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
    const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined);

    // 新增素材模态框
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchMaterials();
    }, [searchText, typeFilter, categoryFilter]);

    const fetchMaterials = async () => {
        setLoading(true);
        try {
            const params: any = {
                page: 1,
                pageSize: 50,
            };
            if (searchText) params.search = searchText;
            if (typeFilter) params.type = typeFilter;
            if (categoryFilter) params.category = categoryFilter;

            const res: any = await api.get('/materials', { params });
            setMaterials(res.data);
        } catch (error) {
            message.error('获取素材列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (url: string, id: number) => {
        // 模拟下载
        window.open(url, '_blank');
        message.success('开始下载...');
        // 记录发布/使用
        api.post(`/materials/${id}/publish`).catch(console.error);
    };

    const handleCreate = async () => {
        try {
            const values = await form.validateFields();
            // 这里模拟文件上传，实际应该先上传文件获取URL
            // 简化处理：直接使用用户输入的URL或占位符
            if (!values.url) {
                values.url = 'https://via.placeholder.com/800x600?text=Demo+Material';
            }

            await api.post('/materials', values);
            message.success('素材创建成功');
            setIsModalVisible(false);
            form.resetFields();
            fetchMaterials();
        } catch (error) {
            message.error('创建失败');
        }
    };

    const getIconByType = (type: string) => {
        switch (type) {
            case 'Image': return <FileImageOutlined className="text-blue-500" />;
            case 'Video': return <VideoCameraOutlined className="text-purple-500" />;
            case 'Document': return <FileTextOutlined className="text-green-500" />;
            default: return <FileImageOutlined />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <Title level={2} className="!mb-1">素材库</Title>
                    <p className="text-gray-500">营销素材、产品介绍与培训资料</p>
                </div>
                <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                    上传素材
                </Button>
            </div>

            <Card bordered={false} className="shadow-sm">
                <div className="flex flex-wrap gap-4 mb-6">
                    <Input
                        placeholder="搜索标题或描述..."
                        prefix={<SearchOutlined className="text-gray-400" />}
                        className="w-full md:w-64"
                        onPressEnter={(e: any) => setSearchText(e.target.value)}
                    />
                    <Select
                        placeholder="类型"
                        allowClear
                        className="w-full md:w-40"
                        onChange={setTypeFilter}
                    >
                        <Option value="Image">图片</Option>
                        <Option value="Video">视频</Option>
                        <Option value="Document">文档</Option>
                    </Select>
                    <Select
                        placeholder="分类"
                        allowClear
                        className="w-full md:w-40"
                        onChange={setCategoryFilter}
                    >
                        <Option value="Product">产品介绍</Option>
                        <Option value="Market">市场分析</Option>
                        <Option value="Testimonial">客户案例</Option>
                        <Option value="Training">内部培训</Option>
                    </Select>
                </div>

                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
                    dataSource={materials}
                    loading={loading}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <div className="h-40 overflow-hidden flex items-center justify-center bg-gray-100 relative group">
                                        {item.type === 'Image' ? (
                                            <Image
                                                alt={item.title}
                                                src={item.url}
                                                className="object-cover w-full h-full"
                                                preview={{ mask: <EyeOutlined /> }}
                                            />
                                        ) : (
                                            <div className="text-4xl text-gray-400">
                                                {getIconByType(item.type)}
                                            </div>
                                        )}
                                        {item.type !== 'Image' && (
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <Button type="primary" shape="circle" icon={<DownloadOutlined />} onClick={() => handleDownload(item.url, item.id)} />
                                            </div>
                                        )}
                                    </div>
                                }
                                actions={[
                                    <Tooltip title="下载/使用" key="download">
                                        <DownloadOutlined onClick={() => handleDownload(item.url, item.id)} />
                                    </Tooltip>,
                                    <span key="usage" className="text-xs text-gray-400">
                                        已用 {item.publishedCount} 次
                                    </span>
                                ]}
                            >
                                <Card.Meta
                                    title={
                                        <div className="flex items-center gap-2">
                                            {getIconByType(item.type)}
                                            <span className="truncate" title={item.title}>{item.title}</span>
                                        </div>
                                    }
                                    description={
                                        <div className="space-y-2">
                                            <Paragraph ellipsis={{ rows: 2 }} className="text-xs mb-0 h-8">
                                                {item.caption || '暂无描述'}
                                            </Paragraph>
                                            <div className="flex flex-wrap gap-1">
                                                <Tag className="text-[10px] mr-0">{item.category}</Tag>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>

            <Modal
                title="上传素材"
                open={isModalVisible}
                onOk={handleCreate}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="标题" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="type" label="类型" initialValue="Image">
                        <Select>
                            <Option value="Image">图片</Option>
                            <Option value="Video">视频</Option>
                            <Option value="Document">文档</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="category" label="分类" initialValue="Product">
                        <Select>
                            <Option value="Product">产品介绍</Option>
                            <Option value="Market">市场分析</Option>
                            <Option value="Testimonial">客户案例</Option>
                            <Option value="Training">内部培训</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="caption" label="描述">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="url" label="资源链接 (模拟)">
                        <Input placeholder="输入图片/视频URL，留空则使用占位符" />
                    </Form.Item>
                    <Form.Item label="文件上传 (演示)">
                        <Upload>
                            <Button icon={<UploadOutlined />}>选择文件</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
