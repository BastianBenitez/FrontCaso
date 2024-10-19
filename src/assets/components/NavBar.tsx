import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box
      component="header"
      sx={{
        borderBottom: "1px solid #1c2125",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        boxSizing: "border-box",
        paddingBottom: "0.5rem",
        marginTop: "1rem",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <h1 style={{ marginLeft: "2rem", color: "#fff", fontSize: "27px" }}>
          Fukusuke Sushi-Delivery
        </h1>
      </Link>

      <Box
        component="nav"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
        }}
      >
        <NavLink
          end
          to="/"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#f9f9f9" : "#838d9b",
            fontSize: "18px",
            marginRight: "1rem",
            transition: "color 0.3s ease",
          })}
        >
          Home
        </NavLink>
        <NavLink
          end
          to="/products"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#f9f9f9" : "#838d9b",
            fontSize: "18px",
            marginRight: "1rem",
            transition: "color 0.3s ease",
          })}
        >
          Productos
        </NavLink>
        <NavLink
          end
          to="/categorias"
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#f9f9f9" : "#838d9b",
            fontSize: "18px",
            marginRight: "1rem",
            transition: "color 0.3s ease",
          })}
        >
          Categorias
        </NavLink>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "11.5rem",
          height: "2.5rem",
          marginRight: "2rem",
        }}
      >
        <Button variant="contained">Login</Button>
        <Button variant="outlined">Register</Button>
      </Box>
    </Box>
  );
};

export default NavBar;
