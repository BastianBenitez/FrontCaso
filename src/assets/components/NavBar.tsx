// NavBar.tsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Icono para cerrar el menú
import NavButton from "./NavButton";
import LinkBar from "./LinkBar";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/menu", label: "Menú" },
    { to: "/login", label: "Iniciar Sesión" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Fondo semitransparente más oscuro
        height: "100%", // Asegura que ocupe toda la altura
        color: "white", // Hace que el texto sea blanco
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* Botón para cerrar el Drawer */}
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ color: "white", display: "block", marginLeft: "auto" }}
      >
        <CloseIcon />
      </IconButton>

      <List sx={{ backgroundColor: "transparent" }}>
        {links.map((link) => (
          <ListItemButton key={link.to} component={NavButton} to={link.to}>
            <ListItemText primary={link.label} sx={{ color: "white" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1, color: "white" }}>
          Mi Restaurante de Sushi
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon sx={{ fontSize: 40 }} /> {/* Ajusta el tamaño del ícono */}
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <LinkBar links={links} />
        </Box>
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Hacer que el Drawer sea semitransparente
            backdropFilter: "blur(5px)", // Aplicar un efecto de desenfoque en el fondo
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
