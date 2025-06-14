'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, ListOrdered, Heart, Settings, LogOut, CreditCard, MapPin } from 'lucide-react';

const sidebarNavItems = [
  { title: 'Resumen de Cuenta', href: '/account', icon: User },
  { title: 'Mis Pedidos', href: '/account/orders', icon: ListOrdered },
  { title: 'Direcciones', href: '/account/addresses', icon: MapPin },
  { title: 'Métodos de Pago', href: '/account/payment-methods', icon: CreditCard },
  { title: 'Lista de Deseos', href: '/account/wishlist', icon: Heart },
  { title: 'Configuración de Cuenta', href: '/account/settings', icon: Settings },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // const { user, logout } = useAuth(); // Placeholder for auth context

  // if (!user) { // Placeholder for redirecting if not authenticated
  //   // redirect('/login'); 
  //   return <p>Cargando o redirigiendo...</p>;
  // }

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
      <aside className="sticky top-20">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-6 p-2">
              {/* Placeholder for Avatar */}
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Nombre de Usuario</p> 
                <p className="text-sm text-muted-foreground">user@example.com</p>
              </div>
            </div>
            <nav className="space-y-1">
              {sidebarNavItems.map((item) => (
                <Link key={item.title} href={item.href} legacyBehavior>
                  <a
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors
                      ${pathname === item.href
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </a>
                </Link>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                // onClick={logout} // Placeholder
              >
                <LogOut className="mr-3 h-5 w-5" />
                Cerrar Sesión
              </Button>
            </nav>
          </CardContent>
        </Card>
      </aside>
      <main className="py-2">
        {children}
      </main>
    </div>
  );
}
