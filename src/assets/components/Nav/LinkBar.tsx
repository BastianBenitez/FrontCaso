import React from "react";
import { Box, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

interface LinkBarProps {
  links: { to: string; label: string }[]; // Array de objetos con la ruta y la etiqueta del enlace
}

const LinkBar: React.FC<LinkBarProps> = ({ links }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {links.map((link) => (
        <Link
          key={link.to}
          component={NavLink}
          to={link.to}
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
