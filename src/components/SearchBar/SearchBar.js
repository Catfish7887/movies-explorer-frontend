import { useRef } from "react";

function SearchBar(props) {

  const {formData} = props;
  const inputText = useRef(null);
  const checkbox = useRef(null);
  function findFilms(e){
    e.preventDefault()
    console.log(props.disabled)
    // props.onSubmit(inputText.current.value, checkbox.current.checked)
    props.onSubmit(inputText.current.value, checkbox.current.checked)
  };

  return (
    <div className="searchbar">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.7927 18.2638C17.3608 19.6957 15.0391 19.6957 13.6072 18.2638C12.1753 16.8319 12.1753 14.5103 13.6072 13.0783C15.0391 11.6464 17.3608 11.6464 18.7927 13.0783C20.2246 14.5103 20.2246 16.8319 18.7927 18.2638ZM19.2331 19.6468C17.2728 21.1462 14.4572 20.9994 12.6644 19.2066C10.7118 17.254 10.7118 14.0882 12.6644 12.1355C14.617 10.1829 17.7829 10.1829 19.7355 12.1355C21.5282 13.9283 21.675 16.7437 20.1758 18.7039L23.7425 22.2706L22.7997 23.2134L19.2331 19.6468Z"
          fill="#959595"
        />
      </svg>
      <form onSubmit={findFilms} className="searchform">
        <div className="searchform__input-container">
          <input defaultValue={formData?.text || ''} ref={inputText} type="text" name="film-input" placeholder="Фильм" className="searchform__input" />
          <button disabled={props.disabled} type="submit" className={props.disabled ? "searchform__submit-button searchform__submit-button_disabled" : "searchform__submit-button searchform__submit-button_active"}>
            Найти
          </button>
        </div>
        <div className="searchform__checkbox-container">
          <label className="searchform__label">
            <input defaultChecked={formData.checkbox} ref={checkbox} className="searchform__checkbox" type="checkbox" name="film-checkbox" />
            <span className="searchform__checkbox-toggle"></span>
          </label>
          <span className="searchform__checkbox-span">Короткометражки</span>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
