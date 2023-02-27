import Card from '../Card/Card';
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';

function SavedMovies(props) {
  return (
    <>
      <Header isLoggedIn={true} openPopup={props.openPopup}/>
      <main className="saved-movies">
        <Search />
        <Cards cards={(<>
          <Card />
          <Card />
          <Card />
        </>)}/>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
