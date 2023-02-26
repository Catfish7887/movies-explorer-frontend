import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Header from '../Header/Header';

function Profile(props) {
  const [isFormActive, setIsFormActive] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const currentUser = useContext(CurrentUserContext)

  function showFormError(e){
    e.preventDefault();
    setIsButtonDisabled(true);
    return;
  };

  function activateForm() {
    setIsFormActive(true);
    console.log(currentUser)
    return;
  };

  return (
    <>
      <Header isLoggedIn={true} openPopup={props.openPopup} />
      <main className="profile">
        <h1 className="profile__title">Привет, пользователь!</h1>
        <form onSubmit={showFormError} className="profile__form">
          <ul className="profile__user-info">
            <li className="profile__info-container">
              <label htmlFor="name-input" className="profile__info-element">
                Имя
              </label>
              <input name="name-input" className="profile__info-input" defaultValue="some text" type="text" />
            </li>
            <li className="profile__info-container">
              <label htmlFor="email-input" className="profile__info-element">
                Email
              </label>
              <input name="email-input" className="profile__info-input" defaultValue="some text" type="text" />
            </li>
          </ul>
          {isFormActive ? (
          <>
            <span className={isButtonDisabled ? 'profile__error-span' : 'profile__error-span_hidden'}>При обновлении профиля произошла ошибка.</span>
            <button type='submit' className={isButtonDisabled ? 'profile__submit-btn profile__submit-btn_disabled' : 'profile__submit-btn profile__submit-btn_active'} disabled={isButtonDisabled}>Сохранить</button>
          </>) : (<></>)}
        </form>
        {isFormActive ? (
          <></>
        ) : (
          <>
            <button onClick={activateForm} aria-label="Редактировать профиль" className="profile__button" type="submit">
              Редактировать
            </button>
            <button aria-label="Выйти из аккаунта" className="profile__button profile__button_red-text" type="button">
              Выйти из аккаунта
            </button>
          </>
        )}
      </main>
    </>
  );
}

export default Profile;
