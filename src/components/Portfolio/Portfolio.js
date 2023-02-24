function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__links">
        <a className="portfolio__link" href="https://github.com/Catfish7887/how-to-learn" target={'blank'}>
          Статичный сайт<span>↗</span>
        </a>
        <a className="portfolio__link" href="https://github.com/Catfish7887/russian-travel" target={"blank"}>
          Адаптивный сайт<span>↗</span>
        </a>
        <a className="portfolio__link" href="https://github.com/Catfish7887/react-mesto-api-full" target={"blank"}>
          Одностраничное приложение<span>↗</span>
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
