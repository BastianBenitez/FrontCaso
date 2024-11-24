import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";

interface SushiData {
  _id: string;
  cantidadVendida: number;
  tipoSushi: string;
}

interface PieActiveArcProps {
  data: SushiData[]; // Un arreglo de objetos de tipo SushiData
}

const Pie: React.FC<PieActiveArcProps> = ({ data }) => {
  // Mapeamos los datos para ajustarlos al formato que espera PieChart
  const chartData = data.map((item) => ({
    id: item._id,
    label: item.tipoSushi,
    value: item.cantidadVendida,
  }));

  return (
    <Box sx={{ width: "500px", height: "200px" }}>
      <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </Box>
  );
};

export default Pie;
