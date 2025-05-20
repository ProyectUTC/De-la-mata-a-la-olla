import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card id={product.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        <div className="aspect-video relative w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <CardTitle className="text-xl font-semibold mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
        <CardDescription className="text-muted-foreground line-clamp-3 mb-2">{product.description}</CardDescription>
        {product.price && <p className="font-semibold text-primary">{product.price}</p>}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {/* In a full app, this could link to a product details page: /products/${product.id} */}
        <Button variant="outline" asChild className="w-full">
          {/* For now, this links to contact as it's informational */}
          <Link href="/contact">Consultar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
