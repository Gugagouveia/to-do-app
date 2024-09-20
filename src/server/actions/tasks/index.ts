"use server";

import db from "@/server/db";
import { TaskCreate } from "@/types/tasks";
import { endOfDay } from "date-fns/endOfDay";
import { endOfTomorrow } from "date-fns/endOfTomorrow";
import { endOfWeek } from "date-fns/endOfWeek";
import { startOfDay } from "date-fns/startOfDay";
import { startOfTomorrow } from "date-fns/startOfTomorrow";
import { startOfWeek } from "date-fns/startOfWeek";

export async function getUsersTasks() {
  try {
    const tasks = await db.task.findMany();
    return tasks;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao buscar tarefas.");
  }
}

export const createTask = async (task: TaskCreate) => {
  try {
    const createdTask = await db.task.create({
      data: task,
    });
    return createdTask;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao criar tarefa.");
  }
};

export async function getUsersTasksToday() {
  try {
    const today = new Date();
    const todayStart = startOfDay(today);
    const todayEnd = endOfDay(today);

    const tasks = await db.task.findMany({
      where: {
        expiresAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
    return tasks;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao buscar tarefas.");
  }
}

export async function getUsersTasksTomorrow() {
  try {
    const tomorrowEnd = endOfTomorrow();
    const tomorrowStart = startOfTomorrow();

    const tasks = await db.task.findMany({
      where: {
        expiresAt: {
          gte: tomorrowStart,
          lte: tomorrowEnd,
        },
      },
    });

    return tasks;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao buscar tarefas para amanhã.");
  }
}

export async function getUsersTasksThisWeek() {
  try {
    const today = new Date();
    const weekEnd = endOfWeek(today);
    const weekStart = startOfWeek(today);

    const tasks = await db.task.findMany({
      where: {
        expiresAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    });

    return tasks;
  } catch (error: any) {
    console.error(error);
    throw new Error("Erro ao buscar tarefas para esta semana.");
  }
}

const setTaskIsComplete = async (taskId: number, isComplete: boolean) => {
  const updatedTask = await db.task.update({
    where: { id: taskId },
    data: { isComplete },
  });
  return updatedTask;
};

export const completeTask = async (taskId: number) => {
  try {
    const updatedTask = await setTaskIsComplete(taskId, true);
    return updatedTask;
  } catch (error: any) {
    throw new Error(`Falha em Atualizar a Lista: ${error.message}`);
  }
};

export const uncompleteTask = async (taskId: number) => {
  try {
    const updatedTask = await setTaskIsComplete(taskId, false);
    return updatedTask;
  } catch (error: any) {
    throw new Error(`Falha em Atualizar a Lista: ${error.message}`);
  }
};

export const createList = async (name: string, color: string) => {
  try {
    const newList = await db.list.create({
      data: {
        name,
        color,
      },
    });
    return newList;
  } catch (error: any) {
    throw new Error(`Falha em criar a lista: ${error.message}`);
  }
};

export const getLists = async () => {
  try {
    // Recupera todas as listas do banco de dados
    const lists = await db.list.findMany({
      // Você pode adicionar filtros ou ordenações aqui se necessário
      orderBy: {
        createdAt: "desc", // Ordena pelas listas mais recentes primeiro
      },
    });
    return lists;
  } catch (error: any) {
    throw new Error(`Falha ao buscar listas: ${error.message}`);
  }
};

export const assignListToTask = async (taskId: number, listId: number) => {
  try {
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: { listId },
    });
    return updatedTask;
  } catch (error: any) {
    throw new Error(`Falha em atribuir lista a tarefa: ${error.message}`);
  }
};

export const unassignListFromTask = async (taskId: number) => {
  try {
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: { listId: null },
    });
    return updatedTask;
  } catch (error: any) {
    throw new Error(`Falha em remover a Lista da Tarefa: ${error.message}`);
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const deletedTask = await db.task.delete({
      where: { id: taskId },
    });
    return deletedTask;
  } catch (error: any) {
    throw new Error(`Falha em deletar a task:: ${error.message}`);
  }
};
