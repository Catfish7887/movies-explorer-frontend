import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AuthRoute from '../AuthRoute/AuthRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Authorization/Register';
import Login from '../Authorization/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavPopup from '../NavPopup/NavPopup';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/Api/MainApi';
import CurrentUserContext from '../../contexts/currentUserContext';
import isLoggedInContext from '../../contexts/isLoggedInContext';
import moviesApi from '../../utils/Api/MoviesApi';

function App() {
  const [isNavPopupOpened, setIsNavPopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Проверка наличия токена при запуске приложения/обновлении страницы
  // Если есть токен - токен присоеднияется к заголовкам запроса, далее меняется стейт isLoggedIn,
  // срабатывает useEffect, который зависит от этой переменной, вызывается метод API, который использует токен и возвращает
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return;
  }, [isLoggedIn]);

  function checkToken() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) return;

    mainApi
      .checkToken(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .then(() => mainApi.injectToken())
      .catch((err) => {
        if (err.message === 'Статус ошибки: 401') {
          navigate('/signin');
        } else {
          console.log(err);
        }
      });
  }

  function signIn(data) {
    mainApi
      .signin(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
      })
      .then(() => mainApi.injectToken())
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  }

  function createUser(data) {
    mainApi
      .createUser(data)
      .then(() => navigate('/signin'))
      .catch((err) => console.log(err));
  }

  function editUser(data, doSomethingOnError) {
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => doSomethingOnError(err));
  }

  function getBeatFilms() {
    moviesApi.getFilms().then((res) => setMovies(res));
  }

  function openNavPopup() {
    setIsNavPopupOpened(true);
  }

  function closeAllPopups() {
    setIsNavPopupOpened(false);
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/');
  }

  console.log();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <isLoggedInContext.Provider value={isLoggedIn}>
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<Main openPopup={openNavPopup} />} />

          <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Profile onLogout={handleLogout} onSubmit={editUser} openPopup={openNavPopup} />} />} />
          <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Movies movies={movies} getMovies={getBeatFilms} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
          <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<SavedMovies isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
          <Route path="/signin" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Login onSubmit={signIn} />} />} />
          <Route path="/signup" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Register onSubmit={createUser} />} />} />
        </Routes>
        <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
      </isLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
