import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, User, UserCircle, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";

export function ProfileButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      toast({
        className: "bg-green-950 border-green-800 text-green-50",
        description: (
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span>Sesión finalizada correctamente.</span>
          </div>
        ),
        duration: 3000,
      });
      router.push("/login");
    } catch (error) {
      // Log the error to services like Sentry
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Ocurrió un error inesperado y no fue posible cerrar tu sesión.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <User className="h-5 w-5" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/perfil" className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            Mi Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/pass" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Cambiar Contraseña
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
