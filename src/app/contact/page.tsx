import { AppLayout } from '@/components/layout/AppLayout';
import { ContactForm } from './components/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <AppLayout>
      <section className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">Contáctanos</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Si tienes preguntas sobre nuestros productos, pedidos o quieres saber más sobre Campo Abierto, no dudes en escribirnos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Información de Contacto</h2>
            <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <MapPin className="h-6 w-6 mr-3 text-primary" /> Dirección
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Calle Ficticia 123, Sector Agrícola<br />
                    Valle Hermoso, Provincia Ejemplo<br />
                    País Imaginario
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Phone className="h-6 w-6 mr-3 text-primary" /> Teléfono y Correo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Teléfono:</strong> +123 456 7890<br />
                    <strong>Correo:</strong> info@campoabierto.example.com
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Clock className="h-6 w-6 mr-3 text-primary" /> Horario de Atención
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 AM - 5:00 PM<br />
                    Sábados: 9:00 AM - 1:00 PM<br />
                    Domingos: Cerrado
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
