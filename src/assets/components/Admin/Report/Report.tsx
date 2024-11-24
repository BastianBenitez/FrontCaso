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

  const handleFilter = () => {
    fetchSalesData();
    fetchSushiData();
  };

  useEffect(() => {
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
