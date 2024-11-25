import React, { useState } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmContrasena, setConfirmContrasena] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      validateEmail(email) &&
      validatePassword(contrasena, confirmContrasena)
    ) {
      const newUser = {
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        contrasena,
        fechaRegistro: new Date(),
        isAdmin: false, // Por defecto, el nuevo usuario no es admin
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud de registro");
        }

        const result = await response.json();
        console.log("Usuario registrado:", result);
        // Aquí puedes redirigir al usuario a la página de inicio o login después de un registro exitoso
        navigate("/login"); // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (contrasena: string, confirmContrasena: string) => {
    if (contrasena.length < 6) {
      setContrasenaError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (contrasena !== confirmContrasena) {
      setContrasenaError("Las contraseñas no coinciden");
      return false;
    }
    setContrasenaError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Por favor, introduce un correo válido");
    } else {
      setEmailError("");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      bgcolor="#050607" // Fondo oscuro
      sx={{ marginTop: "3rem" }}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Registrarse
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
          label="Nombre"
          variant="outlined"
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Apellido"
          variant="outlined"
          margin="normal"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Teléfono"
          variant="outlined"
          margin="normal"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Dirección"
          variant="outlined"
          margin="normal"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          margin="normal"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          error={!!contrasenaError}
          helperText={contrasenaError}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          variant="outlined"
          type="password"
          margin="normal"
          value={confirmContrasena}
          onChange={(e) => setConfirmContrasena(e.target.value)}
          error={!!contrasenaError}
          helperText={contrasenaError}
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          InputProps={{
            style: { color: "white" },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2, bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}
        >
          Registrarse
        </Button>
        <Typography variant="body2" align="center" color="white" sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={handleLoginRedirect}
            sx={{ color: "#1976d2", textDecoration: "underline" }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
