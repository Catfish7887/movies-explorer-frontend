import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';
import Card from '../Card/Card';

function Movies(props) {
  return (
    <>
      <Header isLoggedIn={true} openPopup={props.openPopup} />
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
