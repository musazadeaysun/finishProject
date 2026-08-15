import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page not-found">
      <h1>404</h1>

      <h2>Səhifə tapılmadı</h2>

      <p>
        Axtardığınız səhifə mövcud deyil.
      </p>

      <Link to="/">
        Ana səhifəyə qayıt
      </Link>
    </section>
  );
}

export default NotFound;