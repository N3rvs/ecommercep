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
              Tu centro local para los últimos electrónicos.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:support@electrolocal.com" aria-label="Soporte por Correo" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Tienda</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">Todos los Productos</Link></li>
              <li><Link href="/products?category=smartphones" className="text-sm text-muted-foreground hover:text-primary transition-colors">Smartphones</Link></li>
              <li><Link href="/products?category=laptops" className="text-sm text-muted-foreground hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link href="/products?category=audio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Dispositivos de Audio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Servicio al Cliente</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contáctanos</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Información de Envío</Link></li>
              <li><Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Política de Devoluciones</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} ElectroLocal. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
