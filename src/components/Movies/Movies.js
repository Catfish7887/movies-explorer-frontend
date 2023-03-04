import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import moviesApi from '../../utils/Api/MoviesApi';

import { useEffect, useState } from 'react';
import findFilms from '../../utils/functions/search';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderSize, setRenderSize] = useState(12);
  const [spanHidden, setSpanHidden] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [searchFormData, setSearchFormData] = useState({});

  const resultMoviesArray = filteredMovies.slice(0, renderSize);

  useEffect(() => {
    calculateCardsQuantity();
    const movies = localStorage.getItem('foundMovies');
    const data = localStorage.getItem('searchFormData');
    // debugger;

    if (data && movies) {
      setSpanHidden(true)
      setFilteredMovies(JSON.parse(movies));
      setSearchFormData(JSON.parse(data));
      setIsPreloaderShown(true)
      // debugger;
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
        console.log(renderSize, filteredMovies.length, (renderSize >= filteredMovies.length))
      }, 200);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculateCardsQuantity = () => {
    if (window.innerWidth < 777) {
      setRenderSize(5);
      // console.log('5 карточек')
    } else if (window.innerWidth < 1279) {
      setRenderSize(8);
      // console.log(renderSize)
    } else if (window.innerWidth > 1279) {
      setRenderSize(12);
      // console.log(renderSize)
    }
    return;
  };

  function getBeatFilms(input, checkbox) {
    if (input === '') {
      setSpanHidden(true);
      showError('Поле запроса не может быть пустым');
      return;
    }

    const formData = { text: input, checkbox: checkbox };
    setFilteredMovies([]);
    setSpanHidden(true);
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
      // console.log(renderSize, resultMoviesArray)
    } else if (window.innerWidth > 1279) {
      setRenderSize(renderSize + 3);
    }
    console.log();
    return;
  }

  function showError(message) {
    setSearchError(message);
    setIsPreloaderShown(false);

    return setTimeout(() => {
      setSpanHidden(false);
      setSearchError('');
    }, 2000);
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="movies">
        <Search formData={searchFormData} disabled={searchError !== ''} getFilms={getBeatFilms} />
        <Cards error={searchError} errorFunction={showError} cards={resultMoviesArray} spanHidden={spanHidden} isSavedPage={false} />
        <Preloader loadCards={loadMore} hasMovies={filteredMovies.length !== 0} isLoading={isLoading} isShown={isPreloaderShown && !(renderSize >= filteredMovies.length)} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
