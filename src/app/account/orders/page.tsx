'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import type { Order } from '@/lib/types';

// Mock order data - replace with actual data fetching
const mockOrders: Order[] = [
  {
    id: 'ORD12345',
    userId: 'user1',
    items: [], // Simplified for this view
    totalAmount: 159.98,
    status: 'Enviado', // Changed from 配送中
    deliveryMethod: 'Local Delivery',
    createdAt: new Date('2024-07-15T10:30:00Z').toISOString(),
    updatedAt: new Date('2024-07-15T14:00:00Z').toISOString(),
  },
  {
    id: 'ORD12344',
    userId: 'user1',
    items: [],
    totalAmount: 75.50,
    status: 'Entregado', // Changed from 已送达
    deliveryMethod: 'In-Store Pickup',
    createdAt: new Date('2024-07-10T15:00:00Z').toISOString(),
    updatedAt: new Date('2024-07-12T11:00:00Z').toISOString(),
  },
  {
    id: 'ORD12343',
    userId: 'user1',
    items: [],
    totalAmount: 299.00,
    status: 'Cancelado', // Changed from 已取消
    deliveryMethod: 'Local Delivery',
    createdAt: new Date('2024-07-01T09:12:00Z').toISOString(),
    updatedAt: new Date('2024-07-01T10:00:00Z').toISOString(),
  },
];

const getStatusVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Enviado': // Changed from 配送中
    case 'Procesando': // Changed from Processing
      return 'default'; // Blueish in default theme
    case 'Entregado': // Changed from 已送达
    case 'Recogido': // Changed from Picked Up
      return 'secondary'; // Greenish in default theme (often secondary is set to success like color)
    case 'Cancelado': // Changed from 已取消
      return 'destructive';
    case 'Pendiente': // Changed from Pending
      return 'outline';
    default:
      return 'outline';
  }
};


export default function OrdersPage() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Mis Pedidos</CardTitle>
        <CardDescription>Vea su historial de pedidos y el estado actual de sus pedidos.</CardDescription>
      </CardHeader>
      <CardContent>
        {mockOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Pedido</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/account/orders/${order.id}`} className="text-primary hover:underline">
                      #{order.id.substring(3)}
                    </Link>
                  </TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/account/orders/${order.id}`}>
                        <Eye className="mr-1 h-4 w-4" /> Ver
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-muted-foreground text-center py-8">Aún no tiene ningún pedido.</p>
        )}
      </CardContent>
      {mockOrders.length > 5 && ( // Example pagination trigger
        <CardFooter className="justify-center border-t pt-6">
            <Button variant="outline">Cargar más pedidos</Button>
        </CardFooter>
      )}
    </Card>
  );
}
