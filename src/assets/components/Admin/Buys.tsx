import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button } from "@mui/material";
import PedidoDetallesModal from "./ShowDetails";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

// Componente para mostrar los detalles del pedido en un modal

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
    setSelectedPedido(pedido); // Guarda el objeto completo para otros usos si lo necesitas
    setOpenModal(true);
  };

  // Función para manejar la cancelación del pedido
  const handleCancel = async (id: string) => {
    try {
      // Realiza la solicitud PUT utilizando axios
      const response = await axios.put(
        `http://localhost:3000/api/pedido/cancel/${id}`
      );

      // Verifica si la respuesta fue exitosa
      if (response.status === 200) {
        const updatedOrder = response.data;
        console.log("Pedido cancelado:", updatedOrder);

        // Actualiza el estado de las filas en el DataGrid
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === updatedOrder._id
              ? { ...row, estado: "cancelado" } // Cambia el estado a 'cancelado'
              : row
          )
        );
      } else {
        // Si no fue un éxito, muestra un mensaje de error
        console.error("Error al cancelar el pedido:", response.data.message);
        alert(
          `Error: ${response.data.message || "No se pudo cancelar el pedido."}`
        );
      }
    } catch (error) {
      // Manejo de errores si la solicitud falla
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud de cancelación.");
    }
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
          pedidoId={selectedPedido?.id} // Asegúrate de usar solo el ID
        />
      </Box>
    </ThemeProvider>
  );
}
