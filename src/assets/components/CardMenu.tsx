import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
}

const CardMenu: React.FC<CardMenuProps> = ({ producto }) => {
  const { nombre, descripcion, precio, imagen, disponible } = producto;

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: "100%",
        backgroundColor: "rgba(15, 15, 20, 0.85)",
        color: "white",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)",
        borderRadius: "12px",
        overflow: "hidden",
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <CardMedia
        component="img"
        alt={nombre}
        height="180"
        image={imagen}
        sx={{
          objectFit: "cover",
          filter: "brightness(0.9)",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1.8rem",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
          }}
        >
          {nombre}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "'Poppins', sans-serif",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            mb: 2,
          }}
        >
          {descripcion}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            color: "#ff5722",
            fontSize: "1.2rem",
            minHeight: "1.5rem", // Asegura que haya espacio suficiente
          }}
        >
          ${precio.toLocaleString()} CLP
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
        }}
      >
        <Button
          size="medium"
          variant="contained"
          sx={{
            backgroundColor: disponible ? "#ff5722" : "grey",
            "&:hover": {
              backgroundColor: disponible ? "#e64a19" : "grey",
            },
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            color: "white",
            padding: "8px 20px",
            borderRadius: "8px",
          }}
        >
          {disponible ? "Ordenar" : "No disponible"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardMenu;
