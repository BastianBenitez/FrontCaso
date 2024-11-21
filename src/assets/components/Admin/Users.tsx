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

// Función vacía para manejar la eliminación (se desarrollará después)
const handleEdit = (row: any) => {
  console.log("Editar usuario:", row);
  // Lógica de edición por desarrollar
};

// Función vacía para manejar la eliminación (se desarrollará después)
const handleDelete = (id: string) => {
  console.log("Eliminar usuario con ID:", id);
  // Lógica de eliminación por desarrollar
};

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 }, // Usamos 'flex' para que ocupe solo el espacio necesario
  { field: "apellido", headerName: "Apellido", flex: 1 },
  { field: "email", headerName: "Correo Electrónico", flex: 1 },
  {
    field: "isAdmin",
    headerName: "Administrador",
    width: 150,
    type: "boolean",
  }, // 'width' mantiene un tamaño fijo
  {
    field: "actions",
    headerName: "Acciones",
    type: "actions",
    width: 250, // Ancho fijo para la columna de acciones
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

export default function DataGridDemo() {
  const [rows, setRows] = React.useState<any[]>([]);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        // Aquí convertimos la respuesta en el formato que espera el DataGrid
        const data = response.data.map((user: any, index: number) => ({
          id: user._id, // Usamos el _id como 'id' para el DataGrid
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          isAdmin: user.isAdmin,
        }));
        setRows(data); // Guardamos los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // Alineación más hacia arriba
        height="100vh"
        bgcolor="#050607"
        p={2}
      >
        <Box
          sx={{
            height: 400,
            width: "100%",
            maxWidth: "1000px", // Ajusta el ancho de la tabla
            bgcolor: "#1a1a1a", // Fondo oscuro
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
            marginTop: 0, // Elimina cualquier margen superior adicional
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
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            rowHeight={60} // Aumentamos la altura de las filas
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333", // Fondo oscuro para encabezados
                color: "#b0b0b0", // Color de texto para los encabezados
              },
              "& .MuiDataGrid-cell": {
                color: "white", // Color del texto de las celdas
              },
              "& .MuiCheckbox-root": {
                color: "white", // Color del checkbox
              },
              "& .MuiPaginationItem-root": {
                color: "white", // Color de la paginación
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#333", // Fondo oscuro para el pie de página
              },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
