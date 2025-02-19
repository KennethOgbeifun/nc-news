import Topics from "./Topics";

function Nav() {
  return (
    <nav>
      <button className="home-button">ArticleTube</button>
      <button className="searchbutton">search</button>
      <button className="menu-button">menu</button>
      <Topics />
    </nav>
  );
}
export default Nav;
