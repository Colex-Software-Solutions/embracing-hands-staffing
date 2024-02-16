"use client";
import React, { useState } from "react";
import { Task } from "../data/schema";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Toaster } from "../../components/toaster";
interface ITaskManager {
  initialTasks: Task[];
}
const TaskManager = ({ initialTasks }: ITaskManager) => {
  const [tasks, setTasks] = useState(initialTasks);

  // Function to update a task
  const handleTaskUpdate = (updatedTask: Task) => {
    const newTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(newTasks);
  };

  return (
    <>
      <DataTable data={tasks} columns={columns(handleTaskUpdate)} />
      <Toaster />
    </>
  );
};

export default TaskManager;
