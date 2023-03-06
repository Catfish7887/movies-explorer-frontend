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
          setIsLoggedIn(false);
          navigate('/');
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
        if (err.status === 401) {
          localStorage.removeItem('jwt');
          navigate('/signin');
        } else {
          console.log(err);
        }
      });
  }

  function signIn(data, onError) {
    mainApi
      .signin(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
      })
      .then(() => mainApi.injectToken())
      .then(() => navigate('/movies'))
      .catch((err) => {
        if(err.status === 401){
          showApiError(onError, 'Неправильный логин или пароль')
        }else if(err.status === 400){
          showApiError(onError, 'Введены некорректные данные')
        }else{
          showApiError(onError, 'На сервере произошла неизвестная ошибка. Повторите попытку позже')
        }
      });
  }

  function createUser(data, onError) {
    mainApi
      .createUser(data)
      .then(() => {
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        if(err.status === 409){
          showApiError(onError, 'Пользователь с таким E-mail уже зарегистрирован')
        }else if(err.status === 400){
          showApiError(onError, 'Введены некорректные данные')
        }else{
          showApiError(onError, 'На сервере произошла неизвестная ошибка. Повторите попытку позже')
        }
        console.log(err);
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

  function getBeatFilms() {
    moviesApi.getFilms().then((res) => setMovies(res));
  }

  function likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN }) {
    mainApi
      .likeCard({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN })
      .then((card) => {
        setLikedMovies([...likedMovies, card]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function dislikeCard(id) {
    mainApi
      .dislikeCard(id)
      .then((removedCard) => {
        setLikedMovies(likedMovies.filter((card) => card.movieId !== removedCard.movieId));
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

  function showApiError(onError, message) {
    onError(message)

    return setTimeout(()=>{
      onError('')
    }, 3000)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <isLoggedInContext.Provider value={isLoggedIn}>
        <savedMoviesContext.Provider value={likedMovies}>
          <Routes>
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/" element={<Main openPopup={openNavPopup} />} />

            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Profile onLogout={handleLogout} onSubmit={editUser} openPopup={openNavPopup} />} />} />
            <Route path="/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<Movies movies={movies} likeCard={likeCard} dislikeCard={dislikeCard} getMovies={getBeatFilms} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} component={<SavedMovies movies={likedMovies} dislikeCard={dislikeCard} isLoggedIn={isLoggedIn} openPopup={openNavPopup} />} />} />
            <Route path="/signin" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Login onSubmit={signIn} />} />} />
            <Route path="/signup" element={<AuthRoute isLoggedIn={isLoggedIn} component={<Register onSubmit={createUser} />} />} />
          </Routes>
          <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
          <ErrorPopup isOpened={true}/>
        </savedMoviesContext.Provider>
      </isLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
