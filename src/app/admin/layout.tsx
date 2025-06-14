'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/icons/Logo';
import { LayoutDashboard, Package, ListOrdered, BarChartBig, Users, Settings, LogOut, Printer, HomeIcon } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const adminNavItems = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Productos', href: '/admin/products', icon: Package },
  { title: 'Pedidos', href: '/admin/orders', icon: ListOrdered },
  { title: 'Análisis', href: '/admin/analytics', icon: BarChartBig },
  { title: 'Usuarios', href: '/admin/users', icon: Users },
  { title: 'Sistema POS', href: '/admin/pos', icon: Printer },
  { title: 'Configuración', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Placeholder: In a real app, protect this route and fetch admin user data
  // const { isAdmin, user, logout } = useAuth();
  // if (!isAdmin) { redirect('/'); return null; }

  return (
    <SidebarProvider defaultOpen>
        <div className="flex h-screen bg-background">
            <Sidebar collapsible="icon" className="border-r">
                <SidebarHeader className="p-4 flex flex-col items-center group-data-[collapsible=icon]:items-center">
                  <Logo size={28} className="group-data-[collapsible=icon]:hidden" />
                  <Logo size={28} className="hidden group-data-[collapsible=icon]:block" />
                </SidebarHeader>
                <SidebarContent className="p-2">
                    <ScrollArea className="h-full">
                        <SidebarMenu>
                            {adminNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                                        tooltip={{children: item.title, className: "group-data-[collapsible=icon]:block hidden"}}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </ScrollArea>
                </SidebarContent>
                <SidebarFooter className="p-2 border-t">
                   <SidebarMenu>
                        <SidebarMenuItem>
                             <SidebarMenuButton asChild tooltip={{children: "Volver a Tienda", className: "group-data-[collapsible=icon]:block hidden"}}>
                                <Link href="/">
                                    <HomeIcon className="h-5 w-5" />
                                    <span>Volver a Tienda</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive" tooltip={{children: "Cerrar Sesión", className: "group-data-[collapsible=icon]:block hidden"}}>
                                <LogOut className="h-5 w-5" />
                                <span>Cerrar Sesión</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                   </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <div className="flex-1 flex flex-col overflow-hidden">
                 <header className="h-16 border-b flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <SidebarTrigger className="md:hidden mr-4" />
                        <h1 className="text-xl font-semibold">Panel de Administración</h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="Usuario Admin" data-ai-hint="person avatar" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Administrador</p>
                                    <p className="text-xs leading-none text-muted-foreground">admin@electrolocal.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                <span>Perfil</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configuración</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar Sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <ScrollArea className="flex-1">
                    <main className="p-6">{children}</main>
                </ScrollArea>
            </div>
        </div>
    </SidebarProvider>
  );
}
