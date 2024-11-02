// NavButton.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactElement<SvgIconComponent>;
  variant?: "text" | "outlined" | "contained";
  // Agrega todas las props que ListItem puede recibir
  onClick?: () => void;
  role?: string;
  button?: boolean; // Propiedad para indicar que es un botón
}

const NavButton: React.FC<NavButtonProps> = ({
  to,
  children,
  icon,
  variant = "text",
  ...props
}) => {
  return (
    <Button
      component={NavLink}
      to={to}
      variant={variant}
      sx={{
        color: "white",
        textDecoration: "none",
        fontSize: "1.2rem",
        margin: 1,
        display: "flex",
        alignItems: "center",
        "&.active": {
          borderBottom: "2px solid white",
        },
      }}
      {...props} // Pasar las propiedades adicionales al botón
    >
      {icon && <span style={{ marginRight: 0.5 }}>{icon}</span>}
      {children}
    </Button>
  );
};

export default NavButton;
