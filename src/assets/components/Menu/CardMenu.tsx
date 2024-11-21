import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

interface Producto {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

interface CardMenuProps {
  producto: Producto;
  onAddToCart: (producto: Producto) => void; // Agrega esta definición
}

const CardMenu: React.FC<CardMenuProps> = ({ producto, onAddToCart }) => {
  const { nombre, descripcion, precio, imagen, disponible } = producto;

  const cardStyles = {
    maxWidth: 345,
    width: "100%",
    backgroundColor: "rgba(15, 15, 20, 0.85)",
    color: "white",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
    borderRadius: "12px",
    overflow: "hidden",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const imageStyles = {
    objectFit: "cover",
    filter: "brightness(0.9)",
  };

  const contentStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
  };

  const textStyles = {
    fontFamily: "'Poppins', sans-serif",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
  };

  const priceStyles = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "bold",
    color: "#ff5722",
    fontSize: "1.2rem",
    minHeight: "1.5rem", // Asegura que haya espacio suficiente
  };

  const buttonStyles = {
    backgroundColor: disponible ? "#ff5722" : "grey",
    "&:hover": {
      backgroundColor: disponible ? "#e64a19" : "grey",
    },
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1rem",
    color: "white",
    padding: "8px 20px",
    borderRadius: "8px",
  };

  return (
    <Card sx={cardStyles}>
      <CardMedia
        component="img"
        alt={nombre}
        height="180"
        image={imagen}
        sx={imageStyles}
      />
      <CardContent sx={contentStyles}>
        <Typography gutterBottom variant="h5" component="div" sx={textStyles}>
          {nombre}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...textStyles,
            color: "rgba(255, 255, 255, 0.8)",
            mb: 2,
          }}
        >
          {descripcion}
        </Typography>
        <Typography variant="body1" sx={priceStyles}>
          ${precio.toLocaleString()} CLP
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="medium"
          variant="contained"
          sx={buttonStyles}
          onClick={() => {
            if (disponible) {
              onAddToCart(producto);
            }
          }}
          disabled={!disponible}
        >
          {disponible ? "Agregar al carrito" : "No disponible"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardMenu;
