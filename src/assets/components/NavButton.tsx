import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactElement<SvgIconComponent>;
  variant?: "text" | "outlined" | "contained"; // Variantes de Material-UI
}

const NavButton: React.FC<NavButtonProps> = ({
  to,
  children,
  icon,
  variant = "text",
}) => {
  return (
    <Button
      component={NavLink}
      to={to}
      variant={variant} // Usar la variante de Material-UI
      sx={{
        color: "white",
        textDecoration: "none",
        fontSize: "1.2rem",
        margin: 1,
        display: "flex",
        alignItems: "center",
        "&.active": {
          borderBottom: "2px solid white", // Resalta el enlace activo
        },
      }}
    >
      {icon && <span style={{ marginRight: 0.5 }}>{icon}</span>}
      {children}
    </Button>
  );
};

export default NavButton;
