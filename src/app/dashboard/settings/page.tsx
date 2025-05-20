import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { UserCog, BellRing, ShieldCheck, Palette } from "lucide-react";

export default function SettingsPage() {
  // Placeholder data and handlers
  const handleSaveChanges = () => {
    console.log("Settings saved (placeholder)");
    // Add toast notification here
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración de tu cuenta y preferencias.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserCog className="h-6 w-6 text-primary" /> Perfil de Usuario</CardTitle>
              <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" defaultValue="Usuario" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input id="lastName" defaultValue="Productor" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="productor@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Teléfono (Opcional)</Label>
                <Input id="phone" type="tel" placeholder="+123 456 7890" />
              </div>
              <Button onClick={handleSaveChanges}>Guardar Cambios de Perfil</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BellRing className="h-6 w-6 text-primary" /> Notificaciones</CardTitle>
              <CardDescription>Elige cómo quieres recibir notificaciones.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                  <span>Notificaciones por correo</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Recibe correos sobre nuevos pedidos y mensajes.
                  </span>
                </Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
                  <span>Notificaciones Push (Próximamente)</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    Alertas en tiempo real en tu dispositivo.
                  </span>
                </Label>
                <Switch id="pushNotifications" disabled />
              </div>
              <Button onClick={handleSaveChanges}>Guardar Preferencias de Notificación</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
           {/* Security Settings */}
           <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-primary" /> Seguridad</CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">Cambiar Contraseña</Button>
                <Button variant="outline" className="w-full" disabled>Autenticación de Dos Factores (Próximamente)</Button>
            </CardContent>
          </Card>
          
          {/* Appearance Settings (Placeholder) */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette className="h-6 w-6 text-primary" /> Apariencia (Platzhalter)</CardTitle>
              <CardDescription>Personaliza la apariencia del dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between">
                <Label htmlFor="darkMode">Modo Oscuro</Label>
                <Switch id="darkMode" disabled />
              </div>
              <p className="text-xs text-muted-foreground text-center">Más opciones de personalización próximamente.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
