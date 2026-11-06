import type { Task } from '../types/task'
import TaskItem from './TaskItem'
import './TaskList.scss'

interface TaskListProps {
    tasks: Task[] // уже відфільтровані, знайдені й відсортовані завдання
    hasTasks: boolean // чи є завдання взагалі (щоб відрізнити два порожні стани)
    onToggle: (id: number) => void
    onDelete: (id: number) => void
}

function TaskList({ tasks, hasTasks, onToggle, onDelete }: TaskListProps) {
    // Умовний рендеринг через ранній return. Два різні порожні стани:
    // 1) завдань немає взагалі
    if (!hasTasks) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">Завдань поки немає.</p>
                <p className="task-list__empty-text">Додайте перше навчальне завдання.</p>
            </div>
        )
    }

    // 2) завдання є, але під фільтр/пошук нічого не підходить
    if (tasks.length === 0) {
        return (
            <div className="task-list__empty">
                <p className="task-list__empty-title">За цим фільтром завдань немає.</p>
            </div>
        )
    }

    // Рендер списку через map. key має бути стабільним та унікальним (id),
    // а не індексом: інакше після видалення чи зміни порядку
    // React може переплутати елементи.
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </ul>
    )
}

export default TaskList
