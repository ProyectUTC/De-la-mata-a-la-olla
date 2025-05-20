import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';
import { ArrowRight, ShoppingBasket, Users } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/20 to-background rounded-lg shadow-lg overflow-hidden mb-16">
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1200x600.png"
            alt="Campo agrícola"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="agriculture landscape"
          />
           <div className="absolute inset-0 bg-background/30 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            <span className="text-primary">Campo Abierto</span>: Frescura Directa del Productor
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Conectamos a productores locales con tu mesa. Descubre la calidad y el sabor de productos cultivados con pasión y dedicación.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/products">
                Ver Productos <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md hover:shadow-lg transition-shadow">
              <Link href="/contact">
                Contáctanos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center text-foreground mb-10">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product: Product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="p-0">
                <div className="aspect-video relative w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={product.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-3">{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/products#${product.id}`}>Ver Detalles</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action / About Section */}
      <section className="py-16 bg-secondary/50 rounded-lg shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">Únete a Nuestra Comunidad</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Campo Abierto es más que un mercado. Es una comunidad de amantes de la comida fresca y de apoyo a los agricultores locales.
                Descubre cómo puedes ser parte.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow">
                    <ShoppingBasket className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Compra Local</h3>
                    <p className="text-muted-foreground">Accede a una variedad de productos frescos de temporada.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground p-3 rounded-full shadow">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Apoya a Productores</h3>
                    <p className="text-muted-foreground">Contribuye al sustento de agricultores y sus familias.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
               <Image
                src="https://placehold.co/600x400.png"
                alt="Comunidad agrícola"
                layout="fill"
                objectFit="cover"
                data-ai-hint="community farming"
              />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
