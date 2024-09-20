import { Task } from "@prisma/client";

export type TaskCreate = Omit<Task, "id" | "createdAt" | "updatedAt">;
