import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins"; // Importa la nueva fuente
import Presentation from "../assets/components/Presentation"; // Asegúrate de ajustar la ruta según tu estructura de carpetas
import BackGround from "../assets/components/BackGround";

const theme = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif", // Cambia la fuente a 'Poppins'
  },
});

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* Contenedor del video de fondo */}
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <BackGround
          opacity={0.65}
          src="https://sushishop.com/wp-content/uploads/2024/10/SS24_HP.mp4"
        />
      </Box>

      <Box
        sx={{
          overflowX: "hidden",
          height: "70vh",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Centra verticalmente el contenido
        }}
      >
        <Presentation />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
