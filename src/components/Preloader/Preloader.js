const Preloader = (props) => {
  const {isShown, isLoading, hasMovies} = props;

  return (
    <div className="preloader">
      {isShown ? (
        <>
          {isLoading ? (
            <div className="preloader__container">
              <span className="preloader__round"></span>
            </div>
          ) : (
            <>
              <button onClick={props.loadCards} type="button" aria-label="Загрузить ещё фильмы" className="preloader__button">
                Ещё
              </button>
            </>
          )}
        </>
      ) : (
        <div className={hasMovies ? 'preloader__plug preloader__plug_cards_true' : 'preloader__plug'}></div>
      )}
    </div>
  );
};

export default Preloader;
