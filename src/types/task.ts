// Допустимі значення пріоритету (union-тип): інші рядки TypeScript не пропустить
export type TaskPriority = 'low' | 'medium' | 'high'

// Модель навчального завдання
export interface Task {
    id: number // унікальний ідентифікатор (використовується як key у списку)
    title: string
    description: string
    completed: boolean // ознака виконання
    priority: TaskPriority
    category: string
}

// Дані з форми: усе, крім id та completed (їх додає App при створенні)
export type NewTask = Omit<Task, 'id' | 'completed'>

// Режими фільтра: усі / виконані / невиконані
export type TaskFilter = 'all' | 'completed' | 'active'
