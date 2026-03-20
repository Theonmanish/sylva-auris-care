import { useNavigate } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound">
      <p className="notfound-eyebrow">404</p>
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-desc">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        className="notfound-btn"
        onClick={() => navigate("/")}
      >
        Return to Home
      </button>
    </main>
  );
}

export default NotFound;
