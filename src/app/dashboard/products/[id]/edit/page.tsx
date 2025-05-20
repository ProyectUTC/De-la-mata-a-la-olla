"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation'; // To get product ID
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save, UploadCloud, ArrowLeft, Trash2 } from "lucide-react";
import { mockProducts } from '@/lib/mockData'; // For fetching product data by ID
import type { Product } from '@/types';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const productCategories = ["Verduras", "Frutas", "Tubérculos", "Hierbas", "Granos", "Otros"];

const editProductFormSchema = z.object({
  name: z.string().min(3, { message: "El nombre del producto debe tener al menos 3 caracteres." }),
  description: z.string().min(10, { message: "La descripción corta debe tener al menos 10 caracteres." }).max(150, { message: "Máximo 150 caracteres."}),
  longDescription: z.string().optional(),
  price: z.string().regex(/^\$?\d+(\.\d{1,2})?(\s*\/\s*\w+)?$/, { message: "Formato de precio inválido. Ej: $2.50 / kg" }).optional(),
  category: z.string().min(1, { message: "Debes seleccionar una categoría." }),
  imageUrl: z.string().url({ message: "Por favor, introduce una URL de imagen válida." }).optional(),
});

type EditProductFormValues = z.infer<typeof editProductFormSchema>;

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const { toast } = useToast();
  
  // Find the product to edit - in a real app, this would be an API call
  const productToEdit = mockProducts.find(p => p.id === productId);

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: productToEdit || { // Pre-fill form if product found
      name: "",
      description: "",
      longDescription: "",
      price: "",
      category: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (productToEdit) {
      form.reset(productToEdit);
    }
  }, [productToEdit, form]);


  async function onSubmit(data: EditProductFormValues) {
    console.log("Updated product data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Producto Actualizado (Simulado)",
      description: `El producto "${data.name}" ha sido actualizado (simulación).`,
    });
    // router.push('/dashboard/products');
  }
  
  async function onDeleteProduct() {
    console.log("Delete product ID:", productId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Producto Eliminado (Simulado)",
      description: `El producto ha sido eliminado (simulación).`,
      variant: "destructive",
    });
    // router.push('/dashboard/products');
  }

  if (!productToEdit && typeof window !== 'undefined') { // Check for window to avoid SSR issues with router/params
     // This should ideally redirect or show a proper "not found" page
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <h1 className="text-2xl font-bold text-destructive mb-4">Producto no encontrado</h1>
        <p className="text-muted-foreground mb-6">El producto que intentas editar no existe o no está disponible.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/products">Volver al listado de productos</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
         <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/products">
            <ArrowLeft className="h-4 w-4" />
             <span className="sr-only">Volver</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Editar Producto</h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Modificar Detalles del Producto</CardTitle>
          <CardDescription>Actualiza la información de "{productToEdit?.name || 'producto'}".</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-1 space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción Corta</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="longDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción Larga (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-1 space-y-6">
                 <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio (Ej: $2.50 / kg)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Define el precio y la unidad de medida.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de la Imagen del Producto (Opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Por ahora, ingresa una URL. La subida de archivos se implementará pronto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                    <FormLabel>Subir Imagen (Próximamente)</FormLabel>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file-edit" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50 hover:bg-muted/70">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG (FUNCIONALIDAD PRÓXIMAMENTE)</p>
                            </div>
                            <Input id="dropzone-file-edit" type="file" className="hidden" disabled />
                        </label>
                    </div> 
                </FormItem>
              </div>
              <div className="md:col-span-2 flex justify-between items-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button" variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
                      <Trash2 className="mr-2 h-4 w-4" /> Eliminar Producto
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará permanentemente el producto
                        "{productToEdit?.name}" de nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={onDeleteProduct} className="bg-destructive hover:bg-destructive/90">
                        Sí, eliminar producto
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <div className="space-x-3">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/products">Cancelar</Link>
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Guardando..." : 
                    <>
                      <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                    </>
                    }
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
