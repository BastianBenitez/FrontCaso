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
import axios from "axios";
import { useAuth } from "../AuthContext"; // Ajusta la ruta al archivo de AuthContext

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa el contexto de autenticación

  const handleLogin = async () => {
    if (validateEmail(email)) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          { email, contrasena: password },
          { withCredentials: true }
        );
        // Pasar el token y los datos de usuario al AuthContext
        if (response.data.token) {
          // Guardar el token en una cookie

          login({ token: response.data.token, user: response.data.user });
          navigate("/");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setSnackbarMessage("Credenciales inválidas");
        } else {
          setSnackbarMessage("Error al iniciar sesión. Inténtalo de nuevo.");
        }
        setSnackbarOpen(true);
      }
    } else {
      console.log("Formato de correo inválido");
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
      height="80vh"
      bgcolor="#050607" // Fondo oscuro
      p={2}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Iniciar Sesión
      </Typography>
      <Box
        component="form"
        width="85%"
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
