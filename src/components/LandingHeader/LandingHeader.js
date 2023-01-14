
import headerLogo from '../../images/header-logo.svg';

function LandingHeader() {
  return(
    <section className="landing-header">
      <div className="landing-header__content">
      <h1 className="landing-header__heading">1</h1>
      <span className="landing-header__span">12</span>
      <svg>
        <use href={headerLogo} />
      </svg>
      </div>

    </section>
  );
};

export default LandingHeader;
