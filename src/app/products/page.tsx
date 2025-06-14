'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/products/ProductList';
import { productsData, categoriesData } from '@/lib/data';
import type { Product, Category } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const initialCategorySlug = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    let products = productsData;

    if (selectedCategory !== 'all') {
      const category = categoriesData.find(c => c.slug === selectedCategory);
      if (category) {
        products = products.filter(p => p.category === category.name);
      }
    }

    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'price-asc') {
      products = [...products].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      products = [...products].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'featured') {
      products = [...products].sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
    }


    setFilteredProducts(products);
  }, [selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    if (initialCategorySlug) {
      setSelectedCategory(initialCategorySlug);
    }
  }, [initialCategorySlug]);


  return (
    <div className="space-y-8">
      <div className="bg-muted/30 dark:bg-card p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-foreground mb-2">我们的产品</h1>
        <p className="text-muted-foreground">探索我们精选的最新电子产品。</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 border rounded-lg items-center">
        <div className="relative w-full md:flex-grow">
          <Input
            type="text"
            placeholder="搜索产品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px] h-10">
              <SelectValue placeholder="选择类别" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有类别</SelectItem>
              {categoriesData.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] h-10">
              <SelectValue placeholder="排序方式" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">特色优先</SelectItem>
              <SelectItem value="price-asc">价格：从低到高</SelectItem>
              <SelectItem value="price-desc">价格：从高到低</SelectItem>
              <SelectItem value="name-asc">名称：A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ProductList products={filteredProducts} />
    </div>
  );
}

// Skeleton loader for the products page
function ProductsPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="bg-muted/30 dark:bg-card p-6 rounded-lg shadow">
        <Skeleton className="h-9 w-1/2 mb-2" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 border rounded-lg items-center">
        <Skeleton className="h-10 w-full md:flex-grow" />
        <div className="flex gap-4 w-full md:w-auto">
          <Skeleton className="h-10 w-full md:w-[180px]" />
          <Skeleton className="h-10 w-full md:w-[180px]" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="group overflow-hidden rounded-lg shadow-lg flex flex-col h-full">
            <CardHeader className="p-0">
              <Skeleton className="aspect-square w-full" />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-7 w-1/3" />
            </CardContent>
            <CardFooter className="p-4 border-t mt-auto">
              <div className="flex gap-2 w-full">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}


export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPageContent />
    </Suspense>
  );
}

