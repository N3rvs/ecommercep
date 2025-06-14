import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Logo textSize="text-2xl" />
            <p className="mt-2 text-sm text-muted-foreground">
              您本地最新的电子产品中心。
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:support@electrolocal.com" aria-label="Email Support" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">商店</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">所有产品</Link></li>
              <li><Link href="/products?category=smartphones" className="text-sm text-muted-foreground hover:text-primary transition-colors">智能手机</Link></li>
              <li><Link href="/products?category=laptops" className="text-sm text-muted-foreground hover:text-primary transition-colors">笔记本电脑</Link></li>
              <li><Link href="/products?category=audio" className="text-sm text-muted-foreground hover:text-primary transition-colors">音频设备</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">客户服务</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">联系我们</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">常见问题</Link></li>
              <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">配送信息</Link></li>
              <li><Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">退货政策</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ElectroLocal. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
