import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Login(props) {
  const [apiError, setApiError] = useState('');

  const [isFetchPending, setIsFetchPending] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  });

  function login(data) {
    props.onSubmit(data, setIsFetchPending, setApiError);
  }

  return (
    <>
      <header className="authorization__header">
        <Link to="/" className="header__logo">
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
        <form onSubmit={handleSubmit(login)} className="authorization__form">
          <label htmlFor="email" className="authorization__form-label">
            E-mail
            <input disabled = {isFetchPending}
              placeholder={'Электронная почта'}
              type={'email'}
              className={errors.email ? 'authorization__form-input authorization__form-input_invalid' : 'authorization__form-input'}
              {...register('email', {
                required: 'Поле должно быть заполнено',
                pattern: {
                  value: /[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+@[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+\.[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+/i, //eslint-disable-line
                  message: 'Email должен быть вида email@example.com',
                },
              })}
            />
            <span className={errors.email ? 'authorization__form-error' : 'authorization__form-error_hidden'}>{errors.email?.message || 'что-то не так'}</span>
          </label>

          <label htmlFor="password" className="authorization__form-label">
            Пароль
            <input disabled = {isFetchPending}
              placeholder={'Пароль'}
              type={'password'}
              className={errors.password ? 'authorization__form-input authorization__form-input_invalid' : 'authorization__form-input'}
              {...register('password', {
                required: 'Поле должно быть заполнено',
              })}
            />
            <span className={errors.password ? 'authorization__form-error' : 'authorization__form-error_hidden'}>{errors.password?.message || 'что-то не так'}</span>
          </label>
          <span className="authorization__form-error authrorization__api-error">{apiError}</span>
          <button disabled={!isValid || apiError !== '' || isFetchPending} className={(isValid && apiError ==='' && Object.keys(errors).length === 0 && !isFetchPending) ? 'authorization__form-submit authorization__form-submit_page_login authorization__form-submit_enabled' : 'authorization__form-submit authorization__form-submit_page_login authorization__form-submit_disabled'} type="submit">
            Войти
          </button>
        </form>
      </main>
      <footer className="authorization__footer">
        <div className="authorization__footer-container">
          <span className="authorization__footer-span">Ещё не зарегистрированы?</span>
          <Link to="/signup" className="authorization__footer-link">
            Регистрация
          </Link>
        </div>
      </footer>
    </>
  );
}
export default Login;
