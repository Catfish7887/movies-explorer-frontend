import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);


  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: currentUser
  });

  function showFormError(e) {
    console.log(isValid && isDirty)
  }

  // function activateForm() {
  //   setIsFormActive(true);
  //   console.log(currentUser)
  //   return;
  // };

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <form onSubmit={handleSubmit(showFormError)} className="profile__form">
          <ul className="profile__user-info">
            <li className="profile__info-container">
              <label htmlFor="name-input" className="profile__info-element">
                Имя
              </label>
              <input
                placeholder={'Имя'}
                type={'text'}
                defaultValue={currentUser.name}
                className={errors.name ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'}
                {...register('name', {
                  required: 'Поле должно быть заполнено',
                  minLength: {
                    value: 2,
                    message: 'Должно быть минимум 2 символа',
                  },
                  // validate: v => v !== currentUser.name || <p>Новое имя должно отличаться от старого</p>
                })}
              />
            </li>
            <li className="profile__info-container">
              <label htmlFor="email-input" className="profile__info-element">
                E-mail
              </label>
              <input
                defaultValue={currentUser.email}
                placeholder={'Электронная почта'}
                type={'email'}
                className={errors.email ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'}
                {...register('email', {
                  required: 'Поле должно быть заполнено',
                  pattern: {
                    value: /[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+@[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+\.[a-zA-Z0-9\.-\/-_~:\/?#\[\]!$&'()*+,;=]+/i, //eslint-disable-line
                    message: 'Email должен быть вида email@example.com',
                  },
                })}
              />
            </li>
          </ul>
          <button aria-label="Редактировать профиль" className={isValid && isDirty ? 'profile__button profile__button_active' : 'profile__button profile__button_disabled'} type="submit">
            Редактировать
          </button>
          <button
            onClick={() => {
              console.log(isDirty);
            }}
            aria-label="Выйти из аккаунта"
            className="profile__button profile__button_red-text"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </>
  );
}

export default Profile;
