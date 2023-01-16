function Tech() {
  return(
    <section className="tech">
      <h2 className="section__title">Технологии</h2>
      <h3 className="tech__heading">7 технологий</h3>
      <p className="tech__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="tech__container">
        <div className="tech__item">
          <span className="tech__item-text">HTML</span>
        </div>
        <div className="tech__item">
          <span className="tech__item-text">CSS</span>
        </div>
        <div className="tech__item">
          <span className="tech__item-text">JS</span>
        </div>
        <div className="tech__item">
          <span className="tech__item-text">React</span>
        </div>
        <div className="tech__item">
          <span className="tech__item-text">Express.js</span>
        </div>
        <div className="tech__item">
          <span className="tech__item-text">mongoDB</span>
        </div>
      </div>
    </section>
  );
}

export default Tech;
