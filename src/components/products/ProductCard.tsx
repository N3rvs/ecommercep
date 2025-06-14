import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full bg-card">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block aspect-square overflow-hidden relative">
          <Image
            src={product.images[0].url}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.images[0].hint}
          />
          {product.featured && (
            <Badge variant="default" className="absolute top-2 right-2 bg-primary text-primary-foreground">特色</Badge>
          )}
           {product.stock === 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">缺货</Badge>
          )}
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-semibold mb-1 leading-tight">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mb-2 h-10 overflow-hidden">{product.description.substring(0, 60)}...</p>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 border-t mt-auto">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" className="flex-1" aria-label={`View details for ${product.name}`}>
            <Link href={`/products/${product.id}`}>
              <Eye className="mr-2 h-4 w-4" /> 查看详情
            </Link>
          </Button>
          <Button 
            variant="default" 
            className="flex-1" 
            disabled={product.stock === 0}
            aria-label={`Add ${product.name} to cart`}
            // onClick={() => addToCart(product)} // Placeholder for add to cart functionality
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> {product.stock > 0 ? '加入购物车' : '缺货'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
