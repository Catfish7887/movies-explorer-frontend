function Card() {
  const isLiked = false;

  return (
    <>
      <li className="card">
        <div className="card__head">
          <h3 className="card__name">Name</h3>
          <span className="card__duration">1111</span>
          <button className={isLiked ? 'card__favorites-button card__favorites-button_active' : 'card__favorites-button'}>
            {isLiked ? (
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1.9C0 1.1268 0.626801 0.5 1.4 0.5H8.6C9.3732 0.5 10 1.1268 10 1.9V12.4789C10 12.9367 9.50791 13.2258 9.10798 13.003L5.97341 11.2566C5.36826 10.9195 4.63174 10.9195 4.0266 11.2566L0.892022 13.003C0.492092 13.2258 0 12.9367 0 12.4789V1.9Z" fill="white" />
              </svg>
            ) : (
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z" stroke="#424242" />
              </svg>
            )}
          </button>
        </div>
          <img src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card__image" alt="Превью фильма" />
      </li>
    </>
  );
}

export default Card;
