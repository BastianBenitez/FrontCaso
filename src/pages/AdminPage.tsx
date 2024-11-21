import Sidebar from "../assets/components/Admin/Sidebar";
import { Box } from "@mui/material";

const AdminPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}></Box>
    </Box>
  );
};

export default AdminPage;
