import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import moviesApi from '../../utils/Api/MoviesApi';

import { useEffect, useState } from 'react';
import findFilms from '../../utils/functions/search';
import calcFunctions from '../../utils/functions/calculateCards';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderSize, setRenderSize] = useState(12);
  const [spanHidden, setSpanHidden] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);


  const resultMoviesArray = filteredMovies.slice(0, renderSize);

  useEffect(() => {
    moviesApi
      .getFilms()
      .then((res) => setMovies(res))
      .then(() => setIsLoading(false))
      .catch((err) => {
        showError(err.message);
      });
  })

  // useEffect(() => {
  //   calcFunctions.calculateCardsQuantity(windowWidth, renderSize, setRenderSize);
  // }, [movies, windowWidth]);


  useEffect(() => {

    function handleResize() {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= 200) {
        clearTimeout(this.lastCallTimer);
      }

      this.lastCallTimer = setTimeout(() => {
        calculateCardsQuantity()
      }, 200);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const calculateCardsQuantity = () => {
    if (window.innerWidth < 777) {
      setRenderSize(5)
      // console.log('5 карточек')
    }else if (window.innerWidth < 1289) {
      setRenderSize(8)
      // console.log(renderSize)
    }else if (window.innerWidth > 1289) {
      setRenderSize(12)
      // console.log(renderSize)
    }
    return;
  }


  function getBeatFilms(input, checkbox) {
    if (input === '') {
      setSpanHidden(true);
      showError('Поле запроса не может быть пустым');
      return;
    }

    setFilteredMovies([]);
    setSpanHidden(true);
    setIsLoading(true);
    setIsPreloaderShown(true);

    findFilms(movies, input, checkbox)
      .then(data => {
        setFilteredMovies(data)
      })
      .catch(err => showError(err))

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
        <Search getFilms={getBeatFilms} />
        <Cards error={searchError} errorFunction={showError} cards={resultMoviesArray} spanHidden={spanHidden} isSavedPage={false} />
        <Preloader loadCards={calcFunctions.loadMore( renderSize, setRenderSize)} isLoading={isLoading} isShown={isPreloaderShown} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
