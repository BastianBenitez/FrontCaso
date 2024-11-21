import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@mui/material";

const pieChartData = [
  { value: 30, label: "Product A" },
  { value: 50, label: "Product B" },
  { value: 20, label: "Product C" },
];

export default function Pie() {
  return (
    <Box
      sx={{
        width: "450px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "#212121",
        borderRadius: "8px",
        padding: "16px",
        color: "white",
        marginTop: "16px",
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
        Distribución de Ventas
      </Typography>
      <PieChart
        sx={{
          color: "white",
          [".MuiChartsLegend-label"]: {
            color: "white", // Asegura que las etiquetas de la leyenda sean blancas
          },
        }}
        series={[
          {
            data: pieChartData.map((item) => ({
              value: item.value,
              label: item.label,
            })),
            innerRadius: 50,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 150,
            cy: 150,
          },
        ]}
        width={300}
        height={300}
      />
    </Box>
  );
}
