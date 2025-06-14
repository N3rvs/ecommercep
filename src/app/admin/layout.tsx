'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/icons/Logo';
import { LayoutDashboard, Package, ListOrdered, BarChartBig, Users, Settings, LogOut, Printer, ChevronDown, HomeIcon } from 'lucide-react';
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
  SidebarInset,
} from '@/components/ui/sidebar'; // Assuming sidebar component is available
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const adminNavItems = [
  { title: '仪表盘', href: '/admin', icon: LayoutDashboard },
  { title: '产品管理', href: '/admin/products', icon: Package },
  { title: '订单管理', href: '/admin/orders', icon: ListOrdered },
  { title: '销售分析', href: '/admin/analytics', icon: BarChartBig },
  { title: '用户管理', href: '/admin/users', icon: Users },
  { title: 'POS 系统', href: '/admin/pos', icon: Printer },
  { title: '设置', href: '/admin/settings', icon: Settings },
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
                             <SidebarMenuButton asChild tooltip={{children: "返回商店", className: "group-data-[collapsible=icon]:block hidden"}}>
                                <Link href="/">
                                    <HomeIcon className="h-5 w-5" />
                                    <span>返回商店</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton className="text-destructive hover:bg-destructive/10 hover:text-destructive focus:bg-destructive/10 focus:text-destructive" tooltip={{children: "退出", className: "group-data-[collapsible=icon]:block hidden"}}>
                                <LogOut className="h-5 w-5" />
                                <span>退出</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                   </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <div className="flex-1 flex flex-col overflow-hidden">
                 <header className="h-16 border-b flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <SidebarTrigger className="md:hidden mr-4" />
                        <h1 className="text-xl font-semibold">管理后台</h1>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="Admin User" data-ai-hint="person avatar" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">管理员</p>
                                    <p className="text-xs leading-none text-muted-foreground">admin@electrolocal.com</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>个人资料</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>设置</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>退出</span>
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
