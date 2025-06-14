'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, User, MapPin, Truck, ShoppingBag, Store } from 'lucide-react';
import type { Order, CartItem } from '@/lib/types'; // Assuming CartItem includes product details for display
import { productsData } from '@/lib/data'; // For mock product data

// Mock function to get order details - replace with actual data fetching
const fetchOrderDetails = async (orderId: string): Promise<Order | null> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const mockOrder: Order = {
    id: orderId,
    userId: 'user1',
    items: [
      { product: productsData[0], quantity: 1 },
      { product: productsData[1], quantity: 1 },
    ],
    totalAmount: productsData[0].price + productsData[1].price, // Example calculation
    status: 'Enviado', // Changed from 配送中
    deliveryMethod: 'Local Delivery',
    shippingAddress: {
      fullName: 'Juan Pérez', // Changed from 张三
      street: 'Calle Falsa 123, Apt 4B', // Changed from 人民路 123 号, 4B 公寓
      city: 'Ciudad Ejemplo', // Changed from 上海市
      postalCode: '200000',
      country: 'País Ejemplo', // Changed from 中国
      phoneNumber: '13800138000',
    },
    createdAt: new Date('2024-07-15T10:30:00Z').toISOString(),
    updatedAt: new Date('2024-07-15T14:00:00Z').toISOString(),
  };
  if (orderId === 'ORD12344') { // another mock order
    mockOrder.status = 'Entregado'; // Changed from 已送达
    mockOrder.deliveryMethod = 'In-Store Pickup';
    mockOrder.pickupLocation = "ElectroLocal Tienda Principal, Av. Principal 500, Ciudad Ejemplo"; // Changed from ElectroLocal 总店, 上海市南京西路 500 号
    mockOrder.shippingAddress = undefined;
     mockOrder.items = [{ product: productsData[2], quantity: 1 }];
     mockOrder.totalAmount = productsData[2].price;
  }
  return mockOrder;
};


export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadOrder = async () => {
      setIsLoading(true);
      const fetchedOrder = await fetchOrderDetails(params.orderId);
      setOrder(fetchedOrder);
      setIsLoading(false);
    };
    loadOrder();
  }, [params.orderId]);

  if (isLoading) {
    return <div className="text-center py-10 text-muted-foreground">Cargando detalles del pedido...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-destructive">Pedido no encontrado.</div>;
  }

  const taxRate = 0.08; // Example
  const subtotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = order.deliveryMethod === 'Local Delivery' ? 5.00 : 0; // Example
  const taxAmount = subtotal * taxRate;
  const totalCalculated = subtotal + shippingCost + taxAmount;


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Detalles del Pedido</h1>
        <Button variant="outline" asChild>
          <Link href="/account/orders"><ArrowLeft className="mr-2 h-4 w-4" /> Volver a Pedidos</Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 dark:bg-card-foreground/5 p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">Pedido #{order.id.substring(3)}</CardTitle>
              <CardDescription>Fecha del pedido: {new Date(order.createdAt).toLocaleString()}</CardDescription>
            </div>
            <Badge variant={order.status === 'Entregado' || order.status === 'Recogido' ? 'secondary' : order.status === 'Cancelado' ? 'destructive' : 'default'} className="text-md px-3 py-1">
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Items Ordered */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center"><ShoppingBag className="mr-2 h-5 w-5 text-primary"/> Artículos del Pedido</h2>
            <div className="space-y-4">
              {order.items.map(item => (
                <div key={item.product.id} className="flex items-start gap-4 p-3 border rounded-md bg-background hover:bg-muted/50 transition-colors">
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover aspect-square"
                    data-ai-hint={item.product.images[0].hint}
                  />
                  <div className="flex-grow">
                    <Link href={`/products/${item.product.id}`} className="font-medium text-foreground hover:text-primary transition-colors">{item.product.name}</Link>
                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">Precio unitario: ${item.product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-md font-semibold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Delivery / Pickup Information */}
          <section>
             <h2 className="text-xl font-semibold mb-4 flex items-center">
                {order.deliveryMethod === 'Local Delivery' ? <Truck className="mr-2 h-5 w-5 text-primary"/> : <Store className="mr-2 h-5 w-5 text-primary"/>}
                {order.deliveryMethod === 'Local Delivery' ? 'Información de Envío' : 'Información de Recogida'}
            </h2>
            {order.deliveryMethod === 'Local Delivery' && order.shippingAddress && (
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Destinatario:</span> {order.shippingAddress.fullName}</p>
                <p><span className="font-medium text-foreground">Dirección:</span> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                {order.shippingAddress.phoneNumber && <p><span className="font-medium text-foreground">Teléfono:</span> {order.shippingAddress.phoneNumber}</p>}
              </div>
            )}
            {order.deliveryMethod === 'In-Store Pickup' && (
               <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Lugar de recogida:</span> {order.pickupLocation || 'ElectroLocal Tienda Principal'}</p>
                <p className="text-sm">Por favor, traiga la confirmación de su pedido por correo electrónico cuando venga a recogerlo después de recibir la notificación de que está listo.</p>
              </div>
            )}
          </section>
          
          <Separator />

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Envío:</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Impuestos ({(taxRate*100).toFixed(0)}%):</span><span>${taxAmount.toFixed(2)}</span></div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-foreground"><span>Total:</span><span>${totalCalculated.toFixed(2)}</span></div>
            </div>
          </section>
        </CardContent>
        <CardFooter className="bg-muted/30 dark:bg-card-foreground/5 p-6 flex justify-end gap-3">
            <Button variant="outline">Contactar Soporte</Button>
            {order.status === 'Enviado' && <Button>Rastrear Paquete</Button>}
            {(order.status === 'Entregado' || order.status === 'Recogido') && <Button>Comprar de Nuevo</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
