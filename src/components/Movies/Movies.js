import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import moviesApi from '../../utils/Api/MoviesApi';

import Card from '../Card/Card';
import { useEffect, useState } from 'react';

function Movies(props) {
  const { movies, getMovies } = props;
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const [renderSize, setRenderSize] = useState(12);

  const resultMoviesArray = movies.slice(0, renderSize);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    calculateCardsQuantity();
  }, [movies, resultMoviesArray, windowWidth]);

  function getWindowWidth() {
    const { innerWidth: width } = window;
    return width;
  }

  function calculateCardsQuantity() {
    if (windowWidth >= 1280) {
      setRenderSize(12);
      return;
    }

    if (windowWidth > 768 && windowWidth < 1280) {
      setRenderSize(8);
      return;
    }

    if (windowWidth > 320 && windowWidth < 768) {
      setRenderSize(5);
      return;
    }

    return;
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="movies">
        <Search getFilms={getMovies} />
        {/* <Cards cards={resultMoviesArray.map(card => (<Card key={card._id} {...card} />))} isSavedPage={false} /> */}
        <Cards cards={resultMoviesArray} isSavedPage={false} />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
