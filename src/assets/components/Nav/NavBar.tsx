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
import CloseIcon from "@mui/icons-material/Close";
import NavButton from "./NavButton";
import LinkBar from "./LinkBar";
import { useAuth } from "../../../AuthContext";

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Función para controlar la apertura y cierre del drawer
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  // Definición de enlaces del menú
  const links = [
    { to: "/", label: "Inicio", key: "inicio" },
    { to: "/menu", label: "Menú", key: "menu" },
    ...(user
      ? [
          { to: "/profile", label: "Perfil", key: "perfil" },
          { label: "Cerrar Sesión", action: logout, key: "cerrar-sesion" },
        ]
      : [{ to: "/login", label: "Iniciar Sesión", key: "iniciar-sesion" }]),
  ];

  // Componente Drawer
  const renderDrawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        height: "100%",
        color: "white",
      }}
    >
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ color: "white", marginLeft: "auto" }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {links.map((link) => (
          <ListItemButton
            key={link.key}
            component={link.action ? "span" : NavButton}
            to={link.action ? undefined : link.to}
            onClick={() => link.action && link.action()}
          >
            <ListItemText primary={link.label} sx={{ color: "white" }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  // Renderiza el NavBar
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "1400px", width: "100%", padding: "0 24px" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
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
              ml: 4,
            }}
          >
            <LinkBar links={links} />
            {user && <Avatar sx={{ marginLeft: 2 }} />}
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        {renderDrawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
