import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';

function SavedMovies(props) {
  return (
    <>
      <Header openPopup={props.openPopup}/>
      <main className="saved-movies">
        <Search />
        <Cards />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
