import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { legendClasses } from "@mui/x-charts/ChartsLegend";

// Definir la interfaz para los datos
interface SalesData {
  month: string;
  totalSales: number;
}

interface SalesBarChartProps {
  data: SalesData[]; // La propiedad 'data' que será un arreglo de SalesData
}

const Bar: React.FC<SalesBarChartProps> = ({ data }) => {
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
      xAxis={[
        { scaleType: "band", data: data.map((dataItem) => dataItem.month) },
      ]} // Meses en el eje X
      yAxis={[{ scaleType: "linear" }]} // Configuración del eje Y
      margin={{ left: 70 }} // Aumenta el margen izquierdo
      series={[
        {
          data: data.map((dataItem) => dataItem.totalSales), // Datos de ventas
          label: "Ventas Totales", // Agregar la etiqueta para la serie
        },
      ]}
      width={1000}
      height={400}
      legend={{}}
    />
  );
};

export default Bar;
