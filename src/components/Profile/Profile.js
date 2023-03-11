import { useContext, useRef, useState } from 'react';
import CurrentUserContext from '../../contexts/currentUserContext';
import Header from '../Header/Header';
import { useForm } from 'react-hook-form';
import { useValidation } from '../../utils/hooks/useValidation';

function Profile(props) {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const currentUser = useContext(CurrentUserContext);
  const [errMessage, setErrMessage] = useState('');
  const [isReqSuccess, setIsReqSuccess] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const nameInput = useValidation(currentUser.name, { name: true, minLength: 2, required: true });
  const emailInput = useValidation(currentUser.email, { email:true, required: true, })

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

  function editProfile(e) {
    e.preventDefault();
    nameInput.reset(nameRef.current);
    emailInput.reset(emailRef.current);
    // props.onSubmit(data, showFormError, showReqSuccessMessage, setIsBlocked, reset);
    // console.log({isValid, isDirty, isBlocked})
    // setTimeout(()=>{
    //   console.log(!(isValid && isDirty) || isBlocked)
    // }, 3000)
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
              <input ref={nameRef} onChange={nameInput.onChange} disabled={isBlocked} placeholder={'Имя'} type={'text'} defaultValue={currentUser.name} className={ !nameInput.isValid ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'} />
            </li>
            <li className="profile__info-container">
              <label htmlFor="email-input" className="profile__info-element">
                E-mail
              </label>
              <input ref={emailRef} onChange={emailInput.onChange}
                disabled={isBlocked}
                defaultValue={currentUser.email}
                placeholder={'Электронная почта'}
                type={'email'}
                className={ !emailInput.isValid  ? 'profile__info-input authorization__form-input_invalid' : 'profile__info-input'}
              />
            </li>
          </ul>
          {isReqSuccess ? <span className=" profile__ error-span profile__req-message">Данные профиля успешно изменены</span> : <></>}
          <>{true ? <span className="profile__error-span profile__error-span_shown"></span> : <></>}</>
          <button disabled={!(nameInput.isDirty || emailInput.isDirty) || !nameInput.isValid || !emailInput.isValid} aria-label="Редактировать профиль" className={(nameInput.isDirty || emailInput.isDirty)  && (emailInput.isValid && nameInput.isValid) ? 'profile__button profile__button_active' : 'profile__button profile__button_disabled'} type="submit">
            Редактировать
          </button>
          <button onClick={props.onLogout} aria-label="Выйти из аккаунта" className="profile__button profile__button_red-text" type="button">
            Выйти из аккаунта
          </button>
          <button
            type="button"
            onClick={() => {
              console.log(emailInput, nameInput);
            }}
          >
            STATUS
          </button>
        </form>
      </main>
    </>
  );
}

export default Profile;

// {!isValid || errMessage !== '' ? (
//   <div className="profile__form-errors">
//     {emailInput.isDirty ? <span className={`profile__error-span ${!isValid ? `profile__error-span_shown` : ``}`}>{errors.name?.message ? `В поле имя: ${errors.name.message}` : 'Произошла неизвестная ошибка'}</span> : <></>}
//     {errors.email ? <span className={`profile__error-span ${!isValid ? `profile__error-span_shown` : ``}`}>{errors.email?.message ? `В поле электронной почты: ${errors.email.message}` : 'Произошла неизвестная ошибка'}</span> : <></>}
//     {errMessage !== '' ? <span className="profile__error-span profile__error-span_shown">{errMessage === 'Failed to fetch' ? `При обновлении профиля произошла ошибка. Проверьте Ваше интернет-соединение` : errMessage}</span> : <></>}
//   </div>
// ) : (
//   <></>
// )}