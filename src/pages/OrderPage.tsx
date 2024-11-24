import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button } from "@mui/material";
import PedidoDetallesModal from "../assets/components/Admin/PovAdmin/ShowDetails";
import { useAuth } from "../AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Modo oscuro
  },
});

// Componente para mostrar los detalles del pedido en un modal

export default function OrderPage() {
  const { user } = useAuth();
  const [rows, setRows] = React.useState<any[]>([]);
  const [selectedPedido, setSelectedPedido] = React.useState<any>(null);
  const [openModal, setOpenModal] = React.useState(false);

  // Llamada a la API para obtener los datos
  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/api/pedido/historial-pedidos/${user?.id}`)
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
    { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
    { field: "total", headerName: "Total", flex: 1, minWidth: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      minWidth: 200,
      flex: 1,
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
        height="80vh"
      >
        <Box
          sx={{
            mb: 2,
            textAlign: "ccenter",
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
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
          sx={{ width: "85vw", maxWidth: "1000px" }}
        />
      </Box>
      <PedidoDetallesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pedidoId={selectedPedido?.id} // Asegúrate de usar solo el ID
      />
    </ThemeProvider>
  );
}
