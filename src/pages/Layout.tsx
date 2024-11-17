// Layout.tsx
import NavBar from "../assets/components/Nav/NavBar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
