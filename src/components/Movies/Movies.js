import Cards from '../Cards/Cards';
import Preloader from '../Preloader/Preloader';
import Search from '../Search/Search';

function Movies() {
  return (
    <main className="movies">
      <Search />
      <Cards />
      <Preloader />
    </main>
  );
}

export default Movies;
