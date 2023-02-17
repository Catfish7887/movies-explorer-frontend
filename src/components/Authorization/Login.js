import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <header className="authorization__header">
        <Link to="/" className="authorization__logo-link">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 12.6667C0 8.23292 0 6.01604 0.862865 4.32258C1.62186 2.83296 2.83296 1.62186 4.32258 0.862865C6.01604 0 8.23292 0 12.6667 0H25.3333C29.7671 0 31.984 0 33.6774 0.862865C35.167 1.62186 36.3781 2.83296 37.1371 4.32258C38 6.01604 38 8.23292 38 12.6667V25.3333C38 29.7671 38 31.984 37.1371 33.6774C36.3781 35.167 35.167 36.3781 33.6774 37.1371C31.984 38 29.7671 38 25.3333 38H12.6667C8.23292 38 6.01604 38 4.32258 37.1371C2.83296 36.3781 1.62186 35.167 0.862865 33.6774C0 31.984 0 29.7671 0 25.3333V12.6667Z"
              fill="#3DDC84"
            />
            <circle cx="19" cy="19" r="11" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M15.1538 19C15.1538 21.1242 16.8758 22.8462 19 22.8462C21.1242 22.8462 22.8462 21.1242 22.8462 19H25C25 22.3137 22.3137 25 19 25C15.6863 25 13 22.3137 13 19H15.1538Z" fill="#3DDC84" />
          </svg>
        </Link>
        <h1 className="authorization__title">Рады видеть!</h1>
      </header>
      <main className="authorization__main">
        <form className="authorization__form">
          <label htmlFor="email-input" className="authorization__form-label">
            Email
            <input name="email-input" className="authorization__form-input" type="email" />
            <span className="authorization__form-error">error</span>
          </label>

          <label htmlFor="password-input" className="authorization__form-label">
            Пароль
            <input name="password-input" className="authorization__form-input" type="text" />
            <span className="authorization__form-error">error</span>
          </label>

          <button className="authorization__form-submit authorization__form-submit_page_login" type="submit">
            Войти
          </button>
        </form>
      </main>
      <footer className="authorization__footer">
        <div className="authorization__footer-container">
          <span className="authorization__footer-span">Ещё не зарегистрированы?</span>
          <Link to="/register" className="authorization__footer-link">
            Зарегистрироваться
          </Link>
        </div>
      </footer>
    </>
  );
}
export default Login;