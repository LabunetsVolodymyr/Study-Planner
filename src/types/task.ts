// Допустимі значення пріоритету (union-тип): інші рядки TypeScript не пропустить
export type Priority = 'low' | 'medium' | 'high'

// Режими фільтра: усі / виконані / невиконані
export type TaskFilter = 'all' | 'completed' | 'active'

// Модель навчального завдання
export interface Task {
  id: number // унікальний ідентифікатор, використовуємо як key у списку
  title: string // назва
  description: string // короткий опис
  completed: boolean // ознака виконання
  priority: Priority // пріоритет
  category: string // категорія
}

// Дані з форми: усе, крім id та completed (їх задає App при створенні)
export type NewTask = Omit<Task, 'id' | 'completed'>
