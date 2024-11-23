import React from "react";
import { Box, Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../../../AuthContext";

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
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
          </Menu>
        </>
      ) : (
        <Button color="inherit" href="/login">
          Iniciar Sesión
        </Button>
      )}
    </Box>
  );
};

export default AccountSignedIn;
