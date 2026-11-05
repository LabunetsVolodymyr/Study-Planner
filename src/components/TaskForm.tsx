import { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewTask, Priority } from '../types/task';
import './TaskForm.scss';

// Props компонента: єдиний callback, яким форма передає нове завдання в App.
// Сама форма список не змінює, вона лише повідомляє батьку про подію.
interface TaskFormProps {
  onAddTask: (data: NewTask) => void;
}

// Початкове (порожнє) значення полів форми
const emptyForm: NewTask = {
  title: '',
  description: '',
  category: '',
  priority: 'medium',
};

function TaskForm({ onAddTask }: TaskFormProps) {
  // Локальний стан форми (контрольовані поля): значення полів живуть у React,
  // а не в DOM. Цей стан потрібен лише формі, тому не піднімаємо його в App.
  const [form, setForm] = useState<NewTask>(emptyForm);
  // Текст помилки валідації (порожній рядок = помилки немає)
  const [error, setError] = useState('');

  // Оновлення одного поля об'єкта в state без мутації:
  // копіюємо попередній об'єкт (...prev) і перезаписуємо лише потрібне поле.
  const updateField = <K extends keyof NewTask>(field: K, value: NewTask[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Як тільки користувач редагує назву, прибираємо повідомлення про помилку
    if (field === 'title') setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Забороняємо стандартну відправку форми (перезавантаження сторінки)
    event.preventDefault();

    // Проста валідація без бібліотек: назва обов'язкова.
    // trim() прибирає пробіли, щоб "   " не вважалося назвою.
    const title = form.title.trim();
    if (!title) {
      setError('Вкажіть назву завдання');
      return;
    }

    // Віддаємо дані вгору через callback з props
    onAddTask({
      title,
      description: form.description.trim(),
      category: form.category.trim() || 'Загальне',
      priority: form.priority,
    });
    // Після успішного додавання очищуємо форму
    setForm(emptyForm);
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2 className="task-form__title">Нове завдання</h2>

      <label className="task-form__field task-form__field--wide">
        <span className="task-form__label">Назва</span>
        <input
          // Модифікатор BEM додається умовно, коли є помилка
          className={`task-form__input${error ? ' task-form__input--invalid' : ''}`}
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          aria-invalid={error !== ''}
          placeholder="Наприклад, вивчити useState"
        />
        {/* Умовний рендеринг: повідомлення показуємо лише коли error не порожній.
            Використовуємо замість alert, як вимагає завдання. */}
        {error && <span className="task-form__error" role="alert">{error}</span>}
      </label>

      <label className="task-form__field task-form__field--wide">
        <span className="task-form__label">Опис</span>
        <textarea
          className="task-form__input"
          rows={2}
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
      </label>

      <label className="task-form__field">
        <span className="task-form__label">Категорія</span>
        <input
          className="task-form__input"
          value={form.category}
          onChange={(e) => updateField('category', e.target.value)}
          placeholder="React"
        />
      </label>

      <label className="task-form__field">
        <span className="task-form__label">Пріоритет</span>
        <select
          className="task-form__input"
          value={form.priority}
          // as Priority: значення з select приходить як string,
          // а ми знаємо, що це один з трьох допустимих варіантів
          onChange={(e) => updateField('priority', e.target.value as Priority)}
        >
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </label>

      <button className="task-form__submit" type="submit">Додати</button>
    </form>
  );
}

export default TaskForm;
