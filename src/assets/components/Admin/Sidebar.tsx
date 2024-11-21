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
        bgcolor: "#1a1a1a", // Fondo oscuro similar al del DataGrid
        color: "white", // Texto blanco
        height: "80vh", // Asegura que ocupe todo el alto de la ventana
        maxHeight: "100vh", // No puede exceder el alto de la ventana
        borderRadius: "8px", // Bordes redondeados
        padding: "16px", // Espaciado interno
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Sombra sutil
        border: "2px solid #333", // Borde más oscuro
        overflowY: "auto", // Permite scroll si el contenido excede el alto
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => onSectionChange("Dashboard")}
            sx={{
              "&:hover": {
                backgroundColor: "#333", // Fondo oscuro al pasar el mouse
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
                backgroundColor: "#333", // Fondo oscuro al pasar el mouse
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
                backgroundColor: "#333", // Fondo oscuro al pasar el mouse
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
