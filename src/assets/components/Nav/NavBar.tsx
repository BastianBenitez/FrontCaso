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
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NavButton from "./NavButton";
import LinkBar from "./LinkBar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountSignedIn from "./AccountSignedIn";
import { useCart } from "../../../CartContext"; // Importa tu contexto del carrito
import { useAuth } from "../../../AuthContext";

const NavBar: React.FC = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart(); // Accede al carrito desde el contexto
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // Estado para el carrito
  const { removeFromCart } = useCart();

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
  const toggleCart = (open: boolean) => () => setCartOpen(open);

  const addOrder = async (usuarioId: string, pedidoId: string) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users/agregar-pedido",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usuarioId, pedidoId }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Pedido agregado al historial:", data.historialPedidos);
      } else {
        const errorData = await response.json();
        console.error("Error al agregar el pedido al historial:", errorData);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al agregar el pedido al historial:", error);
      alert("Ocurrió un error al intentar agregar el pedido al historial.");
    }
  };

  const handleOrder = async () => {
    if (!user || cart.length === 0) {
      alert("Debes iniciar sesión y tener al menos un producto en el carrito.");
      return;
    }

    const pedido = {
      sushis: cart.map((item) => ({
        sushi: item.id,
        cantidad: item.quantity,
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      cliente: `${user.nombre} ${user.apellido}`,
      estado: "pendiente",
    };

    try {
      const response = await fetch("http://localhost:3000/api/pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        const data = await response.json();
        await addOrder(user.id, data.id);
        alert("¡Pedido enviado con éxito!");
        clearCart();
      } else {
        const errorData = await response.json();
        alert(`Error al enviar el pedido: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Ocurrió un error al intentar enviar el pedido.");
    }
  };

  const links = [
    { to: "/", label: "Inicio", key: "inicio" },
    { to: "/menu", label: "Menú", key: "menu" },
  ];

  const drawerStyles = {
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo de los Drawer
    height: "100%",
    color: "white",
  };

  const cartStyles = {
    width: 350, // Usamos el mismo ancho que el de renderDrawer
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
      <Box
        sx={{ display: "flex", justifyContent: "right", marginRight: "1rem" }}
      >
        <AccountSignedIn />
      </Box>
      <List>
        {/* Otros enlaces */}
        {links.map((link) => (
          <ListItemButton key={link.key} component={NavButton} to={link.to}>
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
            const subtotal = item.price * item.quantity;
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
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  Subtotal: ${subtotal.toLocaleString()} CLP
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
          {/* Cálculo del costo de envío */}
          <Box
            sx={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Subtotal:</Typography>
            <Typography variant="h6">
              $
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toLocaleString()}{" "}
              CLP
            </Typography>
          </Box>
          <Box
            sx={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Costo de Envío:</Typography>
            <Typography variant="h6">$3,000 CLP</Typography>
          </Box>
          {/* Cálculo del total con envío */}
          <Box
            sx={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">
              $
              {(
                cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                ) + 3000
              ).toLocaleString()}{" "}
              CLP
            </Typography>
          </Box>
          {/* Botón Ordenar */}
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#ff5722",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={handleOrder}
            >
              Ordenar
            </button>
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
      <Box sx={{ width: "80%", padding: "0 24px" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1000px", // Máximo de 1000px
            width: "100%", // Asegura que ocupe todo el ancho disponible cuando sea menor a 1000px
            margin: "0 auto", // Centra el contenido horizontalmente
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            Fukusuke Sushi
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}>
              <LinkBar links={links} />
              <AccountSignedIn />
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuIcon sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton
                onClick={toggleCart(true)}
                sx={{ color: "white", display: { xs: "block", md: "none" } }}
              >
                <ShoppingCartIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Box>

      {/* Drawer para el menú */}
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
