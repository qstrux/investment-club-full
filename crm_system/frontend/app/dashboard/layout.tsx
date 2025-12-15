'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, theme, type MenuProps } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DashboardOutlined,
    TeamOutlined,
    FunnelPlotOutlined,
    BookOutlined,
    FileImageOutlined,
    BarChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const router = useRouter();
    const pathname = usePathname();
    const { user, logout, isAuthenticated } = useAuthStore();

    // 简单的路由保护
    useEffect(() => {
        // 检查localStorage中的token，因为zustand持久化可能还没恢复
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('token')) {
        return null; // 或者返回加载中
    }

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === 'logout') {
            logout();
            router.push('/login');
        } else {
            router.push(key);
        }
    };

    const userMenu: MenuProps = {
        items: [
            {
                key: 'profile',
                label: '个人中心',
                icon: <UserOutlined />,
            },
            {
                type: 'divider',
            },
            {
                key: 'logout',
                label: '退出登录',
                icon: <LogoutOutlined />,
                danger: true,
            },
        ],
        onClick: handleMenuClick,
    };

    return (
        <Layout className="min-h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed} className="bg-slate-900">
                <div className="h-16 flex items-center justify-center text-white text-xl font-bold border-b border-slate-700">
                    {collapsed ? 'CRM' : '三层漏斗CRM'}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    selectedKeys={[pathname]}
                    onClick={handleMenuClick}
                    className="bg-slate-900"
                    items={[
                        {
                            key: '/dashboard',
                            icon: <DashboardOutlined />,
                            label: '仪表板',
                        },
                        {
                            key: '/customers',
                            icon: <TeamOutlined />,
                            label: '客户管理',
                        },
                        {
                            key: '/funnel',
                            icon: <FunnelPlotOutlined />,
                            label: '漏斗数据',
                        },
                        {
                            key: '/scripts',
                            icon: <BookOutlined />,
                            label: '话术库',
                        },
                        {
                            key: '/materials',
                            icon: <FileImageOutlined />,
                            label: '素材库',
                        },
                        {
                            key: '/reports',
                            icon: <BarChartOutlined />,
                            label: '报表统计',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} className="flex justify-between items-center px-4 shadow-sm">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <div className="flex items-center gap-4 pr-4">
                        <span className="text-gray-600">欢迎, {user?.name || 'User'}</span>
                        <Dropdown menu={userMenu} placement="bottomRight">
                            <Avatar
                                src={user?.avatarUrl}
                                icon={<UserOutlined />}
                                className="cursor-pointer bg-blue-500"
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
