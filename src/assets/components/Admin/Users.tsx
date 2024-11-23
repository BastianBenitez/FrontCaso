import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button, FormControlLabel, Switch, Typography } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function Users() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any>(null);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        const data = response.data.map((user: any) => ({
          id: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          isAdmin: user.isAdmin,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
      });
  }, []);

  const handleRedirect = () => {
    window.location.href = "http://localhost:5173"; // La URL a la que quieres redirigir
  };
  const handleEdit = (row: any) => {
    setSelectedUser(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };
  const handleSwitchRole = (id: string, isAdmin: boolean) => {
    axios
      .put(`http://localhost:3000/api/users/switch-role-admin/${id}`, {
        isAdmin,
      })
      .then(() => {
        // Actualizar la lista de usuarios después de la actualización
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? { ...row, isAdmin } : row))
        );
        handleClose(); // Cerrar el modal después de actualizar el rol
      })
      .catch((error) => {
        console.error("Error al cambiar el rol del usuario:", error);
      });
  };

  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    { field: "email", headerName: "Correo Electrónico", flex: 1 },
    {
      field: "isAdmin",
      headerName: "Administrador",
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleRedirect}
            sx={{ marginRight: "1rem" }}
          >
            Volver
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
            marginTop: 0,
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
              "& .MuiCheckbox-root": {
                color: "white",
              },
              "& .MuiPaginationItem-root": {
                color: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#333",
              },
            }}
          />
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}>
              Editar Usuario
            </Typography>
            {selectedUser && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedUser.isAdmin}
                      onChange={(e) => {
                        // Actualizamos el estado del usuario con el nuevo valor de isAdmin
                        const updatedUser = {
                          ...selectedUser,
                          isAdmin: e.target.checked,
                        };
                        setSelectedUser(updatedUser);
                      }}
                    />
                  }
                  label="¿Es administrador?"
                />
              </>
            )}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleSwitchRole(selectedUser.id, selectedUser.isAdmin)
                }
              >
                Guardar
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClose}
                sx={{ ml: 2 }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
