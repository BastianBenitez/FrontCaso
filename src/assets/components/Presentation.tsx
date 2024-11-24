// HeroSection.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Presentation = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  return (
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
        Disfruta de la mejor experiencia gastronómica desde la comodidad de tu
        hogar.
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/menu"); // Navegación al menú
        }}
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
        Ve nuestro Menu
      </Button>
    </Box>
  );
};

export default Presentation;
