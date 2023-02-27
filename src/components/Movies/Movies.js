import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import moviesApi from '../../utils/Api/MoviesApi';

import Card from '../Card/Card';

function Movies(props) {

  function getBeatFilms() {
    moviesApi.getFilms()
      .then((res)=> console.log(res))
  };

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup} />
      <main className="movies">
        <Search />
        <Cards cards={(<>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </>)} isSavedPage={false} />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
