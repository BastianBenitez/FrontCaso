import { Box, Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins"; // Importa la nueva fuente

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
        <video
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            overflow: "hidden", // Asegúrate de que el video no se desborde
          }}
          src="https://sushishop.com/wp-content/uploads/2024/10/SS24_HP.mp4"
          autoPlay
          muted
          loop
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
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            maxWidth: { xs: "80%", sm: "50%" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Fukusuke Sushi
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Disfruta de la mejor experiencia gastronómica desde la comodidad de
            tu hogar.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#ff5722",
              "&:hover": {
                backgroundColor: "#e64a19",
              },
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              padding: { xs: "10px 20px", sm: "12px 24px", md: "14px 28px" },
            }}
          >
            Ordenar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
