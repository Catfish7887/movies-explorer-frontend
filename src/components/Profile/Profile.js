import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [errMessage, setErrMessage] = useState('');
  const [isReqSuccess, setIsReqSuccess] = useState(false)

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: currentUser,
  });

  useState(() => {
    reset({
      keepDefaultValues: true
    })
  }, [errMessage])

  function showReqSuccessMessage() {
    setIsReqSuccess(true);

    return setTimeout(() => {
      setIsReqSuccess(false)
    }, 2000)
  }

  function showFormError(err) {
    setErrMessage(err);

    return setTimeout(() => {
      setErrMessage('')
    }, 2000)
  }

  function editProfile(data) {
    props.onSubmit(data, showFormError, showReqSuccessMessage);
    if (errMessage === ''){
      reset({
      }, {keepDefaultValues: false})
    } else {
      reset({
        keepDefaultValues: true
      })
    }
  }

  // function activateForm() {
  //   setIsFormActive(true);
  //   console.log(currentUser)
  //   return;
  // };

  return (
    <>
      <Header openPopup={props.openPopup} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <form onSubmit={handleSubmit(editProfile)} className="profile__form">
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
                    message: 'должно быть минимум 2 символа',
                  },
                  pattern: {
                    value: /^[А-Яёа-яёA-Za-z][а-яёА-ЯёA-Za-z \s '-]+/,
                    message: 'Имя может состоять только из латинских, русских букв, дефиса и пробела',
                  }
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
          {isReqSuccess ? <span className=" profile__ error-span profile__req-message">Данные профиля успешно изменены</span> : <></>}
          {!isValid || errMessage !== '' ? (
            <div className="profile__form-errors">
              {errors.name ? <span className={`profile__error-span ${!isValid ? `profile__error-span_shown` : ``}`}>{errors.name?.message ? `В поле имя: ${errors.name.message}` : 'Произошла неизвестная ошибка'}</span> : <></>}
              {errors.email ? <span className={`profile__error-span ${!isValid ? `profile__error-span_shown` : ``}`}>{errors.email?.message ? `В поле электронной почты: ${errors.email.message}` : 'Произошла неизвестная ошибка'}</span> : <></>}
              {errMessage !== '' ? <span className="profile__error-span profile__error-span_shown">{errMessage === 'Failed to fetch' ? `При обновлении профиля произошла ошибка. Проверьте Ваше интернет-соединение` : errMessage}</span> : <></>}
              {isReqSuccess ? <span className=" profile__ error-span profile__req-message">Данные профиля успешно изменены</span> : <></>}
            </div>
          ) : (
            <></>
          )}
          <button disabled={!(isValid && isDirty)} aria-label="Редактировать профиль" className={isValid && isDirty ? 'profile__button profile__button_active' : 'profile__button profile__button_disabled'} type="submit">
            Редактировать
          </button>
          <button onClick={props.onLogout} aria-label="Выйти из аккаунта" className="profile__button profile__button_red-text" type="button">
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </>
  );
}

export default Profile;
