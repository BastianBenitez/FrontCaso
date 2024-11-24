import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Button } from "@mui/material";
import PedidoDetallesModal from "./ShowDetails";

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

  // Redirección a la página principal
  const handleRedirect = () => {
    window.location.href = "http://localhost:5173"; // La URL a la que quieres redirigir
  };

  // Función para manejar la cancelación del pedido
  const handleCancel = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/pedido/cancel/${id}`
      );

      if (response.status === 200) {
        const updatedOrder = response.data;
        console.log("Pedido cancelado:", updatedOrder);
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === updatedOrder._id ? { ...row, estado: "cancelado" } : row
          )
        );
      } else {
        console.error("Error al cancelar el pedido:", response.data.message);
        alert(
          `Error: ${response.data.message || "No se pudo cancelar el pedido."}`
        );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud de cancelación.");
    }
  };

  const columns: GridColDef[] = [
    { field: "cliente", headerName: "Cliente", minWidth: 100 },
    { field: "estado", headerName: "Estado", minWidth: 100 },
    { field: "fecha", headerName: "Fecha", minWidth: 100 },
    { field: "total", headerName: "Total", minWidth: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      type: "actions",
      width: 200,
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
            justifyContent: "center", // Alinea el botón de forma correcta
          }}
        >
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
          sx={{ width: "85vw", maxWidth: "700px" }}
        />
      </Box>

      <PedidoDetallesModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        pedidoId={selectedPedido?.id} // Asegúrate de usar solo el ID
      />
    </>
  );
}
