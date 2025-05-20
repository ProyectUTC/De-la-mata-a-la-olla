"use client";

import Link from 'next/link';
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
import { PlusCircle, UploadCloud, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const productCategories = ["Verduras", "Frutas", "Tubérculos", "Hierbas", "Granos", "Otros"];

const addProductFormSchema = z.object({
  name: z.string().min(3, { message: "El nombre del producto debe tener al menos 3 caracteres." }),
  description: z.string().min(10, { message: "La descripción corta debe tener al menos 10 caracteres." }).max(150, { message: "Máximo 150 caracteres."}),
  longDescription: z.string().optional(),
  price: z.string().regex(/^\$?\d+(\.\d{1,2})?(\s*\/\s*\w+)?$/, { message: "Formato de precio inválido. Ej: $2.50 / kg" }).optional(),
  category: z.string().min(1, { message: "Debes seleccionar una categoría." }),
  imageUrl: z.string().url({ message: "Por favor, introduce una URL de imagen válida." }).optional(), // Placeholder for actual image upload
});

type AddProductFormValues = z.infer<typeof addProductFormSchema>;

export default function AddProductPage() {
  const { toast } = useToast();
  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      description: "",
      longDescription: "",
      price: "",
      category: "",
      imageUrl: "",
    },
  });

  async function onSubmit(data: AddProductFormValues) {
    console.log("New product data:", data);
    // Placeholder for actual product creation logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Producto Añadido (Simulado)",
      description: `El producto "${data.name}" ha sido añadido exitosamente (simulación).`,
    });
    form.reset();
    // router.push('/dashboard/products'); // Uncomment when router is available
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
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Añadir Nuevo Producto</h1>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Información del Producto</CardTitle>
          <CardDescription>Completa los detalles de tu nuevo producto.</CardDescription>
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
                        <Input placeholder="Ej: Lechuga Fresca Orgánica" {...field} />
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
                        <Textarea placeholder="Una breve descripción del producto (máx. 150 caracteres)" {...field} rows={3} />
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
                        <Textarea placeholder="Detalles adicionales sobre el producto, origen, métodos de cultivo, etc." {...field} rows={5} />
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
                        <Input placeholder="$0.00 / unidad" {...field} />
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
                        <Input placeholder="https://ejemplo.com/imagen.png" {...field} />
                      </FormControl>
                      <FormDescription>
                        Por ahora, ingresa una URL. La subida de archivos se implementará pronto.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Placeholder for image upload UI */}
                <FormItem>
                    <FormLabel>Subir Imagen (Próximamente)</FormLabel>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50 hover:bg-muted/70">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG (FUNCIONALIDAD PRÓXIMAMENTE)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" disabled />
                        </label>
                    </div> 
                </FormItem>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/products">Cancelar</Link>
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Guardando..." : 
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" /> Guardar Producto
                  </>
                  }
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
