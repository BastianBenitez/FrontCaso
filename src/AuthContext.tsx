import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
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
  _id: string;
}

// Define la interfaz para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  login: (userData: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const isTokenValid = (token: string): boolean => {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  };

  useEffect(() => {
    const token = Cookies.get("token"); // Obtener el token de las cookies

    if (token) {
      try {
        if (isTokenValid(token)) {
          const userData: User = jwtDecode(token);
          console.log("Token decodificado:", userData);
          setUser(userData);>
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.log("Token no encontrado o inválido");
    }
  }, []);

  const login = (userData: { token: string; user: User }) => {
    console.log("Iniciando sesión con el token:", userData.token);
    Cookies.set("token", userData.token, { path: "/" }); // Almacenar el token en las cookies
    console.log("Token almacenado en cookies:", Cookies.get("token")); // Verifica el valor almacenado
    setUser(userData.user);
  };

  const logout = () => {
    console.log("Cerrando sesión...");
    Cookies.remove("token"); // Eliminar el token de las cookies
    setUser(null);
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
