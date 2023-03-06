import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import moviesApi from '../../utils/Api/MoviesApi';

import { useEffect, useState } from 'react';
import findFilms from '../../utils/functions/findFilms';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderSize, setRenderSize] = useState(12);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [searchFormData, setSearchFormData] = useState({});

  const resultMoviesArray = filteredMovies.slice(0, renderSize);

  useEffect(() => {
    calculateCardsQuantity();
    const movies = localStorage.getItem('foundMovies');
    const data = localStorage.getItem('searchFormData');

    if (data && movies) {
      setFilteredMovies(JSON.parse(movies));
      setSearchFormData(JSON.parse(data));
      setIsPreloaderShown(true);
      return;
    }

    return;
  }, []);

  useEffect(() => {
    moviesApi
      .getFilms()
      .then((res) => setMovies(res))
      .then(() => setIsLoading(false))
      .catch((err) => {
        showError(err.message);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= 200) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(() => {
        calculateCardsQuantity();
        console.log(renderSize, filteredMovies.length, renderSize >= filteredMovies.length);
      }, 200);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateCardsQuantity = () => {
    if (window.innerWidth < 777) {
      setRenderSize(5);
    } else if (window.innerWidth < 1279) {
      setRenderSize(8);
    } else if (window.innerWidth > 1279) {
      setRenderSize(12);
    }
    return;
  };

  function getBeatFilms(input, checkbox) {
    if (input === '') {
      showError('Поле запроса не может быть пустым');
      return;
    }

    const formData = { text: input, checkbox: checkbox };
    setFilteredMovies([]);
    setIsLoading(true);
    setIsPreloaderShown(true);

    calculateCardsQuantity();
    findFilms(movies, input, checkbox)
      .then((data) => {
        setFilteredMovies(data);
        localStorage.setItem('searchFormData', JSON.stringify(formData));
        localStorage.setItem('foundMovies', JSON.stringify(data));
        setIsLoading(false);
      })
      .catch((err) => showError(err));
  }

  function loadMore() {
    if (window.innerWidth < 1279) {
      setRenderSize(renderSize + 2);
    } else if (window.innerWidth > 1279) {
      setRenderSize(renderSize + 3);
    }
    console.log();
    return;
  }

  function showError(message) {
    setFilteredMovies([])
    setSearchError(message);
    setIsPreloaderShown(false);

    return setTimeout(() => {
      setSearchError('');
    }, 2000);
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="movies">
        <Search formData={searchFormData} disabled={searchError !== ''} getFilms={getBeatFilms} />
        <Cards spanPhrase={'Введите ключевое слово для поиска'} error={searchError} errorFunction={showError} dislikeCard={props.dislikeCard} likeCard={props.likeCard} cards={resultMoviesArray} spanHidden={resultMoviesArray.length !== 0 || searchError !== ''} isSavedPage={false} />
        <Preloader loadCards={loadMore} hasMovies={filteredMovies.length !== 0} isLoading={isLoading} isShown={isPreloaderShown && !(renderSize >= filteredMovies.length)} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
