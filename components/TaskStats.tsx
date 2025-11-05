import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

interface TaskStatsProps {
  totalTasks: number;
  completedTasks: number;
  onClearAll: () => void;
}

export function TaskStats({ totalTasks, completedTasks, onClearAll }: TaskStatsProps) {
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1 text-gray-600">
          <Circle size={12} />
          <span>{pendingTasks} pending</span>
        </div>
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle size={12} />
          <span>{completedTasks} completed</span>
        </div>
      </div>
      
      {totalTasks > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2 size={12} className="mr-1" />
          Clear all
        </Button>
      )}
    </div>
  );
}