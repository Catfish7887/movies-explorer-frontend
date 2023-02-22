function About() {
  return (
    <section className="about">
      <h2 className="section__title">О проекте</h2>
      <ul className="about__text-container">
        <li className="about__text-li">
          <h2 className="about__heading">На выполнение диплома ушло 5 недель</h2>
          <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
        <li className="about__text-li">
          <h2 className="about__heading">Дипломный проект включал 5 этапов</h2>
          <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
      </ul>
      <div className="about__strip">
        <span className="about__strip-element">1 неделя</span>
        <span className="about__strip-text about__strip-text_back">Back-end</span>
        <span className="about__strip-element about__strip-element_big">4 недели</span>
        <span className="about__strip-text about__strip-text_front">Front-end</span>
      </div>
    </section>
  );
}

export default About;
