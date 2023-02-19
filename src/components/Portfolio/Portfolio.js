function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__links">
        <a className="portfolio__link" href="2">
          Статичный сайт<span>↗</span>
        </a>
        <a className="portfolio__link" href="2">
          Адаптивный сайт<span>↗</span>
        </a>
        <a className="portfolio__link" href="2">
          Одностраничное приложение<span>↗</span>
        </a>
      </nav>
    </section>
  );
}

export default Portfolio;
