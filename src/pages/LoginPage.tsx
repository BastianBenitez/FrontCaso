import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { loginUser } from "../services/authService";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa el contexto de autenticación

  const handleLogin = async () => {
    try {
      // Declara el tipo de `data` directamente
      const data: { token: string; user: { id: string; email: string } } =
        await loginUser(email, password);
      if (data.token) {
        login(email, password); // Utiliza login del contexto
      }
    } catch {
      setSnackbarMessage("Error al iniciar sesión. Inténtalo de nuevo.");
      setSnackbarOpen(true);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Por favor, introduce un correo válido");
    } else {
      setEmailError("");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Ruta a la página de registro
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#050607" // Fondo oscuro
      p={2}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box
        component="form"
        width="100%"
        maxWidth="400px"
        p={3}
        boxShadow={3}
        borderRadius={2}
        sx={{
          bgcolor: "#1a1a1a", // Fondo del formulario oscuro
          color: "white",
        }}
      >
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError} // Muestra el error si existe
          helperText={emailError} // Texto de ayuda para el error
          InputLabelProps={{ style: { color: "#b0b0b0" } }} // Color del label
          InputProps={{
            style: { color: "white" }, // Color del texto
          }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#b0b0b0" } }} // Color del label
          InputProps={{
            style: { color: "white" }, // Color del texto
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ mt: 2, bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}
        >
          Iniciar Sesión
        </Button>
        <Typography variant="body2" align="center" color="white" sx={{ mt: 2 }}>
          ¿Olvidaste tu contraseña?
        </Typography>
        <Typography variant="body2" align="center" color="white" sx={{ mt: 2 }}>
          ¿No tienes una cuenta?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={handleRegisterRedirect}
            sx={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Regístrate
          </Link>
        </Typography>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default LoginPage;
