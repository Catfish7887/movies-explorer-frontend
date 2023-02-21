import Header from '../Header/Header';

function Profile(props) {
  return (
    <>
      <Header openPopup={props.openPopup}/>
      <main className="profile">
        <h1 className="profile__title">Привет, пользователь!</h1>
        <form className="profile__form">
          <ul className="profile__user-info">
            <li className="profile__info-container">
              <label htmlFor="name-input" className="profile__info-element">
                Имя
              </label>
              <input name="name-input" className="profile__info-input" value="some text" type="text" />
            </li>
            <li className="profile__info-container">
              <label htmlFor="email-input" className="profile__info-element">
                Email
              </label>
              <input name="email-input" className="profile__info-input" value="some text" type="text" />
            </li>
          </ul>
          <button aria-label="Редактировать профиль" className="profile__button" type="submit">
            Редактировать
          </button>
        </form>
        <button aria-label="Выйти из аккаунта" className="profile__button profile__button_red-text" type="button">
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}

export default Profile;
