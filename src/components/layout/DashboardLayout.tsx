"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutGrid,
  Package,
  PlusCircle,
  Settings,
  LogOut,
  User,
  Leaf,
  ChevronDown,
  Bell,
} from 'lucide-react';
import type { NavItem } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: ReactNode;
}

const dashboardNavItems: NavItem[] = [
  { label: 'Resumen', href: '/dashboard', icon: LayoutGrid },
  { label: 'Mis Productos', href: '/dashboard/products', icon: Package },
  { label: 'Añadir Producto', href: '/dashboard/products/new', icon: PlusCircle },
  { label: 'Configuración', href: '/dashboard/settings', icon: Settings },
];

// Placeholder for user data
const user = {
  name: "Usuario Productor",
  email: "productor@example.com",
  avatarUrl: "https://placehold.co/100x100.png",
  initials: "UP",
};


export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border shadow-md">
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2 text-sidebar-foreground hover:opacity-80 transition-opacity">
              <Leaf className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl group-data-[collapsible=icon]:hidden">Campo Abierto</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              {dashboardNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label, className: "bg-popover text-popover-foreground" }}
                  >
                    <Link href={item.href}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-sidebar-border">
             <SidebarMenuButton
                asChild
                tooltip={{ children: "Cerrar Sesión", className: "bg-popover text-popover-foreground" }}
              >
              {/* Placeholder for logout */}
              <Link href="/"> 
                <LogOut />
                <span>Cerrar Sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur px-6">
            <div className="flex items-center">
              <SidebarTrigger className="md:hidden mr-2" />
              {/* Breadcrumbs or Page Title can go here */}
              <h1 className="text-xl font-semibold text-foreground">
                {dashboardNavItems.find(item => item.href === pathname)?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notificaciones</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile person" />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" />Configuración</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     {/* Placeholder, should go to a profile page */}
                     <Link href="/dashboard"><User className="mr-2 h-4 w-4" />Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    {/* Placeholder for logout */}
                    <Link href="/"><LogOut className="mr-2 h-4 w-4" />Cerrar sesión</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
