import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.scss';

// Точка входу: монтуємо кореневий компонент App у <div id="root"> з index.html.
// StrictMode у розробці додатково підсвічує потенційні проблеми в коді.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
