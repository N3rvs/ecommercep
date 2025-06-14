'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Search, Eye, Truck, CheckCircle, XCircle, Filter } from 'lucide-react';
import type { Order } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card } from '@/components/ui/card';


// Mock order data
const mockAdminOrders: Order[] = [
  { id: 'ORD12345', userId: 'user1', items: [], totalAmount: 159.98, status: 'Enviado', deliveryMethod: 'Local Delivery', createdAt: new Date('2024-07-15T10:30:00Z').toISOString(), updatedAt: new Date('2024-07-15T14:00:00Z').toISOString() },
  { id: 'ORD12346', userId: 'user2', items: [], totalAmount: 89.00, status: 'Pendiente', deliveryMethod: 'In-Store Pickup', createdAt: new Date('2024-07-16T11:00:00Z').toISOString(), updatedAt: new Date('2024-07-16T11:00:00Z').toISOString() },
  { id: 'ORD12347', userId: 'user3', items: [], totalAmount: 499.50, status: 'Entregado', deliveryMethod: 'Local Delivery', createdAt: new Date('2024-07-14T09:20:00Z').toISOString(), updatedAt: new Date('2024-07-14T16:30:00Z').toISOString() },
  { id: 'ORD12348', userId: 'user1', items: [], totalAmount: 25.00, status: 'Cancelado', deliveryMethod: 'Local Delivery', createdAt: new Date('2024-07-13T18:00:00Z').toISOString(), updatedAt: new Date('2024-07-13T18:30:00Z').toISOString() },
];

const getStatusVariant = (status: Order['status']): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case 'Enviado': case 'Procesando': return 'default';
    case 'Entregado': case 'Recogido': return 'secondary';
    case 'Cancelado': return 'destructive';
    case 'Pendiente': return 'outline';
    default: return 'outline';
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockAdminOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
      )
    );
    // In a real app, you'd call an API here
    console.log(`Pedido ${orderId} estado actualizado a ${newStatus}`);
  };


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Gestión de Pedidos</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-sm">
          <Input
            type="search"
            placeholder="Buscar por Nº pedido o ID de usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> 
              Estado: {statusFilter === 'all' ? 'Todos' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem checked={statusFilter === 'all'} onCheckedChange={() => setStatusFilter('all')}>Todos</DropdownMenuCheckboxItem>
            {(['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Recogido', 'Cancelado'] as Order['status'][]).map(status => (
              <DropdownMenuCheckboxItem key={status} checked={statusFilter === status} onCheckedChange={() => setStatusFilter(status)}>{status}</DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº Pedido</TableHead>
              <TableHead>ID Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Método Entrega</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                    #{order.id.substring(3)}
                  </Link>
                </TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>{order.deliveryMethod}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                         <Link href={`/admin/orders/${order.id}`} className="flex items-center w-full"><Eye className="mr-2 h-4 w-4" /> Ver Detalles</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Procesando')}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Procesando
                      </DropdownMenuItem>
                       <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Enviado')}>
                        <Truck className="mr-2 h-4 w-4" /> Marcar como Enviado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, order.deliveryMethod === 'Local Delivery' ? 'Entregado' : 'Recogido')}>
                        <CheckCircle className="mr-2 h-4 w-4" /> Marcar como Completado
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'Cancelado')} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <XCircle className="mr-2 h-4 w-4" /> Cancelar Pedido
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No se encontraron pedidos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
