import { Route, Routes} from 'react-router-dom';
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
import { useState } from 'react';

function App() {
  const [isNavPopupOpened, setIsNavPopupOpened] = useState(false);
  // const [isLoggedIn, setIsloggedIn] = useState(true);

  // function login() {
  //   setIsloggedIn(true);
  // }

  function openNavPopup() {
    setIsNavPopupOpened(true);
  }

  function closeAllPopups() {
    setIsNavPopupOpened(false);
  }

  console.log();

  return (
    <>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<Main openPopup={openNavPopup} />} />
        <Route path='/movies' element={<Movies openPopup={openNavPopup} />}/>
        <Route path='/profile' element={<Profile openPopup={openNavPopup} />}/>
        <Route path='/saved-movies' element={<SavedMovies openPopup={openNavPopup} />}/>
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />

        {/* <Route path="/profile" element={<ProtectedRoute isLoggedIn={true} component={<Profile openPopup={openNavPopup} />} />} />
        <Route path="/movies" element={<ProtectedRoute isLoggedIn={true} component={<Movies openPopup={openNavPopup} />} />} />
        <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={true} component={<SavedMovies openPopup={openNavPopup} />} />} />
        <Route path="/register" element={<AuthRoute isLoggedIn={false} component={<Register />} />} />
        <Route path="/login" element={<AuthRoute isLoggedIn={false} component={<Login />} />} /> */}
      </Routes>
      <NavPopup onClose={closeAllPopups} isOpened={isNavPopupOpened} />
    </>
  );
}

export default App;
