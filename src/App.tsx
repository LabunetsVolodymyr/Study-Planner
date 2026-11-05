import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { initialTasks } from './data/initialTasks';
import type { NewTask, Task, TaskFilter } from './types/task';
import './App.scss';

function App() {
  // Увесь спільний стан зберігаємо в найближчому спільному батьку (App).
  // Це називається "підняттям стану" (lifting state up): кілька дочірніх
  // компонентів потребують одних і тих самих даних.
  // useState повертає пару: [поточне значення, функція для його зміни].
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');

  // Додавання: створюємо НОВИЙ масив (spread), а не робимо push у старий.
  // Запис prev => ... (функціональне оновлення) гарантує роботу з актуальним станом.
  const handleAddTask = (data: NewTask) => {
    const newTask: Task = { id: Date.now(), completed: false, ...data };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Перемикання: map повертає новий масив; для потрібного завдання
  // створюємо копію об'єкта з інвертованим completed, решту лишаємо як є.
  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // Видалення: filter створює новий масив без завдання з цим id.
  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Додаткове завдання: прибрати всі виконані.
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // Похідні дані: лічильники обчислюємо з масиву tasks при кожному рендері,
  // тому окремий state для них не потрібен (і не буде розсинхрону).
  const completedCount = tasks.filter((task) => task.completed).length;
  const counts = {
    all: tasks.length,
    completed: completedCount,
    active: tasks.length - completedCount,
  };

  // Фільтрація лише створює масив для показу, вихідний tasks не змінюється.
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  // Дочірнім компонентам передаємо дані (props) вниз
  // та callback-функції (onXxx), якими вони повідомляють про події вгору.
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskStats tasks={tasks} />
        <TaskFilters
          current={filter}
          counts={counts}
          onChange={setFilter}
          onClearCompleted={handleClearCompleted}
        />
        <TaskList
          tasks={visibleTasks}
          totalCount={tasks.length}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
