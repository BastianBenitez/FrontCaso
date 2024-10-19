import NavBar from "../assets/components/NavBar";
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
      <Box sx={{ flexGrow: 1 }}>
        {" "}
        {/* Aseguramos que haya suficiente espacio para el NavBar */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
