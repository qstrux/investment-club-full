'use client';

import { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/auth';

const { Title, Text } = Typography;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // 调用登录API
            // 注意：这里假设后端有 /auth/login 接口，虽然我们之前只定义了 AuthModule 但没写具体 Controller
            // 如果后端还没实现，这里会报错。为了演示，我们先假设接口存在。
            // 实际开发中应该先完善 AuthModule。

            // 临时模拟登录（如果后端未就绪）
            // const mockResponse = { access_token: 'mock_token', user: { id: 1, name: 'Admin', role: 'admin' } };

            const res: any = await api.post('/auth/login', values);

            message.success('登录成功');
            login(res.access_token, res.user);
            router.push('/dashboard');
        } catch (error: any) {
            message.error(error.message || '登录失败，请检查用户名和密码');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <div className="text-center mb-8">
                    <Title level={2} className="!mb-2">CRM 系统</Title>
                    <Text type="secondary">三层漏斗客户管理系统</Text>
                </div>

                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="用户名"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            登录
                        </Button>
                    </Form.Item>

                    <div className="text-center text-sm text-gray-500">
                        默认账号: admin / password123
                    </div>
                </Form>
            </Card>
        </div>
    );
}
