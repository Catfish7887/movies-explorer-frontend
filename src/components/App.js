import Main from './Main/Main';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';
import AuthRoute from './AuthRoute/AuthRoute';
import Register from './Authorization/Register';
import Login from './Authorization/Login';
import NotFoundPage from './NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<ProtectedRoute isLoggedIn={true} component={<Profile />} />} />
        <Route path="/movies" element={<ProtectedRoute isLoggedIn={true} component={<Movies />} />} />
        <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={true} component={<SavedMovies />} />} />
        <Route path="/register" element={<AuthRoute isLoggedIn={false} component={<Register />} />} />
        <Route path="/login" element={<AuthRoute isLoggedIn={false} component={<Login />} />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
