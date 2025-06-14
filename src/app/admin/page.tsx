'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Package, ListOrdered, Users, Activity } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'; // Assuming Chart components are set up

const salesData = [
  { month: '一月', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: '二月', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: '三月', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: '四月', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: '五月', sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: '六月', sales: Math.floor(Math.random() * 5000) + 1000 },
];

const chartConfig = {
  sales: {
    label: "销售额",
    color: "hsl(var(--primary))",
  },
};


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">管理仪表盘</h1>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收入</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% 从上个月</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总订单数</CardTitle>
            <ListOrdered className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% 从上个月</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">产品数量</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,258</div>
            <p className="text-xs text-muted-foreground">+10 从上周</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">注册用户</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>销售趋势</CardTitle>
          <CardDescription>过去 6 个月的销售额概览。</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Recent Activity (Placeholder) */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>最近活动</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center text-sm">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">新订单 <span className="font-semibold text-foreground">#ORD12350</span> 已创建。</span>
              <span className="ml-auto text-xs text-muted-foreground">5 分钟前</span>
            </li>
            <li className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">新用户 <span className="font-semibold text-foreground">jane.doe@example.com</span> 已注册。</span>
              <span className="ml-auto text-xs text-muted-foreground">1 小时前</span>
            </li>
             <li className="flex items-center text-sm">
              <Package className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">产品 <span className="font-semibold text-foreground">旗舰智能手机 X100</span> 库存已更新。</span>
              <span className="ml-auto text-xs text-muted-foreground">3 小时前</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
