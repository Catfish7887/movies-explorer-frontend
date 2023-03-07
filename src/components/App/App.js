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
import NavPopup from '../Popups/NavPopup';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/Api/MainApi';
import CurrentUserContext from '../../contexts/currentUserContext';
import isLoggedInContext from '../../contexts/isLoggedInContext';
import moviesApi from '../../utils/Api/MoviesApi';
import savedMoviesContext from '../../contexts/savedMovies';
import ErrorPopup from '../Popups/ErrorPopup';

function App() {
  const [isNavPopupOpened, setIsNavPopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const navigate = useNavigate();

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
          setLikedMovies(
            favoriteMovies.filter((data) => {
              return data.owner === userData._id;
            })
          );
          setMovies(movies);
        })
        .catch((err) => {
          localStorage.removeItem('foundMovies');
          localStorage.removeItem('searchFormData');
          setIsLoggedIn(false);
          navigate('/');
          setApiErrorMessage('На сервере произошла ошибка');
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
        if (err.status === 401) {
          localStorage.removeItem('foundMovies');
          localStorage.removeItem('searchFormData');
          localStorage.removeItem('jwt');
          navigate('/signin');
          setApiErrorMessage('С токеном что-то не так. Возможно, истёк срок его действия');
        } else {
          setApiErrorMessage('На сервере произошла ошибка');
        }
      });
  }

  function signIn(data, fetchPendingState, onError) {
    fetchPendingState(true);
    mainApi
      .signin(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
      })
      .then(() => mainApi.injectToken())
      .then(() => navigate('/movies'))
      .catch((err) => {
        if (err.status === 401) {
          showApiError(onError, 'Неправильный логин или пароль');
        } else if (err.status === 400) {
          showApiError(onError, 'Введены некорректные данные');
        } else {
          showApiError(onError, 'На сервере произошла неизвестная ошибка. Повторите попытку позже');
        }
      })
      .finally(() => {
        fetchPendingState(false);
      });
  }

  function createUser(data, fetchPendingState, onError) {
    const { email, password } = data;
    fetchPendingState(true);
    mainApi
      .createUser(data)
      .then(() => mainApi.signin({ email, password }))
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        mainApi.checkToken(res.token);
      })
      .then(() => {
        mainApi.injectToken();
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        if (err.status === 409) {
          showApiError(onError, 'Пользователь с таким E-mail уже зарегистрирован');
        } else if (err.status === 400) {
          showApiError(onError, 'Введены некорректные данные');
        } else {
          showApiError(onError, 'На сервере произошла неизвестная ошибка. Повторите попытку позже');
        }
        console.log(err);
      })
      .finally(() => {
        fetchPendingState(false);
      });
  }

  function editUser(data, doSomethingOnError) {
    mainApi
      .updateUser(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => doSomethingOnError(err));
  }

  function likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN }) {
    mainApi
      .likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN })
      .then((card) => {
        setLikedMovies([...likedMovies, card]);
      })
      .catch((err) => {
        setApiErrorMessage('На сервере произошла ошибка');
      });
  }

  function dislikeCard(id) {
    mainApi
      .dislikeCard(id)
      .then((removedCard) => {
        setLikedMovies(likedMovies.filter((card) => card.movieId !== removedCard.movieId));
      })
      .catch((err) => setApiErrorMessage('На сервере произошла ошибка'));
  }

  function openNavPopup() {
    setIsNavPopupOpened(true);
  }

  function closeAllPopups() {
    setIsNavPopupOpened(false);
    setApiErrorMessage('');
  }

  function handleLogout() {
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('searchFormData');
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/');
  }

  const binarySearchAndDelete = (cardId, left, right) => {
    const mid = Math.floor((left + right) / 2);
    if (cardId === likedMovies[mid].movieId) {
      return dislikeCard(likedMovies[mid]._id);
    } else if (right - 1 === left) {
      return cardId === likedMovies[left].movieId ? dislikeCard(likedMovies[left]._id) : dislikeCard(likedMovies[right]._id);
    }
    if (cardId !== likedMovies[mid].movieId) {
      return binarySearchAndDelete(cardId, left, right);
    } else {
      return binarySearchAndDelete(cardId, mid + 1, right);
    }
  };

  function findAndDeleteCard(cardId) {
    const left = 0;
    const right = likedMovies.length - 1;
    binarySearchAndDelete(cardId, left, right);
  }

  function showApiError(onError, message) {
    onError(message);

    return setTimeout(() => {
      onError('');
    }, 3000);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <isLoggedInContext.Provider value={isLoggedIn}>
        <savedMoviesContext.Provider value={likedMovies}>
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<Main openPopup={openNavPopup} />} />

            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Profile onLogout={handleLogout} onSubmit={editUser} openPopup={openNavPopup} />} />} />
            <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Movies movies={movies} likeCard={likeCard} dislikeCard={findAndDeleteCard} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<SavedMovies dislikeCard={dislikeCard} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/signin" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Login onSubmit={signIn} />} />} />
            <Route path="/signup" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Register onSubmit={createUser} />} />} />
          </Routes>
          <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
          <ErrorPopup onClose={closeAllPopups} message={apiErrorMessage} />
        </savedMoviesContext.Provider>
      </isLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
