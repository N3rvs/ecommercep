'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend as ChartLegend, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'; // Assuming Chart components
import { DollarSign, ShoppingCart, Users, TrendingUp, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker'; // Assuming this component exists or will be created
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';

// Mock data generation
const generateSalesData = (numPoints: number) => {
  return Array.from({ length: numPoints }, (_, i) => ({
    date: format(addDays(new Date(), i - numPoints), 'yyyy-MM-dd'),
    sales: Math.floor(Math.random() * 2000) + 500,
    orders: Math.floor(Math.random() * 50) + 10,
  }));
};

const categorySalesData = [
  { name: '智能手机', value: 40000, color: 'hsl(var(--chart-1))' },
  { name: '笔记本电脑', value: 30000, color: 'hsl(var(--chart-2))' },
  { name: '音频设备', value: 20000, color: 'hsl(var(--chart-3))' },
  { name: '电视与显示器', value: 15000, color: 'hsl(var(--chart-4))' },
  { name: '可穿戴设备', value: 10000, color: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  sales: { label: '销售额', color: 'hsl(var(--primary))' },
  orders: { label: '订单数', color: 'hsl(var(--accent))' },
};

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('last_30_days');
  const [salesData, setSalesData] = useState(generateSalesData(30));
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -29),
    to: new Date(),
  });

  useEffect(() => {
    let numPoints = 30;
    if (timeRange === 'last_7_days') numPoints = 7;
    else if (timeRange === 'last_90_days') numPoints = 90;
    setSalesData(generateSalesData(numPoints));
  }, [timeRange]);
  
  // Placeholder for DateRangePicker if not available.
  const DateRangePickerComponent = ({ date, setDate, className } : { date: any, setDate: any, className?: string }) => (
    <div className={className}>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarDays className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>选择日期范围</span>
            )}
        </Button>
    </div>
  );


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-foreground">销售分析</h1>
        <div className="flex items-center gap-4">
           {/* DateRangePicker Placeholder/Actual */}
           <DateRangePickerComponent date={date} setDate={setDate} className="w-full sm:w-auto" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">过去 7 天</SelectItem>
              <SelectItem value="last_30_days">过去 30 天</SelectItem>
              <SelectItem value="last_90_days">过去 90 天</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总销售额</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,864.50</div>
            <p className="text-xs text-muted-foreground">+15.2% 同比上期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总订单数</CardTitle>
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,480</div>
            <p className="text-xs text-muted-foreground">+8.5% 同比上期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均订单价值</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$36.17</div>
            <p className="text-xs text-muted-foreground">+2.1% 同比上期</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">新客户数</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">+25 同比上期</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>销售额与订单数趋势</CardTitle>
          <CardDescription>按日期显示的销售额和订单数量。</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <ResponsiveContainer>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="date" tickFormatter={(val) => format(new Date(val), 'MM/dd')} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `$${value/1000}k`} tickLine={false} axisLine={false}/>
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tickLine={false} axisLine={false}/>
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="var(--color-orders)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle>按类别销售额</CardTitle>
            <CardDescription>各产品类别的销售额分布。</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={categorySalesData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return ( (percent*100) > 5 ? <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="12px">
                                {`${(percent * 100).toFixed(0)}%`}
                            </text> : null);
                        }}>
                            {categorySalesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <ChartLegend content={({ payload }) => (
                            <ul className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-4">
                            {payload?.map((entry: any, index: number) => (
                                <li key={`item-${index}`} className="flex items-center text-sm">
                                <span className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
                                {entry.value}
                                </li>
                            ))}
                            </ul>
                        )} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products (Placeholder) */}
        <Card>
          <CardHeader>
            <CardTitle>热销产品</CardTitle>
            <CardDescription>本月最畅销的产品。</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {productsData.slice(0,5).map((p, i) => (
                 <li key={p.id} className="flex items-center justify-between text-sm">
                    <span>{i+1}. {p.name}</span>
                    <span className="font-semibold text-foreground">${(Math.random()*500 + 200).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Assuming DateRangePicker exists in ui, if not, create a placeholder or remove it
// For example:
// components/ui/date-range-picker.tsx
// "use client"
// import * as React from "react"
// import { CalendarIcon } from "lucide-react"
// import { addDays, format } from "date-fns"
// import { DateRange } from "react-day-picker"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// export function DateRangePicker({ className, date, setDate }: React.HTMLAttributes<HTMLDivElement> & { date: DateRange | undefined, setDate: (date: DateRange | undefined) => void }) {
//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

