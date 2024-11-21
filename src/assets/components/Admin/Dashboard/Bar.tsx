import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { legendClasses } from "@mui/x-charts/ChartsLegend";
import { Box, Typography } from "@mui/material";

const salesData = [
  { month: "January", totalSales: 150000 },
  { month: "February", totalSales: 200000 },
  { month: "March", totalSales: 250000 },
  { month: "April", totalSales: 300000 },
  { month: "May", totalSales: 400000 },
  { month: "June", totalSales: 350000 },
  { month: "July", totalSales: 500000 },
  { month: "August", totalSales: 450000 },
  { month: "September", totalSales: 400000 },
  { month: "October", totalSales: 300000 },
  { month: "November", totalSales: 350000 },
  { month: "December", totalSales: 500000 },
];

export default function SalesBarChart() {
  return (
    <Box
      sx={{
        width: "950px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "#212121",
        borderRadius: "8px",
        padding: "16px",
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "white",
          marginBottom: "16px",
        }}
      >
        Total de ventas
      </Typography>
      <BarChart
        sx={(theme) => ({
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: "white", // Líneas de los ejes en blanco
              strokeWidth: 2,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: "white", // Texto de los ejes en blanco
            },
          },
          [`.${legendClasses.root}`]: {
            color: "white", // Color de la leyenda
            [`.MuiTypography-root`]: {
              color: "white", // Asegura que el texto interno sea blanco
            },
          },
        })}
        xAxis={[
          { scaleType: "band", data: salesData.map((data) => data.month) },
        ]} // Meses en el eje X
        yAxis={[{ scaleType: "linear" }]} // Configuración del eje Y
        margin={{ left: 70 }} // Aumenta el margen izquierdo
        series={[
          {
            data: salesData.map((data) => data.totalSales),
          },
        ]}
        width={1000}
        height={400}
      />
    </Box>
  );
}
