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
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Icono para cerrar el menú
import NavButton from "./NavButton";
import LinkBar from "./LinkBar";
import { useAuth } from "../../../AuthContext"; // Importa el hook useAuth

const NavBar: React.FC = () => {
  const { user, logout } = useAuth(); // Obtiene el estado de autenticación y la función logout
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const links = [
    { to: "/", label: "Inicio", key: "inicio" }, // Clave única para "Inicio"
    { to: "/menu", label: "Menú", key: "menu" }, // Clave única para "Menú"
    ...(user
      ? [
          { to: "/profile", label: "Perfil", key: "perfil" }, // Clave única para "Perfil"
          {
            label: "Cerrar Sesión", // Cambiamos "to" por "label"
            action: logout,
            key: "cerrar-sesion",
          }, // Clave única para "Cerrar Sesión"
        ]
      : [{ to: "/login", label: "Iniciar Sesión", key: "iniciar-sesion" }]), // Clave única para "Iniciar Sesión"
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo semitransparente más oscuro
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
          <ListItemButton
            key={link.key} // Usar la clave única
            component={link.action ? "span" : NavButton} // Usa "span" si hay acción
            to={link.action ? undefined : link.to} // No establece `to` si hay acción
            onClick={() => {
              if (link.action) {
                link.action(); // Llama a la función de logout si existe
              }
            }}
          >
            <ListItemText primary={link.label} sx={{ color: "white" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Centrar el contenido
        overflowX: "hidden", // Evitar el desbordamiento horizontal
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px", // Ancho máximo de 1400px
          width: "100%",
          padding: "0 24px", // Espacio lateral
          boxSizing: "border-box", // Asegura que el padding no cause desbordamiento
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between", // Espacio entre el título y los enlaces
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            Fukusuke Sushi
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              ml: 4, // Margen izquierdo para dar espacio entre el título y los enlaces
              overflowX: "hidden", // Evita el desbordamiento horizontal en el contenedor
            }}
          >
            <LinkBar links={links} />
            {/* Mostrar el avatar si el usuario está autenticado */}
            {user && <Avatar sx={{ marginLeft: 2 }} />} {/* Avatar vacío */}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon sx={{ fontSize: 40, marginRight: "1rem" }} />
          </IconButton>
        </Toolbar>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Hacer que el Drawer sea semitransparente
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
