import * as React from "react";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import {
  AppProvider,
  type Router,
  type Navigation,
} from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Users from "../assets/components/Admin/Users";
import Products from "../assets/components/Admin/Products";
import Buys from "../assets/components/Admin/Buys";

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
];

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

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Determine which component to render based on the current pathname
  const renderContent = () => {
    switch (pathname) {
      case "/users":
        return <Users />;
      case "/products":
        return <Products />;
      case "/buys":
        return <Buys />;
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
