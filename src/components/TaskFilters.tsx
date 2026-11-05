import type { TaskFilter } from '../types/task';
import './TaskFilters.scss';

interface TaskFiltersProps {
  current: TaskFilter; // який фільтр зараз активний (стан зберігається в App)
  counts: Record<TaskFilter, number>; // кількість завдань для кожного фільтра
  onChange: (filter: TaskFilter) => void; // callback зміни фільтра
  onClearCompleted: () => void; // callback кнопки "Очистити виконані"
}

// Опції описані масивом, щоб не дублювати три майже однакові кнопки
const options: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'completed', label: 'Виконані' },
  { value: 'active', label: 'Не виконані' },
];

function TaskFilters({ current, counts, onChange, onClearCompleted }: TaskFiltersProps) {
  return (
    <div className="task-filters">
      <div className="task-filters__group" role="group" aria-label="Фільтр завдань">
        {options.map(({ value, label }) => (
          <button
            key={value} // стабільний key: унікальне значення фільтра
            type="button"
            // Активний фільтр позначаємо BEM-модифікатором
            className={`task-filters__button${
              current === value ? ' task-filters__button--active' : ''
            }`}
            aria-pressed={current === value}
            onClick={() => onChange(value)}
          >
            {label} ({counts[value]})
          </button>
        ))}
      </div>

      {/* Умовний рендеринг: кнопка має сенс лише якщо є виконані завдання */}
      {counts.completed > 0 && (
        <button type="button" className="task-filters__clear" onClick={onClearCompleted}>
          Очистити виконані
        </button>
      )}
    </div>
  );
}

export default TaskFilters;
