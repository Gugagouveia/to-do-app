"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Task } from "@prisma/client";
import { completeTask, uncompleteTask } from "@/server/actions/tasks";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isChecked, setIsChecked] = useState(task.isComplete);

  const handleCheckboxChange = async () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    try {
      if (newCheckedState) {
        await completeTask(task.id);
      } else {
        await uncompleteTask(task.id);
      }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
      setIsChecked(!newCheckedState);
    }
  };

  return (
    <div className="flex items-center px-4 py-2 mt-2 text-sm text-black bg-[#F4F4F4] rounded-lg hover:bg-slate-300">
      <Checkbox
        checked={isChecked}
        onCheckedChange={handleCheckboxChange}
        className="mr-2"
      />
      <span className={isChecked ? "line-through" : ""}>
        {task.description}
      </span>
    </div>
  );
};

export default TaskItem;
