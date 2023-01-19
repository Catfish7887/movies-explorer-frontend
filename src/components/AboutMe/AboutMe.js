import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section__title">Студент</h2>
      <address className="about-me__content">
        <img className="about-me__avatar" alt="Фотография студента" src={avatar}></img>
        <small className="about-me__author-name">Даниил</small>
        <span className="about-me__author-info">Фронтенд-разработчик, 19 лет</span>
        <p className="about-me__author-bio">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <a href="1" className="about-me__link">
          Github
        </a>
      </address>
    </section>
  );
}

export default AboutMe;
