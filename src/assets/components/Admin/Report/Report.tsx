import React, { useState, useEffect } from "react";
import axios from "axios";
import Bar from "./Bar";
import Pie from "./Pie";
import { Box, TextField, MenuItem, Button } from "@mui/material";

const Report = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [sushiData, setSushiData] = useState([]);
  const [loading, setLoading] = useState(false);

  const months = [
    { value: "", label: "Todos" },
    { value: "Enero", label: "Enero" },
    { value: "Febrero", label: "Febrero" },
    { value: "Marzo", label: "Marzo" },
    { value: "Abril", label: "Abril" },
    { value: "Mayo", label: "Mayo" },
    { value: "Junio", label: "Junio" },
    { value: "Julio", label: "Julio" },
    { value: "Agosto", label: "Agosto" },
    { value: "Septiembre", label: "Septiembre" },
    { value: "Octubre", label: "Octubre" },
    { value: "Noviembre", label: "Noviembre" },
    { value: "Diciembre", label: "Diciembre" },
  ];

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      // Consultar la API para el reporte de ventas mensuales
      const salesResponse = await axios.get(
        `http://localhost:3000/api/reporte-ventas?ano=${selectedYear}`
      );
      const formattedSalesData = salesResponse.data.meses.map((month: any) => ({
        month: month.mes,
        totalSales: month.totalVentas,
      }));

      // Consultar la API para la cantidad de ventas por sushi
      const sushiResponse = await axios.get(
        `http://localhost:3000/api/cantidad-ventas-por-sushi?ano=${selectedYear}`
      );
      const formattedSushiData = sushiResponse.data.map((sushi: any) => ({
        _id: sushi._id,
        tipoSushi: sushi.tipoSushi,
        cantidadVendida: sushi.cantidadVendida,
      }));

      // Filtrar ventas por mes si se seleccionó uno
      if (selectedMonth) {
        const monthIndex = months.findIndex((m) => m.label === selectedMonth);
        const filteredSales = formattedSalesData.filter(
          (data: { month: string }) => months[monthIndex].label === data.month
        );
        setSalesData(filteredSales);
      } else {
        setSalesData(formattedSalesData);
      }

      setSushiData(formattedSushiData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
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
            <MenuItem key={month.value} value={month.label}>
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
