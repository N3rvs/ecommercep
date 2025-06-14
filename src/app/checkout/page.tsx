'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import { Truck, Store, CreditCard, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock summary data - in a real app, this would come from cart state
const mockOrderSummary = {
  subtotal: 1248.50,
  shipping: 5.00,
  tax: 99.88,
  total: 1353.38,
  items: [
    { id: '1', name: 'Smartphone Emblemático X100', quantity: 1, price: 999.99, image: 'https://placehold.co/60x60.png', hint: 'smartphone modern' }, // Changed from 旗舰智能手机 X100
    { id: '3', name: 'Auriculares con Cancelación de Ruido Elite Sound', quantity: 1, price: 249.50, image: 'https://placehold.co/60x60.png', hint: 'headphones audio' }, // Changed from 降噪耳机 Elite Sound
  ],
};


export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' or 'pickup'
  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on current step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Process order
      alert('¡Pedido enviado!'); // Placeholder // Changed from 订单已提交！
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Finalizar Compra</h1>
        <Button variant="outline" asChild>
          <Link href="/cart"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Carrito</Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Checkout Form Steps */}
        <form onSubmit={handleSubmit} id="checkout-form" className="lg:col-span-2 space-y-8">
          <Accordion type="single" collapsible defaultValue={`step-${currentStep}`} value={`step-${currentStep}`} onValueChange={(value) => setCurrentStep(parseInt(value.split('-')[1]))}>
            {/* Step 1: Delivery/Shipping Information */}
            <AccordionItem value="step-1">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center"><Truck className="mr-3 h-6 w-6 text-primary" /> 1. Información de Envío</div>
              </AccordionTrigger>
              <AccordionContent className="p-1">
                <Card className="border-0 shadow-none">
                  <CardContent className="space-y-6 pt-6">
                    <RadioGroup defaultValue="delivery" value={deliveryMethod} onValueChange={setDeliveryMethod} className="mb-6">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery" className="text-md flex items-center cursor-pointer"><Truck className="mr-2 h-5 w-5 text-primary" /> Envío Local</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="text-md flex items-center cursor-pointer"><Store className="mr-2 h-5 w-5 text-primary" /> Recogida en Tienda</Label>
                      </div>
                    </RadioGroup>

                    {deliveryMethod === 'delivery' && (
                      <div className="space-y-4 animate-in fade-in-50">
                        <div>
                          <Label htmlFor="fullName">Nombre Completo</Label>
                          <Input id="fullName" placeholder="Juan Pérez" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="address">Dirección</Label>
                          <Input id="address" placeholder="Calle Falsa 123" required className="mt-1" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" placeholder="Ciudad Ejemplo" required className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="postalCode">Código Postal</Label>
                            <Input id="postalCode" placeholder="200000" required className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone">Número de Teléfono</Label>
                          <Input type="tel" id="phone" placeholder="13800138000" required className="mt-1" />
                        </div>
                      </div>
                    )}

                    {deliveryMethod === 'pickup' && (
                      <div className="space-y-4 animate-in fade-in-50">
                        <p className="text-muted-foreground">Puede recoger su pedido en nuestra tienda:</p>
                        <p className="font-semibold">ElectroLocal Tienda Principal<br />Av. Principal 500, Ciudad Ejemplo<br />Horario: 10:00 AM - 8:00 PM</p>
                        <div>
                          <Label htmlFor="pickupName">Nombre para Recogida</Label>
                          <Input id="pickupName" placeholder="Juan Pérez" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="pickupPhone">Teléfono para Recogida</Label>
                          <Input type="tel" id="pickupPhone" placeholder="13800138000" required className="mt-1" />
                        </div>
                      </div>
                    )}
                    <Button type="button" onClick={() => setCurrentStep(2)} className="w-full md:w-auto">Continuar al Pago</Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Step 2: Payment Information */}
            <AccordionItem value="step-2">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center"><CreditCard className="mr-3 h-6 w-6 text-primary" /> 2. Información de Pago</div>
              </AccordionTrigger>
              <AccordionContent className="p-1">
                 <Card className="border-0 shadow-none">
                  <CardContent className="space-y-6 pt-6">
                    <div>
                      <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                      <Input id="cardNumber" placeholder="•••• •••• •••• ••••" required className="mt-1" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Fecha de Caducidad (MM/AA)</Label>
                        <Input id="expiryDate" placeholder="MM/AA" required className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="•••" required className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                      <Input id="cardName" placeholder="Juan Pérez" required className="mt-1" />
                    </div>
                     <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <span>Su información de pago se transmite de forma segura mediante cifrado SSL.</span>
                    </div>
                    <Button type="button" onClick={() => setCurrentStep(3)} className="w-full md:w-auto">Revisar Pedido</Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            {/* Step 3: Review Order */}
            <AccordionItem value="step-3">
              <AccordionTrigger className="text-xl font-semibold">
                 <div className="flex items-center"><ShieldCheck className="mr-3 h-6 w-6 text-primary" /> 3. Revisar y Realizar Pedido</div>
              </AccordionTrigger>
              <AccordionContent className="p-1">
                <Card className="border-0 shadow-none">
                  <CardContent className="space-y-6 pt-6">
                    <h3 className="text-lg font-medium">Detalles del Pedido:</h3>
                    {/* Display order details, shipping, payment summary here */}
                    <p className="text-muted-foreground">Por favor, revise los detalles de su pedido y luego haga clic en "Realizar Pedido Ahora".</p>
                    <p><span className="font-medium">Método de Entrega:</span> {deliveryMethod === 'delivery' ? 'Envío Local' : 'Recogida en Tienda'}</p>
                    {/* Add more review details here */}
                    <Button type="submit" size="lg" className="w-full">Realizar Pedido Ahora</Button>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </form>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 shadow-lg sticky top-24">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-semibold">Su Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-0">
              {mockOrderSummary.items.map(item => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" data-ai-hint={item.hint}/>
                    <div>
                      <p className="text-foreground">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${mockOrderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Envío</span>
                <span>${mockOrderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Impuestos</span>
                <span>${mockOrderSummary.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total</span>
                <span>${mockOrderSummary.total.toFixed(2)}</span>
              </div>
            </CardContent>
             {currentStep === 3 && (
              <CardFooter className="mt-6 p-0">
                <Button type="submit" form="checkout-form" size="lg" className="w-full" onClick={handleSubmit}>
                  Realizar Pedido Ahora (${mockOrderSummary.total.toFixed(2)})
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
