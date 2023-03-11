import { useContext, useRef, useState } from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Header from '../Header/Header';
import { useValidation } from '../../utils/hooks/useValidation';

function Profile(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const currentUser = useContext(CurrentUserContext);
  const [errMessage, setErrMessage] = useState('');
  const [isReqSuccess, setIsReqSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const nameInput = useValidation(currentUser.name, { name: true, minLength: 2, required: true });
  const emailInput = useValidation(currentUser.email, { email: true, required: true });

  // const {
  //   register,
  //   formState: { errors, isValid, isDirty },
  //   handleSubmit,
  //   reset,
  // } = useForm({
  //   mode: 'onChange',
  //   defaultValues: currentUser,
  // });

  // useState(() => {
  //   reset(currentUser)
  // }, [reset]);

  function showReqSuccessMessage() {
    setIsReqSuccess(true);

    return setTimeout(() => {
      setIsReqSuccess(false);
    }, 2000);
  }

  function showFormError(err) {
    setErrMessage(err);

    return setTimeout(() => {
      setErrMessage('');
    }, 2000);
  }

  function resetValues(data) {
    nameInput.reset(data.name);
    emailInput.reset(data.email);
  }

  function editProfile(e) {
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    e.preventDefault();
    props.onSubmit(formData, showFormError, showReqSuccessMessage, setIsBlocked, resetValues);
  }

  return (
    <>
      <Header openPopup={props.openPopup} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <form onSubmit={editProfile} className="profile__form">
          <ul className="profile__user-info">
            <li className="profile__info-container">
              <label htmlFor="name-input" className="profile__info-element">
                Имя
              </label>
              <input ref={nameRef} onChange={nameInput.onChange} disabled={isBlocked} placeholder={'Имя'} type={'text'} defaultValue={currentUser.name} className={!nameInput.isValid ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'} />
            </li>
            <li className="profile__info-container">
              <label htmlFor="email-input" className="profile__info-element">
                E-mail
              </label>
              <input ref={emailRef} onChange={emailInput.onChange} disabled={isBlocked} defaultValue={currentUser.email} placeholder={'Электронная почта'} type={'email'} className={!emailInput.isValid ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'} />
            </li>
          </ul>
          {isReqSuccess ? <span className=" profile__ error-span profile__req-message">Данные профиля успешно изменены</span> : <></>}
          {!emailInput.isValid || !nameInput.isValid || errMessage !== '' ? (
            <div className="profile__form-errors">
              {Object.keys(nameInput.errors).length !== 0 ? <span className="profile__error-span profile__error-span_shown">В поле имя: {nameInput.errors[Object.keys(nameInput.errors)[Object.keys(nameInput.errors).length - 1]]}</span> : <></>}
              {Object.keys(emailInput.errors).length !== 0 ? <span className="profile__error-span profile__error-span_shown">В поле E-mail: {emailInput.errors[Object.keys(emailInput.errors)[Object.keys(emailInput.errors).length - 1]]}</span> : <></>}
              {errMessage !== '' ? <span className="profile__error-span profile__error-span_shown">{errMessage === 'Failed to fetch' ? `При обновлении профиля произошла ошибка. Проверьте Ваше интернет-соединение` : errMessage}</span> : <></>}
            </div>
          ) : (
            <></>
          )}
          <button disabled={!(nameInput.isDirty || emailInput.isDirty) || !nameInput.isValid || !emailInput.isValid || isBlocked} aria-label="Редактировать профиль" className={(nameInput.isDirty || emailInput.isDirty) && emailInput.isValid && nameInput.isValid && !isBlocked ? 'profile__button profile__button_active' : 'profile__button profile__button_disabled'} type="submit">
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
