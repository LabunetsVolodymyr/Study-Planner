import './Header.scss';

// Простий презентаційний компонент: без props і без стану, лише розмітка.
function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Study Planner</h1>
      <p className="header__subtitle">Плануй навчальні завдання та відмічай прогрес</p>
    </header>
  );
}

export default Header;
