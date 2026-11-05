import type { Task } from '../types/task';
import './TaskStats.scss';

// Отримує весь масив завдань і сам рахує підсумки.
interface TaskStatsProps {
  tasks: Task[];
}

function TaskStats({ tasks }: TaskStatsProps) {
  // Звичайні операції над масивом, без окремого state для лічильників.
  // Props змінюються, тож компонент перерендерюється й цифри оновлюються самі.
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;

  return (
    <dl className="task-stats">
      <div className="task-stats__item">
        <dt className="task-stats__label">Усього</dt>
        <dd className="task-stats__value">{total}</dd>
      </div>
      <div className="task-stats__item task-stats__item--done">
        <dt className="task-stats__label">Виконано</dt>
        <dd className="task-stats__value">{completed}</dd>
      </div>
      <div className="task-stats__item">
        <dt className="task-stats__label">Не виконано</dt>
        <dd className="task-stats__value">{active}</dd>
      </div>
    </dl>
  );
}

export default TaskStats;
