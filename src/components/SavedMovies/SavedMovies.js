import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="saved-movies">
        <Search />
        <Cards isSavedPage={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
