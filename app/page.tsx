"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // load from localStorage once
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Task[];
        setTasks(parsed);
      } catch (err) {
        console.error("Error parsing tasks from localStorage", err);
      }
    }
  }, []);

  // save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white w-full max-w-md mx-auto p-4 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Task Tracker</h1>

        {/* add task */}
        <form
          className="flex gap-2 mb-2"
          onSubmit={(e) => {
            e.preventDefault();
            const title = newTask.trim();
            if (!title) return;
            addTask(title);
            setNewTask("");
          }}
        >
          <input
            className="border border-slate-200 rounded-lg flex-1 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* header row */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs text-slate-500">
            {tasks.length} task{tasks.length === 1 ? "" : "s"}
          </p>
          {tasks.length > 0 && (
            <button
              onClick={() => setTasks([])}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear all
            </button>
          )}
        </div>

        {/* list */}
        <ul className="space-y-2">
          {tasks.length === 0 && (
            <p className="text-sm text-slate-400">No tasks yet. Add one 👆</p>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border border-slate-100 bg-slate-50 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4"
                />
                <span
                  className={
                    task.completed
                      ? "line-through text-slate-400 text-sm"
                      : "text-sm"
                  }
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-xs text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
