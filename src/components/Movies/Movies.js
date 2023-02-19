import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';

function Movies() {
  return (
    <>
      <Header />
      <main className="movies">
        <Search />
        <Cards isSavedPage={false} />
        <Preloader />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
