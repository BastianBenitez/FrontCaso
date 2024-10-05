import * as React from "react";
import { Box, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router } from "@toolpad/core";

// Tipo de ítem de navegación
type NavigationItem = {
  kind?: string;
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};

// Definición de la navegación
const NAVIGATION: NavigationItem[] = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "integrations",
    title: "Integrations",
    icon: <LayersIcon />,
  },
];

// Crear el tema usando Material-UI
const demoTheme = createTheme({
  palette: {
    mode: "dark", // o 'dark' para cambiar el modo globalmente
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  // Puedes usar el `components` para aplicar cambios de estilo global
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Puedes agregar variables CSS aquí si necesitas usar `data-toolpad-color-scheme`
          '[data-toolpad-color-scheme="light"]': {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
          '[data-toolpad-color-scheme="dark"]': {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
        },
      },
    },
  },
});

// Componente que renderiza el contenido dinámico según la ruta
function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Dashboard content for {pathname}</Typography>
    </Box>
  );
}

// Componente Dashboard mejorado
export default function Dashboard() {
  const [pathname, setPathname] = React.useState("/dashboard");

  // Definir el router para manejar la navegación
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <AppProvider
      navigation={NAVIGATION as any}
      theme={demoTheme}
      router={router}
      branding={{
        //logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Fukusuke Sushi-Delivery",
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
