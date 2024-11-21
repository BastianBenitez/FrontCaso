import { useState } from "react";
import Sidebar from "../assets/components/Admin/Sidebar";
import { Box } from "@mui/material";

// Componentes para las diferentes secciones
const Dashboard = () => <Box>Este es el Dashboard</Box>;
const Users = () => <Box>Gestión de Usuarios</Box>;
const Config = () => <Box>Configuraciones del sistema</Box>;

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); // Estado de la sección activa

  // Función para renderizar el contenido basado en la sección activa
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "Usuarios":
        return <Users />;
      case "Configuraciones":
        return <Config />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onSectionChange={setActiveSection} />
      <Box
        sx={{
          flexGrow: 1,
          padding: "16px", // Fondo del área principal
          minHeight: "100vh",
        }}
      >
        {renderSection()}
      </Box>
    </Box>
  );
};

export default AdminPage;
