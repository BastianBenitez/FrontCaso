import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Products() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [editProduct, setEditProduct] = React.useState<any | null>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleEditOpen = (row: any) => {
    setEditProduct({ ...row }); // Carga los datos del producto seleccionado
    setOpenEditModal(true); // Abre el modal
  };

  const handleEditClose = () => {
    setEditProduct(null); // Resetea el producto editado
    setOpenEditModal(false); // Cierra el modal
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editProduct) {
      setEditProduct({
        ...editProduct,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveEdit = () => {
    if (!editProduct || !editProduct.id) return; // Aseguramos que editProduct y editProduct.id existan

    const updatedProduct = {
      nombre: editProduct.nombre,
      descripcion: editProduct.descripcion,
      precio: Number(editProduct.precio), // Convertimos precio a número
      url: editProduct.url,
      disponible: editProduct.disponible, // Asegúrate de que este campo esté en el estado
    };

    axios
      .put(
        `http://localhost:3000/api/sushis/${editProduct.id}`,
        updatedProduct,
        {
          headers: {
            "Content-Type": "application/json", // Configuramos los headers para que sea JSON
          },
        }
      )
      .then(() => {
        // Actualizamos las filas en el estado
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === editProduct.id ? updatedProduct : row
          )
        );
        handleEditClose(); // Cerramos el modal
      })
      .catch((error) => {
        console.error("Error al actualizar el producto:", error);
      });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3000/api/sushis/${id}`)
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
    { field: "precio", headerName: "Precio", flex: 1 },
    { field: "url", headerName: "URL", flex: 1 }, // Muestra la URL si es necesario
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
            <Button variant="contained" color="primary" size="small">
              Editar
            </Button>
          }
          label="Editar"
          onClick={() => handleEditOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={
            <Button variant="contained" color="error" size="small">
              Eliminar
            </Button>
          }
          label="Eliminar"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/sushis")
      .then((response) => {
        const data = response.data.map((sushi: any) => ({
          id: sushi._id, // Asegúrate de que el backend devuelve _id
          nombre: sushi.nombre,
          descripcion: sushi.descripcion,
          precio: sushi.precio,
          url: sushi.url, // Incluye la URL en los datos
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
            maxWidth: 1000,
            bgcolor: "#1a1a1a",
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id || row.nombre}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
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
            }}
          />
        </Box>

        {/* Modal para editar */}
        {editProduct && (
          <Modal open={openEditModal} onClose={handleEditClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" mb={2}>
                Editar Producto
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre"
                    name="nombre"
                    value={editProduct.nombre || ""}
                    onChange={handleEditChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Descripción"
                    name="descripcion"
                    value={editProduct.descripcion || ""}
                    onChange={handleEditChange}
                    multiline
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="URL"
                    name="url"
                    value={editProduct.url || ""}
                    onChange={handleEditChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Precio"
                    name="precio"
                    value={editProduct.precio || ""}
                    onChange={handleEditChange}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editProduct.disponible || false} // Default to false if not set
                        onChange={(e) =>
                          setEditProduct({
                            ...editProduct,
                            disponible: e.target.checked,
                          })
                        }
                      />
                    }
                    label="¿Disponible?"
                  />
                </Grid>
              </Grid>
              <Box mt={3} textAlign="right">
                <Button
                  onClick={handleEditClose}
                  color="secondary"
                  sx={{ mr: 1 }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveEdit} // This function will now handle both 'isAdmin' and 'disponible'
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </ThemeProvider>
  );
}
