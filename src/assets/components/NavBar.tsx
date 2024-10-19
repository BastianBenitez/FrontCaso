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
    { to: "/contact", label: "Contacto" },
    { to: "/login", label: "Iniciar Sesión" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map((link) => (
          <ListItemButton key={link.to} component={NavButton} to={link.to}>
            <ListItemText primary={link.label} />
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
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <LinkBar links={links} />
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
