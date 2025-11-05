import { motion } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';
import { Button } from './ui/Button';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="group flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-200"
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          task.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-green-400'
        }`}
      >
        {task.completed && <Check size={12} />}
      </button>
      
      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          task.completed
            ? 'line-through text-gray-400'
            : 'text-gray-900'
        }`}
      >
        {task.title}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={14} />
      </Button>
    </motion.li>
  );
}