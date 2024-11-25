import React from "react";
import axios from "axios";
import Bar from "./Bar";
import Pie from "./Pie";
import { Box, TextField, MenuItem, Button } from "@mui/material";

const Report = () => {
  const [selectedYear, setSelectedYear] = React.useState(2024);
  const [selectedMonth, setSelectedMonth] = React.useState("");
  const [salesData, setSalesData] = React.useState<SalesData[]>([]);
  const [sushiData, setSushiData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  interface SalesData {
    month: string; // El tipo de sushi
    totalSales: number; // Las ventas totales
  }

  const months = [
    { value: "", label: "Todos" },
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleRedirect = () => {
    window.location.href = "http://localhost:5173"; // La URL a la que quieres redirigir
  };

  // Función para obtener los datos de ventas (solo año)
  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const salesResponse = await axios.get(
        `http://localhost:3000/api/reporte-ventas?ano=${selectedYear}`
      );

      const formattedSalesData = salesResponse.data.meses.map((month: any) => ({
        month: month.mes,
        totalSales: month.totalVentas,
      }));

      setSalesData(formattedSalesData);
    } catch (error) {
      console.error("Error al obtener los datos de ventas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener los datos de ventas por sushi (mes y año)
  const fetchSushiData = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3000/api/cantidad-ventas-por-sushi?ano=${selectedYear}`;
      if (selectedMonth) {
        const monthIndex = months.findIndex((m) => m.label === selectedMonth);
        url += `&mes=${monthIndex + 1}`; // Usamos el índice del mes para la consulta
      }

      const sushiResponse = await axios.get(url);

      const formattedSushiData = sushiResponse.data.map((sushi: any) => ({
        _id: sushi._id,
        tipoSushi: sushi.tipoSushi,
        cantidadVendida: sushi.cantidadVendida,
      }));

      setSushiData(formattedSushiData);
    } catch (error) {
      console.error("Error al obtener los datos de sushi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSushiDataPerMonth = async () => {
    setLoading(true);
    if (selectedMonth === "" || selectedMonth === null) {
      await fetchSushiData();
    } else {
      try {
        const url = `http://localhost:3000/api/pedidos-sushi-per-month?mes=${selectedMonth}&ano=${selectedYear}`;

        const sushiResponse = await axios.get(url);

        const groupedData = sushiResponse.data.reduce(
          (acc: any, sushi: any) => {
            const { tipoSushi, totalVentas } = sushi;

            if (acc[tipoSushi]) {
              acc[tipoSushi] += totalVentas;
            } else {
              acc[tipoSushi] = totalVentas;
            }

            return acc;
          },
          {}
        );

        const formattedSalesData: SalesData[] = Object.keys(groupedData).map(
          (key) => ({
            month: key,
            totalSales: groupedData[key],
          })
        );

        setSalesData(formattedSalesData);
        setSushiData(sushiResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos de sushi:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilter = async () => {
    setLoading(true);
    try {
      await fetchSushiDataPerMonth();
      console.log(sushiData);
      console.log(selectedMonth);
      console.log(selectedYear);
    } catch (error) {
      console.error("Error al aplicar filtro:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSalesData();
    fetchSushiData();
  }, [selectedYear]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Controles para filtros */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <TextField
          label="Año"
          type="number"
          value={selectedYear}
          onChange={handleYearChange}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 120 }}
        />
        <TextField
          label="Mes"
          select
          value={selectedMonth}
          onChange={handleMonthChange}
          sx={{ width: 150 }}
        >
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Aplicar filtro"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
          sx={{
            marginRight: "1rem",
            marginBottom: "1rem",
            marginTop: "1rem",
          }}
        >
          Volver
        </Button>
      </Box>

      {/* Visualización de datos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Bar data={salesData} />
        <Pie data={sushiData} />
      </Box>
    </Box>
  );
};

export default Report;
