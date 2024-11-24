import Bar from "./Bar";
import Pie from "./Pie";
import { Box } from "@mui/material";
const data = [
  { _id: "673fd377ca9c0b10f7f2e43c", cantidadVendida: 35, tipoSushi: "pan" },
  {
    _id: "673fd204ca9c0b10f7f2e42e",
    cantidadVendida: 43,
    tipoSushi: "Shushi",
  },
  {
    _id: "6742319c0a11c9d8864dc31b",
    cantidadVendida: 37,
    tipoSushi: "Sushi de Salmon",
  },
  {
    _id: "6742325b0a11c9d8864dc324",
    cantidadVendida: 12,
    tipoSushi: "Sushi vengano",
  },
];
const salesData = [
  { month: "Enero", totalSales: 0 },
  { month: "Febrero", totalSales: 0 },
  { month: "Marzo", totalSales: 0 },
  { month: "Abril", totalSales: 0 },
  { month: "Mayo", totalSales: 0 },
  { month: "Junio", totalSales: 0 },
  { month: "Julio", totalSales: 0 },
  { month: "Agosto", totalSales: 0 },
  { month: "Septiembre", totalSales: 0 },
  { month: "Octubre", totalSales: 0 },
  { month: "Noviembre", totalSales: 1160830 },
  { month: "Diciembre", totalSales: 0 },
];
const Report = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center", // Esto centra verticalmente los elementos
      }}
    >
      <Bar data={salesData}></Bar>
      <Pie data={data}></Pie>
    </Box>
  );
};

export default Report;
