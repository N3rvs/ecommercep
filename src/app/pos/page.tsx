'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Search, Printer, DollarSign, X } from 'lucide-react';
import type { Product, CartItem as POSCartItem } from '@/lib/types';
import { productsData } from '@/lib/data';
import Image from 'next/image';

// Extend CartItem for POS specifics if needed
interface POSItem extends POSCartItem {
  // any POS specific fields
}

export default function POSPage() {
  const [cart, setCart] = useState<POSItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = productsData.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limit results for performance
    setSearchResults(results);
  }, [searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setSearchTerm(''); // Clear search after adding
    searchResultsRefocus();
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxRate = 0.08; // Example 8% tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const searchResultsRefocus = () => {
    searchInputRef.current?.focus();
  }

  const handlePayment = () => {
    // Placeholder for payment processing and ticket generation
    if (cart.length === 0) {
        alert("¡El carrito está vacío!"); // Changed from 购物车是空的！
        return;
    }
    alert(`Monto Total: $${total.toFixed(2)}\nGenerando recibo...`); // Changed from 总金额: $${total.toFixed(2)}\n正在生成小票...
    // Here you would integrate with a payment gateway and/or print a receipt
    setCart([]); // Clear cart after payment
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 p-1 md:p-4 bg-muted/30 dark:bg-background">
      {/* Left Panel: Product Search & Selection */}
      <Card className="flex-1 md:flex-[2] flex flex-col shadow-lg">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-xl">Selección de Producto</CardTitle>
          <div className="relative mt-2">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            {searchResults.length > 0 && (
              <ul className="p-2 space-y-1">
                {searchResults.map(product => (
                  <li key={product.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-left hover:bg-primary/10"
                      onClick={() => addToCart(product)}
                    >
                      <Image src={product.images[0].url} alt={product.name} width={40} height={40} className="rounded mr-3 aspect-square object-cover" data-ai-hint={product.images[0].hint} />
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {product.id} | Stock: {product.stock}</p>
                      </div>
                      <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
            {searchTerm && searchResults.length === 0 && (
                <p className="p-4 text-center text-muted-foreground">Producto no encontrado.</p>
            )}
            {!searchTerm && (
                <p className="p-4 text-center text-muted-foreground">Ingrese para buscar productos.</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Panel: Cart & Checkout */}
      <Card className="flex-1 md:flex-[3] flex flex-col shadow-lg">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-xl flex justify-between items-center">
            Pedido Actual
            {cart.length > 0 && <Button variant="outline" size="sm" onClick={() => setCart([])} className="text-destructive hover:text-destructive"><X className="mr-1 h-4 w-4"/>Limpiar Carrito</Button>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            {cart.length === 0 ? (
              <p className="p-8 text-center text-muted-foreground">El carrito está vacío. Añada productos desde la izquierda.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%]">Producto</TableHead>
                    <TableHead className="text-center w-[15%]">Cantidad</TableHead>
                    <TableHead className="text-right w-[20%]">Precio</TableHead>
                    <TableHead className="w-[5%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map(item => (
                    <TableRow key={item.product.id}>
                      <TableCell className="font-medium py-2">
                        <div className="flex items-center gap-2">
                           <Image src={item.product.images[0].url} alt={item.product.name} width={32} height={32} className="rounded aspect-square object-cover" data-ai-hint={item.product.images[0].hint} />
                           <span className="text-sm">{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                          min="1"
                          className="h-8 w-16 text-center mx-auto px-1"
                        />
                      </TableCell>
                      <TableCell className="text-right py-2">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="py-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t p-4 space-y-3 flex-col items-stretch">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Impuestos ({(taxRate * 100).toFixed(0)}%):</span>
            <span className="font-medium">${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-primary">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex gap-2 mt-2">
            <Button size="lg" className="flex-1" onClick={handlePayment} disabled={cart.length === 0}>
              <DollarSign className="mr-2 h-5 w-5" /> Pagar
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => alert('Función de imprimir recibo por implementar')} disabled={cart.length === 0}> {/* Changed from 打印小票功能待实现 */}
              <Printer className="mr-2 h-5 w-5" /> Imprimir Recibo
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
