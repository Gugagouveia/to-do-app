"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_ROUTES } from "@/navigation";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`${APP_ROUTES.dashboard}/${userName}`);
  };
  return (
    <div className="flex flex-col gap-6 items-center justify-center max-w-[300px] w-full">
      <h1 className="text-4xl">Entrar</h1>
      <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
        <Input
          className="w-full"
          type="text"
          placeholder="Usuário"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <Button className="w-full" type="submit">
          Entrar<Link href={APP_ROUTES.welcome}></Link>
        </Button>
      </form>

      <p className="text-center">
        Não Possui Conta?Cadastre-se
        <Link className="ml-1" href={APP_ROUTES.welcome}></Link>
      </p>
    </div>
  );
}
