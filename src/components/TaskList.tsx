import type { Task } from '../types/task';
import TaskItem from './TaskItem';
import './TaskList.scss';

interface TaskListProps {
  tasks: Task[]; // уже відфільтровані завдання, які треба показати
  totalCount: number; // загальна кількість (щоб відрізнити "порожньо" від "фільтр нічого не знайшов")
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskList({ tasks, totalCount, onToggle, onDelete }: TaskListProps) {
  // Умовний рендеринг через ранній return. Два різні порожні стани:
  // 1) завдань немає взагалі
  if (totalCount === 0) {
    return (
      <div className="task-list__empty">
        <p>Завдань поки немає.</p>
        <p>Додайте перше навчальне завдання.</p>
      </div>
    );
  }

  // 2) завдання є, але під поточний фільтр нічого не підходить
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <p>За цим фільтром завдань немає.</p>
      </div>
    );
  }

  // Рендер списку через map. key має бути стабільним та унікальним
  // (id завдання), а не індексом: інакше після видалення чи зміни порядку
  // React може переплутати елементи та їхній стан.
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
