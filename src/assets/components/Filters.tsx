import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

interface FiltersProps {
  filter: string;
  setFilter: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

const Filters = ({
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
}: FiltersProps) => {
  return (
    <Box
      sx={{
        display: { xs: "block", sm: "flex" }, // Cambia a bloque en pantallas pequeñas
        justifyContent: "center",
        marginBottom: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          marginBottom: { xs: 2, sm: 0 },
          marginRight: { sm: 2 },
          backgroundColor: "#1a1a1a", // Fondo oscuro
          color: "white", // Color del texto blanco
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#b0b0b0", // Color de borde similar al login
            },
            "&:hover fieldset": {
              borderColor: "#1976d2", // Color de borde al hacer hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976d2", // Color de borde cuando está enfocado
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: "#b0b0b0", // Color de la etiqueta
            "&.Mui-focused": {
              color: "#1976d2", // Color de la etiqueta cuando está enfocada
            },
          },
        }}
        InputProps={{
          sx: {
            color: "white", // Color del texto
            "&::placeholder": {
              color: "#b0b0b0", // Color del placeholder
            },
          },
        }}
      />
      <FormControl
        variant="outlined"
        sx={{
          minWidth: { xs: "100%", sm: 220 },
          marginRight: { sm: 2 },
          marginBottom: { xs: 2, sm: 0 },
        }}
      >
        <InputLabel sx={{ color: "#b0b0b0" }}>
          Filtrar por disponibilidad
        </InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filtrar por disponibilidad"
          sx={{
            backgroundColor: "#1a1a1a", // Fondo oscuro
            color: "white", // Color del texto blanco
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#b0b0b0",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          <MenuItem value="available">Disponibles</MenuItem>
          <MenuItem value="unavailable">No disponibles</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        sx={{ minWidth: { xs: "100%", sm: 200 } }}
      >
        <InputLabel sx={{ color: "#b0b0b0" }}>Ordenar por precio</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Ordenar por precio"
          sx={{
            backgroundColor: "#1a1a1a",
            color: "white",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#b0b0b0",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        >
          <MenuItem value="asc">Menor a Mayor</MenuItem>
          <MenuItem value="desc">Mayor a Menor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
