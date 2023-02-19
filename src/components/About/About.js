function About() {
  return(
    <section className="about">
      <h2 className="section__title">О проекте</h2>
      <div className="about__text-container">
        <span className="about__span">Дипломный проект включал 5 этапов</span>
        <span className="about__span">На выполнение диплома ушло 5 недель</span>
        <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about__strip">
        <span className="about__strip-element">1 неделя</span>
        <span className="about__strip-text about__strip-text_back">Back-end</span>
        <span className="about__strip-element about__strip-element_big">4 недели</span>
        <span className="about__strip-text about__strip-text_front">Front-end</span>
      </div>
    </section>
  )
};

export default About;
