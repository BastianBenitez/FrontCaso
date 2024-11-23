import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const PedidoDetallesModal = ({
  open,
  onClose,
  pedidoId,
}: {
  open: boolean;
  onClose: () => void;
  pedidoId: string | null; // Acepta null por seguridad
}) => {
  const [pedido, setPedido] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (open && pedidoId) {
      setLoading(true);
      setError(null);
      axios
        .get(`http://localhost:3000/api/pedido/datails/${pedidoId}`)
        .then((response) => {
          setPedido(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener los detalles del pedido:", err);
          setError("No se pudieron cargar los detalles del pedido.");
          setLoading(false);
        });
    }
  }, [open, pedidoId]);

  if (!open) return null;

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
        {loading ? (
          <Typography variant="body1">Cargando...</Typography>
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : pedido ? (
          <>
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
                    Sushi: {item.nombre}, Cantidad: {item.cantidad}
                  </Typography>
                </li>
              ))}
            </Box>
          </>
        ) : null}
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

export default PedidoDetallesModal;
