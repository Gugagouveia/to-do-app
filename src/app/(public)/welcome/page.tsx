import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES } from "@/navigation";

export default function WelcomePage() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center max-w-[400px]">
      <h1 className="text-5xl">Lista de Tarefas</h1>

      <p className="text-3x1 text h-15 w-15">
        Mantenha-se organizado, faça as coisas: seu aplicativo definitivo de
        lista de tarefas. O aplicativo de lista de tarefas é uma ferramenta
        digital de gerenciamento de tarefas projetada para ajudar os usuários a
        organizarem e priorizarem suas atividades diárias e responsabilidades.
      </p>
      <Button className="w-full">Começar</Button>
      <p className="text-center">
        Já possui conta?
        <Link className="ml-1.5" href={APP_ROUTES.login}>
          Entre
        </Link>
      </p>
    </div>
  );
}
