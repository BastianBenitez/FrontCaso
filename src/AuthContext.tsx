import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

// Define la interfaz para los datos del usuario
interface User {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro: Date;
  isAdmin: boolean;
}

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
}

// Crear el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData: User = jwtDecode(token); // Decodifica el token
      setUser(userData);
    }
  }, []);

  const login = (userData: { token: string; user: User }) => {
    localStorage.setItem("token", userData.token); // Almacena el token en localStorage
    setUser(userData.user); // Actualiza el estado del usuario
  };

  const logout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    setUser(null); // Limpia el estado del usuario
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto en componentes
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
