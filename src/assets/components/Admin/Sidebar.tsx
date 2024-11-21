import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

interface SidebarProps {
  onSectionChange: (section: string) => void; // Tipado del prop
}

const Sidebar: React.FC<SidebarProps> = ({ onSectionChange }) => {
  return (
    <Box
      sx={{
        width: "240px",
        bgcolor: "transparent", // Fondo transparente
        color: "white", // Texto blanco
        height: "100vh",
        border: "2px solid white", // Borde blanco
        borderRadius: "8px", // Bordes redondeados
        padding: "16px", // Espaciado interno
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onSectionChange("Dashboard")}
            sx={{
              "&:hover": {
                color: "gray", // Cambiar a gris al pasar el mouse
              },
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onSectionChange("Usuarios")}
            sx={{
              "&:hover": {
                color: "gray", // Cambiar a gris al pasar el mouse
              },
            }}
          >
            <ListItemText primary="Usuarios" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onSectionChange("Configuraciones")}
            sx={{
              "&:hover": {
                color: "gray", // Cambiar a gris al pasar el mouse
              },
            }}
          >
            <ListItemText primary="Configuraciones" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
