import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { legendClasses } from "@mui/x-charts/ChartsLegend";

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

export default function SalesBarChart() {
  return (
    <BarChart
      sx={() => ({
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
      xAxis={[{ scaleType: "band", data: salesData.map((data) => data.month) }]} // Meses en el eje X
      yAxis={[{ scaleType: "linear" }]} // Configuración del eje Y
      margin={{ left: 70 }} // Aumenta el margen izquierdo
      series={[
        {
          data: salesData.map((data) => data.totalSales),
          label: "Ventas Totales", // Agregar la etiqueta para la serie
        },
      ]}
      width={1000}
      height={400}
      legend={{}}
    />
  );
}
