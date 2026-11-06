import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import type { NewTask, TaskPriority } from '../types/task'
import { PRIORITY_LABELS } from '../utils/tasks'
import './TaskForm.scss'

// Форма не змінює список сама: вона передає готове завдання вгору через onAdd
interface TaskFormProps {
    onAdd: (task: NewTask) => void
}

const DEFAULT_CATEGORY = 'Загальне'
const PRIORITIES: TaskPriority[] = ['low', 'medium', 'high']

function TaskForm({ onAdd }: TaskFormProps) {
    // Локальний стан полів (контрольовані поля): значення живуть у React, а не в DOM.
    // Він потрібен лише формі, тому не піднімається в App.
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [priority, setPriority] = useState<TaskPriority>('medium')
    // Текст помилки валідації (порожній рядок = помилки немає)
    const [error, setError] = useState('')

    // useId генерує унікальний id, щоб зв'язати <label htmlFor> з відповідним полем
    const id = useId()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // Скасовуємо стандартну відправку форми (перезавантаження сторінки)
        event.preventDefault()

        // Проста валідація без бібліотек: назва обов'язкова.
        // trim() прибирає пробіли, щоб "   " не вважалося назвою.
        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            setError('Введіть назву завдання')
            return
        }

        // Передаємо дані вгору через callback з props
        onAdd({
            title: trimmedTitle,
            description: description.trim(),
            category: category.trim() || DEFAULT_CATEGORY,
            priority,
        })

        // Після успішного додавання очищуємо форму
        setTitle('')
        setDescription('')
        setCategory('')
        setPriority('medium')
        setError('')
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} noValidate>
            <div className="task-form__field task-form__field--wide">
                <label className="task-form__label" htmlFor={`${id}-title`}>
                    Назва *
                </label>
                <input
                    id={`${id}-title`}
                    // BEM-модифікатор додається, коли є помилка
                    className={`task-form__input ${error ? 'task-form__input--invalid' : ''}`}
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value)
                        // Як тільки користувач редагує поле, прибираємо помилку
                        if (error) setError('')
                    }}
                    placeholder="Наприклад: Вивчити useState"
                />
                {/* Умовний рендеринг через &&: помилку показуємо лише коли вона є.
                    Замість alert, як вимагає завдання. */}
                {error && <p className="task-form__error">{error}</p>}
            </div>

            <div className="task-form__field task-form__field--wide">
                <label className="task-form__label" htmlFor={`${id}-description`}>
                    Опис
                </label>
                <textarea
                    id={`${id}-description`}
                    className="task-form__input task-form__input--textarea"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Коротко, що потрібно зробити"
                    rows={2}
                />
            </div>

            <div className="task-form__field">
                <label className="task-form__label" htmlFor={`${id}-category`}>
                    Категорія
                </label>
                <input
                    id={`${id}-category`}
                    className="task-form__input"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder={DEFAULT_CATEGORY}
                />
            </div>

            <div className="task-form__field">
                <label className="task-form__label" htmlFor={`${id}-priority`}>
                    Пріоритет
                </label>
                <select
                    id={`${id}-priority`}
                    className="task-form__input"
                    value={priority}
                    // as TaskPriority: значення з select приходить як string,
                    // а ми знаємо, що це один з трьох допустимих варіантів
                    onChange={(event) => setPriority(event.target.value as TaskPriority)}
                >
                    {/* Варіанти будуємо через map; key = унікальне значення */}
                    {PRIORITIES.map((value) => (
                        <option key={value} value={value}>
                            {PRIORITY_LABELS[value]}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="task-form__submit">
                Додати
            </button>
        </form>
    )
}

export default TaskForm
