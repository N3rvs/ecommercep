'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListOrdered, MapPin, Edit } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual user data
const mockUser = {
  name: 'Juan Pérez', // Changed from 张三
  email: 'juan.perez@example.com', // Changed from zhangsan@example.com
  recentOrder: {
    id: 'ORD12345',
    date: '2024-07-15',
    total: 159.98,
    status: 'Enviado', // Changed from 配送中
  },
  defaultAddress: {
    street: 'Calle Falsa 123, Apt 4B', // Changed from 人民路 123 号, 4B 公寓
    city: 'Ciudad Ejemplo', // Changed from 上海市
    postalCode: '200000',
  }
};

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">¡Bienvenido de nuevo, {mockUser.name}!</CardTitle>
          <CardDescription>Administre la información de su cuenta, pedidos y preferencias aquí.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">Pedido Reciente</CardTitle>
            <ListOrdered className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {mockUser.recentOrder ? (
              <>
                <p className="text-sm text-muted-foreground">Nº Pedido: {mockUser.recentOrder.id}</p>
                <p className="text-sm text-muted-foreground">Fecha: {mockUser.recentOrder.date}</p>
                <p className="text-2xl font-bold mt-1">${mockUser.recentOrder.total.toFixed(2)}</p>
                <p className={`text-sm font-medium mt-1 ${mockUser.recentOrder.status === 'Enviado' ? 'text-blue-500' : 'text-green-500'}`}>
                  Estado: {mockUser.recentOrder.status}
                </p>
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={`/account/orders/${mockUser.recentOrder.id}`}>Ver Detalles del Pedido</Link>
                </Button>
              </>
            ) : (
              <p className="text-muted-foreground">Aún no tiene ningún pedido.</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-medium">Información de la Cuenta</CardTitle>
            <Link href="/account/settings" aria-label="Editar detalles de la cuenta">
               <Button variant="ghost" size="icon"><Edit className="h-5 w-5 text-muted-foreground hover:text-primary" /></Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-foreground">Nombre</p>
              <p className="text-muted-foreground">{mockUser.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Correo Electrónico</p>
              <p className="text-muted-foreground">{mockUser.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Dirección de Envío Predeterminada</p>
              {mockUser.defaultAddress ? (
                <p className="text-muted-foreground">
                  {mockUser.defaultAddress.street}, {mockUser.defaultAddress.city}, {mockUser.defaultAddress.postalCode}
                </p>
              ) : (
                <p className="text-muted-foreground">No se ha establecido una dirección predeterminada.</p>
              )}
            </div>
             <Button asChild variant="secondary" size="sm" className="mt-3">
                <Link href="/account/settings">Editar Perfil</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="text-xl">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/orders" className="flex flex-col items-start">
                    <ListOrdered className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">Ver Todos los Pedidos</span>
                    <span className="text-xs text-muted-foreground">Rastree su historial de compras</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/addresses" className="flex flex-col items-start">
                    <MapPin className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">Administrar Direcciones</span>
                    <span className="text-xs text-muted-foreground">Actualice su información de envío</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start p-6 text-left h-auto">
                <Link href="/account/settings" className="flex flex-col items-start">
                    <Edit className="h-6 w-6 mb-2 text-primary"/>
                    <span className="font-semibold">Editar Perfil</span>
                    <span className="text-xs text-muted-foreground">Actualice sus datos de contacto y contraseña</span>
                </Link>
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
