import { useState } from 'react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskStats from './components/TaskStats'
import TaskFilters from './components/TaskFilters'
import TaskList from './components/TaskList'
import { initialTasks } from './data/initialTasks'
import type { NewTask, Task, TaskFilter } from './types/task'
import { filterTasks, getNextId, searchTasks, sortByPriority } from './utils/tasks'
import './App.scss'

function App() {
    // Увесь спільний стан зберігаємо в App ("підняття стану"):
    // його потребують кілька дочірніх компонентів.
    // useState повертає пару [значення, функція для зміни].
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const [filter, setFilter] = useState<TaskFilter>('all')
    const [search, setSearch] = useState('')
    const [isSortedByPriority, setIsSortedByPriority] = useState(false)
    const [isDark, setIsDark] = useState(false)

    // Похідні дані: лічильники рахуємо з масиву tasks при кожному рендері,
    // тому окремий state для них не потрібен і розсинхрону не буде.
    const completedCount = tasks.filter((task) => task.completed).length
    const stats = {
        all: tasks.length,
        completed: completedCount,
        active: tasks.length - completedCount,
    }

    // Конвеєр відображення: фільтр -> пошук -> (за потреби) сортування.
    // Кожен крок повертає новий масив, тож вихідний tasks не змінюється.
    const filteredTasks = searchTasks(filterTasks(tasks, filter), search)
    const visibleTasks = isSortedByPriority ? sortByPriority(filteredTasks) : filteredTasks

    // Додавання: новий масив через spread, нове завдання ставимо на початок.
    // Форма setTasks(prev => ...) працює з актуальним станом.
    function handleAdd(newTask: NewTask) {
        setTasks((prev) => [{ ...newTask, id: getNextId(prev), completed: false }, ...prev])
    }

    // Перемикання: map повертає новий масив; для потрібного завдання
    // робимо копію об'єкта з інвертованим completed, решту лишаємо як є.
    function handleToggle(id: number) {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
        )
    }

    // Видалення: filter створює новий масив без завдання з цим id
    function handleDelete(id: number) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    // Прибрати всі виконані завдання
    function handleClearCompleted() {
        setTasks((prev) => prev.filter((task) => !task.completed))
    }

    // Дітям передаємо дані вниз (props) та callback-функції (onXxx),
    // через які вони повідомляють App про події.
    return (
        // Модифікатор app--dark вмикає темні значення CSS-змінних
        <div className={`app ${isDark ? 'app--dark' : ''}`}>
            <div className="app__container">
                <Header isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

                <section className="app__panel">
                    <h2 className="app__panel-title">Нове завдання</h2>
                    <TaskForm onAdd={handleAdd} />
                </section>

                <TaskStats
                    total={stats.all}
                    completed={stats.completed}
                    active={stats.active}
                    onClearCompleted={handleClearCompleted}
                />

                <TaskFilters
                    filter={filter}
                    counts={stats}
                    search={search}
                    sortByPriority={isSortedByPriority}
                    onFilterChange={setFilter}
                    onSearchChange={setSearch}
                    onSortChange={setIsSortedByPriority}
                />

                <TaskList
                    tasks={visibleTasks}
                    hasTasks={tasks.length > 0}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    )
}

export default App
