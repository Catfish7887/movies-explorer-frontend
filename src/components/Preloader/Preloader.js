import { useState } from 'react';

const Preloader = (props) => {
  const {isShown, isLoading} = props;

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
        <div className="preloader__plug"></div>
      )}
    </div>
  );
};

export default Preloader;
