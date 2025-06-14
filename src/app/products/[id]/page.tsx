'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProductById, productsData } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, CheckCircle, XCircle, ChevronLeft, ChevronRight, Info, Star } from 'lucide-react';
import Link from 'next/link';
import ProductList from '@/components/products/ProductList';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchedProduct = getProductById(params.id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      // Fetch related products (simple logic: same category, not self)
      const related = productsData
        .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-xl text-muted-foreground">正在加载产品...</p>
      </div>
    );
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + amount, product.stock)));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="space-y-12">
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-muted/30 dark:bg-card-foreground/5 p-4 md:p-8 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <Image
                src={product.images[currentImageIndex].url}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain rounded-lg transition-opacity duration-300"
                data-ai-hint={product.images[currentImageIndex].hint}
                priority
              />
              {product.images.length > 1 && (
                <>
                  <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80" onClick={prevImage} aria-label="Previous image">
                    <ChevronLeft />
                  </Button>
                  <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/50 hover:bg-background/80" onClick={nextImage} aria-label="Next image">
                    <ChevronRight />
                  </Button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2 mt-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${currentImageIndex === index ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-muted-foreground/50'}`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image src={img.url} alt={`${product.name} thumbnail ${index + 1}`} width={64} height={64} className="object-cover w-full h-full" data-ai-hint={img.hint} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <Link href={`/products?category=${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm text-primary hover:underline mb-1">{product.category}</Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">(123 条评论)</span>
            </div>

            <p className="text-3xl font-semibold text-primary mb-6">${product.price.toFixed(2)}</p>
            
            <div className={`flex items-center mb-4 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
              <span>{product.stock > 0 ? `${product.stock} 件库存` : '缺货'}</span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {product.stock > 0 && (
              <div className="flex items-center space-x-3 mb-6">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} aria-label="Decrease quantity">
                  -
                </Button>
                <span className="text-lg font-medium w-10 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock} aria-label="Increase quantity">
                  +
                </Button>
              </div>
            )}

            <Button size="lg" className="w-full md:w-auto" disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? '加入购物车' : '缺货'}
            </Button>
            
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center"><Info className="h-4 w-4 mr-2 text-primary" /> SKU: {product.id.toUpperCase()}</div>
              <div className="flex items-center"><Info className="h-4 w-4 mr-2 text-primary" /> 类别: {product.category}</div>
            </div>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="description">描述</TabsTrigger>
          <TabsTrigger value="specifications">规格</TabsTrigger>
          <TabsTrigger value="reviews">评论</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6 p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">产品描述</h3>
          <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6 p-6 border rounded-lg bg-card">
          <h3 className="text-xl font-semibold mb-4">产品规格</h3>
          {product.specifications ? (
            <ul className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="flex justify-between text-muted-foreground border-b pb-1">
                  <span className="font-medium text-foreground">{key}:</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">暂无规格信息。</p>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-6 p-6 border rounded-lg bg-card">
           <h3 className="text-xl font-semibold mb-4">客户评论</h3>
           <p className="text-muted-foreground">暂无评论。</p>
           {/* Placeholder for reviews UI */}
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <section>
          <Separator className="my-10" />
          <ProductList products={relatedProducts} title="相关产品" />
        </section>
      )}
    </div>
  );
}
