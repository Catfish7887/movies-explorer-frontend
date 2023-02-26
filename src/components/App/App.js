import { Route, Routes, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// import AuthRoute from '../AuthRoute/AuthRoute';
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

function App() {
  const [isNavPopupOpened, setIsNavPopupOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getCurrentUser()
        .then((data) => {
          // console.log(data)
          setCurrentUser(data);
          console.log(currentUser);
        })
        .then(()=>{console.log(currentUser)})
        .catch((err) => {
          console.log(err);
        });
    }
    return;
  }, [isLoggedIn]);

  function signIn(data) {
    mainApi
      .signin(data)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        mainApi.injectToken();
      })
      .then(() => {
        setIsloggedIn(true);
      })
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  }

  function createUser(data) {
    mainApi
      .createUser(data)
      .then(() => navigate('/signin'))
      .catch((err) => console.log(err));
  }

  function openNavPopup() {
    setIsNavPopupOpened(true);
  }

  function closeAllPopups() {
    setIsNavPopupOpened(false);
  }

  console.log();

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<Main openPopup={openNavPopup} />} />
        <Route path="/movies" element={<Movies openPopup={openNavPopup} />} />
        <Route path="/profile" element={<Profile openPopup={openNavPopup} />} />
        <Route path="/saved-movies" element={<SavedMovies openPopup={openNavPopup} />} />
        <Route path="/signup" element={<Register onSubmit={createUser} />} />
        <Route path="/signin" element={<Login onSubmit={signIn} />} />

        {/* <Route path="/profile" element={<ProtectedRoute isLoggedIn={true} component={<Profile openPopup={openNavPopup} />} />} />
        <Route path="/movies" element={<ProtectedRoute isLoggedIn={true} component={<Movies openPopup={openNavPopup} />} />} />
        <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={true} component={<SavedMovies openPopup={openNavPopup} />} />} />
        <Route path="/register" element={<AuthRoute isLoggedIn={false} component={<Register />} />} />
        <Route path="/login" element={<AuthRoute isLoggedIn={false} component={<Login />} />} /> */}
      </Routes>
      <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
    </CurrentUserContext.Provider>
  );
}

export default App;
