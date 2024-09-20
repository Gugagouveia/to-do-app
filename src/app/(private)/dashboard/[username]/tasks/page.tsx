import React from "react";
import TasksContainer from "@/components/tasks-container";
import { Task } from "@prisma/client";
import {
  getUsersTasksThisWeek,
  getUsersTasksToday,
  getUsersTasksTomorrow,
} from "@/server/actions/tasks";

interface DashboardHomePageProps {
  params: { username: string };
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = async ({
  params,
}) => {
  let forToday: Task[] = [];
  let forTomorrow: Task[] = [];
  let forThisWeek: Task[] = [];

  try {
    forToday = await getUsersTasksToday();
  } catch (error) {
    console.error(error);
  }
  try {
    forTomorrow = await getUsersTasksTomorrow();
  } catch (error) {
    console.error(error);
  }
  try {
    forThisWeek = await getUsersTasksThisWeek();
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="">
      <div className="">
        <h2 className="text-4xl font-bold my-8">Tarefas(18)</h2>
      </div>
      <div className="flex flex-col gap-8">
        <div className="p-8 rounded-lg">
          <TasksContainer
            title="Para Hoje"
            tasks={forToday}
            username={params.username}
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="p-8 rounded-lg">
            <TasksContainer
              title="Para Amanhã"
              tasks={forTomorrow}
              username={params.username}
            />
          </div>
          <div className="p-8 rounded-lg">
            <TasksContainer
              title="Para Esta Semana"
              tasks={forThisWeek}
              username={params.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
