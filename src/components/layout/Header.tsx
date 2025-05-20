import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Leaf, ShoppingBag, Mail, UserCircle, LayoutGrid } from 'lucide-react';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  { label: 'Inicio', href: '/', icon: Leaf },
  { label: 'Productos', href: '/products', icon: ShoppingBag },
  { label: 'Contacto', href: '/contact', icon: Mail },
];

const authNavItems: NavItem[] = [
  { label: 'Ingresar', href: '/login', icon: UserCircle },
  { label: 'Registrarse', href: '/register' },
];

// Placeholder for user authentication state
// In a real app, this would come from a context or hook
const isAuthenticated = false; 
const userRole = 'guest'; // 'guest', 'producer', 'admin'

export function Header() {
  const displayedAuthItems = isAuthenticated
    ? [{ label: 'Dashboard', href: '/dashboard', icon: LayoutGrid }]
    : authNavItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary hover:opacity-80 transition-opacity">
          <Leaf className="h-7 w-7" />
          <span className="font-bold text-xl tracking-tight">Campo Abierto</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          {displayedAuthItems.map((item) => (
             <Button key={item.label} variant={item.href === '/register' ? "default" : "outline"} size="sm" asChild>
               <Link href={item.href}>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.label}
               </Link>
             </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-background">
              <div className="p-6">
              <Link href="/" className="flex items-center space-x-2 mb-8 text-primary">
                <Leaf className="h-7 w-7" />
                <span className="font-bold text-xl tracking-tight">Campo Abierto</span>
              </Link>
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 rounded-md p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                ))}
                <hr className="my-4 border-border" />
                {displayedAuthItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 rounded-md p-2 text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
