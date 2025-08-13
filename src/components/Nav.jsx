import { Link } from "react-router-dom";
import Topics from "./Topics";

function Nav() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={`/`} className="inline-flex items-center gap-2">
            <span className="text-xl font-extrabold text-blue-600">NC News</span>
          </Link>
          <div className="flex items-center gap-3">
            <Topics />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Nav;
