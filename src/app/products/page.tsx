import { AppLayout } from '@/components/layout/AppLayout';
import { ProductCard } from './components/ProductCard';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';

export default function ProductsPage() {
  return (
    <AppLayout>
      <section>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Nuestros Productos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra selección de productos agrícolas frescos, cultivados con esmero por productores locales.
          </p>
        </div>
        
        {mockProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mockProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No hay productos disponibles en este momento. Vuelve pronto.</p>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
