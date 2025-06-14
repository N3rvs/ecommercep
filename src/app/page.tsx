import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';
import { getFeaturedProducts, categoriesData } from '@/lib/data';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-background to-muted/50 dark:from-background dark:to-card rounded-xl p-8 md:p-16 text-center md:text-left overflow-hidden">
        <div className="relative z-10 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
              <span className="block">发现最新的</span>
              <span className="block text-primary">电子产品</span>
            </h1>
            <p className="max-w-md mx-auto md:mx-0 text-lg text-muted-foreground sm:text-xl md:max-w-2xl mb-8">
              在 ElectroLocal 探索尖端技术。从智能手机到笔记本电脑等，我们为您提供本地最佳选择。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/products">
                  立即选购 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-accent/50 transition-shadow">
                <Link href="#featured-products">
                  特色产品
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block mt-8 md:mt-0 md:ml-10 flex-shrink-0">
            <Image
              src="https://placehold.co/500x400.png"
              alt="Featured electronic gadgets"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl"
              priority
              data-ai-hint="gadgets technology"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
           {/* Decorative background elements can go here */}
        </div>
      </section>

      {/* Featured Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">按类别选购</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categoriesData.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`} legacyBehavior>
              <a className="group block">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    {category.image && (
                       <Image src={category.image.url} alt={category.name} width={120} height={90} className="mb-3 rounded-md object-contain h-20 w-auto" data-ai-hint={category.image.hint} />
                    )}
                    {category.icon && !category.image && <category.icon className="h-10 w-10 text-primary mb-3 group-hover:text-accent transition-colors" />}
                    <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="featured-products">
        <ProductList products={featuredProducts} title="特色产品" />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-muted/50 dark:bg-card rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-foreground">为什么选择 ElectroLocal?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">优质产品</h3>
              <p className="text-muted-foreground">我们只提供来自顶级品牌的最新、高质量电子产品。</p>
            </div>
            <div className="p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">本地支持</h3>
              <p className="text-muted-foreground">享受我们本地团队友好且知识渊博的客户服务。</p>
            </div>
            <div className="p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">便捷购物</h3>
              <p className="text-muted-foreground">通过本地配送和店内取货选项，轻松在线购物。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
