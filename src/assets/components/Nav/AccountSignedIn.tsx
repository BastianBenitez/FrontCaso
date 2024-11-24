import React from "react";
import { Box, Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../../AuthContext";
import { Link } from "react-router-dom";

const AccountSignedIn: React.FC = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {user ? (
        <>
          <Avatar
            alt={user.nombre || "User"}
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer" }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/perfil"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Perfil
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link
                to="/orders"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Pedidos
              </Link>
            </MenuItem>
            {(user.isAdmin || user.isOwner) && (
              <MenuItem onClick={handleMenuClose}>
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Administrar
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          color="inherit"
          href="/login"
          sx={{
            padding: "5px 12px",
            backgroundColor: "#ff5722", // Mismo color de fondo
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#e64a19", // Un color de hover similar
            },
          }}
        >
          Iniciar Sesión
        </Button>
      )}
    </Box>
  );
};

export default AccountSignedIn;
