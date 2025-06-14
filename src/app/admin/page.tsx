'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, Package, ListOrdered, Users, Activity } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as ChartTooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'; // Assuming Chart components are set up

const salesData = [
  { month: 'Enero', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 一月
  { month: 'Febrero', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 二月
  { month: 'Marzo', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 三月
  { month: 'Abril', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 四月
  { month: 'Mayo', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 五月
  { month: 'Junio', sales: Math.floor(Math.random() * 5000) + 1000 }, // Changed from 六月
];

const chartConfig = {
  sales: {
    label: "Ventas", // Changed from 销售额
    color: "hsl(var(--primary))",
  },
};


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Panel de Administración</h1>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Totales</CardTitle>
            <ListOrdered className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% desde el mes pasado</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cantidad de Productos</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,258</div>
            <p className="text-xs text-muted-foreground">+10 desde la semana pasada</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Tendencias de Ventas</CardTitle>
          <CardDescription>Resumen de ventas de los últimos 6 meses.</CardDescription>
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
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center text-sm">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">Nuevo pedido <span className="font-semibold text-foreground">#ORD12350</span> creado.</span>
              <span className="ml-auto text-xs text-muted-foreground">Hace 5 minutos</span>
            </li>
            <li className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">Nuevo usuario <span className="font-semibold text-foreground">jane.doe@example.com</span> registrado.</span>
              <span className="ml-auto text-xs text-muted-foreground">Hace 1 hora</span>
            </li>
             <li className="flex items-center text-sm">
              <Package className="h-4 w-4 mr-2 text-primary" />
              <span className="text-muted-foreground">Producto <span className="font-semibold text-foreground">Smartphone X100</span> inventario actualizado.</span>
              <span className="ml-auto text-xs text-muted-foreground">Hace 3 horas</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
