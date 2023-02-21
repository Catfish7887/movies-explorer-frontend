import { useState } from "react";

function Card(props) {
  const [likeStatus, setLikeStatus] = useState(false);
  // const isSavedPage = props.isSavedPage;

  function likeCard() {
    setLikeStatus(!likeStatus)
    return;
  };

  return (
    <>
      <li className="card">
        <div className="card__head">
          <h3 className="card__name">Name</h3>
          <span className="card__duration">1111</span>
          {window.location.pathname === '/saved-movies' ? (
            <button className="card__favorites-button">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 4.94287L6.35705 7.29992L7.41771 6.23926L5.06066 3.88221L7.29992 1.64295L6.23926 0.582291L4 2.82155L1.76086 0.582406L0.700195 1.64307L2.93934 3.88221L0.582406 6.23914L1.64307 7.2998L4 4.94287Z" fill="white" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={likeCard} className={likeStatus ? 'card__favorites-button card__favorites-button_active' : 'card__favorites-button'}>
              {likeStatus ? (
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.9C0 1.1268 0.626801 0.5 1.4 0.5H8.6C9.3732 0.5 10 1.1268 10 1.9V12.4789C10 12.9367 9.50791 13.2258 9.10798 13.003L5.97341 11.2566C5.36826 10.9195 4.63174 10.9195 4.0266 11.2566L0.892022 13.003C0.492092 13.2258 0 12.9367 0 12.4789V1.9Z" fill="white" />
                </svg>
              ) : (
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z" stroke="#424242" />
                </svg>
              )}
            </button>
          )}
        </div>
        <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card__image" alt="Превью фильма" />
      </li>
    </>
  );
}

export default Card;
