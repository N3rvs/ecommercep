'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, User, MapPin, Truck, ShoppingBag } from 'lucide-react';
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
    status: '配送中',
    deliveryMethod: 'Local Delivery',
    shippingAddress: {
      fullName: '张三',
      street: '人民路 123 号, 4B 公寓',
      city: '上海市',
      postalCode: '200000',
      country: '中国',
      phoneNumber: '13800138000',
    },
    createdAt: new Date('2024-07-15T10:30:00Z').toISOString(),
    updatedAt: new Date('2024-07-15T14:00:00Z').toISOString(),
  };
  if (orderId === 'ORD12344') { // another mock order
    mockOrder.status = '已送达';
    mockOrder.deliveryMethod = 'In-Store Pickup';
    mockOrder.pickupLocation = "ElectroLocal 总店, 上海市南京西路 500 号";
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
    return <div className="text-center py-10 text-muted-foreground">正在加载订单详情...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-destructive">未找到订单。</div>;
  }

  const taxRate = 0.08; // Example
  const subtotal = order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = order.deliveryMethod === 'Local Delivery' ? 5.00 : 0; // Example
  const taxAmount = subtotal * taxRate;
  const totalCalculated = subtotal + shippingCost + taxAmount;


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">订单详情</h1>
        <Button variant="outline" asChild>
          <Link href="/account/orders"><ArrowLeft className="mr-2 h-4 w-4" /> 返回订单列表</Link>
        </Button>
      </div>

      <Card className="shadow-xl">
        <CardHeader className="bg-muted/30 dark:bg-card-foreground/5 p-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">订单 #{order.id.substring(3)}</CardTitle>
              <CardDescription>下单时间: {new Date(order.createdAt).toLocaleString()}</CardDescription>
            </div>
            <Badge variant={order.status === '已送达' || order.status === 'Picked Up' ? 'secondary' : order.status === '已取消' ? 'destructive' : 'default'} className="text-md px-3 py-1">
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Items Ordered */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center"><ShoppingBag className="mr-2 h-5 w-5 text-primary"/> 订单商品</h2>
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
                    <p className="text-sm text-muted-foreground">数量: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">单价: ${item.product.price.toFixed(2)}</p>
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
                {order.deliveryMethod === 'Local Delivery' ? '配送信息' : '取货信息'}
            </h2>
            {order.deliveryMethod === 'Local Delivery' && order.shippingAddress && (
              <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">收货人:</span> {order.shippingAddress.fullName}</p>
                <p><span className="font-medium text-foreground">地址:</span> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                {order.shippingAddress.phoneNumber && <p><span className="font-medium text-foreground">电话:</span> {order.shippingAddress.phoneNumber}</p>}
              </div>
            )}
            {order.deliveryMethod === 'In-Store Pickup' && (
               <div className="space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">取货地点:</span> {order.pickupLocation || 'ElectroLocal 总店'}</p>
                <p className="text-sm">请在准备好取货通知后携带订单确认邮件前来取货。</p>
              </div>
            )}
          </section>
          
          <Separator />

          {/* Order Summary */}
          <section>
            <h2 className="text-xl font-semibold mb-4">订单总计</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground"><span>小计:</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>运费:</span><span>${shippingCost.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>税费 ({(taxRate*100).toFixed(0)}%):</span><span>${taxAmount.toFixed(2)}</span></div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-foreground"><span>总计:</span><span>${totalCalculated.toFixed(2)}</span></div>
            </div>
          </section>
        </CardContent>
        <CardFooter className="bg-muted/30 dark:bg-card-foreground/5 p-6 flex justify-end gap-3">
            <Button variant="outline">联系客服</Button>
            {order.status === '配送中' && <Button>追踪包裹</Button>}
            {(order.status === '已送达' || order.status === 'Picked Up') && <Button>再次购买</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
