import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '三层漏斗CRM系统',
    description: 'ToFu-MoFu-BoFu CRM System',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN">
            <body>
                <AntdRegistry>{children}</AntdRegistry>
            </body>
        </html>
    );
}
