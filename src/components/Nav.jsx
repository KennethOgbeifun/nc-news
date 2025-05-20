import { Link } from "react-router-dom";
import Topics from "./Topics";

function Nav() {
  return (
    <nav>
      <div className="nav-container">
      <Link to={`/`}>
      <button className="home-button">ArticleTube</button>
      </Link>
      <Topics />
      </div>
    </nav>
  );
}
export default Nav;
