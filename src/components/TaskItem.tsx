import type { Priority, Task } from '../types/task';
import './TaskItem.scss';

// Props лише для читання: компонент не змінює task напряму,
// а викликає callback-и, а змінює дані вже батько (App).
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Словник для відображення технічного значення пріоритету у зрозумілий текст
const priorityLabels: Record<Priority, string> = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  // Деструктуризація, щоб не писати task.xxx скрізь
  const { id, title, description, category, priority, completed } = task;

  return (
    // BEM-модифікатори: колір за пріоритетом і окремий вигляд для виконаного
    <li className={`task-item task-item--${priority}${completed ? ' task-item--completed' : ''}`}>
      <div className="task-item__body">
        <h3 className="task-item__title">{title}</h3>
        {/* Умовний рендеринг: опис показуємо, лише якщо він не порожній */}
        {description && <p className="task-item__description">{description}</p>}
        <div className="task-item__meta">
          <span className="task-item__category">{category}</span>
          <span className={`task-item__priority task-item__priority--${priority}`}>
            {priorityLabels[priority]}
          </span>
          {/* Тернарний оператор: текст залежить від стану */}
          <span className="task-item__status">
            {completed ? 'Виконано' : 'Не виконано'}
          </span>
        </div>
      </div>

      <div className="task-item__actions">
        {/* Стрілкова функція потрібна, щоб передати id у callback.
            Запис onClick={onToggle(id)} викликав би функцію під час рендеру. */}
        <button
          type="button"
          className="task-item__button"
          onClick={() => onToggle(id)}
        >
          {completed ? 'Повернути' : 'Виконано'}
        </button>
        <button
          type="button"
          className="task-item__button task-item__button--danger"
          onClick={() => onDelete(id)}
        >
          Видалити
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
