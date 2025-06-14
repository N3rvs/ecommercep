'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListOrdered, MapPin, Edit } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual user data
const mockUser = {
  name: '张三',
  email: 'zhangsan@example.com',
  recentOrder: {
    id: 'ORD12345',
    date: '2024-07-15',
    total: 159.98,
    status: '配送中',
  },
  defaultAddress: {
    street: '人民路 123 号, 4B 公寓',
    city: '上海市',
    postalCode: '200000',
  }
};

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">欢迎回来, {mockUser.name}!</CardTitle>
          <CardDescription>在这里管理您的账户信息、订单和偏好设置。</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">最近订单</CardTitle>
            <ListOrdered className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {mockUser.recentOrder ? (
              <>
                <p className="text-sm text-muted-foreground">订单号: {mockUser.recentOrder.id}</p>
                <p className="text-sm text-muted-foreground">日期: {mockUser.recentOrder.date}</p>
                <p className="text-2xl font-bold mt-1">${mockUser.recentOrder.total.toFixed(2)}</p>
                <p className={`text-sm font-medium mt-1 ${mockUser.recentOrder.status === '配送中' ? 'text-blue-500' : 'text-green-500'}`}>
                  状态: {mockUser.recentOrder.status}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={`/account/orders/${mockUser.recentOrder.id}`}>查看订单详情</Link>
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground">您还没有任何订单。</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">账户信息</CardTitle>
            <Link href="/account/settings" aria-label="Edit account details">
               <Button variant="ghost" size="icon"><Edit className="h-5 w-5 text-muted-foreground hover:text-primary" /></Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">姓名</p>
              <p className="text-muted-foreground">{mockUser.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">邮箱</p>
              <p className="text-muted-foreground">{mockUser.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">默认配送地址</p>
              {mockUser.defaultAddress ? (
                <p className="text-muted-foreground">
                  {mockUser.defaultAddress.street}, {mockUser.defaultAddress.city}, {mockUser.defaultAddress.postalCode}
                </p>
              ) : (
                <p className="text-muted-foreground">未设置默认地址。</p>
              )}
            </div>
             <Button asChild variant="secondary" size="sm" className="mt-3">
                <Link href="/account/settings">编辑个人资料</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="text-xl">快速操作</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/orders" className="flex flex-col items-start">
                    <ListOrdered className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">查看所有订单</span>
                    <span className="text-xs text-muted-foreground">跟踪您的购买历史</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/addresses" className="flex flex-col items-start">
                    <MapPin className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">管理您的地址</span>
                    <span className="text-xs text-muted-foreground">更新您的配送信息</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/settings" className="flex flex-col items-start">
                    <Edit className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">修改个人资料</span>
                    <span className="text-xs text-muted-foreground">更新您的联系方式和密码</span>
                </Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
