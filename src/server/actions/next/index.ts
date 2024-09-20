"use server";

import { revalidatePath } from "next/cache";

export async function revalidateNextPath(path: string) {
  revalidatePath(path);
}
