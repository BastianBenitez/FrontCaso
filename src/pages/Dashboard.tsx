import * as React from "react";
import { Box, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Routes, Route } from "react-router-dom"; // Usamos Routes y Route para el enrutamiento interno
import DashMain from "../assets/components/SubPages/DashMain";
import DataGrids from "../assets/components/DataGrid/DataGrids";

// Tipos navegacion
type NavigationItem = {
  kind?: string;
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};

// Definición de la navegacion
const NAVIGATION: NavigationItem[] = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    kind: "header",
    title: "Management",
  },
  {
    segment: "dashboard/admin",
    title: "Administrar",
    icon: <DashboardIcon />,
    children: [
      {
        segment: "manageusers",
        title: "Administrar Usuario",
        icon: <DashboardIcon />,
      },
      {
        segment: "manageproducts",
        title: "Administrar Productos",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "dashboard/orders",
    title: "Gestión de Pedidos",
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: "generateorder",
        title: "Generar Pedido",
        icon: <ShoppingCartIcon />,
      },
      {
        segment: "cancelorder",
        title: "Anular Compra",
        icon: <DescriptionIcon />,
      },
      {
        segment: "getdispatchorder",
        title: "Obtener Orden Despacho",
        icon: <LayersIcon />,
      },
    ],
  },
];

// Crear el tema usando Material-UI
const demoTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// Componente Dashboard que maneja sus rutas internas
export default function Dashboard() {
  return (
    <AppProvider
      navigation={NAVIGATION as any}
      theme={demoTheme}
      branding={{
        title: "Fukusuke Sushi-Delivery",
      }}
    >
      <Box
        sx={{
          mt: "4rem", // Ajustamos el margen superior para compensar el NavBar
          flexGrow: 1, // Permite que el contenido crezca y ocupe todo el espacio disponible
          display: "flex", // Usamos flexbox para organizar el contenido
          flexDirection: "column", // Aseguramos que los elementos estén organizados en columnas
          minHeight: "100vh", // Ocupa al menos toda la pantalla
          padding: "1rem", // Espaciado interno
        }}
      >
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashMain />} />
            <Route path="/admin/manageusers" element={<DataGrids />} />
            <Route path="/admin/manageproducts" element={<DataGrids />} />
            <Route
              path="/orders/generateorder"
              element={<Typography variant="h4">Generar Pedido</Typography>}
            />
            <Route
              path="/orders/cancelorder"
              element={<Typography variant="h4">Anular Compra</Typography>}
            />
            <Route
              path="/orders/getdispatchorder"
              element={
                <Typography variant="h4">Obtener Orden Despacho</Typography>
              }
            />
            <Route
              path="*"
              element={<Typography variant="h4">404 Not Found</Typography>}
            />
          </Routes>
        </DashboardLayout>
      </Box>
    </AppProvider>
  );
}
