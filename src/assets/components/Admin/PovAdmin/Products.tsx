import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
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

export default function Products() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [editProduct, setEditProduct] = React.useState<any | null>(null);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const handleEditOpen = (row?: any) => {
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

  const handleSave = () => {
    const updatedProduct = {
      nombre: editProduct.nombre,
      descripcion: editProduct.descripcion,
      precio: Number(editProduct.precio), // Convertimos precio a número
      url: editProduct.url,
      disponible: editProduct.disponible, // Asegúrate de que este campo esté en el estado
    };

    // Si no existe un id, significa que estamos creando un nuevo producto
    if (!editProduct.id) {
      axios
        .post(`http://localhost:3000/api/sushis`, updatedProduct, {
          headers: {
            "Content-Type": "application/json", // Configuramos los headers para que sea JSON
          },
        })
        .then((response) => {
          // Suponiendo que el servidor devuelve el producto recién creado con su id
          const newProduct = response.data;
          // Añadimos el nuevo producto al estado
          setRows((prevRows) => [...prevRows, newProduct]);
          handleEditClose(); // Cerramos el modal
        })
        .catch((error) => {
          console.error("Error al crear el producto:", error);
        });
    } else {
      // Si existe un id, actualizamos el producto
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
    }
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

  const handleRedirect = () => {
    window.location.href = "http://localhost:5173"; // La URL a la que quieres redirigir
  };

  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "descripcion", headerName: "Descripción", flex: 1, minWidth: 100 },
    { field: "precio", headerName: "Precio", flex: 1, minWidth: 100 },
    { field: "url", headerName: "URL", flex: 1, minWidth: 100 }, // Muestra la URL si es necesario
    {
      field: "disponible",
      headerName: "Disponible",
      width: 100,
      type: "boolean",
    },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
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
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="80vh"
      >
        <Box
          sx={{
            mb: 2,
            textAlign: "ccenter",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditOpen}
            sx={{
              marginRight: "1rem",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            Agregar Producto
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
          sx={{ width: "85vw", maxWidth: "1000px" }}
        />

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
                  onClick={handleSave} // This function will now handle both 'isAdmin' and 'disponible'
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
}
