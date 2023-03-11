import { useContext, useEffect, useState } from 'react';
import savedMoviesContext from '../../contexts/savedMovies';
import findFilms from '../../utils/functions/findFilms';
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';
function SavedMovies(props) {
  const savedMovies = useContext(savedMoviesContext)

  const [searchError, setSearchError] = useState('');
  const [searchFormData, setSearchFormData] = useState({});
  const [resultMoviesArray, setResultMoviesArray] = useState(savedMovies);

  useEffect(()=>{
    setResultMoviesArray(savedMovies)
  },[savedMovies])

  function showError(message) {
    setSearchError(message);
    setResultMoviesArray([]);
    return setTimeout(() => {
      setResultMoviesArray(savedMovies)
      setSearchError('');
    }, 2000);
  }

  function findMovies(text, checkbox) {
    if (text === '' && !checkbox) {
      setResultMoviesArray(props.movies);
      return;
    }

    findFilms(savedMovies, text, checkbox)
      .then((movies) => setResultMoviesArray(movies))
      .catch((msg) => {
        setResultMoviesArray([])
        showError(msg);
        
      });
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="saved-movies">
        <Search formData={searchFormData} disabled={searchError !== ''} getFilms={findMovies} />
        <Cards spanPhrase={'Сохранённых фильмов пока что нет'} error={searchError} dislikeCard={props.dislikeCard} likeCard={props.likeCard} errorFunction={showError} cards={(resultMoviesArray.length === 0 && searchError === '') ? savedMovies : resultMoviesArray} spanHidden={savedMovies.length !== 0 || searchError !== ''} isSavedPage={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
