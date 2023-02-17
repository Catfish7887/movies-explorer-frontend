import { Link } from "react-router-dom";

function NotFoundPage() {
  return(
    <main className="not-found">
      <h1 className="not-found__title">404</h1>
      <span className="not-found__span">Страница не найдена</span>
      <Link to="/" className="not-found__link">Назад</Link>
    </main>
  );
};

export default NotFoundPage;
