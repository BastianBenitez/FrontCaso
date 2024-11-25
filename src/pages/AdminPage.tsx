import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ReportIcon from "@mui/icons-material/Report"; // Icono para el reporte
import {
  AppProvider,
  type Router,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Users from "../assets/components/Admin/PovAdmin/Users";
import Products from "../assets/components/Admin/PovAdmin/Products";
import Buys from "../assets/components/Admin/PovAdmin/Buys";
import Report from "../assets/components/Admin/Report/Report"; // Componente de Reporte
import { useAuth } from "../AuthContext";
import { Typography } from "@mui/material";

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
    if (item.segment === "report") {
      // Solo mostrar "report" si el usuario es el dueño
      return user?.isOwner;
    }

    if (user?.isAdmin) {
      // Si es admin, mostrar todas las opciones
      return true;
    }

    // Para usuarios no administradores, solo mostrar opciones no relacionadas con "users", "products" o "buys"
    return (
      item.segment !== "users" &&
      item.segment !== "products" &&
      item.segment !== "buys"
    );
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
        if (user?.isAdmin) {
          // Si es admin, mostrar todas las opciones
          return <Users />;
        }
        if (!user?.isAdmin && user?.isOwner) {
          return <Report />;
        }
        return <Typography>Sin acceso</Typography>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Administración",
      }}
    >
      <DashboardLayout defaultSidebarCollapsed>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}
