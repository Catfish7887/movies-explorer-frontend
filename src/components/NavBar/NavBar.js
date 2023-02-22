import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="navbar">
      <nav className="navbar__links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'navbar__link_hidden navbar__link_active' : 'navbar__link_hidden navbar__link')}>
          Главная
        </NavLink>
        <NavLink to="/movies" className={({ isActive }) => (isActive ? 'navbar__link_active' : 'navbar__link')}>
          Фильмы
        </NavLink>
        <NavLink to="/saved-movies" className={({ isActive }) => (isActive ? 'navbar__link_active' : 'navbar__link')}>
          Сохранённые фильмы
        </NavLink>
      </nav>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'navbar__account-button navbar__account-button_active' : 'navbar__account-button')} relative="path">
        <span className="navbar__account-span">Акканут</span>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="26" height="26" rx="13" fill="#313131" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.4299 14.9678C15.7917 14.4057 16.7501 13.0648 16.7501 11.5C16.7501 9.42893 15.0712 7.75 13.0001 7.75C10.929 7.75 9.2501 9.42893 9.2501 11.5C9.2501 13.0647 10.2085 14.4056 11.5702 14.9677C10.1756 15.1999 8.89263 15.7659 7.80835 16.5806L9.1899 18.4194C10.2512 17.6221 11.5687 17.15 12.9999 17.15C14.431 17.15 15.7485 17.6221 16.8098 18.4194L18.1914 16.5806C17.1072 15.766 15.8244 15.2 14.4299 14.9678Z"
            fill="white"
          />
        </svg>
      </NavLink>
    </div>
  );
}

export default NavBar;
