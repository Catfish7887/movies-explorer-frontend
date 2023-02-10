import Header from './Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Movies from './Movies/Movies';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<ProtectedRoute isLoggedIn={true} component={<Movies />} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
