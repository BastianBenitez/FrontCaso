import { Box, Typography } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

type NavigationItem = {
  kind?: string;
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
};

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

// Crear el tema usando los tipos de Material-UI
const demoTheme: Theme = createTheme({
  palette: {
    mode: "light", // Cambiar a "dark" para un tema oscuro
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
});

// Componente Dashboard
export default function Dashboard() {
  return (
    <AppProvider navigation={NAVIGATION as any} theme={demoTheme}>
      <DashboardLayout>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Welcome to the Dashboard</Typography>
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}
