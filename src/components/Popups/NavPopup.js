import NavBar from '../NavBar/NavBar';

function NavPopup(props) {
  return (
    <div
      onMouseDown={(e) => {
        e.target.classList.contains('popup_opened') && props.onClose();
      }}
      className={props.isOpened ? 'popup popup_opened' : 'popup'}
    >
      <div className={props.isOpened ? 'popup__container popup__container_error popup__container_opened' : 'popup__container'}>
        <button onClick={props.onClose} aria-label="Закрыть окно навигации" type="button" className="popup__close-btn">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7.16016" y="9.28249" width="3" height="22" transform="rotate(-45 7.16016 9.28249)" fill="white" />
            <rect x="22.7168" y="7.16117" width="3" height="22" transform="rotate(45 22.7168 7.16117)" fill="white" />
          </svg>
        </button>
        <NavBar />
      </div>
    </div>
  );
}

export default NavPopup;
