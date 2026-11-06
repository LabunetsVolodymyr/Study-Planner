import type { Task, TaskFilter, TaskPriority } from '../types/task'

// Словники "технічне значення -> текст для користувача".
// Record<K, V> гарантує, що описані ВСІ ключі типу (інакше помилка TypeScript).
export const PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: 'Низький',
    medium: 'Середній',
    high: 'Високий',
}

export const FILTER_LABELS: Record<TaskFilter, string> = {
    all: 'Всі',
    completed: 'Виконані',
    active: 'Не виконані',
}

// "Вага" пріоритету для сортування: що більше число, то важливіше завдання
const PRIORITY_WEIGHT: Record<TaskPriority, number> = {
    low: 1,
    medium: 2,
    high: 3,
}

// Фільтрація за станом виконання.
// Функція чиста: повертає новий масив, вхідний tasks не змінює.
export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
    if (filter === 'completed') {
        return tasks.filter((task) => task.completed)
    }

    if (filter === 'active') {
        return tasks.filter((task) => !task.completed)
    }

    return tasks
}

// Пошук за назвою без урахування регістру та зайвих пробілів
export function searchTasks(tasks: Task[], query: string): Task[] {
    const normalized = query.trim().toLowerCase()
    // Порожній запит означає "показати все"
    if (!normalized) {
        return tasks
    }

    return tasks.filter((task) => task.title.toLowerCase().includes(normalized))
}

// Сортування від найважливіших до найменш важливих.
// toSorted() (на відміну від sort()) повертає НОВИЙ масив і не мутує вхідний.
export function sortByPriority(tasks: Task[]): Task[] {
    return tasks.toSorted((a, b) => PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority])
}

// Наступний id = максимальний наявний + 1.
// Для порожнього масиву reduce стартує з 0, тож перший id буде 1.
export function getNextId(tasks: Task[]): number {
    return tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
}
