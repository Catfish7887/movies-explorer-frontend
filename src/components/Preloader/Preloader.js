import { useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(false);

  function showLoading() {
    setIsLoading(true);
    return;
  }

  return (
    <div className="preloader">
      {isLoading ? (
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      ) : (
        <>
          <button onClick={showLoading} type='button' aria-label='Загрузить ещё фильмы' className='preloader__button'>Ещё</button>
        </>
      )}
    </div>
  );
};

export default Preloader;
