import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';

function SavedMovies(props) {
  return (
    <>
      <Header openPopup={props.openNavPopup}/>
      <main className="saved-movies">
        <Search />
        <Cards isSavedPage={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
