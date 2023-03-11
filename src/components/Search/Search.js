import SearchBar from "../SearchBar/SearchBar";

function Search(props) {
  return (
    <section className="search">
      <SearchBar formData={props.formData} disabled={props.disabled} onSubmit={props.getFilms}/>
    </section>
  );
};

export default Search;
