import { Navigate } from "react-router-dom";

const AuthRoute = ({ isLoggedIn, component }) => {
  if (isLoggedIn) {
    return (<Navigate to='/movies' replace />);
  }

  return component;
};

export default AuthRoute;

// Написал ещё один компонент, защищающий роуты. Если пользовать уже выполнил вход, то доступ к страницам авторизации ему предоставляться не должен
