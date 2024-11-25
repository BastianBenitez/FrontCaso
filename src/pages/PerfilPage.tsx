import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RegisterPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");
  const [confirmContrasena, setConfirmContrasena] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [contrasenaError, setContrasenaError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // Cargar datos del contexto al iniciar el componente
  React.useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setApellido(user.apellido || "");
      setEmail(user.email || "");
      setTelefono(user.telefono || "");
      setDireccion(user.direccion || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!validateEmail(email)) {
      setEmailError("Por favor, introduce un correo válido");
      return;
    }
    if (!validatePassword(contrasena, confirmContrasena)) {
      return;
    }
    if (!nombre || !apellido || !telefono || !direccion) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const User = {
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contrasena,
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(User),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud de registro");
      }

      const result = await response.json();
      console.log("Usuario registrado:", result);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert(
        "Ocurrió un error al guardar los cambios. Por favor, inténtalo nuevamente."
      );
    } finally {
      setIsLoading(false);
      logout();
      redirect("/login");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setEmailError("Por favor, introduce un correo válido");
    } else {
      setEmailError("");
    }
    return isValid;
  };

  const validatePassword = (contrasena: string, confirmContrasena: string) => {
    let error = "";
    if (contrasena.length < 6) {
      error = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (contrasena !== confirmContrasena) {
      error += " Las contraseñas no coinciden.";
    }
    setContrasenaError(error);
    return !error;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      bgcolor="#050607"
      p={2}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Perfil
      </Typography>
      <Box
        component="form"
        width="85%"
        maxWidth="400px"
        p={3}
        boxShadow={3}
        borderRadius={2}
        sx={{
          bgcolor: "#1a1a1a",
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
          onClick={handleUpdate}
          disabled={isLoading}
          sx={{ mt: 2, bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
