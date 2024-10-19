import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import NavButton from "./NavButton";
import LinkBar from "./LinkBar"; // Importa el nuevo componente

const NavBar = () => {
  // Define los enlaces que deseas incluir en el LinkBar
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/menu", label: "Menú" },
    { to: "/about", label: "Acerca de" },
    { to: "/contact", label: "Contacto" },
  ];

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, color: "white" }}>
          Mi Restaurante de Sushi
        </Typography>
        {/* Usa el componente LinkBar aquí */}
        <LinkBar links={links} />
        <NavButton to="/order">Ordenar</NavButton>
        <NavButton to="/login" icon={<LoginIcon />}>
          Iniciar Sesión
        </NavButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
