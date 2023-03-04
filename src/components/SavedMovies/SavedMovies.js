import { useState } from 'react';
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';
function SavedMovies(props) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [renderSize, setRenderSize] = useState(12);
  const [spanHidden, setSpanHidden] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderShown, setIsPreloaderShown] = useState(false);
  const [searchFormData, setSearchFormData] = useState({});


  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} openPopup={props.openPopup}/>
      <main className="saved-movies">
      <Search formData={searchFormData} disabled={searchError !== ''} getFilms={()=>{console.log(1)}} />
        <Cards error={searchError} errorFunction={()=>{console.log(1)}} cards={props.savedMovies} spanHidden={spanHidden} isSavedPage={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
