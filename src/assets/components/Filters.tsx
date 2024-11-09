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

// Estilos comunes para los componentes
const inputStyles = {
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: 2,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#007BFF",
    },
    "&:hover fieldset": {
      borderColor: "#0056b3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0056b3",
    },
  },
};

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
        display: { xs: "block", sm: "flex" },
        justifyContent: "center",
        marginBottom: "20px",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Campo de búsqueda */}
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          marginBottom: { xs: 2, sm: 0 },
          marginRight: { sm: 2 },
          ...inputStyles,
        }}
        InputLabelProps={{
          sx: {
            color: "rgba(0, 0, 0, 0.7)",
            "&.Mui-focused": {
              color: "#0056b3",
            },
          },
        }}
        InputProps={{
          sx: {
            "&::placeholder": {
              color: "rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      />

      {/* Filtro por disponibilidad */}
      <FormControl
        variant="outlined"
        sx={{
          minWidth: { xs: "100%", sm: 220 },
          marginRight: { sm: 2 },
          marginBottom: { xs: 2, sm: 0 },
        }}
      >
        <InputLabel>Filtrar por disponibilidad</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filtrar por disponibilidad"
          sx={inputStyles}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          <MenuItem value="available">Disponibles</MenuItem>
          <MenuItem value="unavailable">No disponibles</MenuItem>
        </Select>
      </FormControl>

      {/* Ordenar por precio */}
      <FormControl
        variant="outlined"
        sx={{ minWidth: { xs: "100%", sm: 200 } }}
      >
        <InputLabel>Ordenar por precio</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Ordenar por precio"
          sx={inputStyles}
        >
          <MenuItem value="asc">Menor a Mayor</MenuItem>
          <MenuItem value="desc">Mayor a Menor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
