import React from "react";
import { Box, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

interface LinkBarProps {
  links: { to?: string; label: string; action?: () => void }[]; // Hacer to opcional
}

const LinkBar: React.FC<LinkBarProps> = ({ links }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginRight: "1rem" }}>
      {links.map((link) => (
        <Link
          key={link.label} // Usar label como clave única, asumiendo que es único
          component={link.action ? "span" : NavLink} // Usa "span" si hay acción
          to={!link.action ? link.to : undefined} // Establece `to` solo si no hay acción
          onClick={link.action} // Llama a la acción si existe
          sx={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.2rem",
            margin: 1,
            "&.active": {
              borderBottom: "2px solid white",
            },
          }}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );
};

export default LinkBar;
