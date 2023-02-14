import Header from './Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Profile from './Profile/Profile';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile" element={<ProtectedRoute isLoggedIn={true} component={<Profile />} />} />
        <Route path="/movies" element={<ProtectedRoute isLoggedIn={true} component={<Movies />} />} />
        <Route path="/saved-movies" element={<ProtectedRoute isLoggedIn={true} component={<SavedMovies />} />} />
      </Routes>
    </>
  );
}

export default App;
