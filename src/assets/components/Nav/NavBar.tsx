import Button from "@mui/material/Button";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header id="navbar-header">
        <Link id="navbar-home-link" className="link-home" to="/">
          <h1 className="navbar-site-title">Fukusuke Sushi-Delivery</h1>
        </Link>
        <nav id="navbar-nav">
          <NavLink end to="/descubrir" className="navbar-nav-link">
            Descubrir
          </NavLink>
          <NavLink end to="/categorias" className="navbar-nav-link">
            Categorias
          </NavLink>
          <NavLink end to="/dashboard" className="navbar-nav-link">
            Dashboard
          </NavLink>
        </nav>
        <div id="navbar-login-container" className="login-container">
          <Button variant="contained">Login</Button>
          <Button variant="outlined">Register</Button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
