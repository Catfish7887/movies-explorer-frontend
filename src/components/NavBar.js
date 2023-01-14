import { NavLink } from 'react-router-dom';

function NavBar() {
  const isLoggedIn = true

  return (
    <div className="navbar">
      {isLoggedIn ? (
        <>
          <nav className="navbar__links">
            <a className="navbar__link">Фильмы</a>
            <a className="navbar__link">Сохранённые Фильмы</a>
          </nav>
          <button aria-label="Акканут" className="navbar__account-button">
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
          </button>
        </>
      ) : (
        <div className="navbar__buttons">
          <a className="navbar__link">Регистрация</a>
          <button className="navbar__signin-button">Войти</button>
        </div>
      )}
    </div>
  );
}

export default NavBar;
