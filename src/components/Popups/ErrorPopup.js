function ErrorPopup(props) {
  return (
    <div
      onMouseDown={(e) => {
        e.target.classList.contains('popup_opened') && props.onClose();
      }}
      className={props.message !== '' ? 'popup popup_opened popup_type_error' : 'popup popup_type_error'}
    >
      <div className={props.message !== '' ? "popup__container popup__container_opened popup__container_type_error" : 'popup__container popup__container_type_error' }>
        <svg className="popup__tooltip-img" width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60 117C91.4802 117 117 91.4802 117 60C117 28.5198 91.4802 3 60 3C28.5198 3 3 28.5198 3 60C3 91.4802 28.5198 117 60 117ZM60 120C93.1371 120 120 93.1371 120 60C120 26.8629 93.1371 0 60 0C26.8629 0 0 26.8629 0 60C0 93.1371 26.8629 120 60 120ZM55.0503 60.707L36.6655 42.3223L42.3224 36.6654L60.7071 55.0502L78.3848 37.3726L84.0416 43.0294L66.364 60.707L83.3346 77.6776L77.6777 83.3345L60.7071 66.3639L43.0294 84.0416L37.3726 78.3848L55.0503 60.707Z"
            fill="#FD0707"
          />
        </svg>
        <span className="popup__name">{props.message}</span>
        <button onClick={props.onClose} type="button" aria-label="Закрыть" className={props.message !== '' ? "popup__close-btn popup__close-btn_type_error" : 'popup__close-btn_hidden'}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7.16016" y="9.28249" width="3" height="22" transform="rotate(-45 7.16016 9.28249)" fill="white" />
            <rect x="22.7168" y="7.16117" width="3" height="22" transform="rotate(45 22.7168 7.16117)" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ErrorPopup;
