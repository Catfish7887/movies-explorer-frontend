import Header from '../Header';

function Profile() {
  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Привет, пользователь!</h1>
        <ul className="profile__user-info">
          <li className="profile__info-container">
            <span className="profile__info-element">Имя</span>
            <span className="profile__info-element">Пользователь</span>
          </li>
          <li className="profile__info-container">
            <span className="profile__info-element">Email</span>
            <span className="profile__info-element">email@example.com</span>
          </li>
        </ul>
        <div className="profile__buttons">
          <button className='profile__button' type="button">Редактировать</button>
          <button className='profile__button profile__button_red-text' type="button">Выйти из аккаунта</button>
        </div>
      </main>
    </>
  );
}

export default Profile;
