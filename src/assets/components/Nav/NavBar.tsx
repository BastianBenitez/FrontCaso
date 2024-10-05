import Button from "@mui/material/Button";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <header>
        <Link className="link-home" to="/">
          <h1 className="site-title">Waki Storys</h1>
        </Link>
        <nav>
          <NavLink end to="/descubrir">
            Descubrir
          </NavLink>
          <NavLink end to="/categorias">
            Categorias
          </NavLink>
        </nav>
        <div className="login-container">
          <Button variant="contained">Login</Button>
          <Button variant="outlined">Register</Button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
