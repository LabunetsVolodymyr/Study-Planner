import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'

// Точка входу: монтуємо App у <div id="root"> з index.html.
// StrictMode у розробці підсвічує потенційні проблеми в коді.
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
