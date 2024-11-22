import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button, Modal, TextField, Typography, Grid } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

export default function Products() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    url: "",
    disponible: true,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    // Aseguramos el formato correcto del objeto a enviar
    const productToSend = {
      ...newProduct,
      precio: Number(newProduct.precio), // Convertimos precio a número
    };

    axios
      .post("http://localhost:3000/api/sushis", JSON.stringify(productToSend), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRows((prevRows) => [
          ...prevRows,
          {
            id: response.data._id,
            ...productToSend,
          },
        ]);
        setNewProduct({
          nombre: "",
          descripcion: "",
          precio: 0,
          url: "",
          disponible: true,
        });
        handleClose();
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
      });
  };

  const handleEdit = (row: any) => {
    console.log("Editar sushi:", row);
    // Lógica de edición por desarrollar
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
          onClick={() => handleEdit(params.row)}
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
            width: "100%",
            maxWidth: 1000,
            mb: 2,
            textAlign: "right",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Agregar Producto
          </Button>
        </Box>
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

        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
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
              Agregar Nuevo Producto
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Descripción"
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleChange}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="URL"
                  name="url"
                  value={newProduct.url}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Precio"
                  name="precio"
                  value={newProduct.precio}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="right">
              <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
              >
                Guardar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
