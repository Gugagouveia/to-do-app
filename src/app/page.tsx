"use server";

import { APP_ROUTES } from "@/navigation";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(APP_ROUTES.welcome);
}
