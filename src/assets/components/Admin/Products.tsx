import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

// Función vacía para manejar la eliminación (se desarrollará después)
const handleEdit = (row: any) => {
  console.log("Editar sushi:", row);
  // Lógica de edición por desarrollar
};

// Función vacía para manejar la eliminación (se desarrollará después)
const handleDelete = (id: string) => {
  console.log("Eliminar sushi con ID:", id);
  // Lógica de eliminación por desarrollar
};

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "descripcion", headerName: "Descripción", flex: 2 },
  { field: "precio", headerName: "Precio", flex: 1 },
  {
    field: "disponible",
    headerName: "Disponible",
    width: 150,
    type: "boolean",
  },
  {
    field: "actions",
    headerName: "Acciones",
    type: "actions",
    width: 250,
    getActions: (params) => [
      <GridActionsCellItem
        icon={
          <Button variant="contained" color="primary">
            Editar
          </Button>
        }
        label="Editar"
        onClick={() => handleEdit(params.row)}
      />,
      <GridActionsCellItem
        icon={
          <Button variant="contained" color="error">
            Eliminar
          </Button>
        }
        label="Eliminar"
        onClick={() => handleDelete(params.row.id)}
      />,
    ],
  },
];

export default function Products() {
  const [rows, setRows] = React.useState<any[]>([]);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/sushis")
      .then((response) => {
        const data = response.data.map((sushi: any, index: number) => ({
          id: sushi._id,
          nombre: sushi.nombre,
          descripcion: sushi.descripcion,
          precio: sushi.precio,
          disponible: sushi.disponible,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error al obtener los sushis:", error);
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
