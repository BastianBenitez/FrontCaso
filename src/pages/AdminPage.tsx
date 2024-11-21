import { useState } from "react";
import Sidebar from "../assets/components/Admin/Sidebar";
import { Box } from "@mui/material";
import Users from "../assets/components/Admin/Users";
import Dashboard from "../assets/components/Admin/Dashboard/Dashboard";

// Componentes para las diferentes secciones

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
          padding: "0px 16px 16px 16px",
          minHeight: "100vh",
        }}
      >
        {renderSection()}
      </Box>
    </Box>
  );
};

export default AdminPage;
