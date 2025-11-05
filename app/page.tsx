"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TaskItem } from "@/components/TaskItem";
import { TaskStats } from "@/components/TaskStats";

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

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
            <ListTodo className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Tracker</h1>
          <p className="text-gray-600 text-sm">Stay organized and productive</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm"
        >
          <form
            className="flex gap-2 mb-6"
            onSubmit={(e) => {
              e.preventDefault();
              const title = newTask.trim();
              if (!title) return;
              addTask(title);
              setNewTask("");
            }}
          >
            <Input
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="px-4">
              <Plus size={16} />
            </Button>
          </form>

          <TaskStats
            totalTasks={tasks.length}
            completedTasks={completedTasks}
            onClearAll={() => setTasks([])}
          />

          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {tasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListTodo className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">No tasks yet</p>
                  <p className="text-gray-400 text-xs mt-1">Add your first task above ↑</p>
                </motion.div>
              ) : (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
