import type { Task } from '../types/task'

// Початкові дані. Живуть лише в пам'яті React: після перезавантаження скидаються
export const initialTasks: Task[] = [
  {
    id: 1,
    title: 'React Components',
    description: 'Опрацювати базові принципи компонентів React',
    completed: false,
    priority: 'high',
    category: 'React',
  },
  {
    id: 2,
    title: 'TypeScript Exercises',
    description: 'Виконати практичні вправи',
    completed: true,
    priority: 'medium',
    category: 'TypeScript',
  },
  {
    id: 3,
    title: 'BEM та SCSS',
    description: 'Повторити іменування класів Block__Element--Modifier',
    completed: false,
    priority: 'low',
    category: 'CSS',
  },
]
