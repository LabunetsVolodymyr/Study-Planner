import type { Task } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskItem.scss'

// Props лише для читання: компонент не змінює task напряму,
// а викликає callback-и, а дані змінює вже App.
interface TaskItemProps {
    task: Task
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    return (
        // BEM-модифікатор task-item--completed дає виконаному завданню інший вигляд
        <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
            <div className="task-item__content">
                <h3 className="task-item__title">{task.title}</h3>
                {/* Опис показуємо, лише якщо він не порожній */}
                {task.description && <p className="task-item__description">{task.description}</p>}

                <div className="task-item__meta">
                    <span className="task-item__badge task-item__badge--category">{task.category}</span>
                    {/* Колір бейджа залежить від пріоритету: --low / --medium / --high */}
                    <span className={`task-item__badge task-item__badge--${task.priority}`}>
                        {PRIORITY_LABELS[task.priority]}
                    </span>
                    <span className="task-item__status">
                        {task.completed ? '✓ Виконано' : 'Не виконано'}
                    </span>
                </div>
            </div>

            <div className="task-item__actions">
                {/* Стрілкова функція потрібна, щоб передати id у callback.
                    Запис onClick={onToggle(task.id)} викликав би функцію під час рендеру. */}
                <button
                    type="button"
                    className="task-item__button task-item__button--toggle"
                    onClick={() => onToggle(task.id)}
                >
                    {task.completed ? 'Повернути' : 'Виконати'}
                </button>
                <button
                    type="button"
                    className="task-item__button task-item__button--delete"
                    onClick={() => onDelete(task.id)}
                >
                    Видалити
                </button>
            </div>
        </li>
    )
}

export default TaskItem
