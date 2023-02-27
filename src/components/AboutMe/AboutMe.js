import avatar from '../../images/avatar.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="section__title">Студент</h2>
      <address className="about-me__content">
        <img className="about-me__avatar" alt="Фотография студента" src={avatar}></img>
        <small className="about-me__author-name">Даниил</small>
        <span className="about-me__author-info">Фронтенд-разработчик, 19 лет</span>
        <p className="about-me__author-bio">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a href="https://github.com/catfish7887" className="about-me__link" target={'blank'}>
          Github
        </a>
      </address>
    </section>
  );
}

export default AboutMe;
