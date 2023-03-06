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
import savedMoviesContext from '../../contexts/savedMovies';

function App() {
  const [isNavPopupOpened, setIsNavPopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
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
      const getMainFilms = moviesApi.getFilms();
      const getFavoriteMovies = mainApi.getMovies();
      const getUserData = mainApi.getCurrentUser();
      Promise.all([getMainFilms, getFavoriteMovies, getUserData])
        .then(([movies, favoriteMovies, userData]) => {
          setCurrentUser(userData);
          setLikedCards(favoriteMovies);
          setMovies(movies);
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

  function likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN }) {
    mainApi
      .likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN })
      .then((card) => {
        setLikedCards([...likedCards, card]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function dislikeCard(id) {
    mainApi
      .dislikeCard(id)
      .then((removedCard) => {
        setLikedCards(likedCards.filter(card => card.movieId !== removedCard.movieId ));
      })
      .catch((err) => console.log(err));
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
        <savedMoviesContext.Provider value={likedCards}>
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<Main openPopup={openNavPopup} />} />

            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Profile onLogout={handleLogout} onSubmit={editUser} openPopup={openNavPopup} />} />} />
            <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Movies movies={movies} likeCard={likeCard} dislikeCard={dislikeCard} getMovies={getBeatFilms} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<SavedMovies savedMovies={likedCards} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/signin" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Login onSubmit={signIn} />} />} />
            <Route path="/signup" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Register onSubmit={createUser} />} />} />
          </Routes>
          <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
        </savedMoviesContext.Provider>
      </isLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
