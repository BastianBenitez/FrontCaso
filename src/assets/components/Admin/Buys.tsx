import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

// Función vacía para manejar la cancelación del pedido
const handleCancel = (id: string) => {
  console.log("Cancelar pedido con ID:", id);
  // Lógica de cancelación por desarrollar
};

// Función vacía para manejar el mostrar más detalles
const handleShowDetails = (row: any) => {
  console.log("Mostrar más detalles del pedido:", row);
  // Lógica para mostrar más detalles por desarrollar
};

const columns: GridColDef[] = [
  { field: "cliente", headerName: "Cliente", flex: 1 },
  { field: "estado", headerName: "Estado", flex: 1 },
  { field: "fecha", headerName: "Fecha", flex: 2 },
  { field: "total", headerName: "Total", flex: 1 },
  {
    field: "actions",
    headerName: "Acciones",
    type: "actions",
    width: 250,
    getActions: (params) => [
      <GridActionsCellItem
        icon={
          <Button variant="contained" color="error" size="small">
            Cancelar
          </Button>
        }
        label="Cancelar"
        onClick={() => handleCancel(params.row.id)}
      />,
      <GridActionsCellItem
        icon={
          <Button variant="contained" color="primary" size="small">
            detalles
          </Button>
        }
        label="Mostrar más detalles"
        onClick={() => handleShowDetails(params.row)}
      />,
    ],
  },
];

export default function Buys() {
  const [rows, setRows] = React.useState<any[]>([]);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/pedido")
      .then((response) => {
        const data = response.data.map((pedido: any, index: number) => ({
          id: pedido._id,
          cliente: pedido.cliente,
          estado: pedido.estado,
          fecha: new Date(pedido.fecha).toLocaleString(), // Formateamos la fecha
          total: pedido.total,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error al obtener los pedidos:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
        p={2}
      >
        <Box
          sx={{
            height: "80vh",
            width: "100%",
            maxWidth: 1000, // Ancho máximo en pantallas grandes
            bgcolor: "#1a1a1a",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            marginTop: 0,
            "@media (max-width: 600px)": {
              // En pantallas pequeñas, ajustamos el tamaño de la tabla
              height: 300, // Reducimos la altura
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]} // Opciones de tamaño de página
            checkboxSelection
            disableRowSelectionOnClick
            rowHeight={60}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333",
                color: "#b0b0b0",
              },
              "& .MuiDataGrid-cell": {
                color: "white",
              },
              "& .MuiCheckbox-root": {
                color: "white",
              },
              "& .MuiPaginationItem-root": {
                color: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#333",
              },
              "@media (max-width: 600px)": {
                // Ajustamos la paginación para pantallas pequeñas
                "& .MuiPaginationItem-root": {
                  fontSize: "0.8rem", // Reducimos el tamaño de la paginación
                },
              },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
