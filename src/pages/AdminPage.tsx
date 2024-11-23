import * as React from "react";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReportIcon from "@mui/icons-material/Report"; // Icono para el reporte
import {
  AppProvider,
  type Router,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Users from "../assets/components/Admin/Users";
import Products from "../assets/components/Admin/Products";
import Buys from "../assets/components/Admin/Buys";
import Report from "../assets/components/Admin/Report"; // Componente de Reporte
import { useAuth } from "../AuthContext";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function AdminPage() {
  const [pathname, setPathname] = React.useState("/dashboard");
  const { user } = useAuth(); // Accedemos al contexto para obtener la información del usuario

  // Filtrar las opciones de navegación para que solo los administradores y el dueño puedan verlas
  const NAVIGATION: Navigation = [
    {
      segment: "users",
      title: "Usuarios",
      icon: <ShoppingCartIcon />,
    },
    {
      segment: "products",
      title: "Productos",
      icon: <BarChartIcon />,
    },
    {
      segment: "buys",
      title: "Compras",
      icon: <BarChartIcon />,
    },
    {
      segment: "report",
      title: "Reporte",
      icon: <ReportIcon />, // Icono para la sección de reporte
    },
  ].filter((item) => {
    // Mostrar solo las opciones que corresponden según el tipo de usuario
    if (item.segment === "report") {
      return user?.isOwner; // Solo mostrar el reporte si el usuario es el dueño
    }
    return user?.isAdmin || item.segment !== "users"; // Mostrar opciones para administradores
  });

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Determinar qué componente mostrar según la ruta actual
  const renderContent = () => {
    switch (pathname) {
      case "/users":
        return <Users />;
      case "/products":
        return <Products />;
      case "/buys":
        return <Buys />;
      case "/report":
        return <Report />; // Componente de Reporte
      default:
        return <Users />;
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
      <DashboardLayout defaultSidebarCollapsed>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}
