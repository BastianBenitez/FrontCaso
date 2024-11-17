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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavButton from "./NavButton";
import LinkBar from "./LinkBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useAuth } from "../../../AuthContext";
import { useCart } from "../../../CartContext"; // Importa tu contexto del carrito

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart(); // Accede al carrito desde el contexto
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // Estado para el carrito
  const { removeFromCart } = useCart();

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const toggleCart = (open: boolean) => () => setCartOpen(open);

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

  const drawerStyles = {
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo de los Drawer
    height: "100%",
    color: "white",
  };

  const cartStyles = {
    width: 450, // Usamos el mismo ancho que el de renderDrawer
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Usamos el mismo fondo que el de renderDrawer
    height: "100%",
    color: "white",
    padding: "16px", // Añadimos padding similar al de renderCart
    overflowY: "auto",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Mismo box shadow
  };

  const renderDrawer = (
    <Box sx={drawerStyles}>
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

  const renderCart = (
    <Box sx={cartStyles}>
      <IconButton
        onClick={toggleCart(false)}
        sx={{ marginLeft: "auto", marginBottom: 2, color: "white" }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Tu Carrito
      </Typography>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => {
            const subtotal = item.price * item.quantity; // Calcula el subtotal por producto
            return (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  Cantidad: {item.quantity}
                </Typography>
                <Typography variant="body2">
                  ${item.price.toLocaleString()} CLP
                </Typography>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  Subtotal: ${subtotal.toLocaleString()} CLP{" "}
                  {/* Muestra el subtotal */}
                </Typography>
                <IconButton
                  onClick={() => removeFromCart(item.id)}
                  sx={{ color: "red" }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            );
          })}
          {/* Muestra el total de la compra */}
          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">
              $
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString()}{" "}
              CLP
            </Typography>
          </Box>
        </>
      ) : (
        <Typography variant="body2">El carrito está vacío.</Typography>
      )}
    </Box>
  );

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
            {/* Botón de carrito */}
            <IconButton
              sx={{ marginLeft: 2 }}
              color="inherit"
              onClick={toggleCart(true)}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
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

      {/* Drawer para el carrito */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        {renderCart}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
