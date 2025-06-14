'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import type { CartItem, Product } from '@/lib/types'; // Assuming Product type is also needed
import { productsData } from '@/lib/data'; // For mock data

// Mock cart items - replace with actual cart state management (e.g., Context, Zustand, Redux)
const initialMockCartItems: CartItem[] = [
  { product: productsData[0], quantity: 1 },
  { product: productsData[2], quantity: 2 },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialMockCartItems);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 5.00; // Example shipping cost
  const taxRate = 0.08; // Example tax rate (8%)

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-3">您的购物车是空的</h1>
        <p className="text-muted-foreground mb-6">看起来您还没有添加任何商品。</p>
        <Button asChild size="lg">
          <Link href="/products">开始购物</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-foreground">您的购物车</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <Card key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-md">
              <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover aspect-square"
                  data-ai-hint={item.product.images[0].hint}
                />
              </Link>
              <div className="flex-grow">
                <Link href={`/products/${item.product.id}`}>
                  <h2 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">{item.product.name}</h2>
                </Link>
                <p className="text-sm text-muted-foreground">单价: ${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)} disabled={item.quantity <=1}>-</Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                  min="1"
                  className="h-8 w-14 text-center px-1"
                  aria-label={`Quantity for ${item.product.name}`}
                />
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}>+</Button>
              </div>
              <p className="text-md font-semibold text-foreground w-20 text-right mt-2 sm:mt-0">${(item.product.price * item.quantity).toFixed(2)}</p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleRemoveItem(item.product.id)} aria-label={`Remove ${item.product.name} from cart`}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 shadow-lg sticky top-24">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-2xl font-semibold">订单摘要</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              <div className="flex justify-between text-muted-foreground">
                <span>小计</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>运费</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>税费 ({(taxRate * 100).toFixed(0)}%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>总计</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="mt-6 p-0">
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  <CreditCard className="mr-2 h-5 w-5" /> 继续结账
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
