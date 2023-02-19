function Footer() {
  return(
    <footer className="footer">
      <span className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</span>
      <div className="footer__container">
        <nav className="footer__links">
          <a href="https://practicum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/catfish7887" className="footer__link">Github</a>
        </nav>
        <small className="footer__copyright">&copy;Daniil Klochkov, 2022</small>
      </div>
    </footer>
  )
};

export default Footer;