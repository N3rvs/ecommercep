'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Logo } from '@/components/icons/Logo';
import { mainNavItems, userNavItems, adminNavItems } from '@/lib/data'; // Assuming admin items are separate or conditional
import type { NavItem } from '@/lib/types';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Placeholder for authentication status and admin role
  const isAuthenticated = true; // Changed for demonstration
  const isAdmin = true; // Changed for demonstration

  const renderNavLinks = (items: NavItem[], closeMenu?: () => void) =>
    items.filter(item => {
        if (item.adminOnly && !isAdmin) return false;
        if (item.authRequired && !isAuthenticated) return false;
        return true;
    }).map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md"
        onClick={closeMenu}
      >
        {item.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {renderNavLinks(mainNavItems)}
          {isAuthenticated && isAdmin && renderNavLinks(adminNavItems.filter(item => mainNavItems.every(mainItem => mainItem.href !== item.href)))}
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2">
            <Input type="search" placeholder="Buscar productos..." className="h-9 w-40 lg:w-64" />
            <Button variant="ghost" size="icon" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {renderNavLinks(userNavItems.filter(item => item.href === '/cart'))} 
          
          {isAuthenticated ? (
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="Mi Cuenta">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">Iniciar Sesión</Button>
            </Link>
          )}


          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6 bg-background">
              <div className="flex justify-between items-center mb-6">
                <Logo textSize="text-lg" />
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} aria-label="Cerrar menú">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="relative mb-4">
                <Input type="search" placeholder="Buscar productos..." className="h-10 pr-10 w-full" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <nav className="flex flex-col space-y-3">
                {renderNavLinks(mainNavItems, () => setIsMobileMenuOpen(false))}
                {renderNavLinks(userNavItems, () => setIsMobileMenuOpen(false))}
                {isAuthenticated && isAdmin && renderNavLinks(adminNavItems, () => setIsMobileMenuOpen(false))}
                 {isAuthenticated ? (
                    <Link href="/login" onClick={() => { /* handle logout */ setIsMobileMenuOpen(false); }}>
                        <Button variant="ghost" className="w-full justify-start">Cerrar Sesión</Button>
                    </Link>
                 ) : (
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="default" className="w-full">Iniciar Sesión / Registrarse</Button>
                    </Link>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
