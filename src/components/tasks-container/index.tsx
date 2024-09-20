"use client";

import React, { FC, useState } from "react";
import { Task } from "@prisma/client";
import TaskItem from "../tasks-item";
import CreateInput from "../create-input";
import { createTask } from "@/server/actions/tasks";
import toast from "react-hot-toast";
import { revalidateNextPath } from "@/server/actions/next";
import { APP_ROUTES } from "@/navigation";
import Modaldatepicker from "../modal-date-picker";
import { getUserByUserName } from "@/server/actions/users";

interface TasksContainerProps {
  tasks: Task[];
  title: string;
  username: string;
}

const TasksContainer: FC<TasksContainerProps> = ({
  tasks,
  title,
  username,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOpenModal = (description: string) => {
    if (!isModalOpen) {
      setTaskDescription(description);
      setIsModalOpen(true);
    }
  };

  const handleCreateTask = async () => {
    try {
      if (!selectedDate) {
        throw new Error("Selecione uma data de expiração.");
      }

      const user = await getUserByUserName(username);

      if (!user) {
        throw new Error("Usuário não existe.");
      }

      const newTask = {
        description: taskDescription,
        expiresAt: selectedDate,
        isComplete: false,
        userId: user.id,
        listId: null,
      };

      await createTask(newTask);
      revalidateNextPath(
        `${APP_ROUTES.dashboard}/${username}${APP_ROUTES.tasks}`
      );
      toast.success("Tarefa Criada com Sucesso!");
      setIsModalOpen(false);
      setTaskDescription("");
      setSelectedDate(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-[1px] p-8 rounded-lg flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <CreateInput
        onCreate={handleOpenModal}
        placeholderText={"Adicionar nova Tarefa"}
        disabled={isModalOpen}
      />
      <div className="flex flex-col gap-2 overflow-y-auto max-h-72">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>

      <Modaldatepicker
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onCreateTask={handleCreateTask}
      />
    </div>
  );
};

export default TasksContainer;
