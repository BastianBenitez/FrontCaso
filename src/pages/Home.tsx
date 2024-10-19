import ProductCard from "../assets/components/ProductCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          height: "100vh", // Usa el 100% de la altura de la ventana
          width: "100vw", // Usa el 100% del ancho de la ventana
          overflow: "hidden", // Evita que se muestren barras de desplazamiento
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <video
          style={{
            position: "absolute", // Posiciona el video dentro del contenedor
            top: 0,
            left: 0,
            width: "100%", // Asegura que el video cubra todo el ancho
            height: "100%", // Asegura que el video cubra toda la altura
            objectFit: "cover", // Mantiene la relación de aspecto del video
          }}
          src="https://sushishop.com/wp-content/uploads/2024/10/SS24_HP.mp4"
          autoPlay
          muted
          loop
        />
      </Box>
    </>
  );
};

export default Home;
