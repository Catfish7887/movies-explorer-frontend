import SearchBar from "../SearchBar/SearchBar";

function Search(props) {
  return (
    <section className="search">
      <SearchBar onSubmit={props.getFilms}/>
    </section>
  );
};

export default Search;
