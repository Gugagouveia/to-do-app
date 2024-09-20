import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { APP_ROUTES } from "@/navigation";
import Link from "next/link";
interface DashboardHomePageProps {
  params: { username: string };
}

export default async function DashboardHomePage({
  params,
}: DashboardHomePageProps) {
  const { username } = params;

  return (
    <div className="flex flex-row min-h-screen items-center justify-center w-full">
      <form className="flex flex-col gap-24">
        <p className=" w-full text-3xl text-center">
          Seja Bem-Vindo(a), {username}!
        </p>

        <Link
          href={`${APP_ROUTES.dashboard}/${username}${APP_ROUTES.tasks}`}
          className={cn("w-full", buttonVariants())}
        >
          Ir Para Tarefas
        </Link>
      </form>
    </div>
  );
}
