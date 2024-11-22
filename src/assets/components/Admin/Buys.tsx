import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button, Modal, Typography } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

// Componente para mostrar los detalles del pedido en un modal
const PedidoDetallesModal = ({ open, onClose, pedido }: any) => {
  if (!pedido) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          boxShadow: 24,
          borderRadius: 2,
          width: "90%",
          maxWidth: 600,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Detalles del Pedido
        </Typography>
        <Typography variant="body1">
          <strong>Cliente:</strong> {pedido.cliente}
        </Typography>
        <Typography variant="body1">
          <strong>Estado:</strong> {pedido.estado}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha:</strong> {pedido.fecha}
        </Typography>
        <Typography variant="body1">
          <strong>Total:</strong> ${pedido.total}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Sushis:</strong>
        </Typography>
        <Box
          component="ul"
          sx={{ pl: 4, listStyle: "disc", color: "text.primary" }}
        >
          {pedido.sushis.map((item: any, index: number) => (
            <li key={index}>
              <Typography variant="body2">
                Sushi ID: {item.sushi}, Cantidad: {item.cantidad}
              </Typography>
            </li>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default function Buys() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedPedido, setSelectedPedido] = React.useState<any>(null);
  const [openModal, setOpenModal] = React.useState(false);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/pedido")
      .then((response) => {
        const data = response.data.map((pedido: any) => ({
          id: pedido._id,
          cliente: pedido.cliente,
          estado: pedido.estado,
          fecha: new Date(pedido.fecha).toLocaleString(), // Formateamos la fecha
          total: pedido.total,
          sushis: pedido.sushis,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error("Error al obtener los pedidos:", error);
      });
  }, []);

  // Función para abrir el modal con los detalles del pedido
  const handleShowDetails = (pedido: any) => {
    setSelectedPedido(pedido);
    setOpenModal(true);
  };

  // Función para manejar la cancelación del pedido
  const handleCancel = (id: string) => {
    console.log("Cancelar pedido con ID:", id);
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
      width: 350,
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
              Detalles
            </Button>
          }
          label="Mostrar más detalles"
          onClick={() => handleShowDetails(params.row)}
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
        <PedidoDetallesModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          pedido={selectedPedido}
        />
      </Box>
    </ThemeProvider>
  );
}
