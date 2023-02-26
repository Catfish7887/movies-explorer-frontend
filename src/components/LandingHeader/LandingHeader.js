import headerLogo from '../../images/header-logo.svg';

function LandingHeader() {
  return (
    <section className="landing-header">
      <div className="landing-header__content">
        <img className="landing-header__logo" src={headerLogo} alt="Логотип" />
        <h1 className="landing-header__heading">Учебный проект студента&nbsp;факультета Веб&#8209;разработки.</h1>
        <span className="landing-header__span">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</span>
        <a href="#about-me" className="landing-header__button">
          Узнать больше
        </a>
      </div>
    </section>
  );
}

export default LandingHeader;
